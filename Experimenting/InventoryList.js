import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import { Item, Input, Container,Title, Header, Content, List, ListItem, Picker, Text, Left, Body, Right, Switch } from 'native-base';
import Dimensions from 'Dimensions';
import colors from '../native-base-theme/variables/commonColor';
import InventoryView from './InventoryView';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
sideMargin = DEVICE_WIDTH / 20
topMargin = DEVICE_HEIGHT/ 50


const InventoryList = props => (
  <ListItem icon>
    {console.log(props)}
    <Left>
      {props.editItem && (
            <Icon
              name="delete"
              color="maroon"
              onPress={() =>
                Alert.alert(
                  'Are you sure you want to delete?',
                  'Yes/Cancel?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => props.deleteItem(props),
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
    <Text >{`${props.item_name}`}</Text>
    </Body>
    <Right>
      {!props.editItem && (
        <Text style={styles.availabilityText}>{`${props.item_availability}`}</Text>
      )}
      {props.editItem && (
        <View style={{marginLeft: 0, marginRight: 10}}>
          <Picker
            mode = "dropdown"
            style={{width:100}}
            selectedValue={`${props.item_availability}`}
            onValueChange={(e) => props.onChange(e,props)} 
          >
            <Picker.Item label="Low" value="Low"/>
            <Picker.Item label="Medium" value="Medium"/>
            <Picker.Item label="High" value="High"/>
          </Picker>
        </View>
      )}
    </Right>
  </ListItem>
)

const styles = StyleSheet.create({
  availabilityText: {
    marginRight: sideMargin,
  }
});

export default InventoryList

