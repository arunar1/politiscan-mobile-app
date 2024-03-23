import React, { useState } from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { TextInput } from 'react-native-paper';

const Forgotpass = () => {
    const [email, setEmail] =useState('')





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
    },
    text:{
        fontSize:22,
    }
})

export default Forgotpass;
