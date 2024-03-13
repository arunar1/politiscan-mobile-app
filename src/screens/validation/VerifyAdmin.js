import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';

const VerifyAdmin = ({ route }) => {
    const { item } = route.params;
    const [verifying, setVerifying] = useState(false);

    console.log(item.verified)

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
            <Text>Email: {item.email}</Text>
            <Text>Constituency: {item.constituency}</Text>

            {item.aadharImage ? (
                <Image
                    source={{ uri: item.aadharImage }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={(error) => console.error('Image loading error:', error)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
                        <Text>Name: {item.name}</Text>

            {item.profileImage ? (
                <Image
                    source={{ uri: item.profileImage }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={(error) => console.error('Image loading error:', error)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}

                        <Text>Aadhar Number: {item.aadharNo}</Text>

            
                <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}
                disabled={verifying || item.verified}
            >
                <Text style={styles.buttonText}>
                    {verifying ? 'Verifying...' : item.verified? 'Verified' : 'Verify'}
                </Text>
            </TouchableOpacity>
            
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
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VerifyAdmin;
