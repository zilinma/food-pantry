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
} from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

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
      dataSource: dataSource,
      editItem: false,
      newItemName: '',
      newItemQuantity: '',
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

  toggleEdit = () => {
    this.setState(prevState => ({ editItem: !prevState.editItem }));
  };

  renderConditionalText() {
    if (this.state.editItem) {
      return <Text> Done </Text>;
    }
    return <Text> Edit</Text>;
  }

  decreaseItemCount(item) {
    this.tasksRef.update({ [item.item_name]: item.item_quantity - 1 });
  }

  increaseItemCount(item) {
    this.tasksRef.update({ [item.item_name]: item.item_quantity + 1 });
  }

  deleteItem(item) {
    alert('Are you sure you want to delete the item?');
    this.tasksRef.child(item.item_name).remove();
  }

  addItem() {
    if (this.state.newItemName === '' || this.state.newItemQuantity === '') {
      alert('Fill both items');
      return;
    }
    this.tasksRef.update({
      [this.state.newItemName]: this.state.newItemQuantity,
    });
    this.setState({ newItemName: '', newItemQuantity: '' });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity style={{ paddingVertical: 10 }}>
          <Text
            style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold' }}
            onPress={this.toggleEdit}>
            {this.renderConditionalText()}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={styles.topText}>Item Name</Text>
          <Text style={styles.topText}>Quantity</Text>
        </View>

        {this.state.editItem && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <TextInput
              value={this.state.newItemName}
              style={styles.textEdit}
              onChangeText={text => this.setState({ newItemName: text })}
              placeholder="Item Name"
            />
            <TextInput
              value={this.state.newItemQuantity}
              style={styles.textEdit}
              onChangeText={text => this.setState({ newItemQuantity: text })}
              placeholder="Item Quantity"
            />
            <Button
              title="Add"
              hideShadow={true}
              //buttonColor = "rgba(231,76,60,1)"
              onPress={this.addItem.bind(this)}
            />
          </View>
        )}

        {this.state.editItem && <View style={styles.separator} />}

        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => (
            <View>
              <View style={styles.row}>
                <View style={styles.rowContainer}>
                  {this.state.editItem && (
                    <TouchableHighlight onPress={() => this.deleteItem(data)}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          paddingHorizontal: 5,
                          color: 'red',
                        }}>
                        {' '}
                        -{' '}
                      </Text>
                    </TouchableHighlight>
                  )}
                  <Text style={styles.nameText}>{`${data.item_name}`}</Text>
                </View>

                <View style={styles.rowContainer}>
                  {this.state.editItem && (
                    <TouchableHighlight
                      style={styles.button}
                      onPress={() => this.decreaseItemCount(data)}>
                      <Text style={styles.btnText}> - </Text>
                    </TouchableHighlight>
                  )}

                  <Text style={styles.quantityText}>{`${
                    data.item_quantity
                  }`}</Text>

                  {this.state.editItem && (
                    <TouchableHighlight
                      style={styles.button}
                      onPress={() => this.increaseItemCount(data)}>
                      <Text style={styles.btnText}> + </Text>
                    </TouchableHighlight>
                  )}
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          )}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const Row = props => (
  <View>
    <View style={styles.row}>
      <Text style={styles.nameText}>{`${props.item_name}`}</Text>
      <View style={styles.rowContainer}>
        {this.state.editItem && (
          <TouchableHighlight
            style={styles.button}
            /* onPress={() => this.addTodo()}*/ underlayColor="#dddddd">
            <Text style={styles.btnText}> - </Text>
          </TouchableHighlight>
        )}

        <Text style={styles.quantityText}>{`${props.item_quantity}`}</Text>

        <TouchableHighlight
          style={styles.button}
          /* onPress={() => this.addTodo()}*/ underlayColor="#dddddd">
          <Text style={styles.btnText}> + </Text>
        </TouchableHighlight>
      </View>
    </View>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 50,
    paddingVertical: 5,
    color: 'maroon',
    textAlign: 'center',
  },
  nameText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
  },
  quantityText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
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
    color: '#FFFFFF',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 3,
  },
  textEdit: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
});
