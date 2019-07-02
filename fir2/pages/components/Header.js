import React, { Component } from 'react';
import { Text, View, Image, StatusBar } from 'react-native';
import { styles, mainColor } from '../../Styles.js';

export default class Header extends Component{

	render(){
		return(
			<View style={styles.header}>
				<StatusBar backgroundColor={mainColor} barStyle="light-content" />
				<Image source={ require('../../imgs/logo.png') } style={styles.logo} />
				{ !this.props.profile && (
					<View>
						<Text style={styles.h1}>Firebase</Text>
						<Text style={styles.h2}>LOGIN</Text>
					</View>
				) }
			</View>
		);
	}

}