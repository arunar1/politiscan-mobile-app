import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import * as DocumentPicker from 'expo-document-picker';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    constituency: '',
    mobileNumber: '',
    email: '',
    password: '',
    adminId: '',
    profileImage: null,
    aadharImage: null,
    userType: 'user' // 'user' or 'admin'
  });

  

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    gender: false,
    constituency: false,
    mobileNumber: false,
    email: false,
    password: false,
    adminId: false,
    profileImage: true,
    aadharImage: true
  });

  const uploadDocumentToFirebase = async (documentUri) => {
    const filename = Date.now() + '_' + documentUri.split('/').pop();
    const reference = storage().ref(filename);
  
    await reference.putFile(documentUri);
  
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  };


  const handleSignup = async () => {
    if (validateFields()) {

      try {
        const response=axios.post("http://192.168.147.133:4000/registration",{
          info:formData,
        })
        
      } catch (error) {
        
      }

      console.log('Signup pressed');
      console.log('Form Data:', formData);

      // Upload documents to Firebase Storage
      try {
        const profileImageUpload = await uploadDocumentToFirebase(formData.profileImage);
        const aadharImageUpload = await uploadDocumentToFirebase(formData.aadharImage);

        console.log('Profile Image URL:', profileImageUpload);
        console.log('Aadhar Image URL:', aadharImageUpload);

        // Here you can proceed with sending the signup data along with document URLs to your backend
      } catch (error) {
        console.error('Error uploading documents:', error);
        Alert.alert('Error', 'Failed to upload documents. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all required fields.');
    }
  };


  const pickDocument = async (type) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Specify allowed document types
      });
  
      setFormData(prevState => ({
        ...prevState,
        [type === 'profile' ? 'profileImage' : 'aadharImage']: res.uri
      }));
  
      // Clear error for the selected document type
      setErrors(prevErrors => ({ ...prevErrors, [type === 'profile' ? 'profileImage' : 'aadharImage']: false }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking document', err);
      }
    }
  };
  


   const validateFields = () => {
    const { name, age, gender, constituency, mobileNumber, email, password, adminId, profileImage, aadharImage } = formData;
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
      aadharImage: !aadharImage
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

      {/* {formData.profileImage && (
        <Image source={{ uri: formData.profileImage }} style={styles.imagePreview} resizeMode="contain" />
      )} */}

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('profile')}>
        <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
      </TouchableOpacity>
      {errors.profileImage && <Text style={styles.errorText}>Profile image is required</Text>}

      {/* {formData.aadharImage && (
        <Image source={{ uri: formData.aadharImage }} style={styles.imagePreview} resizeMode="contain" />
      )} */}

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('aadhar')}>
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
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
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
  },
  border:{
    color:'grey',
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 0,



  }
  
});

export default SignupScreen;
