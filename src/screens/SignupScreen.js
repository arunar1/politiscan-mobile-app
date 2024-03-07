import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid ,ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebase/config';
import 'firebase/storage'; 
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import { Api } from '../constants';
import { setWidth } from '../utils';
import LottieView from 'lottie-react-native';

import { constituencies,districtList } from '../constants/constituency';

const SignupScreen = ({navigation}) => {
  const animation = useRef(null);
  const [signClick,setSignClick] = useState(false)
  

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSignClick(false)
      };
    }, [])
  );

  const [constituenciesList, setConstituenciesList] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    district:'',
    aadharNo:'',
    constituency: '',
    mobileNumber: '',
    email: '',
    password: '',
    adminId: '',
    profileImage: null,
    aadharImage: null,
    userType: 'user'
  });

  useEffect(() => {
    if (formData.district) {
      setConstituenciesList(constituencies[formData.district]);
    }
  }, [formData.district]);




  const [profile,setProfile]=useState();
  const [aadhar,setAadhar]=useState();



  const [errors, setErrors] = useState({
    name: false,
    age: false,
    gender: false,
    district:false,
    constituency: false,
    mobileNumber: false,
    aadharNo:false,
    email: false,
    password: false,
    adminId: false,
    profileImage: false,
    aadharImage:false
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to upload images/documents.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const uploadDocumentToFirebase = async (documentUri) => {
    try {
      const response = await fetch(documentUri);
      const blob = await response.blob();
  
      const filename = Date.now() + '_' + documentUri.split('/').pop();
      const reference = firebase.storage().ref().child(filename);
      console.log(reference)
      const uploadTask = reference.put(blob);
  
      await uploadTask;
  
      const downloadURL = await reference.getDownloadURL();
      console.log(downloadURL)
      return downloadURL;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error; 
    }
  };

  const validPhonenumber=()=>{
    if(formData.mobileNumber.length!=10){
      Alert.alert("info","Invalid mobile Number")
      return false
    }
    else{
      return true
    }
  }
 const validAadhar=()=>{
    if(formData.aadharNo.length!=12){
      Alert.alert("info","Enter the valid Aadhar number")
      return false;
    }
    else{
      return true
    }
  }

  const passwordCheck=()=>{
    if(formData.password.length<8){
      Alert.alert("info", "Enter a strong password")
      return false
    }
    else{
      return true
    }
  }
  const emailvalidate=()=>{
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (!gmailRegex.test(formData.email)) {
      Alert.alert("Error","Provide a valid Email")
      return false
    }
    else{
      return true
    }

  }
     
        

     
  const handleSignup = async () => {
    
    if(validPhonenumber() && validAadhar() && passwordCheck() && emailvalidate()){
    if (validateFields()) {
      setSignClick(true)
      

      console.log('Signup pressed');
      console.log('Form Data:', formData.aadharImage);

      
      try {
        const profileImageUpload = await uploadDocumentToFirebase(formData.profileImage);
        const aadharImageUpload = await uploadDocumentToFirebase(formData.aadharImage);
        
        setFormData(prevState => ({
          ...prevState,
          profileImage: profileImageUpload,
          aadharImage: aadharImageUpload
        }));
        setAadhar(aadharImageUpload);
        setProfile(profileImageUpload)
      
        console.log('Profile Image URL:', profileImageUpload);
        console.log('Aadhar Image URL:', aadharImageUpload);

        console.log(formData)
        
        
      
      } catch (error) {
        setSignClick(false)
        console.error('Error uploading documents:', error);
        Alert.alert('Error', 'Failed to upload documents. Please try again.');
      }
      
    } else {
      Alert.alert('Error', 'Please fill out all required fields.');
    }
    if (validateFields()) {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/verification`, {
        info:formData,
        aadhar:aadhar,
        profile:profile
      });


      console.log(response)


      if(response.data.message==="Account Already exists"){
        Alert.alert("info","Account already exist")
        setSignClick(false)
        navigation.navigate('signup')

      }
      else if(response.data.message=="Email send"){
        Alert.alert("info",`Email is send to ${formData.email}`)
        navigation.navigate("validate",{info:formData,aadhar:aadhar,profile:profile})
      }
      else if(response.data.message){
        Alert.alert("Error",response.data.message)
        setSignClick(false)
      }

      else{
        Alert.alert("Error","Please try again")
        setSignClick(false)
      }
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
      setSignClick(false)
    }
  }
}
    
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.cancelled) {
      setFormData(prevState => ({
        ...prevState,
        [type === 'profile' ? 'profileImage' : 'aadharImage']: result.assets[0].uri
      }));

      setErrors(prevErrors => ({ ...prevErrors, [type === 'profile' ? 'profileImage' : 'aadharImage']: false }));
    }
  };

  const validateFields = () => {
    const { name, age, gender,district, constituency, mobileNumber, email, password, adminId, profileImage, aadharImage, aadharNo } = formData;
    const formErrors = {
      name: !name.trim(),
      age: !age.trim(),
      gender: !gender,
      district:!district,
      constituency: !constituency,
      mobileNumber: !mobileNumber.trim(),
      email: !email.trim(),
      password: !password.trim(),
      adminId: formData.userType === 'admin' && !adminId.trim(),
      profileImage: !profileImage,
      aadharImage: !aadharImage,
      aadharNo: !aadharNo.trim() 
    };

   

    setErrors(formErrors);

    return Object.values(formErrors).every(error => !error);
  };

  const renderAdminFields = () => {
    return (
      <TextInput
        style={[styles.input, errors.adminId && styles.errorInput]}
        placeholder="Admin ID"
        value={formData.adminId}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, adminId: text }))}
        placeholderTextColor="black"
      />
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.userAdminButtons}>
        <TouchableOpacity
          style={[styles.userAdminButton, formData.userType === 'user' && styles.activeButton]}
          onPress={() => setFormData(prevState => ({ ...prevState, userType: 'user' }))}
        >
          <Text style={[styles.buttonText, formData.userType === 'user' && styles.activecolor]}>User Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userAdminButton, formData.userType === 'admin' && styles.activeButton]}
          onPress={() => setFormData(prevState => ({ ...prevState, userType: 'admin' }))}
        >
          <Text style={[styles.buttonText, formData.userType === 'admin' && styles.activecolor]}>Admin Signup</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, name: text }))}
        placeholderTextColor="black"
      />
      
      {formData.userType !== 'user' ? renderAdminFields() : null}

      <TextInput
        style={[styles.input, errors.age && styles.errorInput]}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, age: text }))}
        placeholderTextColor="black"
      />

<TextInput
  style={[styles.input]}
  placeholder="Aadhar no"
  keyboardType="numeric"
  value={formData.aadharNo}
  onChangeText={(text) => setFormData(prevState => ({ ...prevState, aadharNo: text }))}
  placeholderTextColor="black"
  autoCompleteType="off"
/>

     

      <View style={styles.border}>
        <Picker
          selectedValue={formData.gender}
          style={[styles.input, errors.gender && styles.errorInput]}
          onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, gender: itemValue }))}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.border}>
      <Picker
        selectedValue={formData.district}
        onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, district: itemValue }))}
        

      >
        <Picker.Item label="Select District" value="" />
        {districtList.map((district, index) => ( // Use districtList here
          <Picker.Item key={index} label={district} value={district} />
        ))}
      </Picker>
      </View>


      

      <View style={[styles.border]}>
      <Picker
        selectedValue={formData.constituency}
        onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, constituency: itemValue }))}

      >
        <Picker.Item label="Select Constituency" value="" />
        {constituenciesList.map((constituency, index) => (
          <Picker.Item key={index} label={constituency} value={constituency} />
        ))}
      </Picker>
      </View>

      <TextInput
        style={[styles.input, errors.mobileNumber && styles.errorInput]}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={formData.mobileNumber}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, mobileNumber: text }))}
        placeholderTextColor="black"
      />



      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}
        placeholderTextColor="black"
      />

      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}
        placeholderTextColor="black"
      />

      <TouchableOpacity style={[styles.uploadButton,formData.profileImage  && {backgroundColor:"red"}]} onPress={() => pickImage('profile')}>
        <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
      </TouchableOpacity>
      {errors.profileImage && <Text style={styles.errorText}>Profile image is required</Text>}

      <TouchableOpacity style={[styles.uploadButton,formData.aadharImage && {backgroundColor:"red"}]} onPress={() => pickImage('aadhar')}>
        <Text style={styles.uploadButtonText}>Upload Aadhar Image</Text>
      </TouchableOpacity>
      {errors.aadharImage && <Text style={styles.errorText}>Aadhar image is required</Text>}

      <TouchableOpacity style={[styles.login, !signClick ? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]}  onPress={handleSignup}>
        {!signClick?<Text>Sign up</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 250,
       }}
         source={require('../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop:60
  },
  userAdminButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAdminButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  login: {
    marginTop:4,
    width: setWidth(20),
    justifyContent:'center',
    alignItems: 'center',
    height: 30, 
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'black'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 18,
    fontSize: 15,
    color:'black'
  },
  errorInput: {
    borderColor: 'red',
  },
  border:{
    color:'grey',
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 0,
    fontSize: 15,
  },
  uploadButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 25,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',

  },
  uploadButtonText: {
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  activecolor:{
    color:'white'
  }
});

export default SignupScreen;
