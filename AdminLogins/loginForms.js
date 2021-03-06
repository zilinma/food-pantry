import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import firebase from 'firebase';
import {primary} from '../util/colors';
//import { registerForPushNotificationsAsyc } from '../../functions/push_code'; 
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const SKIP = DEVICE_HEIGHT / 7;
const MARGIN = DEVICE_WIDTH * 0.125;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

const BUTTON_WIDTH = DEVICE_WIDTH * 0.75;
const BUTTON_HEIGHT = BUTTON_WIDTH / 7;
const BUTTON_RADIUS = BUTTON_HEIGHT / 10;

const WIDTH = DEVICE_WIDTH * 0.75;
const HEIGHT = WIDTH / 7;
const RADIUS = HEIGHT / 2;

export default class LoginForm extends Component {
	static navigationOptions = {
		header: null
		/*
		title: applyLetterSpacing("LOG IN"),
		header: navigation => ({
			style: {
				backgroundColor: 'rgb(47,54,61)'
			},
			TitleStyle: {
				color: '#fefefe',
				fontWeight:'300',
				textAlign: 'center',
			}, 
			tintColor: '#fefefe'
		})
		*/
	};
	
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			pwd: "",
		};
	}

	updateEmail(email) {
		this.setState({
			email: email,
		});
	}

	updatePwd(pwd) {
		this.setState({
			pwd: pwd,
		});
	}

	loginSubmit() {
		var email = this.state.email;
		var password = this.state.pwd;
		var nav = this.props.navigation;

		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			var user = firebase.auth().currentUser;
			var uid = user.uid;
			//registerForPushNotificationsAsyc(uid);
			nav.navigate("MainTab", {userID: uid, loginNav: nav});
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error.message);
			Alert.alert(
				'',
				  errorMessage,
				  [
				  	{text: 'OK', onPress: () => console.log('OK Pressed')},
				  ],
				  { cancelable: false }

				)
		});
	}

	render() {
		return (
				<Container>
					<Content scrollEnabled={false} style={styles.test} keyboardShouldPersistTaps={'handled'}>
						<Form>
							<Item stackedLabel style={styles.item}>
								<Label style={styles.label}>USERNAME / EMAIL</Label>
								<Input onChangeText={(text) => this.updateEmail(text)} autoCapitalize='none' autoCorrect={false} keyboardType={'email-address'} keyboardAppearance={'light'} style={styles.input}/>
							</Item>
							<Item stackedLabel style={styles.item}>
								<Label style={styles.label}>PASSWORD</Label>
								<Input onChangeText={(text) => this.updatePwd(text)} secureTextEntry={true} autoCapitalize='none' keyboardAppearance={'light'} style={styles.input}/>
							</Item>
						</Form>

						<View style={styles.container2}>
							<TouchableOpacity onPress={() => {this.props.navigation.navigate('ForgotPwd')}}><Text style={styles.text}>Forgot Password?</Text></TouchableOpacity>
							<TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUpEmail')}}><Text style={styles.text}>New Here? Sign Up</Text></TouchableOpacity>
						</View>
						<View>
			    			<TouchableOpacity style={styles.button} onPress={() => {this.loginSubmit()}}>
						    	<Text style={styles.buttonText}>LOG IN</Text>
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
		fontSize:16,
	},
	item: {
		marginBottom: INPUT_HEIGHT/3,
		paddingLeft: 0,
		marginLeft: 0,
		paddingBottom: 0,
	},
	container2: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		color: "gray",
		backgroundColor: 'transparent',
		fontSize: 12,
		fontWeight: '500',
	},
	button: {
		width: WIDTH,
		height: HEIGHT,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: primary,
		borderRadius: BUTTON_RADIUS,
		marginTop: 30,
	},
	buttonText: {
		color: "white",
		fontWeight: 'bold',
	},
});