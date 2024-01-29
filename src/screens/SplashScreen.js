import React, { useEffect } from 'react';
import {View, StyleSheet, Text,StatusBar,Image} from 'react-native';
import { colors } from '../constants';
import {images} from '../constants';
import { setHeight,setWidth } from '../utils';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
    const navigation=useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("welcome")
        },1500)
    },[])

    return (
        <View style={styles.container}>
            <StatusBar  barStyle='light-content' backgroundColor={colors.BACK_SB}/>
            <Image source={images.PIC_FRONT} style={{width:setHeight(30),height:setHeight(30),borderRadius:50,}}></Image>
            <Text style={{fontSize:35,color:'black',fontWeight:500,margin:26,}}><Text style={{color:'red',fontSize:37,}}>P</Text>oliti<Text style={{color:'red',fontSize:37}}>S</Text>can</Text>
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
