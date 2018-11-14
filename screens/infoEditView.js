import * as React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {
  Button,
  Text,
  Form,
  Container,
  Header,
  Content,
  Item,
  Input,
  InputGroup,
  Label,
  Spinner,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Constants , Location} from 'expo';
import Dimensions from 'Dimensions';
import { primary } from '../util/colors';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT / 2.5;
const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 15;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 4;
const HEIGHT = WIDTH / 3;
const RADIUS = WIDTH / 2;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pantryData: null,
      name: null,
    };
  }
  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect({ ...this.state.pantryData });
  }
  componentDidMount() {
    this.state.name = this.props.navigation.getParam('name', null);
    firebase
      .database()
      .ref('Pantry/' + this.state.name)
      .once('value')
      .then(snapshot => {
        //console.log('snapshots: ' + JSON.stringify(snapshot));
        this.setState({
          pantryData: snapshot.val(),
        });
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  }

  async getGeoCode(){
    let location = (await Location.geocodeAsync(this.state.pantryData.address))[0];
    console.log(location);
    var latitude = location.latitude;
    var longitude = location.longitude;
    firebase
      .database()
      .ref('Pantry/' + this.state.pantryData.name)
      .update({
        lat:latitude,
        lng:longitude,
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={Platform.OS === 'ios'}>
        <View>
          {/*console.log('pantry data: ' + JSON.stringify(this.state.pantryData))*/}

          {this.state.pantryData ? (
            <View>
              <Form>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Pantry Name</Label>
                  <Input
                    style={styles.input}
                    value={this.state.pantryData.name}
                    onChangeText={text => {
                      this.setState({
                        pantryData: {
                          ...this.state.pantryData,
                          name: text,
                        },
                      });
                    }}
                  />
                </Item>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Pantry Address</Label>
                  <Input
                    style={styles.input}
                    value={this.state.pantryData.address}
                    onChangeText={text => {
                      this.setState({
                        pantryData: {
                          ...this.state.pantryData,
                          address: text,
                        },
                      });
                    }}
                  />
                </Item>

                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Pantry Hour</Label>
                  <Input
                    style={styles.input}
                    value={this.state.pantryData.hour}
                    onChangeText={text => {
                      this.setState({
                        pantryData: {
                          ...this.state.pantryData,
                          hour: text,
                        },
                      });
                    }}
                  />
                </Item>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Pantry Contact</Label>
                  <Input
                    style={styles.input}
                    value={this.state.pantryData.contact}
                    onChangeText={text => {
                      this.setState({
                        pantryData: {
                          ...this.state.pantryData,
                          contact: text,
                        },
                      });
                    }}
                  />
                </Item>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Pantry Checkout Form Link</Label>
                  <Input
                    style={styles.input}
                    value={this.state.pantryData.checkout}
                    onChangeText={text => {
                      this.setState({
                        pantryData: {
                          ...this.state.pantryData,
                          checkout: text,
                        },
                      });
                    }}
                  />
                </Item>
              </Form>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    console.log(
                      'data after modification: ' +
                        JSON.stringify(this.state.pantryData)
                    );

                    firebase
                      .database()
                      .ref('Pantry/' + this.state.name)
                      .remove();
                    firebase
                      .database()
                      .ref('Pantry/' + this.state.pantryData.name)
                      .set({
                        ...this.state.pantryData,
                      });

                    this.getGeoCode();
                    this.goBack();
                  }}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          ) : (
            <Spinner />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  label: {
    color: primary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: DEVICE_HEIGHT * 0.02,
    marginBottom: DEVICE_HEIGHT * 0.01,
  },
  input: {
    height: INPUT_HEIGHT,
    marginLeft: DEVICE_HEIGHT * 0.02,
  },
  item: {
    marginBottom: INPUT_HEIGHT/3,
    paddingLeft: 0,
    marginLeft: 0,
    paddingBottom: 0,
  },
  buttonRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft: DEVICE_WIDTH * 0.2,
    marginRight: DEVICE_WIDTH * 0.2,
  },
  button: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
