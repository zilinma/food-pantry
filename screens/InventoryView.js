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
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { CheckBox } from 'react-native-elements'
import InventoryList from './InventoryFeatures/InventoryList';
import InventoryAddItem from './InventoryFeatures/InventoryAddItem';
import PantryInfoView from './PantryInfoView';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

//import InventorySearch from './InventoryFeatures/InventorySearch';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const BUTTON_HEIGHT = DEVICE_HEIGHT / 20;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryView extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Pantry List"
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
      showFilterDialog: false,
      filterKeys: [],
      glutenfree: false,
      vegetarian: false,
      /*
      filter:{
        //item_name: "",
        item_availability: ["Medium"],
        
      },*/
    };
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', dataSnapshot => {
      var tasks = [];
      const filterKeys = this.state.filterKeys;
      //console.log("filter keys: " + filterKeys);
      if(filterKeys.length == 0){
        console.log("empty filter keys.");
        dataSnapshot.forEach(child => {

              tasks.push({
                item_name: child.val().item_name,
                item_availability: child.val().item_availability,
                tags: child.val().tags,
              });
        });
      }
      else{  
        // filter out elements without tags in filterKeys
        dataSnapshot.forEach(child => {
          const isTages = Object.keys(child.val().tags);
          const tags =  isTages.filter(tag => child.val().tags[tag]);

          console.log("item: " + child.val().item_name + "; tags: " + JSON.stringify(tags));
          for(var filter in filterKeys){
            //console.log("index of: " + tags.indexOf(filter))
            console.log("filter: " + filterKeys[filter] + "; tags: " + tags);
            if(tags.indexOf(filterKeys[filter]) >= 0){
              tasks.push({
                item_name: child.val().item_name,
                item_availability: child.val().item_availability,
                tags: child.val().tags,
              });
              break;
            }
          }
        });

      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks),
        myData: tasks,
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

  _onSelect(index, value) {
    this.setState({
      editedFilterKeys: value,

    });
    console.log("edited keys: " + this.state.editedFilterKeys)

  }
  _saveFilter(){  
    const keys = []
    if(this.state.glutenfree){
      keys.push("Glutenfree");
    }

    if(this.state.vegetarian){
      keys.push("Vegetarian");
    }

    this.setState({
      showFilterDialog: false,
      filterKeys: keys,
    });
    this.listenForTasks(this.tasksRef);
    console.log("confirm filtered Keys: "  + this.state.filterKeys);
  }
  /*filter the items based on the criteria
  filterList (event) {
    filterCriteria = this.state.filter;
    let filteredItems = this.state.myData.filter(function(item){
      for (var key in filterCriteria){
        //console.log(key)
        if (item[key] === undefined){
          return false;
        } else {
          console.log(filterCriteria[key])
          for (var index in filterCriteria[key]) {
            console.log(index)
            if(item[key] === filterCriteria[key][index]){
              return true;
            }
          }
          return false; 
        }
      }
    });
    console.log(filteredItems);
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredItems),
      });

  }   
  */
    

  render() {
    const userID = this.props.navigation.getParam("userID", "no-id")
    const pantryID = this.props.navigation.getParam("pantryID", "no-pantry-id")
    //const userID = '1234'
    //console.log("userID: "+ userID)
    return (
      <StyleProvider style={getTheme(colors)}>
        <Container tabLabel="pantry item">
        {userID == pantryID ? (
          <View borderBottomWidth={1} borderColor="#D3D3D3" style={styles.headerContainer}>
              <Left>
                <Button transparent onPress={this._toggleEdit}>
                  <Text
                    style={styles.editDoneButton}>
                    {this._renderConditionalText()}
                  </Text>
                </Button>
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
              <Right>
                <Button transparent onPress={() => this.setState({showFilterDialog: true})}>
                  <Text style = {styles.editDoneButton}>Filter</Text>
                </Button>
              </Right>
              
          </View>
          ) :(
          <View borderBottomWidth={1} borderColor="#D3D3D3" style={styles.headerContainer}>
              <Left/>
              <Body/>
              
              <Right>
                <Button transparent onPress={() => this.setState({showFilterDialog: true})}>
                  <Text style = {styles.editDoneButton}>Filter</Text>
                </Button>
              </Right>
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

        <Dialog 
          dialogTitle={<DialogTitle title="Filters" />}
          height={0.65}
          width = {0.9}
          visible={this.state.showFilterDialog}>
          <View style={styles.checkBoxes}>
            <Text style={styles.filterTitle}>Filter items by tags</Text>
            <CheckBox
              checked={this.state.glutenfree}
              title="glutenfree"
              onPress={()=>this.setState({glutenfree: !this.state.glutenfree})}
            />
            <CheckBox
              title="vegetarian"
              checked={this.state.vegetarian}
              onPress={
                ()=>{
                  this.setState({vegetarian: !this.state.vegetarian})
                  console.log(this.state.vegetarian)
              }

            }
            />
            <Button onPress={() => this._saveFilter()}>
              <Text>Confirm</Text>
            </Button>

            <Button onPress={()=> this.setState({showFilterDialog: false})}>
              <Text>Cancel</Text>
            </Button>
          </View>
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
  checkBoxes: {
    margin: DEVICE_WIDTH / 30,
  }
  ,
  bodyContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    height: BUTTON_HEIGHT * 1.5,
    marginBottom: sideMargin,
  },
  items: {
    marginRight: sideMargin * 2, 
  },
  addItemButton: {

    padding: sideMargin / 10,
    height: BUTTON_HEIGHT,
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
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  checkAvailabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
