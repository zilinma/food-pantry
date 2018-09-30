import React from "react";
import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style= {{fontSize : 20}}> You are not logged in ... </Text>
        <TouchableOpacity
          style = {styles.button}
          onPress={() =>this.props.navigation.navigate("PantryListView")}>
          <Text style = {styles.text}> Administrator</Text>
        </TouchableOpacity>

      <View style={styles.container}>

      </View>
        <TouchableOpacity
          style = {styles.button}
          onPress={() =>this.props.navigation.navigate("PantryListView")}>

          <Text style = {styles.text}> Consumer </Text>
        </TouchableOpacity>
        
      </View>


      )
  };

}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#414288',
    padding: 10
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
});
