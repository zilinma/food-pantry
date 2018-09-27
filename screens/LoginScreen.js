import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> You are not logged in ... </Text>
        <Button 
        title="Donor" 
        onPress={() =>this.props.navigation.navigate("PantryListView")}/> 
        <Button 
        title="Consumer" 
        onPress={() =>this.props.navigation.navigate("PantryListView")}/> 
        
      </View>


      )
  };

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
