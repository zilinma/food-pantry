import React from "react";
import {MapView} from 'expo';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);

export default class PantryInfoView extends React.Component {

  static navigationOptions = {
    headerTitle: "INFORMATION",
  };

  render() {
    const { navigation } = this.props;
    const pantryName = navigation.getParam('pantryName', "No-name");
    const pantryAddress = navigation.getParam("pantryAddress", "Unknown");
    const pantryContact = navigation.getParam("pantryContact", "No contact provided");
    const pantryHour = navigation.getParam("pantryHours", "No hours provided");
    const isDisabled = navigation.getParam("pantryUID", null);
    console.log(isDisabled)
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon>
            <Left>
                <Icon name="phone"/>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
      /**
      <View>
        <View style = {styles.infoContainer}>
          {isDisabled != "no-id" &&
            <Button 
            title="Edits"/>
          }
        </View>
        <View style = {styles.infoContainer}>
          <Text>Name: {pantryName}</Text>
        </View>
        <View style = {styles.infoContainer}>
          <Text>Address: {pantryAddress}</Text>
        </View>
        <View style = {styles.infoContainer}>
          <Text>Contact: {pantryContact}</Text>
        </View>
        <View style = {styles.infoContainer}>
          <Text>Hours: {pantryHour}</Text>
        </View>
        

        <TouchableOpacity
          style = {styles.button}
          onPress={() => this.props.navigation.navigate("InventoryView",
          {
            name: pantryName,
            pantryUID: isDisabled,

          })}>
          <Text style = {styles.text}>Inventory</Text>
        </TouchableOpacity>

      </View>
      */
      );

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  infoContainer:{
    padding: 10, 
    borderWidth: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#414288',
    padding: 10,
    margin: 10
  },

});
