import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { Location } from 'expo';
import firebase from 'firebase';
import { primary} from '../util/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 10;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 2;
const HEIGHT = WIDTH/3;
const RADIUS = WIDTH / 2;

export default class SignupPwd extends Component {
	constructor(props) {
		super(props);
  	this.state = {
  		disabled: true,
  		duplicate: false,
  		pantryName: this.props.navigation.getParam("pantryName"),
  		pantryAddress: this.props.navigation.getParam("pantryAddress", "not provided"),
  		pantryHour: this.props.navigation.getParam("pantryHour", "not provided"),
  		pantryContact: this.props.navigation.getParam("pantryPhone", "not provided"),
  		email: this.props.navigation.getParam("email", "not provided"),
  		pwd: this.props.navigation.getParam("pwd"),
  		handle: "",
  		lat: 0,
  		lng: 0,
  	};
	}
	static navigationOptions = {
		header: null,

	}

	componentDidMount() {
    	this.getGeoCode();
  	}

	changeState(disabled, duplicate, handle) {
		this.setState({
			disabled: disabled,
			duplicate: duplicate,
			handle: handle,
		})
	}

	async getGeoCode(){
		let location = (await Location.geocodeAsync(this.state.pantryAddress))[0];
		console.log(location);
		var latitude = location.latitude;
		var longitude = location.longitude;
		this.setState({
			lat : latitude,
			lng: longitude,
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
		var navigate = this.props.navigation.navigate;
		const email = this.state.email;
		var handle = this.state.handle;
		const pantryName = this.state.pantryName;
		const pantryAddress = this.state.pantryAddress;
		const pantryHour = this.state.pantryHour;
		const pantryContact = this.state.pantryContact;
		const pwd = this.state.pwd;
		const pantryLat = this.state.lat;
		const pantryLng = this.state.lng;
		firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function() {

			var user = firebase.auth().currentUser;

			user.updateProfile({
				pantryName: pantryName,
			}).then(function() {
				user.sendEmailVerification().then(function() {
			  	// Email sent.
			  	self.initUser(user.uid, handle, pantryName, pantryAddress, pantryHour, pantryContact, pantryLat, pantryLng);
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

	async initUser(uid, handle, pantryName, pantryAddress, pantryHour, pantryContact, pantryLat, pantryLng) {
		
		// initialize users
		await firebase.database().ref('users/handles/' + handle).set(uid);
		console.log("user created")
		// create new pantry data
		await firebase.database().ref(`Pantry/` +pantryName).set({
		name: pantryName,
	    address: pantryAddress,
	    hour: pantryHour, 
	    contact: pantryContact,
	    lat: pantryLat,
	    lng: pantryLng,
	    uid: uid,
		}
	);
		console.log("pantry created")
		

	}

	render() {
		return (
			<Container style={styles.container}>
				<Content keyboardShouldPersistTaps='always'>
					<Form>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>USER ID</Label>
							<Input onChangeText={(text) => this.checkHandle(text)} autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Text style={[styles.duplicate, {display: this.state.duplicate ? 'flex' : 'none'}]}>This user ID is already in use!</Text>
					</Form>

					<View>
						<TouchableOpacity disabled={this.state.disabled} style={this.state.disabled ? [styles.button, styles.disabled] : styles.button} onPress={() => {this.createAccount()}}>
			    		<Text style={styles.buttonText}>Register</Text>
			    		</TouchableOpacity>
			    	</View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//marginTop: SKIP,
		//marginLeft: MARGIN_LEFT,
		//marginRight: MARGIN_RIGHT,
		justifyContent:'center',
	},
	label: {
		fontSize: 12,
		fontWeight: "700",
		marginLeft: DEVICE_HEIGHT * 0.02,
		marginBottom: DEVICE_HEIGHT * 0.01,
	},
	duplicate: {
		fontSize: 12,
		marginTop: DEVICE_HEIGHT * 0.01,
	},
	input: {
		height: INPUT_HEIGHT,
		marginLeft: DEVICE_HEIGHT * 0.02,
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