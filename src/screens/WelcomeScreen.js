import React, { useState,useRef } from 'react';
import {View,Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import { StatusBar } from 'react-native';
import { colors,General } from '../constants';
import { Seperator, WelcomeCard } from '../components';
import { setHeight, setWidth } from '../utils';


const Pagination=()=>{
    return(
        <View style={styles.pageContainer}>
        <View style={styles.page}></View>
        <View style={styles.page}></View>
        <View style={styles.page}></View>
    </View>
    )
}

const WelcomeScreen = ({navigation}) => {

    const [welcomeIndex,setWelcomeIndex]=useState(0);

    const welcomeList=useRef()

    const onViewRef=useRef(({changed})=>{
        setWelcomeIndex(changed[0].index)
    })

    // const viewConfigRef=useRef({viewAreCoveragePercentThreshold:50})
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor={colors.BACK_SB}/>
            <Seperator height={StatusBar.currentHeight} />
            <Seperator height={setHeight(8)} />

            <View style={styles.welcomeListContainer}>
                <FlatList
                    ref={welcomeList}
                    data={General.WELCOME_CONTENT}
                    keyExtractor={item =>item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    // viewabilityConfig={viewConfigRef.current}
                    // onViewableItemsChanged={onViewRef.current}
                    renderItem={({item})=><WelcomeCard {...item}/>}
                />

            </View>
            <Pagination/>
            <Seperator height={setHeight(10)}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.next} activeOpacity={.5}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
            <Seperator height={setHeight(5)} activeOpacity={.7}/>
            <TouchableOpacity style={styles.getStart} onPress={()=>{
                navigation.navigate('login')
            }}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
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
        height:setHeight(55),
        
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

    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:setWidth(80),

    },
    buttonText:{
        fontWeight:'600',
        fontSize:15
    },
    next:{
        padding:10,
        backgroundColor:'#d8e2da',
        borderRadius:10,


    },
    getStart:{
        padding:10,
        backgroundColor:'#2992ba',
        borderRadius:10,

    }
})

export default WelcomeScreen;
