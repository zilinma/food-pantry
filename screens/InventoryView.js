import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableOpacity } from 'react-native';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

//firebase.initializeApp(firebaseConfig);

export default class InventoryView extends React.Component {


	constructor(props) {
    super(props);
    name = this.props.navigation.getParam("name", "NO-name");
    name = "Inventory/" + name


    this.tasksRef = firebase.database().ref(name);  // change the name of the pantry with what the user selects before.
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource
    };
  }

  static navigationOptions = {
    headerTitle: "Inventory View"
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', (dataSnapshot) => {
      //console.log(dataSnapshot.val());
      var tasks = [];
      dataSnapshot.forEach((child) => {
        //console.log(child.val());
        tasks.push({
          item_name: child.key,
          item_quantity: child.val(),
        });
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
      
    });
    
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }


  render() {
    return (
      <View style = {styles.appContainer}>
        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
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
        <Text style={styles.quantityText}>{`${props.item_quantity}`}</Text>
    </View>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
  },
  nameText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    fontWight: 'bold',
    //paddingLeft: 20,
    //color: 'red',
  },
  quantityText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    paddingRight: 10,
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
});
