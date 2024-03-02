import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { Api } from '../constants';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data,setdata]=useState([]);
  const [token,setToken]=useState()




  const handleLogin = async() => {
    console.log('Login pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    try {
      const response = await axios.post(`${Api.API_BACKEND}/login`, {
        email:email,
        password:password
      });
      console.log('Response:', response.data);
      setdata(response.data.details)
      setToken(response.data.token)
      
      if(data && data.userType==='user'){
        navigation.navigate('dash',{data:data})
      }
      else if(data && data.userType==='admin'){
        navigation.navigate('admindash',{data:data})
      }
      else{
        Alert.alert("Error",response.data.error)
      }
    } catch (error) {
      
      console.error('Error:', error);
    }
    
    
    
  };

  const handleSignUp = () => {
    //  sign-up navigation logic 
    navigation.navigate('signup')
    console.log('Sign up pressed');
  };

  const handleForgotPassword = () => {
    //  forgot password navigation logic 
    console.log('Forgot Password pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          <RadioButton.Android
            value="rememberMe"
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            color="blue"
          />
          <Text style={styles.checkboxText}>Remember Me</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.additionalOptions}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.linkText}>No account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  eyeIcon: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    color: 'blue',
  },
  forgotPassword: {
    color: 'blue',
    marginBottom: 20,
  },
  additionalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  linkText: {
    color: 'blue',
  },
});

export default LoginScreen;
