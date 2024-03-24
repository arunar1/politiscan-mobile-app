import React, { useState,useRef } from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; 
import { setWidth } from '../utils';
import axios from 'axios';
import { Api } from '../constants';

const Forgotpass = ({navigation}) => {
    const [email, setEmail] =useState('')
    const [forgotClick,setForgotClick] = useState(false)

const animation = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setForgotClick(false)
      };
    }, [])
  );


  const handleForgot=async()=>{
    
    setForgotClick(true)
    try {
        const response = await axios.post(`${Api.API_BACKEND}/verification/forgotpass`,{
            email:email
        })
        console.log(response)
        if(response.data.message==="Email sent"){
            navigation.navigate('forgotpassverify',{email:email})
            setForgotClick(false)

        }
        setForgotClick(false)
        
    } catch (error) {
        setForgotClick(false)

    }
  }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email</Text>
        <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />   

      <TouchableOpacity   style={[styles.login, !forgotClick ? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]} onPress={handleForgot} >
        {!forgotClick?<Text>Forgot</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 100,
       }}
         source={require('../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      marginTop:23,
    },
    text:{
        fontSize:22,
    },
    login:{
    width: setWidth(20),
    justifyContent:'center',
    alignItems: 'center',
    height: 30, 
    borderRadius: 15,

    }
})

export default Forgotpass;
