import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class ListView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> This is one pantry here hehe. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});
