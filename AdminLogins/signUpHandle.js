import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
//import { primary, white, transparentWhite } from '../../utils/colors';

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

export default class SignupPwd extends Component {
	constructor(props) {
		super(props);
  	this.state = {
  		disabled: true,
  		duplicate: false,
  		pantryName: this.props.navigation.getParam("pantryName")
  		email: this.props.navigation.state.params.email,
  		pwd: this.props.navigation.state.params.pwd,
  		handle: "",
  	};
	}

	changeState(disabled, duplicate, handle) {
		this.setState({
			disabled: disabled,
			duplicate: duplicate,
			handle: handle,
		})
	}

	async checkHandle(handle) {
		var allowed = (handle.length >= 5) && (handle.length <= 20) && (/^[a-z0-9]+$/.test(handle));
		var duplicate;

		var handlesRef = firebase.database().ref('users/handles');
		await handlesRef.child(handle).once("value", function(snapshot) {
	  	if (snapshot.val()) {
	  		duplicate = true;
	  	} else {
	  		duplicate = false;
	  	}
		});

		this.changeState(((allowed && !duplicate) ? false : true), duplicate, handle);
	}

	async createAccount() {
		var self = this;
		var navigate = this.props.nav.navigate;
		var email = this.state.email;
		var handle = this.state.handle;
		var pantryName = 
		
		firebase.auth().createUserWithEmailAndPassword(email, this.state.pwd).then(function() {

			var user = firebase.auth().currentUser;

			user.updateProfile({
				displayName: displayName,
			}).then(function() {
				user.sendEmailVerification().then(function() {
			  	// Email sent.
			  	self.initUser(user.uid, handle, firstname, lastname);
			  	navigate('SignUpConfirm', {email: email});
				}).catch(function(error) {
			  	// An error happened.
			  	navigate('SignUpConfirm', {email: error.message});
				});
			}, function(error) {
				// An error happened.
			});

		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	}

	async initUser(uid, handle, firstname, lastname) {
		await firebase.database().ref('users/handles/' + handle).set(uid);

		await firebase.database().ref('users/main/' + uid).set({
	    firstname: firstname,
	    lastname: lastname,
	    handle: handle,
	    numFollowers: 0,
	    numFollowing: 0,
		});
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content keyboardShouldPersistTaps='always'>
					<Form>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>HANDLE</Label>
							<Input onChangeText={(text) => this.checkHandle(text)} autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Text style={[styles.duplicate, {display: this.state.duplicate ? 'flex' : 'none'}]}>This handle is already in use!</Text>
					</Form>
					<TouchableOpacity disabled={this.state.disabled} style={this.state.disabled ? [styles.button, styles.disabled] : styles.button} onPress={() => {this.createAccount()}}>
			    	<FontAwesome name="angle-right" style={styles.next}/>
			    </TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: SKIP,
		marginLeft: MARGIN_LEFT,
		marginRight: MARGIN_RIGHT,
		justifyContent:'center',
	},
	label: {
		color: "white",
		fontSize: 12,
		fontWeight: "700",
		marginBottom: DEVICE_HEIGHT * 0.01,
	},
	duplicate: {
		color: 'red',
		fontSize: 12,
		marginTop: DEVICE_HEIGHT * 0.01,
	},
	input: {
		height: INPUT_HEIGHT,
		color: "white",
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
		borderRadius: RADIUS,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SKIP / 3,
		marginLeft: WIDTH * 6 - MARGIN_RIGHT,
	},
	next: {
		color: "blue",
		fontSize: 35,
	},
	disabled: {
		backgroundColor: "white",
	},
});