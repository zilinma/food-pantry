import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from '../Navigators/MainTabNavigator';
import PantryInfoView from '../screens/PantryInfoView';

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  MainTab: MainTabs,
  PantryInfoView: PantryInfoView
},
{
  initialRouteName: 'Login',
}

);
AppNavigator.navigationOptions = {
	

}

export default AppNavigator;