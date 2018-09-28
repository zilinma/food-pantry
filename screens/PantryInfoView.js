import React from "react";
import {MapView} from 'expo';
import { Button, View, StyleSheet, Text } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);

export default class PantryMapView extends React.Component {
  static navigationOptions = {
    headerTitle: "Information View"
  }

  render() {
    const { navigation } = this.props;
    const pantryName = navigation.getParam('pantryName', "No-name");
    return (
      <View>
        <Text style = {styles.text}>{JSON.stringify(pantryName)}</Text>
      </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});
