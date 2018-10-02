import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from '../Navigators/MainTabNavigator';
import PantryInfoView from '../screens/PantryInfoView';
import InventoryView from '../screens/InventoryView';
import LoginForms from "../AdminLogins/loginForms";
//import LoginNavigators from '../Navigators/LoginNavigator';

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  MainTab: MainTabs,
  PantryInfoView: PantryInfoView,
  InventoryView: InventoryView,
  LoginForms: LoginForms,
  //LoginNavigator: LoginNavigator,
},
{
  initialRouteName: 'Login',
}

);
AppNavigator.navigationOptions = {
	

}

export default AppNavigator;