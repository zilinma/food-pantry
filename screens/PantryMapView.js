import React from 'react';
import { Platform, Text, View, StyleSheet, ListView } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"

export default class PantryMapView extends React.Component {
  static navigationOptions = {
    headerTitle: "Map View"
  }

  constructor() {
    super();
    this.tasksRef = firebase.database().ref('Pantry');

    this.state = {
      dataSource: [],
      location: null,
      errorMessage: null,
    };
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', dataSnapshot => {
      var pantryList = [];
      dataSnapshot.forEach(child => {
        pantryList.push({
          name: child.val().name,
          address: child.val().address,
          contact: child.val().contact,
          hour: child.val().hour,
        });
      });
      this.setState({ dataSource: pantryList });
    });
  }

  componentDidMount() {
    this._getLocationAsync();
    this.listenForTasks(this.tasksRef);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    // for the current location of the user
    let location = await Location.getCurrentPositionAsync({});
    let currentUserAddress = (await Location.reverseGeocodeAsync(
      location.coords
    ))[0];

    let BaptistChurchPantry = (await Location.geocodeAsync(
      '51 S 3rd St, Lewisburg, PA 17837'
    ))[0];

    let BucknellPantry = (await Location.geocodeAsync(
      '701 Moore Avenue, Lewisburg, PA 17837'
    ))[0];

    let LewisburgPantry = (await Location.geocodeAsync(
      '510 Market St., Lewisburg, PA 17837'
    ))[0];

    this.setState({
      location,
      currentUserAddress,
      pantryLocations: { BaptistChurchPantry, BucknellPantry, LewisburgPantry },
    });
  };

  render() {
    if (!this.state.location) {
      return (
        <View>
          <Text style={styles.paragraph}> {this.state.errorMessage} </Text>
        </View>
      );
    }
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <MapView.Marker
          coordinate={this.state.location.coords}
          title="You are here"
          description={
            this.state.currentUserAddress.name +
            this.state.currentUserAddress.street
          }
          pinColor="blue"
        />
        <MapView.Marker
          coordinate={this.state.pantryLocations.BaptistChurchPantry}
          title="Baptist Church Pantry"
          description={'51 S 3rd St, Lewisburg, PA 17837'}
          pinColor="red"
        />
        <MapView.Marker
          coordinate={this.state.pantryLocations.LewisburgPantry}
          title="Lewisburg Pantry"
          description={"510 Market St., Lewisburg, PA 17837"}
          pinColor="red"
        />
        
        
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
