import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  ListView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Button, Grid, Container, Header, Text, Content, Card, CardItem, Body, StyleProvider, Left, Right} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';
import { PROVIDER_GOOGLE } from 'expo';
//import MapView from 'react-native-maps';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
const { width, height } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const sideMargin = DEVICE_WIDTH / 20
const topMargin = DEVICE_HEIGHT/ 50
const CENTER = DEVICE_HEIGHT/ 2.5
const SKIP = DEVICE_HEIGHT/  1.75
const BUTTON_WIDTH = DEVICE_WIDTH * 0.38;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.8;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const mapStyle = [
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#e0efef',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#1900ff',
      },
      {
        color: '#c0e8e8',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 100,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: 700,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#7dcdcd',
      },
    ],
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: null,
      pantries: null,
      error: null,
    };
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
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
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
    );
    //console.log('firebase');
    firebase
      .database()
      .ref('Pantry')
      .once('value')
      .then(snapshot => {
        //console.log('snapshots: ' + JSON.stringify(snapshot));
        this.setState({
          pantries: Object.values(snapshot.val()),
        });
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.pantries.length) {
        index = this.state.pantries.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.pantries[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    console.log('wooooo');
    //console.log(JSON.stringify(this.state.pantries));

    return (
      <View style={styles.container}>
        {this.state.startPoint && this.state.pantries ? (
          <View>
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={map => (this.map = map)}
              style={{ minHeight: height/ 2 }}
              initialRegion={{
                ...this.state.startPoint,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              customMapStyle={mapStyle}>
              <MapView.Marker
                coordinate={{
                  ...this.state.startPoint,
                }}
                title={'you are here'}
              />
              {this.state.pantries.map((marker, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    longitude: marker.lng,
                    latitude: marker.lat,
                  }}
                  title={marker.name}
                  description={marker.address}
                />
              ))}
            </MapView>
            <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}>
              {this.state.pantries.map((marker, index) => (
<Grid style={styles.containerButtons}>
                <Button 
                  style={styles.button}
                  onPress={(navigation) => {
                    const uid = this.props.navigation.getParam('userID', 'no-id')
                    console.log("uid: " + uid)
                    this.props.navigation.navigate("InventoryView",
                    {
                      name: marker.name,
                      userID: uid,
                    })
                  }}>
                  <Text style = {styles.text} numberOfLines={1} ellipsizeMode="tail">{`${marker.name}`}</Text>
                </Button>
                <Right>
                  <TouchableOpacity
                  onPress={(navigation) => {
                    const uid = this.props.navigation.getParam('userID', 'no-id')
                    this.props.navigation.navigate("PantryInfoView", {
                      pantryName: marker.name,
                      pantryAddress: marker.address,
                      pantryContact: marker.contact,
                      pantryHour: marker.hour,
                      longitude: marker.lng, 
                      latitude: marker.lat,
                      userID: uid,
                    })
                  }}>
                    <Ionicons style={styles.fontIcon} active name="ios-information-circle" />
              
                  </TouchableOpacity>
                </Right>
              </Grid>
              ))}
            </Animated.ScrollView>
          </View>
        ) : (
          <Text>Loading......</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerButtons:{
    marginTop: topMargin, 
    marginRight: sideMargin,
    marginLeft: sideMargin,
    backgroundColor: '#3D70c9',
    flexDirection: 'row',
    flex: 1,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  text: {
    //textAlign: "center",
    color: "#FAFAFA",
    fontSize: 18,
    flexWrap: 'wrap'
  },  
  button: {
    borderRadius:BUTTON_RADIUS,
    margin: 10,
    elevation:0,
    width: DEVICE_WIDTH * 0.6,
  },
  fontIcon: {
    color: '#FAFAFA',
    fontSize: 30,
    marginRight: sideMargin,
  }
});
