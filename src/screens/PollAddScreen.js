import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert,Text } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const PollAddScreen = ({navigation,route}) => {
    const {item}= route.params
    const [vote, setVote] = useState('');

    const handleAddVote = async () => {
        try {
            const response = await addVote(item.aadharNo,vote);
            if (response.status === 200) {
                Alert.alert('Success', 'Vote added successfully');
               
            } else {
                throw new Error('Failed to add vote');
            }
        } catch (error) {
            console.error('Error adding vote:', error);
            Alert.alert('Error', 'Failed to add vote. Please try again.');
        }
    };

    

 

   

    const addVote = async (description, aadhar, vote) => {
        return await axios.post(`${Api.API_BACKEND}/addvote`, { description, aadhar, vote });
    };

    return (
        <View style={styles.container}>
            <View style={styles.voteButton}>
                <TouchableOpacity style={styles.click}><Text>Yes</Text></TouchableOpacity>
                <TouchableOpacity style={styles.click}><Text>No</Text></TouchableOpacity>

            </View>
            <Button title="Add Vote" onPress={handleAddVote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
        justifyContent:'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    voteButton:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:20,
        marginBottom:20,
    },
    click:{
        backgroundColor:'#ccc',
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,


    }
});

export default PollAddScreen;
