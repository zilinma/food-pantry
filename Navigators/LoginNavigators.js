import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import loginForms from '../AdminLogins/loginForms';
//import forgetPassword from '../AdminLogins/forgetPassword';
import SignUpEmail from '../AdminLogins/SignUpEmail';

import signUpPwd from '../AdminLogins/signUpPwd';
//import PantryInfoView from '../screens/PantryInfoView';
import {
  createStackNavigator
} from "react-navigation";

const LoginNavigators = createStackNavigator(
  {
    loginForms: loginForms,
    //forgetPassword: forgetPassword,
    signUpPwd: signUpPwd,
    SignUpEmail: SignUpEmail,
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

export default LoginNavigators;

