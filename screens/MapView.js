import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

export default class ListView extends React.Component {
  static navigationOptions = {
    headerTitle: "Map View"
  }

  render() {
    return (
      <View>
        <Button
          title="Map View"
          onPress={
            () => this.props.navigation.navigate("Login")

          }
        />
      </View>
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
