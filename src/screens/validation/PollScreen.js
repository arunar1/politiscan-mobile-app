import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert,FlatList,TouchableOpacity,Text } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PollScreen = ({navigation}) => {
    const [pollDescription, setPollDescription] = useState('');


    const [deletedItem,setDeletedItem]=useState('')

    const [poll, setPoll] = useState([]);

    useEffect(() => {
        getPoll();
    }, [pollDescription,deletedItem]);

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
                            setDeletedItem(response.data.message);
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
        <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
            <Text>{item.description}</Text>
            <MaterialCommunityIcons name="delete" size={24} color="black"  onPress={()=>deleteItem(item.description)}/>

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

            <TouchableOpacity  style={styles.button} onPress={() => pollvalidation() && handleAddPoll()}>
                <Text style={styles.buttonText}>Add Poll</Text>
            </TouchableOpacity>
              


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
        flexDirection:'row',
        justifyContent:'space-between'
    },
    button:{
        justifyContent:'center',
        alignItems:'center'

    },buttonText:{
        backgroundColor:'#ccc',
        padding:10,
        borderRadius:10,
        fontFamily:'Regular'

    }
    
});

export default PollScreen;
