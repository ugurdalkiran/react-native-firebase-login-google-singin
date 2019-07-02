import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { styles, placeholderTextColor } from '../Styles';
import Header from './components/Header';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';

import firebase from 'react-native-firebase';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ImagePicker from 'react-native-image-picker';

const options = {
	title: 'Fotoğraf Seç',
	storageOptions: {
		path: 'images'
	}
};

export default class Profile extends Component{

	constructor(props){ super(props);

		this.state = {
			loading: false,
			displayName: '',
			email: '',
			photoURL: '',
			uid: '',
			messageBox: false,
			messageBoxText: '',
			messageBoxType: ''
		};

		this.setUser();

		this.signOut = this.signOut.bind(this);
		this.update = this.update.bind(this);
		this.messageBoxClose = this.messageBoxClose.bind(this);

		this.pickerOpen = this.pickerOpen.bind(this);
		this.openCamera = this.openCamera.bind(this);
		this.openGallery = this.openGallery.bind(this);
		this.getPhotoURL = this.getPhotoURL.bind(this);
		this.updatePhoto = this.updatePhoto.bind(this);

	}

	setUser(){

		const user = firebase.auth().currentUser;

		this.state.displayName = user.displayName;
		this.state.email = user.email;
		this.state.photoURL = user.photoURL;
		this.state.uid = user.uid;

	}

	signOut(){

		this.setState({ loading: true });

		firebase.auth().signOut().then(() => {

			setTimeout(() => {

				this.setState({ loading: false });

				this.props.navigation.navigate('Home');

			}, 1000);

		});

	}

	update(){

		const { displayName } = this.state;

		if ( displayName !== null && displayName.length > 0 ){

			this.setState({ loading: true });

			const user = firebase.auth().currentUser;

			user.updateProfile({

				displayName: displayName

			}).then(() => {

				this.setState({
					messageBox: true,
					messageBoxText: 'İsim Soyisim başarıyla güncellendi.',
					messageBoxType: 'successful',
					loading: false
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

		}else{

			this.setState({
				messageBox: true,
				messageBoxText: 'Lütfen İsim Soyisim alanını doldurduğunuzdan emin olun.',
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

	pickerOpen(){

		Alert.alert(
			'Profil Fotoğrafını Güncelle',
			'Firebase üzerinden profil fotoğrafınızı güncelleyin.',
			[
				{ text: 'Kamera', onPress: this.openCamera },
				{ text: 'Galeri', onPress: this.openGallery }
			]
		);

	}

	openCamera(){

		ImagePicker.launchCamera(options, (response) => {

			if ( !response.didCancel ) this.uploadPhoto(response.fileName, response.path);

		});

	}

	openGallery(){

		ImagePicker.launchImageLibrary(options, (response) => {

			if ( !response.didCancel ) this.uploadPhoto(response.fileName, response.path);

		});

	}

	uploadPhoto(fileName, path){

		this.setState({ loading: true });

		firebase.storage().ref(fileName).putFile(path).then(() => {

			this.setState({ loading: false });

			this.getPhotoURL(fileName);

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

	getPhotoURL(fileName){

		this.setState({ loading: true });

		const ref = firebase.storage().ref(fileName);

		ref.getDownloadURL().then((url) => {

			this.setState({ loading: false });

			this.updatePhoto(url);

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

	updatePhoto(url){

		this.setState({ loading: true });

		const user = firebase.auth().currentUser;

		user.updateProfile({

			photoURL: url

		}).then(() => {

			this.setState({
				messageBox: true,
				messageBoxText: 'Profil fotoğrafı başarıyla güncellendi.',
				messageBoxType: 'successful',
				loading: false,
				photoURL: url
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

	render(){
		return(
			<View style={styles.bg}>

				<ScrollView>

				<Header profile={true} />

				<View style={styles.profilePhotoWrapper}>
					<AnimatedCircularProgress
					size={164}
					width={2}
					fill={100}
					rotation={0}
					duration={1000}
					tintColor="rgba(255,255,255, 0.7)"
					backgroundColor="transparent"
					children = {() => (
						<TouchableOpacity onPress={this.pickerOpen}>
							<Image source={ this.state.photoURL === null ? require('../imgs/user.png') : { uri: this.state.photoURL } } style={styles.profilePhoto} />
						</TouchableOpacity>
					)}/>
				</View>

				<View style={styles.profileInputs}>
					<View style={[styles.inputWrapper, styles.mt0]}>
						<View style={styles.inputIcon}>
							<FontAwesome name="user" size={22} color='#c0c0c0' />
						</View>
						<TextInput
							style = {styles.input}
							onChangeText = { (displayName) => this.setState({ displayName }) }
							value = { this.state.displayName }
							underlineColorAndroid = 'transparent'
							placeholder = 'İsim Soyisim'
							autoCapitalize = 'words'
							placeholderTextColor = {placeholderTextColor}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.inputIcon}>
							<Ionicons name="ios-mail" size={26} color='#c0c0c0' />
						</View>
						<TextInput
							style = {[styles.input, styles.inputDisable]}
							onChangeText = { (email) => this.setState({ email }) }
							value = { this.state.email }
							underlineColorAndroid = 'transparent'
							editable = {false}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.inputIcon}>
							<MaterialCommunityIcons name="shield-key" size={24} color='#c0c0c0' />
						</View>
						<TextInput
							style = {[styles.input, styles.inputDisable, styles.inputSmallSize]}
							onChangeText = { (uid) => this.setState({ uid }) }
							value = { this.state.uid }
							underlineColorAndroid = 'transparent'
							editable = {false}
						/>
					</View>
					<TouchableOpacity onPress={this.update} style={styles.button}>
						<Text style={styles.buttonText}>GÜNCELLE</Text>
						<View style={styles.buttonIcon}>
							<Feather name="check-circle" size={24} color='#fff' />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.signOut} style={[styles.button, styles.signOutButton]}>
						<Text style={styles.buttonText}>ÇIKIŞ YAP</Text>
						<View style={styles.buttonIcon}>
							<AntDesign name="logout" size={24} color='#fff' />
						</View>
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