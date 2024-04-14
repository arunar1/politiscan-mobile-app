import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const CheckUser = ({ navigation }) => {
    const [userRecords, setUserRecords] = useState([]);
    const [adminRecords, setAdminRecords] = useState([]);
    const [displayAdmin, setDisplayAdmin] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [userConstituencies, setUserConstituencies] = useState([]);
    const [adminConstituencies, setAdminConstituencies] = useState([]);
    const [userDistricts, setUserDistricts] = useState([]);
    const [adminDistricts, setAdminDistricts] = useState([]);


    const isVisible= useIsFocused();
    console.log(isVisible)


    const handleLogout = () => {    
        navigation.navigate('login');
    
      };


      useFocusEffect(
        React.useCallback(() => {
          return () => {
           getRecords()
          };
        }, [])
      );
      useEffect(() => {
        getRecords();

    }, [isVisible]);


    

    const getRecords = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/login/checkUser`);
            setUserRecords(response.data.userdetails);
            setAdminRecords(response.data.admindetails);
    
            const userDistrictList = [...new Set(response.data.userdetails.map(user => user.district))];
            setUserDistricts(userDistrictList);
    
            const adminDistrictList = [...new Set(response.data.admindetails.map(admin => admin.district))];
            setAdminDistricts(adminDistrictList);
    
            const adminConstituenciesObj = {};
            adminDistrictList.forEach(district => {
                adminConstituenciesObj[district] = response.data.admindetails
                    .filter(admin => admin.district === district)
                    .map(admin => admin.constituency);
            });
            setAdminConstituencies(adminConstituenciesObj);
    
            setUserConstituencies(response.data.userdetails.reduce((acc, curr) => {
                acc[curr.district] = acc[curr.district] || [];
                if (!acc[curr.district].includes(curr.constituency)) {
                    acc[curr.district].push(curr.constituency);
                }
                return acc;
            }, {}));
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    
    const handleItemPress = (item) => {
        navigation.navigate('verifyadmin', { item: item , user:'admin'});
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={[styles.itemContainer,item.verified?{backgroundColor:'#d0eeec'}:'white']} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    const renderAdminItem = ({ item }) => (
        
        <TouchableOpacity style={[styles.itemContainer,item.verified?{backgroundColor:'#d0eeec'}:'white']} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            {console.log(item.verified)}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    const toggleDisplay = () => {
        setSelectedConstituency(null)
        setSelectedDistrict(null)
        setDisplayAdmin(!displayAdmin);
    };

    const handleDistrictChange = (district) => {
        setSelectedDistrict(district);
        setSelectedConstituency('');
    };

    const handleConstituencyChange = (constituency) => {
        setSelectedConstituency(constituency);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Text style={styles.textHead}>{displayAdmin ? 'Admins' : 'Users'}</Text>

                <TouchableOpacity style={styles.button} onPress={toggleDisplay}>
                    <Text style={styles.buttonText}>{displayAdmin ? 'Show Users' : 'Show Admins'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('pollscreen')}}>
                    <Text style={styles.buttonText}>Poll</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                     <MaterialCommunityIcons name="logout" size={40} color="black" />
                </TouchableOpacity>

            </View>
            <Picker
                selectedValue={selectedDistrict}
                style={styles.picker}
                onValueChange={(itemValue) => handleDistrictChange(itemValue)}
            >
                <Picker.Item label="Select District" value="" />
                {displayAdmin ? adminDistricts.map((district, index) => (
                    <Picker.Item key={index} label={district} value={district} />
                )) : userDistricts.map((district, index) => (
                    <Picker.Item key={index} label={district} value={district} />
                ))}
            </Picker>
            {selectedDistrict && (
                <Picker
                    selectedValue={selectedConstituency}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleConstituencyChange(itemValue)}
                >
                    <Picker.Item label="Select Constituency" value="" />
                    {(displayAdmin && adminConstituencies[selectedDistrict]) ? adminConstituencies[selectedDistrict].map((constituency, index) => (
                        <Picker.Item key={index} label={constituency} value={constituency} />
                    )) : (
                        userConstituencies[selectedDistrict] && userConstituencies[selectedDistrict].map((constituency, index) => (
                            <Picker.Item key={index} label={constituency} value={constituency} />
                        ))
                    )}
                </Picker>
            )}
            {selectedDistrict && (displayAdmin ? (
                <FlatList
                    data={adminRecords.filter(admin => admin.district === selectedDistrict && (!selectedConstituency || admin.constituency === selectedConstituency))}
                    keyExtractor={(item) => item._id}
                    renderItem={renderAdminItem}
                />
            ) : (
                <FlatList
                    data={userRecords.filter(user => user.district === selectedDistrict && (!selectedConstituency || user.constituency === selectedConstituency))}
                    keyExtractor={(item) => item._id}
                    renderItem={renderUserItem}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textHead:{
        marginBottom: 10,
        color:"red",
        fontSize:20,
        paddingLeft:20,
        paddingTop:10,
        fontFamily:'Bold'

    },
    email: {
        fontSize: 16,
        fontFamily:'Bold'
    },
    name:{
        fontSize: 13,
        fontFamily:'Regular'
    }
    ,
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Bold'
    },
    picker: {
        height: 50,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    logoutButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        // marginBottom:10,
        borderRadius: 5,
      }
});

export default CheckUser;
