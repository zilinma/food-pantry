import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 10;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 8;
const HEIGHT = WIDTH;
const RADIUS = WIDTH / 2;

export default class SignupEmail extends Component {
	constructor(props) {
		super(props);
  	this.state = {
  		disabled: true,
  		duplicate: false,
  		firstName: this.props.nav.state.params.firstName,
  		lastName: this.props.nav.state.params.lastName,
  		email: "",
  	};
	}

	checkEmail(email) {
		format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var disabled = !(format.test(email));
		this.setState({ disabled, email });
	}

	async checkDuplicate() {
		var duplicate = false;
		await firebase.auth().fetchProvidersForEmail(this.state.email).then(function(ids) {
			duplicate = (ids.length > 0);
		}).catch(function(error) {
			if (error.code == 'auth/quota-exceeded') {
				// not checking
			}
		});
		this.setState({ duplicate });
		if (!duplicate) {
			this.props.nav.navigate('SignUpPwd', this.getUserData());
		}
	}

	getUserData() {
		return {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content keyboardShouldPersistTaps='always'>
					<Form>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>EMAIL ADDRESS</Label>
							<Input onChangeText={(text) => this.checkEmail(text)} autoCapitalize='none' autoCorrect={false} keyboardType={'email-address'} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Text style={[styles.duplicate, {display: this.state.duplicate ? 'flex' : 'none'}]}>THIS EMAIL IS ALREADY REGISTERED!</Text>
					</Form>
					<TouchableOpacity disabled={this.state.disabled} style={this.state.disabled ? [styles.button, styles.disabled] : styles.button} onPress={() => {this.checkDuplicate()}}>
				    	<FontAwesome name="angle-right" style={styles.next}/>
				    </TouchableOpacity>
				</Content>
			</Container>
		);
	}
}
