import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [constituency, setConstituency] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signup pressed');
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Constituency:', constituency);
    console.log('Mobile Number:', mobileNumber);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Admin ID:', adminId);
    console.log('Profile Image:', profileImage);
    console.log('Aadhar Image:', aadharImage);
    console.log('User Type:', userType);
    // Add your signup/authentication logic here (e.g., API calls, authentication services)
  };

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.type === 'success' && result.uri) {
        if (type === 'profile') {
          setProfileImage(result.uri);
        } else if (type === 'aadhar') {
          setAadharImage(result.uri);
        }
      }
    } catch (err) {
      console.error('Error picking document', err);
    }
  };

  const renderAdminFields = () => {
    return (
      <>
        <TextInput
          style={styles.input}
          placeholder="Admin ID"
          value={adminId}
          onChangeText={(text) => setAdminId(text)}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userAdminButtons}>
        <TouchableOpacity
          style={[styles.userAdminButton, userType === 'user' && styles.activeButton]}
          onPress={() => setUserType('user')}
        >
          <Text style={styles.buttonText}>User Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userAdminButton, userType === 'admin' && styles.activeButton]}
          onPress={() => setUserType('admin')}
        >
          <Text style={styles.buttonText}>Admin Signup</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      

      {userType != 'user' ?renderAdminFields() :'' }

      <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />

      <TextInput
        style={styles.input}
        placeholder="Constituency"
        value={constituency}
        onChangeText={(text) => setConstituency(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.imagePreview} resizeMode="contain" />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('profile')}>
        <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
      </TouchableOpacity>

      {aadharImage && (
        <Image source={{ uri: aadharImage }} style={styles.imagePreview} resizeMode="contain" />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('aadhar')}>
        <Text style={styles.uploadButtonText}>Upload Aadhar Image</Text>
      </TouchableOpacity>

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
    paddingLeft: 8,
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
});

export default SignupScreen;
