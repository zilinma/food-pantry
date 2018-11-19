import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Constants, Location } from 'expo';
import Dimensions from 'Dimensions';

import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../AdminLogins/Input';
import { primary } from '../util/colors';

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pantryData: null,
      name: null,
    };
  }

  componentDidMount() {
    this.state.name = this.props.navigation.getParam('name', null);
    firebase
      .database()
      .ref('Pantry/' + this.state.name)
      .once('value')
      .then(snapshot => {
        //console.log('snapshots: ' + JSON.stringify(snapshot));
        this.setState({
          pantryData: snapshot.val(),
        });
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  }

  _handleSubmit = values => {
    if (values.pantryForm === undefined) {
      values.pantryForm = ''
    }
    this.setState({
      pantryData: {
        ...this.state.pantryData,
        name: values.pantryName,
        address: values.pantryAddress,
        hour: values.pantryHour,
        contact: values.pantryContact,
        checkout: values.pantryForm,
      },
    });
    firebase
      .database()
      .ref('Pantry/' + this.state.name)
      .remove();
    firebase
      .database()
      .ref('Pantry/' + this.state.pantryData.name)
      .set({ ...this.state.pantryData });
    this.getGeoCode();
    this.goBack();
  };

  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect({ ...this.state.pantryData });
  }

  async getGeoCode() {
    let location = (await Location.geocodeAsync(
      this.state.pantryData.address
    ))[0];
    console.log(location);
    var latitude = location.latitude;
    var longitude = location.longitude;
    firebase
      .database()
      .ref('Pantry/' + this.state.pantryData.name)
      .update({
        lat: latitude,
        lng: longitude,
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={Platform.OS === 'ios'}>
        <View>
          {console.log('pantry data: ' + JSON.stringify(this.state.pantryData))}

          {this.state.pantryData ? (
            <View>
              <Formik
                initialValues={{
                  pantryName: this.state.pantryData.name,
                  pantryAddress: this.state.pantryData.address,
                  pantryHour: this.state.pantryData.hour,
                  pantryContact: this.state.pantryData.contact,
                  pantryForm: this.state.pantryData.checkout,
                }}
                onSubmit={this._handleSubmit}
                validationSchema={Yup.object().shape({
                  pantryName: Yup.string().required('Pantry Name is required'),
                  pantryAddress: Yup.string()
                    .min(6)
                    .required('Pantry Address is required'),
                  pantryHour: Yup.string(),
                  pantryContact: Yup.string()
                    .min(10, 'Please enter a valid phone number')
                    .max(10, 'Please enter a valid phone number'),
                  pantryForm: Yup.string(),
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
                      label="PANTRY GOOGLE FORM LINK"
                      autoCapitalize="none"
                      value={values.pantryForm}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="pantryForm"
                      error={touched.pantryForm && errors.pantryForm}
                    />
                    <Button
                      buttonStyle={styles.button}
                      title="Save"
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                    <Button
                      buttonStyle={styles.cancelButton}
                      title="Cancel"
                      onPress={() => {this.props.navigation.goBack()}}
                      loading={isSubmitting}
                    />
                  </React.Fragment>
                )}
              />
              <View style={{ height: 100 }} />
            </View>
          ) : (
            <Spinner />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: primary,
  },
  cancelButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ff6961',
  },
});
