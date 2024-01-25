import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "../screens";
const stack=createStackNavigator()

const Navigators=()=>{
    return(
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name='splash' component={SplashScreen} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
