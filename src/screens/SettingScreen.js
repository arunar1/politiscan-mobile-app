import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Api } from '../constants';
import axios from 'axios';
const SettingScreen = ({navigation,route}) => {
    

    const [dataSet,setDataSet]=useState([])

    const {data}=route.params

    useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser=async()=>{
        try {
            const response = await axios.get(`${Api.API_BACKEND}/login/${data.constituency}`)
            console.log(response.data.data)
            setDataSet(response.data.data)
            
        } catch (error) {
            
        }
    }

    const validUserNumber=()=>{
        if(dataSet.length==0){
            Alert.alert('Info','No users are registered')
            return false
        }
        else{
            return true
        }
    }

    const deleteAccount=()=>{

        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete your account ?',
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
                        
                        if(data.userType=='user'){
                            try {
                                const response = await axios.delete(`${Api.API_BACKEND}/delete/deleteaccount`, {
                                    data: {
                                        userType: data.userType,
                                        email: data.email
                                    }
                                });
    
                                console.log(response.data)
                        
                        
                                if (response.data.message == 'deleted') {
                                    Alert.alert('Success', 'Account deleted successfully');
                                    navigation.navigate('welcome')
    
                                } else {
                                    Alert.alert('Error', 'Failed to delete account');
                                }
                            } catch (error) {
                                console.error(error);
                                Alert.alert('Error', 'Please try again');
                            }

                        }
                        else{
                            Alert.alert('info','Admin require special permission to delete Account')
                        }
                        
                    }
                }
            ],
            { cancelable: false }
        );

        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.head}> Settings</Text>
            <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.delete} onPress={deleteAccount}>
                <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
            {data.userType=='admin'?(<View>
                <TouchableOpacity style={styles.delete} onPress={()=>{navigation.navigate('pollscreen',{data:data})}} >
                <Text style={styles.deleteText}>Poll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={()=>{validUserNumber() &&  navigation.navigate('user',{data:dataSet})}} >
                <Text style={styles.deleteText}>Users</Text>
            </TouchableOpacity>
            </View>):null }

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 55,
        padding: 16,

    },
    head: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily:'Regular'
    },
    delete:{
        backgroundColor:'black',
        width:150,
        borderRadius:20,
        marginTop:30

    },
    deleteContainer:{
        marginTop:45,
        justifyContent:'center',
        alignItems:'center',

        
    },
    deleteText:{
        color:'white',
        textAlign:'center',
        padding:10,

    }
})

export default SettingScreen;
