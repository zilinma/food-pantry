import React from "react";
import {MapView} from 'expo';
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Grid, Button,StyleProvider,  Container,Title, Header, Content, List, ListItem, Text, Left, Body, Right, Switch } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import Dimensions from 'Dimensions';
import getDirections from 'react-native-google-maps-directions'
import { Constants, Location, Permissions } from 'expo';
import { OpenMapDirections } from 'react-native-navigation-directions';
import geocoderAPI from '../geoAPI';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);
import Geocoder from 'react-native-geocoding';
 
// to do only once
console.log(geocoderAPI)

Geocoder.init(geocoderAPI); // use a valid API key
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT/ 2.5
const SKIP = DEVICE_HEIGHT/  1.75
const BUTTON_WIDTH = DEVICE_WIDTH * 0.25;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;

export default class PantryInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: null,
      error:null,
    };
  }
  static navigationOptions = {

    headerTitle: "Pantry Information",
    
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         //console.log("wokeeey");
         startPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
         }
         this.setState({
            startPoint: startPoint,
            error: null,
         }
         );
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 },
     );
    

  }

  _callShowDirections = (startPoint, endPoint) => {

    console.log(endPoint)

    console.log(startPoint)

    const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });

  }


  render() {
    const { navigation } = this.props;
    const pantryName = navigation.getParam('pantryName', null);
    const pantryAddress = navigation.getParam("pantryAddress", null);
    const pantryContact = navigation.getParam("pantryContact", null);
    const userid = navigation.getParam("userID", "no-id")
    console.log("userID: " + userid)
    //console.log("pantryContact: " + pantryContact)
    const pantryHour = navigation.getParam("pantryHour", null);
    //const isDisabled = navigation.getParam("pantryUID", null);
    //console.log(isDisabled)
    const longitude = this.props.navigation.getParam("longitude");
    const latitude = this.props.navigation.getParam("latitude");
    const pantryCheckout = this.props.navigation.getParam("pantryCheckout", null);
    const endPoint = {
      longitude: longitude,
      latitude: latitude,

    }
    //console.log(this.state.longitude)
    //console.log(this.state.latitude)
    console.log("end point: " + longitude + latitude);
    //this._getLocationAsync();
    return (
    <StyleProvider style = {getTheme(colors)}>
      <Container>
        <Content>
          <View style={styles.container}>
            <Left>
              <Text style={styles.title}>
                {pantryName}
              </Text>
            </Left>
            <Right>
              {
                userid != 'no-id' && 
                (<Button style={styles.buttonEdit}>
                  <Text>
                    EDIT
                  </Text>
                </Button>)
              }
            </Right>
          </View>

          <ListItem icon noBorder style={styles.item}>
            <Left>
              <Icon active name="phone" style={styles.icon}/>
            </Left>
            <Body>
              <Text>{pantryContact}</Text>}
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
              <Text style={styles.textDes}>hours open</Text>
            </Body>
          </ListItem>

          <ListItem icon noBorder style={styles.item}>
            <Button style = {styles.button} onPress={(navigation) => {
                    uid = this.props.navigation.getParam('uid', 'no-id')
                    this.props.navigation.navigate("InventoryView",
                    {
                      name: pantryName,
                      pantryUID: uid,
                    })
                  }}>
              <Text>Inventory</Text>
            </Button>
            {pantryCheckout && 
              <Button style = {styles.button} onPress=()=>{Linking.openURL(pantryCheckout)}>
                <Text>Checkout</Text>
              </Button>
            }
            <Button
            style ={styles.button} 
            onPress={() => {
              this._callShowDirections(this.state.startPoint, endPoint);

            }}>
              <Text>Directions</Text>
            </Button>
            
          </ListItem>

            {this.state.startPoint && Object.keys(this.state.startPoint).length == 2 && endPoint ? (
          <View style={styles.map}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={
                {
                ...endPoint,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            }>
              <MapView.Marker
                coordinate={
                  {
                    ...endPoint
                  }
                }
                title={pantryName}
                description={pantryAddress}
              />
            </MapView>
          </View>) : (
            <View style={styles.map}>
              <Text> Loading... </Text>
            </View>

          )
            }

        </Content>

      </Container>

    </StyleProvider>
      
      );

  }
}

const styles = StyleSheet.create({
  item:{
    margin: DEVICE_HEIGHT /60,


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
    fontSize: 20
    ,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 20,
    color: '#2699FB',
  },
  button: {
    width: BUTTON_WIDTH * 1.5,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    margin: DEVICE_HEIGHT / 30,
  },
  buttonEdit: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    margin: DEVICE_HEIGHT / 30,
  }
  ,
  map: { 
    flex: 1,
    minHeight: DEVICE_HEIGHT/2,
    margin: DEVICE_HEIGHT/ 30,
    marginTop: DEVICE_HEIGHT/ 50,
    },

});
