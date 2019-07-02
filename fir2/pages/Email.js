import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles, placeholderTextColor } from '../Styles';
import Header from './components/Header';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';

import firebase from 'react-native-firebase';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Email extends Component{

	constructor(props){ super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			messageBox: false,
			messageBoxText: '',
			messageBoxType: ''
		};

		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.messageBoxClose = this.messageBoxClose.bind(this);
		this.goBack = this.goBack.bind(this);

	}

	login(){

		const { email, password } = this.state;

		if ( email.length > 0 && password.length > 0 ){

			this.setState({ loading: true });

			firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {

				this.setState({ loading: false });

				this.props.navigation.navigate('Profile');

			}).catch((error) => {

				const { code, message } = error;

				this.setState({
					messageBox: true,
					messageBoxText: message,
					messageBoxType: 'error',
					loading: false
				});

			});

		}else{

			this.setState({
				messageBox: true,
				messageBoxText: 'Lütfen e-posta adresi ve şifre alanını doldurduğunuzdan emin olun.',
				messageBoxType: 'error'
			});

		}

	}

	register(){

		const { email, password } = this.state;

		if ( email.length > 0 && password.length > 0 ){

			this.setState({ loading: true });

			firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

				this.setState({ loading: false });

				this.props.navigation.navigate('Profile');

			}).catch((error) => {

				const { code, message } = error;

				this.setState({
					messageBox: true,
					messageBoxText: message,
					messageBoxType: 'error',
					loading: false
				});

			});

		}else{

			this.setState({
				messageBox: true,
				messageBoxText: 'Lütfen e-posta adresi ve şifre alanını doldurduğunuzdan emin olun.',
				messageBoxType: 'error'
			});

		}

	}

	messageBoxClose(){

		this.setState({
			messageBox: false,
			messageBoxText: '',
			messageBoxType: ''
		});

	}

	goBack(){ this.props.navigation.navigate('Home'); }

	render(){
		return(
			<View style={styles.bg}>

				<ScrollView>

				<Header />

				<View style={styles.inputs}>
					<View style={[styles.inputWrapper, styles.mt0]}>
						<View style={styles.inputIcon}>
							<FontAwesome name="user" size={22} color='#c0c0c0' />
						</View>
						<TextInput
							style = {styles.input}
							onChangeText = { (email) => this.setState({ email }) }
							value = { this.state.email }
							underlineColorAndroid = 'transparent'
							placeholder = 'E-Posta Adresi'
							keyboardType = 'email-address'
							autoCapitalize = 'none'
							placeholderTextColor = {placeholderTextColor}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.inputIcon}>
							<FontAwesome5 name="key" size={22} color='#c0c0c0' />
						</View>
						<TextInput
							style = {styles.input}
							onChangeText = { (password) => this.setState({ password }) }
							value = { this.state.password }
							underlineColorAndroid = 'transparent'
							placeholder = 'Şifre'
							autoCapitalize = 'none'
							secureTextEntry = {true}
							placeholderTextColor = {placeholderTextColor}
						/>
					</View>
					<TouchableOpacity onPress={this.login} style={styles.button}>
						<Text style={styles.buttonText}>GİRİŞ YAP</Text>
						<View style={styles.buttonIcon}>
							<AntDesign name="login" size={24} color='#fff' />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.register} style={styles.buttonRegister}>
						<Text style={styles.buttonRegisterText}>Henüz kayıtlı değil misin? Hemen kayıt ol.</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.goBack} style={styles.buttonRegister}>
						<Text style={styles.buttonBackText}>Önceki sayfaya git.</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.mbs} />

				</ScrollView>

				<Loading visible={this.state.loading} />

				<MessageBox
					visible = {this.state.messageBox}
					messageBoxClose = {this.messageBoxClose}
					text = {this.state.messageBoxText}
					type = {this.state.messageBoxType}
				/>

			</View>
		);
	}

}