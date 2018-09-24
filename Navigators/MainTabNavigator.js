import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListView from '../screens/PantryListView';
import MapView from '../screens/MapView';
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const MainTabs = createBottomTabNavigator(
  {
    ListView: ListView,
    MapView: MapView,
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

export default MainTabs;

