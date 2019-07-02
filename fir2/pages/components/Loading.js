import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles, placeholderTextColor } from '../../Styles.js';

export default class Loading extends Component{

	render(){
		return this.props.visible && (
			<View style={styles.loading}>
				<View style={styles.loadingWrapper}>
					<ActivityIndicator size="large" color={placeholderTextColor} />
				</View>
			</View>
		)
	}

}