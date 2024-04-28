import React from 'react';
import { StyleSheet, View } from 'react-native';

const FeedbackOfConsTituency = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Review </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:30,
        flex:1
    },
    head: {
    fontSize: 22,
    marginBottom: 20,
    fontFamily:'Bold',
    justifyContent:'center',
    textAlign:'center',
    backgroundColor:'#5a1f85',
    paddingVertical:20,
    borderRadius:5,
    color:'white',
    
    },
})

export default FeedbackOfConsTituency;
