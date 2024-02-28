import React, { useState } from 'react';
import { View, TextInput, Button, Alert,Text,StyleSheet } from 'react-native';
import axios from 'axios'; 
import { Api } from '../../constants';
const Emailvalidation = ({navigation,route}) => {

    const {info,aadhar,profile}=route.params;

    console.log(info)

  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      // Make a POST request to your backend endpoint for verifying the code
      const response = await axios.post(`${Api.API_BACKEND}/registration`, {
        verificationCode: code,
        aadhar:aadhar,
        profile:profile,
        info:info

      });

      // Handle successful verification


      Alert.alert('Message', response.data.message);
    } catch (error) {
      // Handle verification error
      Alert.alert('Error', error.response.data.error);
    }
    if(response.status==200){
        navigation.navigate("login")
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>{info.email}</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20,marginTop:10 }}
        placeholder="  Enter verification code"
        onChangeText={text => setCode(text)}
        value={code}
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

const styles=StyleSheet.create({
    text:{
        fontSize:20,
        paddingBottom:30,
        color:'red'
    }
})

export default Emailvalidation;