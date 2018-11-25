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

  MainTab: {
    screen: MainTabs,
    navigationOptions: {
      headerTitle: "Pantries",
    }
  },

  infoInventoryTab: {
    screen: infoInventoryTab,
    navigationOptions : ({navigation}) => ({
      headerTitle: navigation.getParam("pantryName", "No-name"),
    })
  },

  LoginNavigators: {
    screen: LoginNavigators,
    navigationOptions: {
      headerTitle: "Admin",
      } 
  },
  
  InfoEditView: InfoEditView,
  },

  {
    initialRouteName: 'Login',
    navigationOptions: {
        headerStyle: {
          backgroundColor: "#0a2a66"
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
          fontSize: 18,
          width:"75%",
          justifyContent: "center",
          alignSelf:'center',
          textAlign: 'center',
        },
        headerTintColor: "#fff"
      }
    
  }

  );
  AppNavigator.navigationOptions = {
  	

}

export default AppNavigator;