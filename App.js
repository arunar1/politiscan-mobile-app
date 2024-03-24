import React from 'react';
import Navigators from './src/navigators';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import {useRef } from 'react';


const App = () => {
    const animation = useRef(null);
    
    const [fontLoaded] = useFonts({
        Regular: require('./src/font/LibreBaskerville-Regular.ttf'),
        Bold: require('./src/font/LibreBaskerville-Bold.ttf'),
        Italic: require('./src/font/LibreBaskerville-Italic.ttf'),
        RomanRegular:require('./src/font/RobotoCondensed-VariableFont_wght.ttf'),
        RomanItalic:require('./src/font/RobotoCondensed-Italic-VariableFont_wght.ttf')
    });

    return fontLoaded ? (
        <Navigators />
    ) : (
        <LottieView
       
       autoPlay
       ref={animation}
       style={[styles.container]}
         source={require('./src/assets/images/loading.json')} 
       />
        
        // null
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
    },
})

export default App;
