import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import { primary} from '../util/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const MARGIN_LEFT = DEVICE_WIDTH * 0.1;
const MARGIN_RIGHT = MARGIN_LEFT;

const SKIP = DEVICE_HEIGHT / 15;
const INPUT_HEIGHT = DEVICE_HEIGHT * 0.05;

// Round button
const WIDTH = DEVICE_WIDTH / 3;
const HEIGHT = WIDTH/3;
const RADIUS = WIDTH / 2;

export default class SignupPwd extends Component {
	static navigationOptions = {
		header: null


	}
	constructor(props) {
		super(props);
  	this.state = {
  		allowed: false,
  		verified: true,
  		email: this.props.navigation.getParam("email"),
  		pantryName: "",
  		pwd: "",
  		pwdVerify: ""
  	};
	}
	checkPwd(pwd) {
		format = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,20}/;
		allowed = /^[a-zA-Z0-9@#$%?!]+$/;
		pwdVerify = this.state.pwdVerify;
		this.setState({
			allowed: ((format.test(pwd) && allowed.test(pwd)) ? true : false),
			verified: pwd == pwdVerify,
			pwd: pwd,
		});
	}

	checkPwdVerify(pwdVerify) {
		pwd = this.state.pwd;
		this.setState({
			verified: pwd == pwdVerify,
			pwdVerify: pwdVerify,
		});
	}

	getUserData() {
		return {...this.state};
	}
	render() {
		return (
			<Container style={styles.container}>
				<Content keyboardShouldPersistTaps='always'>
					<Form>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>PANTRY NAME</Label>
							<Input onChangeText={(text) => {this.state.pantryName = text}}  autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>PANTRY ADDRESS</Label>
							<Input onChangeText={(text) => {this.state.pantryAddress = text}}  autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>PANTRY HOUR</Label>
							<Input onChangeText={(text) => {this.state.pantryHour = text}}  autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>

						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>PANTRY PHONE CONTACT</Label>
							<Input onChangeText={(text) => {this.state.pantryPhone = text}}  autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>PASSWORD</Label>
							<Input onChangeText={(text) => this.checkPwd(text)} secureTextEntry={true} autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Item stackedLabel style={styles.item}>
							<Label style={styles.label}>VERIFY PASSWORD</Label>
							<Input onChangeText={(text) => this.checkPwdVerify(text)} secureTextEntry={true} autoCapitalize='none' autoCorrect={false} keyboardAppearance={'light'} style={styles.input}/>
						</Item>
						<Text style={[styles.alert, {display: this.state.verified ? 'none' : 'flex'}]}>VERIFIED PASSWORD DOES NOT MATCH!</Text>
					</Form>

					<View>
						<TouchableOpacity 
						disabled={!(this.state.allowed && this.state.verified)} 
						style={(this.state.allowed && this.state.verified) ? styles.button : [styles.button, styles.disabled]} 
						onPress={() => {
							console.log(this.getUserData());
							this.props.navigation.navigate('SignUpHandle', this.getUserData());

						}}>
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
		justifyContent:'center',
	},
	label: {
		color: primary,
		fontSize: 12,
		fontWeight: "700",
		marginLeft: DEVICE_HEIGHT * 0.02,
		marginBottom: DEVICE_HEIGHT * 0.01,
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
	alert: {
		color: 'red',
		fontSize: 12,
		marginTop: DEVICE_HEIGHT * 0.01,
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