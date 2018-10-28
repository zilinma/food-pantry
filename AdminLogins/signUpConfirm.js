import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 10;

export default class SignupConfirm extends Component {

	static navigationOptions = {
		header: null


	}
	constructor(props) {
		super(props);
  	this.state = {
	  		disabled: false,
	  		email: this.props.navigation.getParam("email"),
	  	};
	}

	componentDidMount() {
    var navigate = this.props.navigation.navigate;
    var intervalID = setInterval(function(){
    	var user = firebase.auth().currentUser;
    	if (!user) {
         navigate('Start');
      } else {
      	user.reload();
      	if (user.emailVerified) {
					clearInterval(intervalID);
					navigate("SignUpDone", {uid: user.uid});
				}
      }
    }, 2000);
  }

	render() {
		return (
			<View style={styles.container}>
				<FontAwesome name="paper-plane" style={styles.icon}/>
				<Text>Confirm your email address</Text>
				<Text>We sent a confirmation email to:</Text>
				<Text>{this.state.email}</Text>
				<Text>Check your email and click on the confirmation link to continue.</Text>
				<View style={styles.bottom}>
					<TouchableOpacity disabled={this.state.disabled} onPress={() => {null}}>
						<Text style={styles.resendText}>Resend email</Text>
		    	</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: SKIP,
		marginLeft: MARGIN_LEFT,
		marginRight: MARGIN_RIGHT,
		marginBottom: MARGIN_LEFT,
		justifyContent:'center',
		alignItems: 'center',
	},
	icon: {
		flex: 5,
		fontSize: 100,
	},
	title: {
		flex: 1.5,
		fontSize: 20,
		fontWeight: '700',
	},
	text: {
		flex: 1,
		fontSize: 15,
		fontWeight: '400',
		textAlign: 'center',
	},
	emailText: {
		flex: 1,
		fontSize: 15,
		fontWeight: '700',
	},
	bottom: {
		flex: 4,
		justifyContent: 'flex-end',
	},
	resendText: {
		fontSize: 16,
		fontWeight:'700',
	},
});