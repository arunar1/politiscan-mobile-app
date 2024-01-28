import React from 'react';
import {View, StyleSheet, Text,StatusBar,Image} from 'react-native';
import { colors } from '../constants';
import {images} from '../constants';
import { setHeight,setWidth } from '../utils';
const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar  barStyle='light-content' backgroundColor={colors.BACK_SB}/>
            <Image source={images.STDPIC} style={{width:setHeight(40),height:setHeight(40)}}></Image>
            <Text style={{fontSize:30,color:'white',}}>POLITISCAN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:colors.Back_color,
    },
})

export default SplashScreen;
