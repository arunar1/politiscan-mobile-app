import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';

const VerifyAdmin = ({ navigation,route }) => {
    const { item } = route.params;
    const [verifying, setVerifying] = useState(false);
    const [rejecting, setRejectinging] = useState(false);


    console.log(item.verified)

    const handledelete= async()=>{
        setRejectinging(true)
        try {
            const response = await axios.delete(`${Api.API_BACKEND}/delete/deleteaccountbyadmin`, {
                data: {
                    userType: item.userType,
                    email: item.email
                }
            });

            console.log(response.data)
            setRejectinging(false)
    
    
            if (response.data.message == 'deleted') {
                Alert.alert('Success', 'Rejected successfully');
                navigation.navigate('checker')

            } else {
                Alert.alert('Error', 'Failed to Rejected');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Please try again');
        }

    }

    

    const handleVerify = async () => {
        try {
            setVerifying(true);
            await axios.put(`${Api.API_BACKEND}/login/admin/verify/${item._id}`);
            item.verified = true;
            setVerifying(false);
            Alert.alert('Verification Successful', 'User has been verified successfully.');
        } catch (error) {
            console.error('Error verifying user:', error);
            setVerifying(false);
            Alert.alert('Error', 'Failed to verify user. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={2}  selectable={true} style={[styles.text,{marginBottom:40,fontFamily:'Bold',he:30}]}>Email : {item.email}</Text>
            <Text selectable={true} style={styles.text}>Constituency : {item.constituency}</Text>

            {item.aadharImage ? (
                <Image
                    source={{ uri: item.profileImage }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={(error) => console.error('Image loading error:', error)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
                        <Text selectable={true} style={styles.text}>Name : {item.name}</Text>

            {item.profileImage ? (
                <Image
                    source={{ uri: item.aadharImage }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={(error) => console.error('Image loading error:', error)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}

                        <Text selectable={true} style={styles.text}>Aadhar Number : {item.aadharNo}</Text>

            
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={handleVerify}
                    disabled={verifying || item.verified}>
                    <Text style={styles.buttonText}>
                        {verifying ? 'Verifying...' : item.verified? 'Verified' : 'Verify'}
                    </Text>
                </TouchableOpacity>
                {!item.verified ? (
                    <TouchableOpacity
                    style={styles.verifyButton}
                        onPress={handledelete}
                        disabled={verifying || item.verified}
                        >
                        <Text style={styles.buttonText}>
                            {rejecting ? 'Rejecting...':'Reject'}
                        </Text>
                    </TouchableOpacity>
                ):null}
                </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    verifyButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        margin:10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Bold'
    },
    text:
    {
        fontFamily:'Bold'
    },
    buttonContainer:{
        flexDirection:'row'
    }
});

export default VerifyAdmin;
