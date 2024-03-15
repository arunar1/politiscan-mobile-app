import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';

const PollScreen = () => {
    const [pollDescription, setPollDescription] = useState('');

    const handleAddPoll = async () => {
        try {
            const response = await addPoll(pollDescription);
            if (response.status === 200) {
                Alert.alert('Success', 'Poll added successfully');
                setPollDescription('')
            } else {
                throw new Error('Failed to add poll');
            }
        } catch (error) {
            console.error('Error adding poll:', error);
            Alert.alert('Error', 'Failed to add poll. Please try again.');
        }
    };

    const pollvalidation =()=>{
        console.log(pollDescription)
        if(!pollDescription.trim()){
            Alert.alert("info",'Discription is empty')
            return false
        }
        else{
            return true
        }
    }

    const handleGetPollDetails = async () => {
        try {
            const pollDetailsResponse = await getPollDetails();
            console.log('Poll Details:', pollDetailsResponse.data);
        } catch (error) {
            console.error('Error fetching poll details:', error);
            Alert.alert('Error', 'Failed to fetch poll details. Please try again.');
        }
    };

    const addPoll = async (description) => {
        return await axios.post(`${Api.API_BACKEND}/addpoll`, { description });
    };

    const getPollDetails = async () => {
        return await axios.get(`${Api.API_BACKEND}/getpollvote`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter poll description"
                value={pollDescription}
                onChangeText={text => setPollDescription(text)}
            />
            <Button title="Add Poll" onPress={() => pollvalidation() && handleAddPoll()} />

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
    },
});

export default PollScreen;
