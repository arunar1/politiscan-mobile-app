import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
        paddingTop:60

    }
})

export default SettingScreen;
