import React from 'react';
import {
  Platform,
  ScrollView,
  View,
  StyleSheet,
  ListView,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
  Grid,
  Container,
  Header,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  StyleProvider,
  Left,
  Right,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';
import { PROVIDER_GOOGLE } from 'expo';
import { primary } from '../util/colors';
//import MapView from 'react-native-maps';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
const { width, height } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const sideMargin = DEVICE_WIDTH / 20;
const topMargin = DEVICE_HEIGHT / 50;
const CENTER = DEVICE_HEIGHT / 2.5;
const SKIP = DEVICE_HEIGHT / 1.75;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.38;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;
const CARD_HEIGHT = height / 8;
const CARD_WIDTH = width * 0.8;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class screens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: {
          latitude: 40.956355,
          longitude: -76.88449,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      pantries: [],
      error: null,
    };
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // add current and pantry locations
    navigator.geolocation.getCurrentPosition(
      position => {
        //console.log("wokeeey");
        const startPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        this.setState({
          startPoint: startPoint,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
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
          console.log('pantry: ' + JSON.stringify(this.state.pantries[index]));
          const coordinate = {
            longitude: this.state.pantries[index].lng,
            latitude: this.state.pantries[index].lat,
          };
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.startPoint.latitudeDelta,
              longitudeDelta: this.state.startPoint.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    if (this.state.pantries) {
      const interpolations = this.state.pantries.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          (index + 1) * CARD_WIDTH,
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: 'clamp',
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: 'clamp',
        });
        return { scale, opacity };
      });
      return (
        <Container>
          <View style={styles.container}>
            <MapView style={styles.mapcontainer}
              ref={map => (this.map = map)}
              initialRegion={this.state.startPoint}
              >
              <MapView.Marker coordinate={this.state.startPoint}>
                <Text>You are here.</Text>
              </MapView.Marker>
              {this.state.pantries.map((marker, index) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale,
                    },
                  ],
                };
                const opacityStyle = {
                  opacity: interpolations[index].opacity,
                };
                return (
                  <MapView.Marker
                    key={index}
                    coordinate={{
                      longitude: marker.lng,
                      latitude: marker.lat,
                    }}
                    title={this.state.pantries.name}
                    description={this.state.pantries.address}
                    >
                    {/*console.log(JSON.stringify(marker))*/}
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                        <Icon active 
                          name='corn'
                          size={40}
                          
                          />
                    </Animated.View>
                  
                  </MapView.Marker>
                );
              })}
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
                <View style={styles.card} key={index}>
                  <Grid>
                    <Left>
                      <Button
                        style={styles.button}
                        onPress={navigation => {
                          const uid = this.props.navigation.getParam(
                            'userID',
                            'no-id'
                          );
                          console.log('uid: ' + uid);
                          this.props.navigation.navigate('infoInventoryTab', {
                            name: marker.name,
                            pantryName: marker.name,
                            pantryID: marker.uid,
                            userID: uid,
                      });
                        }}>
                        <Text
                          style={styles.title}
                          numberOfLines={1}
                          ellipsizeMode="tail">{`${marker.name}`}</Text>
                      </Button>
                    </Left>
                    <Right>
                      <TouchableOpacity
                        onPress={navigation => {
                          const uid = this.props.navigation.getParam(
                            'userID',
                            'no-id'
                          );
                          this.props.navigation.navigate('infoInventoryTab', {
                            name: marker.name,
                            pantryName: marker.name,
                            pantryID: marker.uid,
                            userID: uid,
                      });
                        }}>
                        <Ionicons
                          style={styles.fontIcon}
                          active
                          name="ios-information-circle"
                        />
                      </TouchableOpacity>
                    </Right>
                  </Grid>

                </View>
              ))}
            </Animated.ScrollView>
          </View>
        </Container>
      );
    } else {
      return(
        <View style={styles.loadingContainer}>
          <Spinner style={styles.spinnerStyle} blue/>;
        </View>
        ) ;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  button: {
    backgroundColor: '#FFFFFFFF',
    elevation:0,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  title: {
    color: '#2EBDD5',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(46, 189, 213, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(46, 189, 213, 0.5)',
  },
  fontIcon: {
    color: '#2EBDD5',
    fontSize: 30,
    marginRight: sideMargin,
  },
});
