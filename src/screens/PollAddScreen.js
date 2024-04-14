import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { setHeight, setWidth } from '../utils';
import { useIsFocused } from '@react-navigation/native';


const PollAddScreen = ({ navigation, route }) => {
    const { item, pollItem } = route.params;
    console.log(pollItem)
    const [vote, setVote] = useState('');
    const [yesClicked, setYesClicked] = useState(false);
    const [noClicked, setNoClicked] = useState(false);
    const [flag,setFlag]=useState(false)

    const isVisible=useIsFocused();

    const [load,setload]=useState(false)

    useEffect(()=>{
        getData()
    },[isVisible,load])

    console.log(item)

    const getData = async()=>{
        try {
            const response = await axios.post(`${Api.API_BACKEND}/addingPollCheck`,{aadhar:item.aadharNo,description:pollItem.description,})
            setFlag(response.data.flag)
        } catch (error) {
            
        }
    }

    console.log(flag)

    const handleAddVote = async () => {
        setload(true)

        try {
            if (!vote) {
                throw new Error('Please select a vote option');
            }

            const response = await addVote(pollItem.description,item.district,item.constituency,item.aadharNo,vote);
            if (response.status === 200) {
                Alert.alert('Success', response.data.message);
                setload(false)
            } else {
                throw new Error('Failed to add vote');
            }
        } catch (error) {
            console.error('Error adding vote:', error);
            Alert.alert('Error', 'Failed to add vote. Please try again.');
        }
    };

    const handleVoteClick = (option) => {
        setVote(option);
        if (option === 'yes') {
            setYesClicked(true);
            setNoClicked(false);
        } else if (option === 'no') {
            setYesClicked(false);
            setNoClicked(true);
        }
    };

    const addVote = async (description,district,constituency,aadhar,vote) => {
        return await axios.post(`${Api.API_BACKEND}/addingpoll`, { description,district,constituency,aadhar,vote });
    };

    return (
        <View style={styles.container}>
            
           {!flag ? (
            <View>
                <View>
                        <Text style={{ fontFamily: 'Regular',padding:20,textAlign:'center',marginBottom:60 }}>{pollItem.description}</Text>
                    </View>
                <View style={styles.voteButtons}>
                    <TouchableOpacity
                        style={[styles.button, yesClicked ? styles.clicked : null]}
                        onPress={() => handleVoteClick('yes')}
                        disabled={yesClicked}
                    >
                        <Text>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, noClicked ? styles.clicked : null]}
                        onPress={() => handleVoteClick('no')}
                        disabled={noClicked}
                    >
                        <Text>No</Text>
                    </TouchableOpacity>
                </View>
                {/* <Button  title="Add Vote" onPress={handleAddVote} disabled={!vote || flag } /> */}
               <View style={{justifyContent:'center',width:setWidth(90),alignItems:'center',marginTop:20}}>
               <TouchableOpacity style={[styles.votebtn,vote&&{backgroundColor:'purple',color:'white'}]}  onPress={handleAddVote} disabled={!vote || flag } >
                    {!load ? (<Text style={[vote&&{color:'white'}]}>ADD VOTE</Text>):(<Text style={[vote&&{color:'white'}]}>VOTING...</Text>)}
                </TouchableOpacity>
               </View>
            </View>

                
            ) : (
                <Text style={styles.alreadyResponded}>Already Responded</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
        justifyContent: 'center',
    },
    voteButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ccc',
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    clicked: {
        backgroundColor: 'green',
    },
    alreadyResponded:{
        width:setWidth(90),
        textAlign:'center',
        fontSize:20,
        fontFamily:'Regular'
    },
    votebtn:{
        padding:10,
        width:setWidth(70),
        backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop:setHeight(5)
    }
});

export default PollAddScreen;
