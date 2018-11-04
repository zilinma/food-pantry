import React from "react";
import { Vie, StyleSheet, TouchableOpacity } from "react-native";
//import MainTabNavigator from "../Navigators/MainTabNavigator";
import { Container, Button, Text, StyleProvider } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import {primary} from '../util/colors';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT/ 2.5;
const SKIP = DEVICE_HEIGHT/  1.5;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.45;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;

export default class LoginScreen extends React.Component {
  static navigationOptions = {header: null};
  render() {
    return (
    <StyleProvider style = {getTheme(colors)}>
      <Container>
          <Text style= {styles.text_title}> Welcome to</Text>
          <Text style= {styles.text_title}>'Burg Eats</Text>
          <Grid style = {styles.container}>
              <Button bordered style={styles.button_cons} onPress = {() =>this.props.navigation.navigate("PantryListView")}>
                <Text style={styles.text_cons}>Consumer</Text>
              </Button>
              <Button style={styles.button_admin} onPress = {() =>this.props.navigation.navigate("LoginNavigators")}>
                <Text style={styles.text_admin}>
                  Administrator
                </Text>
              </Button>
          </Grid>
      </Container>
    </StyleProvider>

      )
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  button_admin: {
    justifyContent: 'center',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    position: "relative",
    top: SKIP,
    borderRadius:BUTTON_RADIUS, 
    backgroundColor: primary,
  },
  button_cons: {
    justifyContent: 'center',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    position: "relative",
    top: SKIP,
    borderRadius:BUTTON_RADIUS, 
    borderColor: primary,
  },
  text_admin: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  text_cons: {  
    textAlign: "center",
    fontSize: 15,
    color: primary,
    fontWeight: "bold",
  },
  text_title: {
    fontFamily: "Georgia",
    fontSize: 40,
    top: CENTER, 
    textAlign: 'center',
    color: primary,
  },
});
