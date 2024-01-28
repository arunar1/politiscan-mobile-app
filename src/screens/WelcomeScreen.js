import React from 'react';
import {View, StyleSheet,FlatList} from 'react-native';
import { StatusBar } from 'react-native';
import { colors,General } from '../constants';
import { WelcomeCard } from '../components';
import { setHeight } from '../utils';


const Pagination=()=>{
    return(
        <View style={styles.pageContainer}>
        <View style={styles.page}></View>
        <View style={styles.page}></View>
        <View style={styles.page}></View>
    </View>
    )
}

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor={colors.BACK_SB}/>
            <View style={styles.welcomeListContainer}>
                <FlatList
                    data={General.WELCOME_CONTENT}
                    keyExtractor={item =>item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    renderItem={({item})=><WelcomeCard {...item}/>}
                />

            </View>
            <Pagination/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.WHITE,
        justifyContent:'center',
        alignItems:'center',

    },
    welcomeListContainer:{
        height:setHeight(60),
        
    },
    pageContainer:{
        flexDirection:'row'

    },
    page:{
        height:8,
        width:15,
        backgroundColor:'grey',
        borderRadius:32,
        marginHorizontal:5,

    }
})

export default WelcomeScreen;
