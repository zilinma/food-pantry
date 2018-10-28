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
      location: null,
      errorMessage: null,
      end: this.props.navigation.getParam("pantryCoordinates"),
    };
  }

  state = {

  };
  static navigationOptions = {

    headerTitle: "Pantry Information",
    
  };


  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _callShowDirections = (endPoint) => {
    const startPoint = {
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
    } 

    console.log(this.endPoint)

    console.log(this.state)

    const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });

  }
  /**
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    console.log(this.state.location);

    const end = this.props.navigation.getParam("pantryAddress", "Unknown")
    if(end != "Unknown"){
        Geocoder.from(end)
        .then(json => {
            var end = json.results[0].geometry.location;

            this.setState({end})
            //console.log(end);
        })
        .catch(error => console.warn(error));


    }



  };
  */

  render() {
    const { navigation } = this.props;
    const pantryName = navigation.getParam('pantryName', null);
    const pantryAddress = navigation.getParam("pantryAddress", null);
    const pantryContact = navigation.getParam("pantryContact", null);
    const userid = navigation.getParam("userID", "no-id")
    console.log("userID: " + userid)
    console.log("pantryContact: " + pantryContact)
    const pantryHour = navigation.getParam("pantryHour", null);
    //const isDisabled = navigation.getParam("pantryUID", null);
    //console.log(isDisabled)
    const endPoint = this.props.navigation.getParam("pantryCoordinates");
    //console.log(endPoint);
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
            /**
            <Button
            style ={styles.button} 
            onPress={() => {
              const endPoint = this.props.navigation.getParam("pantryCoordinates");
              console.log(endPoint);
              this._callShowDirections(endPoint);

            }}>
              <Text>Directions</Text>
            </Button>
            */
          </ListItem>



          /**
          <View style={styles.map}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={
                {...this.state.location.coords}
              }
            />


          </View>
          */
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
