import React from 'react';
import {View, StyleSheet,FlatList} from 'react-native';
import { StatusBar } from 'react-native';
import { colors,General } from '../constants';
import { WelcomeCard } from '../components';
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
                    renderItem={({item})=><WelcomeCard {...item}/>}
                />

            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.WHITE,
        justifyContent:'center',

    }
})

export default WelcomeScreen;
