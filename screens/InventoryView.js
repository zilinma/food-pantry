import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import { Grid, Button,StyleProvider, Item, Input, Form, Label, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right, Switch } from 'native-base';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import Dimensions from 'Dimensions';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';

import InventoryList from './InventoryFeatures/InventoryList';
import InventoryAddItem from './InventoryFeatures/InventoryAddItem';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const BUTTON_HEIGH = DEVICE_HEIGHT / 20;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryView extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.getParam("name", "NO-name")}`,
    headerTitleStyle : {alignSelf:'center'}
  })

  constructor(props) {
    super(props);
    name = this.props.navigation.getParam("name", "NO-name");
    name = "Inventory/" + name
    this.tasksRef = firebase.database().ref(name);

    this.hideAddBox = this._hideAddBox.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      tasksRef: this.tasksRef,
      dataSource: dataSource,
      editButtonClicked: false,
      showAddItemDialog: false,
    };
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          item_name: child.val().item_name,
          item_availability: child.val().item_availability,
          tags: child.val().tags,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks),
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  /* Toggle the Edit and Done button for the Admins */
  _toggleEdit = () => {
    this.setState(prevState => ({ editButtonClicked: !prevState.editButtonClicked }));

  };

  /* Hide the Add Item Popup Dialog box */
  _hideAddBox() {
    this.setState({ showAddItemDialog: false });
  }

  /* Render the "Edit" and "Done" button based on the condition editButtonClicked */
  _renderConditionalText() {
    if (this.state.editButtonClicked) {
      return "Done"
    }
    return "Edit Items"
  }

  render() {
    const userID = this.props.navigation.getParam("userID", "no-id")
    //const userID = '1234'
    //console.log(this.state.showAddItemDialog)
    console.log("userID: "+ userID)
    return (
    <StyleProvider style = {getTheme(colors)}>
      <Container>
      {userID != "no-id" && (
        <View borderBottomWidth={1} borderColor="#D3D3D3" style={styles.headerContainer}>
            <Left>
            {userID != 'no-id' && (
              <Button transparent onPress={this._toggleEdit}>
                <Text
                  style={styles.editDoneButton}>
                  {this._renderConditionalText()}
                </Text>
              </Button>
            )}
            </Left>

            <Body style={styles.bodyContainer}>
                <Button
                  style={styles.addItemButton}
                  onPress={() => this.setState({showAddItemDialog: !this.state.showAddItemDialog})}
                >
                  <Text> + Add Item</Text>

                </Button>

            </Body>
            <Right/>
                        {/*
            <Body>
              <Button transparent onPress={()=>console.log("filter")}>
                <Text> Filter </Text>
              </Button>
            </Body>
            **/}
        </View>
        )
      }
        <ListItem icon style={styles.items}>
          <Left/>
          <Body>
            <Text style= {styles.itemnameTitle}>Item Name</Text>
          </Body>
          
          <Right>
            <Text style={styles.availabilityTitle}>Availability</Text>
          </Right>
        </ListItem>
        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => 
            <InventoryList 
            {...data} 
            editButtonClicked={this.state.editButtonClicked} 
            tasksRef = {this.state.tasksRef}
          />}
          enableEmptySections={true}
        />

        <Dialog 
          dialogTitle={<DialogTitle title="Add New Item" />}
          height={0.65}
          width = {0.9}
          visible={this.state.showAddItemDialog}>
            <InventoryAddItem tasksRef = {this.state.tasksRef} hideAddBox = {this.hideAddBox} />
        </Dialog>

      </Container>
    </StyleProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    height: BUTTON_HEIGH * 1.5,
    marginBottom: sideMargin,
  },
  items: {
    marginRight: sideMargin * 2, 
  },
  addItemButton: {

    padding: sideMargin / 10,
    height: BUTTON_HEIGH,
    justifyContent: 'center',

  }
  ,
  itemnameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
  },
  availabilityText: {
    marginRight: sideMargin,
    color: "black",
  },
  availabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
  },
  editDoneButton: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  checkAvailabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }
  
});
