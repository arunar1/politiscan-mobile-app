import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { setHeight,setWidth } from '../utils';
import { images } from '../constants';
const WelcomeCard = ({image,title,content}) => {
    return (
        <View style={styles.container}>
            <Image  source={images[image]}  resizeMode='contain'
            style={styles.image}></Image>
            <Text style={styles.titleText}>
                {title}
            </Text>
            <Text style={styles.contentText}>
                {content}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:setWidth(100),
        height:setHeight(50),
    },
    image:{
        height:setHeight(30),
        width:setWidth(60),
    },
    titleText:{
        fontSize:20,
        color:'orange',
        alignItems:'center',
        fontWeight:'900'

    },
    contentText:{
        padding:20,
        fontSize:15,
        textAlign:'center',
        marginHorizontal:20,

    }
})

export default WelcomeCard;
