import React from "react";
import {MapView} from 'expo';
import { View, StyleSheet, TouchableOpacity, Platform, Linking } from "react-native";
import { Grid, Button,StyleProvider,  Container,Title, Header, Content, List, ListItem, Text, Left, Body, Right, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import Dimensions from 'Dimensions';
import getDirections from 'react-native-google-maps-directions'
import { Constants, Location, Permissions } from 'expo';
import { OpenMapDirections } from 'react-native-navigation-directions';
//import geocoderAPI from '../geoAPI';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
// to do only once
//console.log(geocoderAPI)

//Geocoder.init(geocoderAPI); // use a valid API key
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT / 2.5;
const SKIP = DEVICE_HEIGHT / 1.75;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.25;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class PantryInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantryData: null,
      startPoint: {
          latitude: 0,
          longitude: 0,
      },
      endPoint: null,
      error: null,
    };
  }
  static navigationOptions = {
    headerTitle: 'Pantry Information',
  };

  onSelect = data => {
    this.setState({pantryData: {...data}});

  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        //console.log("wokeeey");
        const startPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({
          startPoint: startPoint,
          error: null,
        });
      },
      error => {console.log(error)},
      { enableHighAccuracy: true}
    );

    //const { navigation } = this.props;
    const pantryName = this.props.navigation.getParam('pantryName', null);
    //const pantryName = 'B-eats';
    firebase
      .database()
      .ref('Pantry/' + pantryName)
      .once('value')
      .then(snapshot => {
        //console.log('snapshots: ' + JSON.stringify(snapshot));
        const pd = snapshot.val();
        this.setState({
          pantryData: pd,
          endPoint: {
            longitude: pd.lng,
            latitude: pd.lat,
      },
        });
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });

  }

  _callShowDirections = (startPoint, endPoint) => {
    //console.log(endPoint);

    //console.log(startPoint);

    const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res);
    });
  };

  render() {
    //console.log('end point: ' + JSON.stringify(this.state.endPoint));
    const userid = this.props.navigation.getParam("userID", "no-id");
    const pantryid = this.props.navigation.getParam("pantryID", "no-pantry-id");
    return (
      <StyleProvider style={getTheme(colors)}>
      { this.state.pantryData ? (
        <Container>
          <Content>
            <View style={styles.container}>
              <Left>
                <Text style={styles.title}>{this.state.pantryData.name}</Text>
              </Left>
              <Right>
                {userid == pantryid && (
                  <Button 
                  style={styles.buttonEdit} 
                  onPress={() => {
                    this.props.navigation.navigate("InfoEditView",
                      {
                        name: this.state.pantryData.name,
                        onSelect: this.onSelect,
                      })
                  }}>
                    <Text>EDIT</Text>
                  </Button>
                )}
              </Right>
            </View>

            <ListItem icon noBorder style={styles.item}>
              <Left>
                <Icon active name="phone" style={styles.icon} />
              </Left>
              <Body>
                <Text>{this.state.pantryData.contact}</Text>
                <Text style={styles.textDes}>phone</Text>
              </Body>
            </ListItem>
            <ListItem icon noBorder style={styles.item}>
              <Left>
                <Icon active name="map-marker" style={styles.icon} />
              </Left>
              <Body>
                <Text>{this.state.pantryData.address}</Text>
                <Text style={styles.textDes}>address</Text>
              </Body>
            </ListItem>

            <ListItem icon noBorder style={styles.item}>
              <Left>
                <Icon active name="clock-o" style={styles.icon} />
              </Left>
              <Body>
                <Text>{this.state.pantryData.hour}</Text>
                <Text style={styles.textDes}>hours open</Text>
              </Body>
            </ListItem>

            <ListItem icon noBorder style={{justifyContent:'space-between', marginRight:15}}>
              <Button
                style={styles.button}
                onPress={navigation => {
                  this.props.navigation.navigate('InventoryView', {
                    name: this.state.pantryData.name,
                    userID: userid,
                    pantryid: pantryid, 
                  });
                }}>
                <Text>Inventory</Text>
              </Button>
              {this.state.pantryData.checkout ? (
                <Button
                  style={styles.button}
                  onPress={() => {
                    Linking.openURL(this.state.pantryData.checkout);
                  }}>
                  <Text>Checkout</Text>
                </Button>
              ) :
              (                
                <Button disabled
                  style={styles.button}
                  >
                  <Text>Checkout</Text>
                </Button>
                )
            }
              <Button
                style={styles.button}
                onPress={() => {
                  this._callShowDirections(this.state.startPoint, this.state.endPoint);
                }}>
                <Text>Directions</Text>
              </Button>
            </ListItem>

            {this.state.startPoint &&
            this.state.endPoint ? (
              <View style={styles.map}>
                <MapView
                  style={styles.mapcontainer}
                  initialRegion={{
                    ...this.state.endPoint,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <MapView.Marker
                    coordinate={{
                      ...this.state.endPoint,
                    }}
                    title={this.state.pantryData.name}
                    description={this.state.pantryData.address}
                  />
                </MapView>
              </View>
            ) : (
              <View style={styles.map}>
                <Text> Loading... </Text>
              </View>
            )}
          </Content>
        </Container>) : 
        (
          <View style={styles.loadingContainer}>
            <Spinner style={styles.spinnerStyle} blue/>
          </View>
        )
  }
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: DEVICE_HEIGHT / 60,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT / 50,
    marginLeft: "5%",
    marginRight: "5%",
  },
  textDes: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    color: '#2699FB',
  },
  button: {
    width: BUTTON_WIDTH*1.1,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    //margin: DEVICE_HEIGHT / 30,
    //marginLeft: DEVICE_HEIGHT/ 60,
    //marginRight: DEVICE_HEIGHT / 60,
  },
  buttonEdit: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    marginRight: DEVICE_HEIGHT / 50,
  },
  map: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    minHeight: DEVICE_HEIGHT / 2,
    marginRight: DEVICE_WIDTH / 30,
    marginLeft: DEVICE_WIDTH / 30,
    marginTop: DEVICE_HEIGHT / 50,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
  },
});
