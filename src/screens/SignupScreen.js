import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebase/config';
import 'firebase/storage'; 
import * as FileSystem from 'expo-file-system';
import { Api } from '../constants';


const SignupScreen = ({navigation}) => {

  const [profile,setProfile]=useState();
  const [aadhar,setAadhar]=useState();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
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

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    gender: false,
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

     
  const handleSignup = async () => {
    if(validPhonenumber() && validAadhar() && passwordCheck()){
    if (validateFields()) {
      

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
      });

      if(response.data.message==="Account Already exists"){
        Alert.alert("info","Account already exist")

      }
      else if(response.status==200){
        Alert.alert("info",`Email is send to ${formData.email}`)
        navigation.navigate("validate",{info:formData,aadhar:aadhar,profile:profile})
      }
      else{
        Alert.alert("Error","Please try again")
      }
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
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
    const { name, age, gender, constituency, mobileNumber, email, password, adminId, profileImage, aadharImage, aadharNo } = formData;
    const formErrors = {
      name: !name.trim(),
      age: !age.trim(),
      gender: !gender,
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
      />
    );
  };

  return (
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
      />
      
      {formData.userType !== 'user' ? renderAdminFields() : null}

      <TextInput
        style={[styles.input, errors.age && styles.errorInput]}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, age: text }))}
      />

<TextInput
        style={[styles.input]}
        placeholder="Aadhar no"
        keyboardType="numeric"
        value={formData.aadharNO}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, aadharNo: text }))}
      />
     

      <View style={styles.border}>
        <Picker
          selectedValue={formData.gender}
          style={[styles.border,styles.input, errors.gender && styles.errorInput]}
          onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, gender: itemValue }))}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>


      

      <View style={[styles.border]}>
        <Picker 
          selectedValue={formData.constituency}
          style={[styles.border,styles.input, errors.constituency && styles.errorInput]}
          onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, constituency: itemValue }))}
        >
          <Picker.Item label="Select Constituency" value="" />
          <Picker.Item label="Constituency 1" value="Constituency 1" />
          <Picker.Item label="Constituency 2" value="Constituency 2" />
          <Picker.Item label="Constituency 3" value="Constituency 3" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, errors.mobileNumber && styles.errorInput]}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={formData.mobileNumber}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, mobileNumber: text }))}
        autoCompleteType="off"
      />



      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}
      />

      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}
      />

      <TouchableOpacity style={[styles.uploadButton,formData.profileImage  && {backgroundColor:"red"}]} onPress={() => pickImage('profile')}>
        <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
      </TouchableOpacity>
      {errors.profileImage && <Text style={styles.errorText}>Profile image is required</Text>}

      <TouchableOpacity style={[styles.uploadButton,formData.aadharImage && {backgroundColor:"red"}]} onPress={() => pickImage('aadhar')}>
        <Text style={styles.uploadButtonText}>Upload Aadhar Image</Text>
      </TouchableOpacity>
      {errors.aadharImage && <Text style={styles.errorText}>Aadhar image is required</Text>}

      <Button title="Signup" onPress={handleSignup} />
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
  userAdminButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAdminButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
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
    paddingLeft: 18,
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
  },
  uploadButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
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
