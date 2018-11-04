import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  Alert,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { Grid, Button, Item, Input, Form, Label, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right, Switch } from 'native-base';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryEditItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  editedItemName:props.item_name,
		  editedItemAvailability:props.item_availability,
		  editedTags:{
		  	Glutenfree:props.tags.Glutenfree,
		  	Vegetarian:props.tags.Vegetarian,
		  }
		};
	}

	/* save an item update to the database */
	_saveItem() {
	  if (
      this.state.editedItemName === '' ||
      this.state.editedItemAvailability === ''
    ) {
      alert('Need both item name and availability');
      return;
    }
    this.props.tasksRef.child(this.props.item_name).remove();
    itemRef = firebase.database().ref(name+"/"+this.state.editedItemName);
    itemRef.set({
      item_name: this.state.editedItemName,
      item_availability: this.state.editedItemAvailability,
      tags: this.state.editedTags,
    });
    this._dismissPopup();
  }

  /* Hide the Edit pop up dialog box*/
  _dismissPopup() {
    this.props.hideEditBox();
  }

  /* change the availability for the item */
  _onSelect(index, value) {
    this.setState({
      editedItemAvailability: value,
    });
  }

  _getItemAvailabilityIndex(){
  	if (this.state.editedItemAvailability === "Low") {
  		return 0;
  	} else if (this.state.editedItemAvailability === "Medium"){
  		return 1;
  	} else {
  		return 2;
  	}
  }

	render() {
		return (
			<View>
			<Form>
				<Item floatingLabel>
				  <Label>Item Name</Label>
				  <Input               
				  value={this.state.editedItemName}
				  onChangeText={text => this.setState({ editedItemName: text })}/>
				</Item>
			</Form>
			
			<View style={styles.checkBoxes}>
				<Text style={styles.checkAvailabilityTitle}>Change Availability</Text>
				<RadioGroup style={{flexDirection:'row'}}
				selectedIndex= {this._getItemAvailabilityIndex()}
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

			<View style={styles.checkBoxes}>
				<Text style={styles.checkAvailabilityTitle}>Change Tags</Text>
				<CheckBox 
				title= 'Vegetarian'
				checked={this.state.editedTags.Vegetarian}
				onPress={() => 
				  this.setState(prevState => ({
				    editedTags: {
				        ...prevState.editedTags,
				        Vegetarian: !this.state.editedTags.Vegetarian
				    }
				  }))
				}
				/>
				<CheckBox 
				title= 'Glutenfree'
				checked={this.state.editedTags.Glutenfree}
				onPress={() => 
				  this.setState(prevState => ({
				    editedTags: {
				        ...prevState.editedTags,
				        Glutenfree: !this.state.editedTags.Glutenfree
				    }
				  }))
				}
				/>
			</View>

			<Grid style={styles.container}>
				<Button onPress={this._dismissPopup.bind(this)} style={styles.cancelButton}> 
				  <Text>Cancel</Text>
				</Button>
				<Button onPress={this._saveItem.bind(this)} style={styles.addButton}> 
				  <Text>Save</Text>
				</Button>
			</Grid>

			</View>
		)
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
  checkAvailabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }
  
});
