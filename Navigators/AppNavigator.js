import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from '../Navigators/MainTabNavigator';
import PantryInfoView from '../screens/PantryInfoView';
import InventoryView from '../screens/InventoryView';
import LoginNavigators from "../Navigators/LoginNavigators";
import InfoEditView from '../screens/infoEditView';
//import LoginNavigators from '../Navigators/LoginNavigator';

import {
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,

} from "react-navigation";

const infoInventoryTab = createMaterialTopTabNavigator({
  PantryInfoView: PantryInfoView,
  InventoryView: InventoryView,

},{

  initialRouteName: 'PantryInfoView',
  tabBarOptions: {
    inactiveTintColor: "rgba(10, 42, 102, 0.3)",
    activeTintColor: 'rgb(10, 42, 102)',
    activeBackgroundColor: "#F6F7F7",
    inactiveBackgroundColor: "#F6F7F7",
    style: {
    backgroundColor: '#FFFFFF',
  },

  }
});

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  MainTab: MainTabs,
  infoInventoryTab: infoInventoryTab,
  LoginNavigators: LoginNavigators,
  InfoEditView: InfoEditView,
  //LoginNavigator: LoginNavigator,
},
{
  initialRouteName: 'Login',
  
}

);
AppNavigator.navigationOptions = {
	

}

export default AppNavigator;