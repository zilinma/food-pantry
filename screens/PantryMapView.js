import React from "react";
import {MapView} from 'expo';
import { Button, View, StyleSheet, Text } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

export default class PantryMapView extends React.Component {
  static navigationOptions = {
    headerTitle: "Map View"
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}


      />

      )

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
