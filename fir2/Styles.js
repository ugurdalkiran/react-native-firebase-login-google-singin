import { StyleSheet, Dimensions } from 'react-native';

const space = 24;
export const mainColor = '#083b87';
export const blackTextColor = '#212121';
export const placeholderTextColor = '#999';
export const buttonColorRed = '#f23a5f';
export const buttonColorBlue = '#4385f5';

export const errorColor = '#e74c3c';
export const successfulColor = '#f1c40f';

export const styles = StyleSheet.create({

	bg: { flex: 1, backgroundColor: mainColor },
	mt0: { marginTop: 0 },
	mbs: { marginBottom: space },

	/**/

	header: { marginHorizontal: space, marginTop: space },
	logo: { height: 32, resizeMode: 'contain', width: '100%' },
	h1: { color: '#fff', fontSize: 38, fontFamily: 'Muli-Black', marginTop: space * 2, textAlign: 'center' },
	h2: { color: '#fff', fontSize: 32, fontFamily: 'Muli-Black', marginTop: -4, textAlign: 'center', opacity: 0.5 },

	inputs: { marginHorizontal: space, marginTop: space * 2 },

	inputWrapper: { flexDirection: 'row', marginTop: space / 2 },
	inputIcon: { backgroundColor: '#fff', width: 55, height: 54, borderRadius: 4, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 1, borderRightColor: '#e9e9e9', justifyContent: 'center', alignItems: 'center' },
	input: { backgroundColor: '#fff', borderRadius: 4, fontFamily: 'Muli-SemiBold', fontSize: 18, color: blackTextColor, height: 54, paddingHorizontal: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, flex: 1 },
	inputDisable: { color: placeholderTextColor },
	inputSmallSize: { fontSize: 14 },

	button: { backgroundColor: buttonColorBlue, borderRadius: 4, height: 54, justifyContent: 'center', alignItems: 'center', marginTop: space / 2, flexDirection: 'row' },
	buttonIcon: { marginLeft: space / 2 },
	buttonText: { fontFamily: 'Muli-Black', fontSize: 18, color: '#fff' },

	buttonLeft: { backgroundColor: buttonColorBlue, borderRadius: 4, height: 54, alignItems: 'center', marginTop: space / 2, flexDirection: 'row', paddingHorizontal: 20 },
	withEmail: { backgroundColor: '#19498f' },
	buttonLeftIcon: { marginRight: space / 2, backgroundColor: '#3d79dd', width: 54, height: 54, justifyContent: 'center', alignItems: 'center' },
	withEmailIcon: { backgroundColor: '#194380' },
	buttonLeftText: { fontFamily: 'Muli-Bold', fontSize: 18, color: '#fff' },

	buttonRegister: { marginTop: space },
	buttonRegisterText: { fontFamily: 'Muli-SemiBold', fontSize: 16, color: '#fff', textAlign: 'center' },
	buttonBackText: { fontFamily: 'Muli-SemiBold', fontSize: 16, color: '#fff', textAlign: 'center', opacity: 0.7 },

	signOutButton: { backgroundColor: buttonColorRed, marginTop: space },

	/* Loading */

	loading: { backgroundColor: 'rgba(0,0,0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center' },
	loadingWrapper: { backgroundColor: '#fff', borderRadius: 4, padding: space * 1.5 },

	/* Messages */

	messageBox: { backgroundColor: 'rgba(0,0,0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99, justifyContent: 'center' },
	messageWrapper: { backgroundColor: '#fff', borderRadius: 4, marginHorizontal: space, padding: 24 },

	messageIcon: { alignItems: 'center' },
	messageText: { fontFamily: 'Muli-Bold', fontSize: 16, color: '#0f6c5a', textAlign: 'center', marginTop: space / 2, lineHeight: 23 },

	messageButton: { backgroundColor: '#1abc9c', borderRadius: 4, height: 44, justifyContent: 'center', alignItems: 'center', marginTop: space * 1.5 },
	messageButtonText: { fontFamily: 'Muli-Bold', fontSize: 16, color: '#fff' },

	/* Profile */

	profilePhotoWrapper: { marginHorizontal: space, alignItems: 'center', marginTop: space * 2 },
	profilePhoto: { width: 148, height: 148, borderRadius: 148, resizeMode: 'cover' },

	profileInputs: { marginHorizontal: space, marginTop: space }

});