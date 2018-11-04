import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import { Item, Input, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right} from 'native-base';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';

import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';

import InventoryEditItem from './InventoryEditItem';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class InventoryList extends React.Component {

  constructor(props) {
    super(props);

    this.hideEditBox = this._hideEditBox.bind(this);

    this.state = {
      showEditItemDialog : false,
    };
  }

  _hideEditBox() {
    this.setState({ showEditItemDialog: false });
  }

  /* Delete the item from the database */
  _deleteItem(item) {
    item.tasksRef.child(item.item_name).remove();
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
      <View>
      <ListItem icon style={styles.items}>
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
            <Text style={styles.itemName}>{`${this.props.item_name}`}</Text>
            <Text> {" " + this._renderTags(this.props)}</Text>
          </Text>
        </Body>

        <Right>
            <Text style={styles.availabilityText}>{`${this.props.item_availability}`}</Text>      

        </Right>

        <Right>
          {this.props.editButtonClicked && (
              <Icon
                name="edit"
                color="black"
                onPress={() => this.setState({showEditItemDialog: !this.state.showEditItemDialog})}
              />
          )}
        </Right>
        

      </ListItem>

      <Dialog 
        dialogTitle={<DialogTitle title="Edit Item" />}
        height={0.65}
        width = {0.9}
        visible={this.state.showEditItemDialog}>
          <InventoryEditItem {...this.props} hideEditBox = {this.hideEditBox}/>  
      </Dialog>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  availabilityText: {
    color: "black",
  },
  items: {
    marginRight: sideMargin * 2,


  },
  itemName: {
    color: "black",
  },
});


