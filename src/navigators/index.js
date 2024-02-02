import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardUser, DemoScreen, LoginScreen, ProjectListScreen, SignupScreen, SplashScreen,WelcomeScreen } from "../screens";
const stack=createStackNavigator()

const Navigators=()=>{
    return(
        <NavigationContainer>
            <stack.Navigator screenOptions={{headerShown:false}}>
                <stack.Screen name="splash" component={SplashScreen} />
                <stack.Screen name="welcome" component={WelcomeScreen}/>
                <stack.Screen name="login" component={LoginScreen}/>
                <stack.Screen name="signup" component={SignupScreen}/>
                <stack.Screen name="dash" component={DashboardUser} />
                <stack.Screen name='projectlist' component={ProjectListScreen} />
                {/* <stack.Screen name="demo" component={DemoScreen} /> */}

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
