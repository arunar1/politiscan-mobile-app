import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingScreen = () => {
    const deleteAccount=()=>{
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.head}> Settings</Text>
            <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.delete} onPress={deleteAccount}>
                <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 55,
        padding: 16,

    },
    head: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily:'Regular'
    },
    delete:{
        backgroundColor:'black',
        width:150,
        borderRadius:20,

    },
    deleteContainer:{
        marginTop:55,
        justifyContent:'center',
        alignItems:'center',

        
    },
    deleteText:{
        color:'white',
        textAlign:'center',
        padding:10,
    }
})

export default SettingScreen;
