import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { primary } from '../util/colors';

import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

export default class SignupPwd extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email'),
    };
  }

  _handleSubmit = (values, bag) => {
    try {
      this.setState({
        pantryName: values.pantryName,
        pantryAddress: values.pantryAddress,
        pantryHour: values.pantryHour,
        pantryPhone: values.pantryContact,
        pwd: values.password,
      });
      this.props.navigation.navigate('SignUpHandle', this.getUserData());
    } catch (error) {
      bag.setSubmitting(false);
      bag.setErrors(error);
    }
  };

  getUserData() {
    return { ...this.state };
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableAutoAutomaticScroll={Platform.OS === 'ios'}>
        <View>
          <Formik
            initialValues={{
              pantryName: '',
              pantryAddress: '',
              pantryHour: '',
              pantryContact: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={this._handleSubmit}
            validationSchema={Yup.object().shape({
              pantryName: Yup.string()
                .required('Pantry Name is required'),
              pantryAddress: Yup.string()
                .min(6)
                .required('Pantry Address is required'),
              pantryHour: Yup.string(),
              pantryContact: Yup.string()
                .min(10, 'Please enter a valid phone number')
                .max(10, 'Please enter a valid phone number'),
              password: Yup.string()
                .min(6)
                .matches(
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){6,20}/,
                  'Password should contain at least one uppercase letter and one number'
                )
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password', null)], 'Password does not match')
                .required('Confirm Password is required'),
            })}
            render={({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              isValid,
              isSubmitting,
            }) => (
              <React.Fragment>
                <Input
                  label="PANTRY NAME"
                  value={values.pantryName}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="pantryName"
                  error={touched.pantryName && errors.pantryName}
                />
                <Input
                  label="PANTRY ADDRESS"
                  value={values.pantryAddress}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="pantryAddress"
                  error={touched.pantryAddress && errors.pantryAddress}
                />
                <Input
                  label="PANTRY HOUR"
                  value={values.pantryHour}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="pantryHour"
                  error={touched.pantryHour && errors.pantryHour}
                />
                <Input
                  label="PANTRY CONTACT"
                  value={values.pantryContact}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="pantryContact"
                  error={touched.pantryContact && errors.pantryContact}
                  keyboardType="numeric"
                />
                <Input
                  label="PASSWORD"
                  autoCapitalize="none"
                  secureTextEntry
                  value={values.password}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="password"
                  error={touched.password && errors.password}
                />
                <Input
                  label="CONFIRM PASSWORD"
                  autoCapitalize="none"
                  secureTextEntry
                  value={values.confirmPassword}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="confirmPassword"
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                <Button
                  buttonStyle={styles.button}
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </React.Fragment>
            )}
          />
          <View style={{ height: 100 }} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: primary,
  },
});
