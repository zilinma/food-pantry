import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import {primary} from '../util/colors';
import firebase from 'firebase';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = DEVICE_WIDTH * 0.1
const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 10;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 5;
const HEIGHT = WIDTH/2;
const RADIUS = WIDTH / 2;

export default class SignupEmail extends Component {
	static navigationOptions = {
		header: null


	}

	constructor(props) {
		super(props);
	  	this.state = {
	  		disabled: true,
	  		duplicate: false,
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
		await firebase.auth().fetchSignInMethodsForEmail(this.state.email).then(function(ids) {
			duplicate = (ids.length > 0);
		}).catch(function(error) {
			if (error.code == 'auth/quota-exceeded') {
				// not checking
			}
		});
		this.setState({ duplicate });
		console.log("duplicate: " + this.state.duplicate)
		if (!duplicate) {
			this.props.navigation.navigate('signUpPwd', this.getUserData());
		}
	}

	getUserData() {
		return {
			email: this.state.email,
			pantryName: this.state.pantryName,
		};
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

					<View>
		    			<TouchableOpacity disabled={this.state.disabled} style={this.state.disabled ? [styles.button, styles.disabled] : styles.button} onPress={() => {this.checkDuplicate()}}>
					    	<Text style={styles.buttonText}>Next</Text>
					    </TouchableOpacity>
					</View>					
				</Content>
			</Container>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 8,
	},
	label: {
		color: primary,
		fontSize: 12,
		fontWeight: "700",
		marginLeft: DEVICE_WIDTH * 0.02,
		marginBottom: DEVICE_HEIGHT * 0.01,
	},
	input: {
		height: INPUT_HEIGHT,
		color: "black",
		marginLeft: DEVICE_WIDTH * 0.02,
	},
	item: {
		marginBottom: INPUT_HEIGHT/3,
		paddingLeft: 0,
		marginLeft: 0,
		paddingBottom: 0,
	},
	button: {
		width: WIDTH,
		height: HEIGHT,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		borderRadius: 2,
		backgroundColor: primary,
	},
	disabled: {
		width: WIDTH,
		height: HEIGHT,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		borderRadius: 2,
		backgroundColor: 'gray',
	},
	buttonText: {
		color: "white",
		fontWeight: 'bold',
	},
});