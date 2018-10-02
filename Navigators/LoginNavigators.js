import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import loginForms from '../AdminLogins/loginForms';
//import forgetPassword from '../AdminLogins/forgetPassword';
//import SignUpName from '../AdminLogins/SignUpName';

//import PantryInfoView from '../screens/PantryInfoView';
import {
  ,
  createStackNavigator
} from "react-navigation";

const MainTabs = createTabNavigator(
  {
    loginForms: loginForms,
    //forgetPassword: forgetPassword,
    //SignUpName: SignUpName
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

export default MainTabs;

