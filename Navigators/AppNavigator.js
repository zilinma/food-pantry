import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from '../Navigators/MainTabNavigator';

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  MainTab: MainTabs
},
{
  initialRouteName: 'Login',
}

);
AppNavigator.navigationOptions = {
	

}

export default AppNavigator;