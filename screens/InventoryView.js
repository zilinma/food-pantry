import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,

} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DropdownMenu from 'react-native-dropdown-menu';
import * as firebase from 'firebase';
import firebaseConfig from 'firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class InventoryView extends React.Component {
  static navigationOptions = {
      headerTitle : "Inventory",
  }

  constructor(props) {
    super(props);
    name = this.props.navigation.getParam("name", "NO-name");
    name = "Inventory/" + name
    this.tasksRef = firebase.database().ref(name);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource,
      editItem: false,
      newItemName: '',
      newItemAvailability: '',
    };
  }

  static navigationOptions = {
    headerTitle: "Inventory View"
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', dataSnapshot => {
      //console.log(dataSnapshot.val());
      var tasks = [];
      dataSnapshot.forEach(child => {
        //console.log(child.val());
        tasks.push({
          item_name: child.key,
          item_quantity: child.val(),
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
      return <Text> Done </Text>;
    }
    return <Text> Edit</Text>;
  }

  _deleteItem(item) {
    //alert('Are you sure you want to delete the item?');
    this.tasksRef.child(item.item_name).remove();
  }

  _additem() {
    if (
      this.state.newItemName === '' ||
      this.state.newItemAvailability === ''
    ) {
      alert('Need both item name and availability');
      return;
    }
    this.tasksRef.update({
      [this.state.newItemName]: this.state.newItemAvailability,
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


  render() {
    const isDisabled = this.props.navigation.getParam("pantryUID", null)
    console.log(isDisabled)
    return (
      <View style={styles.appContainer}>
        {isDisabled != 'no-id' && (
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text
              style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold' }}
              onPress={this._toggleEdit}>
              {this._renderConditionalText()}
            </Text>
          </TouchableOpacity>
        )}
        // Show add button only for the admin view
        {isDisabled != 'no-id' && (
          <View>
            <Icon
              name="add-circle"
              color="maroon"
              size={30}
              onPress={() => this.popupDialog.show()}
            />
          </View>
        )}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.topText}>Item Name</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.topText}>Availability</Text>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => (
            <View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  {this.state.editItem && (
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
                              onPress: () => this._deleteItem(data),
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
                  <Text style={styles.text}>{`${data.item_name}`}</Text>
                </View>

                <View style={styles.rowItem}>
                  <Text style={styles.text}>{`${data.item_availability}`}</Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          )}
          enableEmptySections={true}
        />
        // pop up dialog box to add new item
        <PopupDialog
          dialogTitle={<DialogTitle title="Add New Item" />}
          height={0.5}
          dismissOnTouchOutside={false}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}>
          // View inside the popup dialog
          <View style={styles.rowItem}>
            <TextInput
              value={this.state.newItemName}
              style={styles.textEdit}
              onChangeText={text => this.setState({ newItemName: text })}
              placeholder="Item Name"
            />
          </View>
          <View style={styles.separator} />
          <Text style={styles.textEdit}> Check Availability </Text>
          // Radio buttons for availability
          <RadioGroup
            //selectedIndex={}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 100,
            }}>
            <Button title="Cancel" onPress={this._dismissPopup.bind(this)} />
            <Button title="Add" onPress={this._additem.bind(this)} />
          </View>
        </PopupDialog>
      </View>
    );
  }
}

/*
const Row = props => (
  <View>
    <View style={styles.row}>
      <Text style={styles.text}>{`${props.item_name}`}</Text>
      <View style={styles.rowItem}>
        {this.state.editItem && (
          <TouchableHighlight
            style={styles.button}
             onPress={() => this.addTodo()} underlayColor="#dddddd">
            <Text style={styles.btnText}> - </Text>
          </TouchableHighlight>
        )}

        <Text style={styles.text}>{`${props.item_availability}`}</Text>

        <TouchableHighlight
          style={styles.button}
           onPress={() => this.addTodo()} underlayColor="#dddddd">
          <Text style={styles.btnText}> + </Text>
        </TouchableHighlight>
      </View>
    </View>
    <View style={styles.separator} />
  </View>
);
*/

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 60,
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'maroon',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 20,
  },
  textEdit: {
    fontSize: 20,
    padding: 15,
    height: 60,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  button: {
    height: 36,
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 3,
  },
});