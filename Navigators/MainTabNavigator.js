import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PantryListView from '../screens/PantryListView';
import PantryMapView from '../screens/PantryMapView';
//import PantryInfoView from '../screens/PantryInfoView';
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const MainTabs = createBottomTabNavigator(
  {
    PantryListView: PantryListView,
    PantryMapView: PantryMapView,
    //PantryInfoView: PantryInfoView
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

export default MainTabs;

