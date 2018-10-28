import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import { Item, Input, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right} from 'native-base';
import InventoryView from './InventoryView';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class InventoryList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditItemDialog : false,
    };
  }

  /* Delete the item from the database */
  _deleteItem(item) {
    //alert('Are you sure you want to delete the item?');
    //console.log(item.tasksRef)
    item.tasksRef.child(item.item_name).remove();
  }

/* Update the item availability for an item in the database */

  _onValueChange(value:string, item) {
    //console.log(item);
    itemRef = item.tasksRef.child(item.item_name);
    itemRef.update({ item_availability: value });
  }

  _renderTags(item) {
    rtn_text = "";
    if(item.tags === undefined){
      return rtn_text;
    } else {
      if (item.tags.Vegetarian === true){
        rtn_text = rtn_text + " (V)";
      }
      if (item.tags.Glutenfree === true){
        rtn_text =  rtn_text + " (G)";
      }
      return rtn_text;
    }
  }

  render(){
    return (
      <ListItem icon>
        <Left>
          {this.props.editButtonClicked && (
                <Icon
                  name="delete"
                  color="maroon"
                  onPress={() =>
                    Alert.alert(
                      'Are you sure you want to delete '+[this.props.item_name]+'?',
                              'Yes/Cancel?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => this._deleteItem(this.props),
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('cancel'),
                          style: 'cancel',
                        },
                      ]
                    )
                  }
                />
              )}
        </Left>

        <Body>
          <Text>
          <Text>{`${this.props.item_name}`}</Text>
          <Text> {" " + this._renderTags(this.props)}</Text>
          </Text>
        </Body>

        <Right>
          {!this.props.editButtonClicked && (
            <Text style={styles.availabilityText}>{`${this.props.item_availability}`}</Text>
          )}
          {this.props.editButtonClicked && (
            <View style={{marginLeft: 0, marginRight: 10}}>
              <Picker
                mode = "dropdown"
                style={{width:100}}
                selectedValue={`${this.props.item_availability}`}
                onValueChange={(e) => 
                  Alert.alert(
                      'Are you sure you want to change the availability for '+[this.props.item_name]+'?',
                      'Yes/Cancel?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => this._onValueChange(e,this.props),
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('cancel'),
                          style: 'cancel',
                        },
                      ]
                    )
                }        
              >
                <Picker.Item label="Low" value="Low"/>
                <Picker.Item label="Medium" value="Medium"/>
                <Picker.Item label="High" value="High"/>
              </Picker>
            </View>
          )}
        </Right>

        <Right>
          {this.props.editButtonClicked && (
            <Icon
              name="edit"
              color="black"
              onPress={() => console.log('Edit item')}
            />
          )}
        </Right>

      </ListItem>
    )
  }
}


const styles = StyleSheet.create({
  availabilityText: {
    marginRight: sideMargin,
  }
});


