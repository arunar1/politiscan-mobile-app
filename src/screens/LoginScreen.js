import React, { useState, useEffect ,useRef} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; 
import { Api } from '../constants';
import { setWidth } from '../utils';

const LoginScreen = ({ navigation }) => {
  const animation = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoginClick(false)
      };
    }, [])
  );
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState();
  const [loginClick,setLoginClick] = useState(false)

  const handleLogin = async () => {
    if(!email.trim() || !password.trim()){
      Alert.alert("info","All Field are required")
      return 
    }
    setLoginClick(true)
    try {
      const response = await axios.post(`${Api.API_BACKEND}/login`, {
        email: email,
        password: password
      });

      if(!response.data.details){
        setLoginClick(false)
      }

      setToken(response.data.token);

      if(response.status==204){
          navigation.navigate('checker')
          return 
      }

      if (response.data.details && response.data.details.userType === 'user') {
        navigation.navigate('dash', { data: response.data.details });
      } else if (response.data.details && response.data.details.userType === 'admin') {
        navigation.navigate('admindash', { data: response.data.details });
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error) {
      setLoginClick(false)
      Alert.alert('Error', error.message);
      console.error('Error:', error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('signup');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
    navigation.navigate('forgotpass')
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

      <TouchableOpacity   style={[styles.login, !loginClick ? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]} onPress={handleLogin}>
        {!loginClick?<Text>Login</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 250,
       }}
         source={require('../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>

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
  login: {
    width: setWidth(20),
    justifyContent:'center',
    alignItems: 'center',
    height: 30, 
    borderRadius: 15,
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
