import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  Alert,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { Grid, Button, StyleProvider, Item, Input, Form, Label, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right, Switch } from 'native-base';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import Dimensions from 'Dimensions';
import getTheme from '../../native-base-theme/components';
import colors from '../../native-base-theme/variables/commonColor';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryAddItem extends React.Component {

	constructor(props) {
		super(props);
		this.tasksRef = props.tasksRef;

		this.state = {
		  newItemName: '',
		  newItemAvailability: '',
		  newItemTags:{
		  	Glutenfree:false,
		  	Vegetarian:false,
		  },
		};
	}

	/* add an item to the database */
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
    }).then(()=>{
    	console.log('Item inserted');
    }).catch((error)=>{
    	console.log('error');
    });
 
    this.setState({ newItemName: '' });
    this._dismissPopup();
  }

  /* Hide the Add pop up dialog box*/
  _dismissPopup() {
    this.props.hideAddBox();
    this.setState({ newItemName: '' });
  }

  /* Choose the availability for the item */
  _onSelect(index, value) {
    this.setState({
      newItemAvailability: value,
    });
  }


	render() {
		return (
			<View>
			<Form>
				<Item floatingLabel>
				  <Label>Enter Item Name Here</Label>
				  <Input               
				  value={this.state.newItemName}
				  onChangeText={text => this.setState({ newItemName: text })}/>
				</Item>
			</Form>
				
			<View style={styles.checkBoxes}>
				<Text style={styles.checkAvailabilityTitle}>Check Availability</Text>
				<RadioGroup style={{flexDirection:'row'}}
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
				<Text style={styles.checkAvailabilityTitle}>Check Tags</Text>
				<CheckBox 
				title= 'Vegetarian'
				checked={this.state.newItemTags.Vegetarian}
				onPress={() => 
				  this.setState(prevState => ({
				    newItemTags: {
				        ...prevState.newItemTags,
				        Vegetarian: !this.state.newItemTags.Vegetarian
				    }
				  }))
				}
				/>
				<CheckBox 
				title= 'Glutenfree'
				checked={this.state.newItemTags.Glutenfree}
				onPress={() => 
				  this.setState(prevState => ({
				    newItemTags: {
				        ...prevState.newItemTags,
				        Glutenfree: !this.state.newItemTags.Glutenfree
				    }
				  }))
				}
				/>
			</View>

			<Grid style={styles.container}>
				<Button onPress={this._dismissPopup.bind(this)} style={styles.cancelButton}> 
				  <Text>Cancel</Text>
				</Button>
				<Button onPress={this._additem.bind(this)} style={styles.addButton}> 
				  <Text>Add</Text>
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
