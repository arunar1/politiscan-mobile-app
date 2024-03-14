import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';
import { Picker } from '@react-native-picker/picker';

const CheckUser = ({ navigation }) => {
    const [userRecords, setUserRecords] = useState([]);
    const [adminRecords, setAdminRecords] = useState([]);
    const [displayAdmin, setDisplayAdmin] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [constituencies, setConstituencies] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getRecords();
    }, [displayAdmin]);

    const getRecords = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/login/checkUser`);
            setUserRecords(response.data.userdetails);
            setAdminRecords(response.data.admindetails);
            let districtList
            if(response.data.userdetails && !displayAdmin){
                districtList = [...new Set(response.data.userdetails.map(user => user.district))];
            }
            else if(response.data.admindetails && displayAdmin){
                districtList = [...new Set(response.data.admindetails.map(user => user.district))];
            }
            setDistricts(districtList);
            if(response.data.admindetails && displayAdmin){
                setConstituencies(response.data.admindetails.reduce((acc, curr) => {
                    acc[curr.district] = acc[curr.district] || [];
                    if (!acc[curr.district].includes(curr.constituency)) {
                        acc[curr.district].push(curr.constituency);
                    }
                    return acc;
                }, {}));

            }
            else{
                setConstituencies(response.data.userdetails.reduce((acc, curr) => {
                    acc[curr.district] = acc[curr.district] || [];
                    if (!acc[curr.district].includes(curr.constituency)) {
                        acc[curr.district].push(curr.constituency);
                    }
                    return acc;
                }, {}));
            }
            
            
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleItemPress = (item) => {
        navigation.navigate('verifyadmin', { item: item });
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    const renderAdminItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    const toggleDisplay = () => {
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
                <TouchableOpacity style={styles.button} onPress={toggleDisplay}>
                    <Text style={styles.buttonText}>{displayAdmin ? 'Show Users' : 'Show Admins'}</Text>
                </TouchableOpacity>
            </View>
            <Picker
                selectedValue={selectedDistrict}
                style={styles.picker}
                onValueChange={(itemValue) => handleDistrictChange(itemValue)}
            >
                <Picker.Item label="Select District" value="" />
                {districts.map((district, index) => (
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
                    {constituencies[selectedDistrict].map((constituency, index) => (
                        <Picker.Item key={index} label={constituency} value={constituency} />
                    ))}
                </Picker>
            )}
            {displayAdmin ? (
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
            )}
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
    email: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default CheckUser;
