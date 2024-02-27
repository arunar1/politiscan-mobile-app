import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; 

const Emailvalidation = ({navigation,route}) => {

    const {info,aadhar,profile}=route.params;

    console.log(info)

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      // Make a POST request to your backend endpoint for verifying the code
      const response = await axios.post('http://192.168.16.133:4000/registration', {
        email: email,
        verificationCode: code,
        aadhar:aadhar,
        profile:profile,
        info:info

      });

      // Handle successful verification
      Alert.alert('Success', response.data.message);
    } catch (error) {
      // Handle verification error
      Alert.alert('Error', error.response.data.error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Enter email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Enter verification code"
        onChangeText={text => setCode(text)}
        value={code}
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

export default Emailvalidation;