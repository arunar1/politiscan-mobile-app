import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const Notification = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>
                Notification
            </Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 55,
        padding: 16,
    },
    head:{
        fontSize:22,
    }
    

})

export default Notification;
