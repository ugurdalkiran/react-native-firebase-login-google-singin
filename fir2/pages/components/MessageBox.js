import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, errorColor, successfulColor } from '../../Styles.js';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default class MessageBox extends Component{

	render(){
		return this.props.visible && (
			<View style={styles.messageBox}>
				<View style={styles.messageWrapper}>
					<View style={styles.messageIcon}>
						<AntDesign name={ this.props.type == 'error' ? 'closecircle' : 'checkcircle' } size={54} color={ this.props.type == 'error' ? errorColor : successfulColor } />
					</View>
					<Text style={styles.messageText}>{this.props.text}</Text>
					<TouchableOpacity onPress={this.props.messageBoxClose} style={styles.messageButton}>
						<Text style={styles.messageButtonText}>TAMAM</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

}