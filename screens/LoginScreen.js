import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";
import { Container, Button, Text } from 'native-base';
export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Text style= {{fontSize: 40, top: 200, textAlign: 'center', color: '#2699FB'}}> Welcome to'Burg Eats</Text>
          <Text style= {{fontSize: 40, top: 200, textAlign: 'center', color: '#2699FB'}}>'Burg Eats</Text>
          <Text style= {{top: 250,textAlign: "center",, color: '#2699FB'}}> I am a(n)...</Text>

        </View>

        <View style = {styles.container}>
          <View>
            <Button bordered info
              style = {styles.button}
              onPress={() =>this.props.navigation.navigate("LoginNavigators")}>
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
      </View>
      )
  };

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2699FB',
    width: 150,
    height: 40,
    padding: 10,
    margin: 10,
    top: 400,
    borderRadius:5, 
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
});
