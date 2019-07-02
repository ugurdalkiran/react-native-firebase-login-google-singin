import React, { Component } from 'react';
import { Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { styles } from '../Styles';
import Header from './components/Header';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from 'react-native-splash-screen';

GoogleSignin.configure({
	webClientId: '838845541897-0o3kjsibhngmsknm49d2mnskbtf0r7ne.apps.googleusercontent.com'
});

export default class Home extends Component{

	constructor(props){ super(props);

		this.state = {
			loading: false,
			messageBox: false,
			messageBoxText: '',
			messageBoxType: ''
		};

		this.messageBoxClose = this.messageBoxClose.bind(this);
		this.navEmail = this.navEmail.bind(this);
		this.signInGoogle = this.signInGoogle.bind(this);

		const user = firebase.auth().currentUser;

		if ( user ) this.props.navigation.navigate('Profile');

	}

	componentDidMount(){

		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

			return true;

		});

		setTimeout(() => { SplashScreen.hide(); }, 600);

	}

	componentWillUnmount(){ this.backHandler.remove(); }

	navEmail(){ this.props.navigation.navigate('Email'); }

	signInGoogle(){

		this.setState({ loading: true });

		GoogleSignin.signIn().then(async (data) => {

			const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

			firebase.auth().signInWithCredential(credential).then((user) => {

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

		}).catch((error) => {

			const { code, message } = error;
			
			this.setState({
				messageBox: true,
				messageBoxText: message,
				messageBoxType: 'error',
				loading: false
			});

		});

	}

	messageBoxClose(){

		this.setState({
			messageBox: false,
			messageBoxText: '',
			messageBoxType: ''
		});

	}

	render(){
		return(
			<View style={styles.bg}>

				<Header />

				<View style={styles.inputs}>
					<TouchableOpacity onPress={this.signInGoogle} style={[styles.buttonLeft, styles.mt0]}>
						<View style={styles.buttonLeftIcon}>
							<FontAwesome name="google" size={32} color='#fff' />
						</View>
						<Text style={styles.buttonLeftText}>Google ile giriş yap</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.navEmail} style={[styles.buttonLeft, styles.withEmail]}>
						<View style={[styles.buttonLeftIcon, styles.withEmailIcon]}>
							<Ionicons name="ios-mail" size={32} color='#fff' />
						</View>
						<Text style={styles.buttonLeftText}>E-Posta ile giriş yap</Text>
					</TouchableOpacity>
				</View>

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