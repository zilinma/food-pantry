import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Form,
  ListItem,
  Container,
  Header,
  Content,
  Item,
  Input,
  InputGroup,
  Label,
  Spinner,
} from 'native-base';
import { Constants } from 'expo';
import Dimensions from 'Dimensions';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CENTER = DEVICE_HEIGHT / 2.5;
const SKIP = DEVICE_HEIGHT / 1.75;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.25;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;


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
    navigation.state.params.onSelect({...this.state.pantryData});
  

  }
  componentDidMount() {
    this.state.name = this.props.navigation.getParam("name", null)
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
  render() {
    return (
      <Content>
        {console.log('pantry data: ' + JSON.stringify(this.state.pantryData))}
        
        {this.state.pantryData ? (
          <View>
            <Form>
              <Item floatingLabel>
                <Label>Pantry Name</Label>
                <Input
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
              <Item floatingLabel>
                <Label>Pantry Address</Label>
                <Input
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

              <Item floatingLabel>
                <Label>Pantry Hour</Label>
                <Input
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
              <Item floatingLabel>
                <Label>Pantry Contact</Label>
                <Input
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
              <Item floatingLabel>
                <Label>Pantry Checkout Form Link</Label>
                <Input
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
            <ListItem icon noBorder style={styles.item}>
              <Button
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

                  this.goBack();

                }

              }>

                <Text>Submit</Text>
              </Button>

              <Button onPress={() => {
                this.props.navigation.goBack()
              }}>
                <Text>Cancel</Text>
              </Button>

            </ListItem>
          </View>
        ) : (
          <Spinner />
        )}
      </Content>
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
    marginLeft: DEVICE_HEIGHT / 40,
    marginRight: DEVICE_HEIGHT / 40,
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
  },
  map: {
    flex: 1,
    minHeight: DEVICE_HEIGHT / 2,
    margin: DEVICE_HEIGHT / 30,
    marginTop: DEVICE_HEIGHT / 50,
  },
});