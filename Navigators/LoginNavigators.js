import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import loginForms from '../AdminLogins/loginForms';
//import forgetPassword from '../AdminLogins/forgetPassword';
import SignUpEmail from '../AdminLogins/SignUpEmail';
import SignUpHandle from '../AdminLogins/signUpHandle';
import signUpPwd from '../AdminLogins/signUpPwd';
import SignUpConfirm from '../AdminLogins/signUpConfirm';
//import PantryInfoView from '../screens/PantryInfoView';
import {
  createStackNavigator
} from "react-navigation";

const LoginNavigators = createStackNavigator(
  {
    loginForms: {
      screen: loginForms,
      navigationOptions: {
        headerTitle: "Admin Login",
      }
    },
    //forgetPassword: forgetPassword,
    signUpPwd: signUpPwd,
    SignUpEmail: {
      screen: SignUpEmail,
      navigationOptions:{
        headerTitle: "SignUp",
      }
    },
    SignUpHandle: SignUpHandle,
    SignUpConfirm: SignUpConfirm,
  },
  {
    initialRouteName: 'loginForms',
  },
);

export default LoginNavigators;

