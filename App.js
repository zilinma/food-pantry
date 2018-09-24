import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ListView from './screens/PantryListView';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import AppNavigator from './Navigators/AppNavigator';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js'

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
