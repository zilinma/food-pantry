import React from "react";
import { Button, View, StyleSheet, Text, ListView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Card, CardItem, Body} from 'native-base';
//import MainTabNavigator from "../Navigators/MainTabNavigator";
//import AppNavigator from "../App.js"
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default class PantryListView extends React.Component {
  constructor() {
    super();
    this.tasksRef = firebase.database().ref("Pantry");
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource
      //allData: []
    };
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        //console.log(child.key)
        console.log(child.val().name)
        
        tasks.push({
          name: child.val().name,
          address: child.val().address,
          contact: child.val().contact,
          hour: child.val().hour,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
        //allData: allData
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }



  static navigationOptions = {
    headerTitle: "List View"
  }

  render() {
    return (
      <View style = {styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) =>   
            <View style={styles.container}>
              <TouchableOpacity 
                style={styles.button}
                onPress={(navigation) => {
                  uid = this.props.navigation.getParam('uid', 'no-id')
                  this.props.navigation.navigate("PantryInfoView", {
                    pantryName: data.name,
                    pantryAddress: data.address,
                    pantryContact: data.contact,
                    pantryHour: data.pantryHour,
                    pantryUID: uid,
                  })


                }}>
                <Text style = {styles.text}>{`${data.name}`}</Text>
              </TouchableOpacity>
            </View>
}
          enableEmptySections={true}
        />
      </View>
      );

  }
}
/**
const Row = (props) => (
  <View style={styles.container}>
    <Button 
      style={styles.text}
      title={`${props.name}`}
      onPress={(navigation) => {
        this.props.navigation.navigate("PantryInfoView", {
          pantryName: props.name

        })


      }}
    />
  </View>
);
*/
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    //textAlign: "center",
    fontSize: 18
  },  
  button: {
    padding: 10,
    margin: 10
  },

});
