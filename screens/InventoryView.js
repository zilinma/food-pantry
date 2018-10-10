import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);

export default class InventoryView extends React.Component {
  static navigationOptions = {
      headerTitle : "Inventory",
  }

  constructor(props) {
    super(props);
    this.tasksRef = firebase.database().ref('Inventory/Lewisburg Pantry');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource,
      editItem: false,
    };
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editItem: !prevState.editItem }));
  };

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
      console.log(tasks[1]);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks),
      });
    });
  }

  renderConditionalText() {
    if (this.state.editItem) {
      return <Text> Done </Text>;
    }
    return <Text> Edit</Text>;
  }

  decreaseItemCount(item){
    item.item_quantity--;
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
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

        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => (
            <View>
              <View style={styles.row}>
                <Text style={styles.nameText}>{`${data.item_name}`}</Text>
                <View style={styles.quantityContainer}>
                  {this.state.editItem && (
                    <TouchableHighlight
                      style={styles.button}
                      onPress={() => this.decreaseItemCount(data)} underlayColor="#dddddd">
                      <Text style={styles.btnText}> - </Text>
                    </TouchableHighlight>
                  )}

                  <Text style={styles.quantityText}>{`${
                    data.item_quantity
                  }`}</Text>

                  {this.state.editItem && (
                    <TouchableHighlight
                      style={styles.button}
                      /* onPress={() => this.addTodo()}*/ underlayColor="#dddddd">
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
      <View style={styles.quantityContainer}>
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
    //paddingTop: Constants.statusBarHeight,
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
  quantityContainer: {
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
});
