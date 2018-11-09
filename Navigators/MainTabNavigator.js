import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PantryListView from '../screens/PantryListView';
import PantryMapView from '../screens/PantryMapView';
import Icon from 'react-native-vector-icons/FontAwesome';
//import PantryInfoView from '../screens/PantryInfoView';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";

const MainTabs = createBottomTabNavigator(
  {
    PantryListView: {
      screen: PantryListView,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon active 
            name="list-ul"
            size={20}
            color={tintColor}
            style={
              {
                marginTop: 7,
              }

            }/>
            ),
        tabBarLabel: ({tintColor}) => (<Text style={{ fontSize: 10, marginBottom: 7, alignSelf:'center' }} color={tintColor}>Pantry List</Text>),


      }),

    },
    PantryMapView: {
      screen: PantryMapView,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon active 
            name="map-marker"
            size={20}
            color={tintColor}
            style={
              {
                marginTop: 7,
              }

            }/>
            ),
        tabBarLabel: ({tintColor}) => (
          <Text style={{ fontSize: 10, marginBottom: 7, alignSelf:'center' }}  color={tintColor} >Map</Text>),

      }),

    },
    //PantryInfoView: PantryInfoView
  },
  {
    tabBarOptions: {

      inactiveTintColor: "rgba(10, 42, 102, 0.3)",
      activeTintColor: 'rgb(10, 42, 102)',
      activeBackgroundColor: "#F6F7F7",
      inactiveBackgroundColor: "#F6F7F7",

    }
  }
);


export default MainTabs;

