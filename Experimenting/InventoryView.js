import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,

} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import { Grid, Button,StyleProvider, Item, Input, Form, Label, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right, Switch } from 'native-base';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import Dimensions from 'Dimensions';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import InventoryList from './InventoryList';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryView extends React.Component {

  constructor(props) {
    super(props);
    name = this.props.navigation.getParam("name", "NO-name");
    name = "Inventory/" + name
    this.tasksRef = firebase.database().ref(name);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      inventoryName: name,
      tasksRef: this.tasksRef,
      dataSource: dataSource,
      editItem: false,
      newItemName: '',
      newItemAvailability: '',
      newItemTags:{},
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.getParam("name", "NO-name")}`,
    headerTitleStyle : {alignSelf:'center'}
  })


  listenForTasks(tasksRef) {
    console.log(this.state.tasksRef)
    tasksRef.on('value', dataSnapshot => {
      //console.log(dataSnapshot.val());
      var tasks = [];
      dataSnapshot.forEach(child => {
        //console.log(child.val());
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

  _toggleEdit = () => {
    this.setState(prevState => ({ editItem: !prevState.editItem }));

  };

  _renderConditionalText() {
    if (this.state.editItem) {
      return "Done"
    }
    return "Edit"
  }

  _deleteItem(item) {
    //alert('Are you sure you want to delete the item?');
    //console.log(item.tasksRef)
    item.tasksRef.child(item.item_name).remove();
  }

  _additem() {
    if (
      this.state.newItemName === '' ||
      this.state.newItemAvailability === ''
    ) {
      alert('Need both item name and availability');
      return;
    }
    itemRef = firebase.database().ref(name+"/"+this.state.newItemName);
    itemRef.set({
      item_name: this.state.newItemName,
      item_availability: this.state.newItemAvailability,
      tags: this.state.newItemTags,
    });
    this.setState({ newItemName: '' });
    this._dismissPopup();
  }

  _dismissPopup() {
    this.popupDialog.dismiss();
    this.setState({ newItemName: '' });
  }

  _onSelect(index, value) {
    this.setState({
      newItemAvailability: value,
    });
  }

  _onValueChange(value:string, item) {
    console.log(item);
    itemRef = item.tasksRef + "/" + item.item_name;
    itemRef.update({ item_availability: value });
  }


  render() {
    //const isDisabled = this.props.navigation.getParam("userID", null)
    const isDisabled = '1234'
    console.log(isDisabled)
    return (
    <StyleProvider style = {getTheme(colors)}>
      <Container>
        <View style={{flexDirection: 'row'}}>
          <Left>
          {isDisabled != 'no-id' && (
            <Button transparent onPress={this._toggleEdit}>
              <Text
                style={styles.editDoneButton}>
                {this._renderConditionalText()}
              </Text>
            </Button>
          )}
          </Left>
          <Right style={styles.availabilityTitle}>
          {isDisabled != 'no-id' && (
              <Icon
                name="add-circle"
                size={30}
                onPress={() => this.popupDialog.show()}
              />
          )}
          </Right>
          </View>
          <ListItem icon>
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
            editItem={this.state.editItem} 
            deleteItem = {this._deleteItem}
            tasksRef = {this.state.tasksRef}
            onChange={this._onValueChange}
          />}
          enableEmptySections={true}
        />
               

        <PopupDialog
          dialogTitle={<DialogTitle title="Add New Item" />}
          height={0.5}
          width = {0.9}
          dismissOnTouchOutside={false}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}>
          <Form>
            <Item floatingLabel>
              <Label>Item Name</Label>
              <Input               
              value={this.state.newItemName}
              onChangeText={text => this.setState({ newItemName: text })}/>
            </Item>
          </Form>
          <View style={styles.checkBoxes}>
            <Text style={styles.checkAvailabilityTitle}>Check Availability</Text>
            <RadioGroup
              onSelect={(index, value) => this._onSelect(index, value)}>
              <RadioButton value={'Low'}>
                <Text>Low</Text>
              </RadioButton>

              <RadioButton value={'Medium'}>
                <Text>Medium</Text>
              </RadioButton>

              <RadioButton value={'High'}>
                <Text>High</Text>
              </RadioButton>
            </RadioGroup>
          </View>
          <Grid style={styles.container}>
            <Button onPress={this._dismissPopup.bind(this)} style={styles.cancelButton}> 
              <Text>Cancel</Text>
            </Button>
            <Button onPress={this._additem.bind(this)} style={styles.addButton}> 
              <Text>Add</Text>
            </Button>
          </Grid>
        </PopupDialog>
      </Container>
    </StyleProvider>
    );
  }
}


const styles = StyleSheet.create({
  checkBoxes: {
    margin: DEVICE_WIDTH / 30,
  }
  ,
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  itemnameTitle: {
    fontSize: 20,
    fontWeight: 'bold',


  },
  cancelButton: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 20,
    backgroundColor: 'red',
    justifyContent: 'center',
  },

  addButton: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 20,
    justifyContent: 'center',
  },

  availabilityText: {
    marginRight: sideMargin,
  },

  availabilityTitle: {
    marginRight: sideMargin,
    fontSize: 20,
    fontWeight: 'bold',

  },

  editDoneButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  checkAvailabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',


  }
  
});
