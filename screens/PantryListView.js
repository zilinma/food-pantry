import React from "react";
import { View, StyleSheet,  ListView, TouchableOpacity} from "react-native";
import { Button, Grid, Container, Header, Text, Content, Card, CardItem, Body, StyleProvider, Left, Right} from 'native-base';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from 'Dimensions';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
//import FontAwesome from '../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';

firebase.initializeApp(firebaseConfig);
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50
const CENTER = DEVICE_HEIGHT/ 2.5
const SKIP = DEVICE_HEIGHT/  1.75
const BUTTON_WIDTH = DEVICE_WIDTH * 0.38;
const BUTTON_HEIGHT = BUTTON_WIDTH / 3;
const BUTTON_RADIUS = BUTTON_HEIGHT / 8;
export default class PantryListView extends React.Component {


  static navigationOptions = {
    headerTitle: "List View"
  }

  constructor() {
    super();
    this.tasksRef = firebase.database().ref("Pantry");
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource
      //allData: []
    };
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        //console.log(child.key)
        console.log(child.val().hour)
        
        tasks.push({
          name: child.val().name,
          address: child.val().address,
          lng: child.val().lng,
          lat: child.val().lat,
          contact: child.val().contact,
          hour: child.val().hour,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
        //allData: allData
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  componentDidUnMount() {

    this.state.dataSource.off('value');

  }

  render() {
    return (
      <StyleProvider style = {getTheme(colors)}>
        <Container>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) =>   
              <Grid style={styles.container}>
                <Button 
                  style={styles.button}
                  onPress={(navigation) => {
                    uid = this.props.navigation('userID', 'no-id')
                    this.props.navigation.navigate("InventoryView",
                    {
                      name: data.name,
                      userID: uid,
                    })
                  }}>
                  <Text style = {styles.text} numberOfLines={1} ellipsizeMode="tail">{`${data.name}`}</Text>
                </Button>
                <Right>
                  <TouchableOpacity
                  onPress={(navigation) => {
                    uid = this.props.navigation.getParam('userID', 'no-id')
                    this.props.navigation.navigate("PantryInfoView", {
                      pantryName: data.name,
                      pantryAddress: data.address,
                      pantryContact: data.contact,
                      pantryHour: data.hour,
                      pantryCoordinates: {longitude: data.lng, latitude: data.lat},
                      userID: uid,
                    })
                  }}>
                    <Ionicons style={styles.fontIcon} active name="ios-information-circle" />
              
                  </TouchableOpacity>
                </Right>
              </Grid>
            }
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            enableEmptySections={true}
          />
        </Container>

    </StyleProvider>

      );

  }
}
/**
const Row = (props) => (
  <View style={styles.container}>
    <Button 
      style={styles.text}
      title={`${props.name}`}
      onPress={(navigation) => {
        this.props.navigation.navigate("PantryInfoView", {
          pantryName: props.name

        })


      }}
    />
  </View>
);
*/
const styles = StyleSheet.create({
  separator: {
    flex: 1,
    backgroundColor: '#8E8E8E',
  },
  container: {
    marginTop: topMargin, 
    marginRight: sideMargin,
    marginLeft: sideMargin,
    backgroundColor: '#3D70c9',
    flexDirection: 'row',
    flex: 1
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
