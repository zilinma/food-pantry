import React from "react";
import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";

export default class LoginScreen extends React.Component {
  render() {
    return (
        <View style = {styles.container}>
        <View>
          <Text style= {{fontSize : 20}}> You are not logged in ... </Text>
          <TouchableOpacity
            style = {styles.button}
            onPress={() =>this.props.navigation.navigate("LoginForms")}>
            <Text style = {styles.text}> Administrator</Text>
          </TouchableOpacity>
        </View>

        <View>

          <TouchableOpacity
            style = {styles.button}
            onPress={() =>this.props.navigation.navigate("PantryListView")}>

            <Text style = {styles.text}> Consumer </Text>
          </TouchableOpacity>
          
        </View>

      </View>
      
      )
  };

}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#414288',
    padding: 10,
    margin: 10
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
});
