import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import firebase from 'firebase';
//import { primary, black, white, gray } from '../../utils/colors';
//import { registerForPushNotificationsAsyc } from '../../functions/push_code'; 
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const SKIP = DEVICE_HEIGHT / 7;
const MARGIN = DEVICE_WIDTH * 0.125;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

const BUTTON_WIDTH = DEVICE_WIDTH * 0.75;
const BUTTON_HEIGHT = BUTTON_WIDTH / 7;
const BUTTON_RADIUS = BUTTON_HEIGHT / 2;

const WIDTH = DEVICE_WIDTH * 0.75;
const HEIGHT = WIDTH / 7;
const RADIUS = HEIGHT / 2;

export default class LoginForm extends Component {
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
			<View style={styles.container}>
				<Container style={styles.container1}>
					<Content scrollEnabled={false} style={styles.test}>
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
					</Content>
				</Container>
				<View style={styles.container2}>
					<TouchableOpacity onPress={() => {this.props.navigation.navigate('ForgotPwd')}}><Text style={styles.text}>Forgot Password?</Text></TouchableOpacity>
					<TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUpEmail')}}><Text style={styles.text}>New Here? Sign Up</Text></TouchableOpacity>
				</View>
				<View style={styles.container3}>
	    			<TouchableOpacity style={styles.button} onPress={() => {this.loginSubmit()}}>
				    	<Text style={styles.buttonText}>LOGIN</Text>
				    </TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 8,
	},
	container1: {
		marginTop: SKIP,
		marginLeft: MARGIN,
		marginRight: MARGIN,
		justifyContent:'center',
		flex: 4.7,
	},
	label: {
		//color: primary,
		fontSize: 12,
		fontWeight: "700",
		marginBottom: DEVICE_HEIGHT * 0.01,
	},
	input: {
		height: INPUT_HEIGHT,
		color: "black",
	},
	item: {
		marginBottom: INPUT_HEIGHT/3,
		paddingLeft: 0,
		marginLeft: 0,
		paddingBottom: 0,
	},
	container2: {
		flex: 0.8,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: "gray",
		backgroundColor: 'transparent',
		fontSize: 12,
		fontWeight: '500',
	},
	container3: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: WIDTH,
		height: HEIGHT,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "blue",
		borderRadius: RADIUS,
	},
	buttonText: {
		color: "white",
		fontWeight: 'bold',
	},
});