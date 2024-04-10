import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddProjectScreen,ViewResultScreen,AdminDashboard, DashboardUser, DemoScreen, LoginScreen, ProjectDetailsScreen, ProjectListScreen, SignupScreen, SplashScreen,WelcomeScreen,Emailvalidation,AdminResult,Notification,CheckUser,VerifyAdmin,PollScreen,PollAddScreen,PollResultScreen,Forgotpass,ForgotPassVerify,SettingScreen,ProjectEditing} from "../screens";

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
                <stack.Screen name="rating" component={ViewResultScreen} />
                <stack.Screen name="validate" component={Emailvalidation} />
                <stack.Screen name="adminresult" component={AdminResult} />
                <stack.Screen name="notification" component={Notification} />
                <stack.Screen name="checker" component={CheckUser} />
                <stack.Screen name="verifyadmin" component={VerifyAdmin} />
                <stack.Screen name="pollscreen" component={PollScreen} />
                <stack.Screen name="polladdscreen" component={PollAddScreen} />
                <stack.Screen name="pollresultscreen" component={PollResultScreen} />
                <stack.Screen name="forgotpass" component={Forgotpass} />
                <stack.Screen name="forgotpassverify" component={ForgotPassVerify} />
                <stack.Screen name="setting" component={SettingScreen} />
                <stack.Screen name="projectediting" component={ProjectEditing} />


            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
