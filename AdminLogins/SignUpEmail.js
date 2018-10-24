import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = DEVICE_WIDTH * 0.1
const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 10;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 8;
const HEIGHT = WIDTH;
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
		await firebase.auth().fetchProvidersForEmail(this.state.email).then(function(ids) {
			duplicate = (ids.length > 0);
		}).catch(function(error) {
			if (error.code == 'auth/quota-exceeded') {
				// not checking
			}
		});
		this.setState({ duplicate });
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
					<TouchableOpacity disabled={this.state.disabled} style={this.state.disabled ? [styles.button, styles.disabled] : styles.button} onPress={() => {this.checkDuplicate()}}>
				    	<FontAwesome name="angle-right" style={styles.next}/>
				    </TouchableOpacity>
				</Content>
			</Container>
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