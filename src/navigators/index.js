import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddProjectScreen,viewResultScreen,AdminDashboard, DashboardUser, DemoScreen, LoginScreen, ProjectDetailsScreen, ProjectListScreen, SignupScreen, SplashScreen,WelcomeScreen } from "../screens";

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
                <stack.Screen name="admindash" component={AdminDashboard} />
                <stack.Screen name='projectlist' component={ProjectListScreen} />
                <stack.Screen name='projectdetails' component={ProjectDetailsScreen} />
                <stack.Screen name="demo" component={DemoScreen} />
                <stack.Screen name="add-details" component={AddProjectScreen} />
                <stack.Screen name="rating" component={viewResultScreen} />
                

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
