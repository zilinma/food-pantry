import React from "react";
import {MapView} from 'expo';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Grid, Button,StyleProvider,  Container,Title, Header, Content, List, ListItem, Text, Left, Body, Right, Switch } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import Dimensions from 'Dimensions';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT/ 2.5
const SKIP = DEVICE_HEIGHT/  1.75
const BUTTON_WIDTH = DEVICE_WIDTH * 0.25;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;

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
    <StyleProvider style = {getTheme(colors)}>
      <Container>

        <Content>
          <View style={styles.container}>
            <Body>
            <Text style={styles.title}>
              {pantryName}
            </Text>
            </Body>
            <Right>
              <Button style={styles.button}>
                <Text>
                  EDIT
                </Text>
              </Button>
            </Right>
          </View>

          <ListItem icon noBorder style={styles.item}>
            <Left>
              <Icon active name="phone" style={styles.icon}/>
            </Left>
            <Body>
              <Text>{pantryContact}</Text>
              <Text style={styles.textDes}>phone</Text>
            </Body>

          </ListItem>
          <ListItem icon noBorder style={styles.item}>
            <Left>
              <Icon active name="map-marker"  style={styles.icon}/>
            </Left>
            <Body>
              <Text>{pantryAddress}</Text>
              <Text style={styles.textDes}>address</Text>
            
            </Body>

          </ListItem>

          <ListItem icon noBorder style={styles.item}>
            <Left>
              <Icon active name="clock-o"  style={styles.icon}/>
            </Left>
            <Body>
              <Text>{pantryHour}</Text>
            </Body>
          </ListItem>

          <View style={styles.map}>
          
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />


          </View>
        </Content>

      </Container>

    </StyleProvider>
      
      );

  }
}

const styles = StyleSheet.create({
  item:{
    marginTop: DEVICE_HEIGHT / 10,
    marginLeft: DEVICE_HEIGHT/ 20,
    marginRight: DEVICE_HEIGHT/ 20,


  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    marginTop: DEVICE_HEIGHT/ 50,
    marginLeft: DEVICE_HEIGHT/ 40,
    marginRight: DEVICE_HEIGHT/ 40,
  },
  buttonContainer:{
    flexDirection: "row",
    justifyContent: "center",

  },
  infoContainer:{
    padding: 10, 
    borderWidth: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "#FFFFFF"
  }, 
  textDes: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
  },
  icon: {
    fontSize: 20,
    color: '#2699FB',
  },
  button: {
    width: BUTTON_WIDTH * 0.85,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    padding: 10,
    margin: DEVICE_HEIGHT / 40,
  },
  map: { 
    flex: 1,
    minHeight: DEVICE_HEIGHT/2,
    margin: DEVICE_HEIGHT/ 20,
    },
  buttonInventory: {
    width: BUTTON_WIDTH * 2,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    padding: 10,
    margin: DEVICE_HEIGHT / 40,
  },

});
