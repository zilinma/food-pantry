
// This is a helper class for making the forms. 

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  FormInput,
  FormValidationMessage,
  FormLabel,
} from 'react-native-elements';
import { primary} from '../util/colors';

class Input extends PureComponent {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { label, error, ...rest } = this.props;
    return (
      <View style={styles.root}>
        <FormLabel labelStyle={styles.label}>{label}</FormLabel>
        <FormInput inputStyle={styles.input}
          onChangeText={this._handleChange}
          onBlur={this._handleTouch}
          placeholder={label}
          autoCorrect={false} 
          keyboardAppearance={'light'}
          {...rest}
        />
        {error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    margin: 0,
    //alignSelf: 'center',
  },
  label: {
    color: primary,
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    color: 'black',
    fontSize: 14,
    marginLeft:3,
  },
});

export default Input;