import React, { useState,useRef } from 'react';
import { View, TextInput, Button, Alert,Text,StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { Api } from '../../constants';
import { setWidth } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const ForgotPassVerify = ({navigation,route}) => {

    const {email}=route.params;


  const animation = useRef(null);
  const [validClick,setValidClick] = useState(false)
  const [validClickpass,setValidClickPass] = useState(false)

  const [enabler,setEnabler]=useState(false)
  const [verified,setVerified]=useState(false)
  

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setValidClick(false)
        setValidClickPass(false)
      };
    }, [])
  );
    

  const [code, setCode] = useState('');
  const [pass,setPass]=useState('');

  const handleVerify = async () => {
    if(!code.trim){
      Alert.alert('Error','Enter the code')
      return
    }
    setValidClick(true)
    try {
      const response = await axios.post(`${Api.API_BACKEND}/verification/forgotpassverify`, {
        verificationCode: code,

      });
      console.log(response.data.message)

      if(response.data.message=="code accepted"){
        setValidClick(false)
        setEnabler(true)
      }
      else{
        setValidClick(false)
        Alert.alert("Error","Code is not accepted")
      }



      
     
      
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
      setValidClick(false)

    }
    
  };

  const validationPass=()=>{
    if(pass.length<8){
        Alert.alert("Error","Need atleast 8 character");
        return false
    }
    else{
        return true
    }
  }


  const handlePass=async()=>{
    if(validationPass()){
        try {
            setValidClickPass(true)
            const response =await axios.put(`${Api.API_BACKEND}/verification/updatepass`,{
                email:email,
                password:pass
            })
            if(response.data.message=="Password updated successfully"){
                Alert.alert("Success",response.data.message);
                navigation.navigate('login')
            }
            else{
                setValidClickPass(false)
            }
            
        } catch (error) {
            setValidClickPass(false)
            
        }
    }
  }

  console.log(enabler)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20,marginTop:10 ,paddingLeft:20}}
        placeholder="  Enter verification code"
        onChangeText={text => setCode(text)}
        value={code}
      />
      <TouchableOpacity style={[styles.login, !validClick? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]}  onPress={handleVerify}>
        {!validClick?(!enabler?<Text>Verify</Text>:<Text>Verified</Text>):<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 100,
       }}
         source={require('../../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>
      {enabler ? (
  <>
    <TextInput
      style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, marginTop: 10, paddingLeft: 20 }}
      placeholder="  Enter New password"
      onChangeText={text => setPass(text)}
      value={pass}
    />
    <TouchableOpacity style={[styles.login, !validClickpass ? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]} onPress={handlePass}>
      {!validClickpass ? <Text>Submit</Text> : <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 100,
        }}
        source={require('../../assets/images/loading.json')}
      />}
    </TouchableOpacity>
  </>
) : null}
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

export default ForgotPassVerify;