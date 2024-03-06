import React, { useState,useRef } from 'react';
import {View,Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import { StatusBar } from 'react-native';
import { colors,General } from '../constants';
import { Seperator, WelcomeCard } from '../components';
import { setHeight, setWidth } from '../utils';

const pageStyle = (isActive) => 
(isActive ? styles.page : { ...styles.page, backgroundColor: "#b6e6eb" });



const Pagination = ({ index }) => (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENT.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        )
      )}
    </View>
  );
  
const WelcomeScreen = ({navigation}) => {

    const [welcomeIndex,setWelcomeIndex]=useState(0);

    const welcomeList=useRef()

    const onViewRef=useRef(({changed})=>{
        setWelcomeIndex(changed[0].index)
        // console.log(changed)
    })
    const viewConfigRef=useRef({viewAreaCoveragePercentThreshold:50})
    
    const pageScroll=()=>{
        welcomeList.current.scrollToIndex({
            index : welcomeIndex<2 ?welcomeIndex+1 :welcomeIndex
        })
    }
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor={colors.BACK_SB}/>
            <Seperator height={StatusBar.currentHeight} />
            <Seperator height={setHeight(10)} />

            <View style={styles.welcomeListContainer}>
                <FlatList
                    ref={welcomeList}
                    data={General.WELCOME_CONTENT}
                    keyExtractor={item =>item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    renderItem={({item})=><WelcomeCard {...item}/>}
                />

            </View>
            <Pagination index={welcomeIndex}/>
            <Seperator height={setHeight(15)}/>
            {welcomeIndex==2 ? "" : (
                <View style={styles.buttonContainer} >
                <TouchableOpacity onPress ={()=>{
                welcomeList.current.scrollToEnd()
            }}>
                    <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.next} activeOpacity={.5} onPress={()=>{
                    pageScroll()
                }}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
            )}
            <Seperator height={setHeight(5)} activeOpacity={.7}/>
            {welcomeIndex==2 ? (<TouchableOpacity style={styles.getStart} onPress={()=>{
                navigation.navigate('login')
            }}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>):""}
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
