import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert,FlatList,TouchableOpacity,Text } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';

const PollScreen = ({navigation}) => {
    const [pollDescription, setPollDescription] = useState('');

    const [poll, setPoll] = useState([]);

    useEffect(() => {
        getPoll();
    }, [pollDescription]);

    const getPoll = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getpoll`, {});
            setPoll(response.data.data);
        } catch (error) {
            console.error('Error fetching poll:', error);
        }
    };
    console.log(poll)

    const handlePollPress =(pollItem)=>{
            navigation.navigate('pollresultscreen',{item:pollItem})
    }

    const renderPollItem = ({ item }) => (
        <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
            <Text>{item.description}</Text>
        </TouchableOpacity>
    );

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

    

    const addPoll = async (description) => {
        return await axios.post(`${Api.API_BACKEND}/addpoll`, { description });
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter poll description"
                value={pollDescription}
                onChangeText={text => setPollDescription(text)}
            />
            <Button style={styles.Button} title="Add Poll" onPress={() => pollvalidation() && handleAddPoll()} />
              


            <FlatList
                data={poll}
                renderItem={renderPollItem}
                keyExtractor={(item) => item._id}
            />
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
    pollItem: {
    
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, 
    },
    
});

export default PollScreen;
