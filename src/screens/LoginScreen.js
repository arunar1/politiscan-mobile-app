// Import necessary components from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Functional component for the login screen
const LoginScreen = () => {
  // State to hold email and password values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login button press
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your authentication logic here (e.g., API calls, authentication services)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Additional UI components can be added here, like a "Forgot Password?" link */}

    </View>
  );
};

// Styles for the components
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
});

export default LoginScreen;
