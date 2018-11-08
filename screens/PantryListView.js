import React from 'react';
import { View, StyleSheet, ListView, TouchableOpacity, ScrollView } from 'react-native';
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
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from 'Dimensions';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const sideMargin = DEVICE_WIDTH / 20;
const topMargin = DEVICE_HEIGHT / 50;
const CENTER = DEVICE_HEIGHT / 2.5;
const SKIP = DEVICE_HEIGHT / 1.75;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.38;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;
export default class PantryListView extends React.Component {

  constructor() {
    super();

    this.state = {
      pantries: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('Pantry')
      .once('value')
      .then(snapshot => {
        this.setState({
          pantries: Object.values(snapshot.val()),
        });
      })
      .catch(error => {
        console.log('error ', error);
      });
  }

  render() {
    if (this.state.pantries) {
      console.log("pantried loaded: " + JSON.stringify(this.state.pantries));
      return (
        <StyleProvider style={getTheme(colors)}>
          <Container>
          <ScrollView>
            {this.state.pantries.map(data => {
              return(
              <Grid style={styles.container}>
                <Button
                  style={styles.button}
                  onPress={navigation => {
                    const uid = this.props.navigation.getParam(
                      'userID',
                      'no-id'
                    );
                    console.log('uid: ' + uid);
                    this.props.navigation.navigate('InventoryView', {
                      name: data.name,
                      userID: uid,
                    });
                  }}>
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail">{`${data.name}`}</Text>
                </Button>
                <Right>
                  <TouchableOpacity
                    onPress={navigation => {
                      const uid = this.props.navigation.getParam(
                        'userID',
                        'no-id'
                      );
                      this.props.navigation.navigate('PantryInfoView', {
                        pantryName: data.name,
                        pantryAddress: data.address,
                        pantryContact: data.contact,
                        pantryHour: data.hour,
                        pantryCheckout: data.checkout,
                        longitude: data.lng,
                        latitude: data.lat,
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
              </Grid>);
            })}
            </ScrollView>
          </Container>
        </StyleProvider>
      );
    } else {
      console.log("spinner: "+ this.state.pantries)
      return(
        <View style={styles.loadingContainer}>
          <Spinner style={styles.spinnerStyle} blue/>;
        </View>
        ) ;
    }
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    backgroundColor: '#8E8E8E',
  },
  container: {
    marginTop: topMargin,
    marginRight: sideMargin,
    marginLeft: sideMargin,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    flex: 1,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
  },
  text: {
    color: '#0a2a66',
    fontSize: 18,
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: BUTTON_RADIUS,
    margin: 10,
    elevation: 0,
    width: DEVICE_WIDTH * 0.6,
    backgroundColor: '#FAFAFA',
  },
  fontIcon: {
    color: '#0a2a66',
    fontSize: 30,
    marginRight: sideMargin,
  },
});
