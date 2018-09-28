import React from 'react';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';

import * as firebase from 'firebase';
import firebaseConfig from 'firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default class InventoryView extends React.Component {
	
	constructor() {
    super();
    this.tasksRef = firebase.database().ref("Inventory/Lewisburg Pantry");  // change the name of the pantry with what the user selects before.
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource
    };
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

  static navigationOptions = {
    headerTitle: "Inventory View"
  }

  render() {
    return (
      <View style = {styles.container}>
        <Button
          title="Inventory View"
          //onPress={
           // () => this.props.navigation.navigate("Login")
         // }
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          enableEmptySections={true}
        />
      </View>
      );

  }
}

const Row = (props) => (
  <View style={styles.container}>
    <Text>
      <Text style={styles.text}> {`${props.item_name}`} </Text>
      <Text style = {{textAlign: 'right'}}>  {`${props.item_quantity}`}  </Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});



    //*/ 
    /*0
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Text>{`${props.item_name}`}</Text>
      </View>
    </View>
    */ 