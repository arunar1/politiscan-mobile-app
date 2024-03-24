import React from 'react';
import Navigators from './src/navigators';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const App = () => {
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
        // <AppLoading />
        null
    );
}

export default App;
