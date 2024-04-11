import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, FlatList, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { setWidth } from '../../utils';

const PollScreen = ({ navigation, route }) => {
    const [pollDescription, setPollDescription] = useState('');
    const [constituencies, setConstituencies] = useState([]);
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [deletedItem, setDeletedItem] = useState('');
    const [poll, setPoll] = useState([]);
    const [filteredPoll, setFilteredPoll] = useState([]);

    let constituency = '';
    let userType = '';
    let dist=''
    
    if (route && route.params) {
        const{ data } = route.params;
        constituency = data.constituency;
        userType = data.userType;
        dist=data.district
        

    }

    

    useEffect(() => {
        getPoll();
    }, [pollDescription,deletedItem]);

    useEffect(() => {
        if (poll.length > 0) {
            const uniqueDistricts = [...new Set(poll.map(item => item.district))];
            setDistricts(uniqueDistricts);
        }
    }, [poll,deletedItem,pollDescription]);

    

    useEffect(() => {
        if (selectedDistrict) {
            const filteredConstituencies = poll
                .filter(item => {
                    return(item.district == selectedDistrict)
                })
                .map(item => {
                    return(
                        item.constituency
                    )
                });
            const uniqueConstituencies = [...new Set(filteredConstituencies)];
            setConstituencies(uniqueConstituencies);

            
            filterData(selectedConstituency, selectedDistrict);
        }
    }, [selectedDistrict,selectedConstituency,deletedItem]);

    useEffect(() => {
        if (selectedDistrict || selectedConstituency) {
            filterData(selectedConstituency, selectedDistrict);
        } else {
            setFilteredPoll(poll); // Reset filtered data if no filters are applied
        }
    }, [selectedConstituency, selectedDistrict, deletedItem, pollDescription, poll]);
    

    console.log("hi",deletedItem)

   

    const getPoll = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getpoll`, {});
            if (response.data) {
                setPoll(response.data.data.reverse());
            }
        } catch (error) {
            console.error('Error fetching poll:', error.message);
        }
    };

    const filterData = (selectedConstituency, selectedDistrict) => {
        let filteredResults = poll;

        if (selectedDistrict) {
            filteredResults = filteredResults.filter(record =>
                record.district == selectedDistrict
            );
        }
        console.log(selectedConstituency)

        if (selectedConstituency) {
            filteredResults = filteredResults.filter(record =>
                {
                    console.log('geo',record.constituency,selectedConstituency)
                    return(
                        record.constituency == selectedConstituency
                    )
                }
            );
        }

        console.log(filteredResults)

        setFilteredPoll(filteredResults);
    };

    const handlePollPress = (pollItem) => {
        navigation.navigate('pollresultscreen', { item: pollItem });
    };

    const deleteItem = async (item) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        console.log('OK Pressed');
                        try {
                            const response = await axios.delete(`${Api.API_BACKEND}/deletePoll`, { data: { description: item } });
                            console.log(response.data);
                            setDeletedItem(response.data);
                            Alert.alert('Delete',response.data.message)
                        } catch (error) {
                            console.error('Error deleting poll:', error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const renderPollItem = ({ item }) => (
        userType === 'admin' && item.constituency === constituency ? (
            <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
                <View>
                    <Text style={{ fontFamily: 'Regular', marginBottom: 10 }}>{item.date}</Text>
                    <Text style={{ fontFamily: 'Regular' }}>{item.description}</Text>
                </View>
                <MaterialCommunityIcons name="delete" size={30} color="black" onPress={() => deleteItem(item.description)} />
            </TouchableOpacity>
        ) : userType !== 'admin' ? (
            <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
                <View>
                    <Text style={{ fontFamily: 'Bold', marginBottom: 10 }}>{item.constituency !== "Admin" ? <Text>Constituency : {item.constituency}</Text> : null}</Text>
                    <Text style={{ fontFamily: 'Regular', marginBottom: 10 }}>{item.date}</Text>
                    <Text style={{ fontFamily: 'Regular' }}>{item.description}</Text>
                </View>
                <MaterialCommunityIcons name="delete" size={30} color="black" onPress={() => deleteItem(item.description)} />
            </TouchableOpacity>
        ) : null
    );

    const handleAddPoll = async () => {
        try {
            const response = await addPoll(pollDescription);
            if (response.status === 200) {
                Alert.alert('Success', 'Poll added successfully');
                setPollDescription('');
            } else {
                throw new Error('Failed to add poll');
            }
        } catch (error) {
            console.error('Error adding poll:', error);
            Alert.alert('Error', 'Failed to add poll. Please try again.');
        }
    };

    const pollvalidation = () => {
        if (!pollDescription.trim()) {
            Alert.alert("info", 'Description is empty');
            return false;
        } else {
            return true;
        }
    };

    const addPoll = async (description) => {
        return await axios.post(`${Api.API_BACKEND}/addpoll`, { description, constituency ,district :dist});
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Bold', marginBottom: 10 }}>Enter the Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter poll description"
                value={pollDescription}
                onChangeText={text => setPollDescription(text)}
            />

            <TouchableOpacity style={styles.button} onPress={() => pollvalidation() && handleAddPoll()}>
                <Text style={styles.buttonText}>Add Poll</Text>
            </TouchableOpacity>

            {userType!='admin' ? (
                <View>
                    <View style={{ marginTop: 10 }}>
                <Text style={{ fontFamily: 'Bold', marginBottom: 10 }}>Select District </Text>
                <Picker
                    selectedValue={selectedDistrict}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                >
                    <Picker.Item label="Select District" value="" />
                    {districts.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={{ fontFamily: 'Bold', marginBottom: 10 }}>Select Constituency </Text>
                <Picker
                    selectedValue={selectedConstituency}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => setSelectedConstituency(itemValue)}
                >
                    <Picker.Item label="Select Constituency" value="" />
                    {constituencies.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
                <FlatList
                data={filteredPoll}
                renderItem={renderPollItem}
                keyExtractor={(item) => item._id}
            />
            </View>

                    </View>
            ):(
                <FlatList
                data={poll}
                renderItem={renderPollItem}
                keyExtractor={(item) => item._id}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    pollItem: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30
        


    },
    buttonText: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        fontFamily: 'Regular',
        width:setWidth(90),
        textAlign:'center'

    }

});

export default PollScreen;
