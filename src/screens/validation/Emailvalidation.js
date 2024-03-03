import React, { useState,useRef } from 'react';
import { View, TextInput, Button, Alert,Text,StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { Api } from '../../constants';
import { setWidth } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Emailvalidation = ({navigation,route}) => {
  const animation = useRef(null);
  const [validClick,setValidClick] = useState(false)
  

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setValidClick(false)
      };
    }, [])
  );
    const {info,aadhar,profile}=route.params;

    console.log(info)

  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if(!code.trim){
      Alert.alert('Error','Enter the code')
      return
    }
    setValidClick(true)
    try {
      const response = await axios.post(`${Api.API_BACKEND}/registration`, {
        verificationCode: code,
        aadhar:aadhar,
        profile:profile,
        info:info

      });


      console.log(response)
      if(response.data.message=="Registered successfully"){
        Alert.alert('Message', response.data.message);
        navigation.navigate('login')
      }
      else{
        Alert.alert("Message",response.data.message);
        navigation.navigate('signup')
      }
     
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
      navigation.navigate('signup')

    }
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>{info.email}</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20,marginTop:10 ,paddingLeft:20}}
        placeholder="  Enter verification code"
        onChangeText={text => setCode(text)}
        value={code}
      />
      <TouchableOpacity style={[styles.login, !validClick? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]}  onPress={handleVerify}>
        {!validClick?<Text>Verify</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 250,
       }}
         source={require('../../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>
    </View>
  );
};

const styles=StyleSheet.create({
    text:{
        fontSize:20,
        paddingBottom:30,
        color:'red',
        
    },
    login: {
      width: setWidth(20),
      backgroundColor:'#ccc',
      justifyContent:'center',
      alignItems: 'center',
      height: 30, 
      borderRadius: 15,
    }
})

export default Emailvalidation;