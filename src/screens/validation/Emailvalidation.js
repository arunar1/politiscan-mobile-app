import React, { useState,useRef } from 'react';
import { View, TextInput, Button, Alert,Text,StyleSheet } from 'react-native';
import axios from 'axios'; 
import { Api } from '../../constants';
const Emailvalidation = ({navigation,route}) => {
  const animation = useRef(null);
  const [validClick,setValidClick] = useState(false)
  

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSignClick(false)
      };
    }, [])
  );
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
      // Handle verification error
      Alert.alert('Error', error.response.data.error);
      navigation.navigate('signup')
    }
    if(response.status==200){
        navigation.navigate("login")
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
      <TouchableOpacity style={styles.login} onPress={handleVerify}>
        {!signClick?<Text>Verify</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 100,
         height: 250,
       }}
         source={require('../assets/images/loading.json')} 
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