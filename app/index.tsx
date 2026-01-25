import React, { useState } from 'react';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import SearchInput from '../components/SearchInput';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
	const [location, setLocation] = useState('');

	const displayLocation = (location: string) => {
		setLocation(location);
	};

	return (
		<ImageBackground
			source={require('../assets/images/cold.jpg')}
			style={styles.ImageContainer}
			imageStyle={styles.image}
		>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.detailsContainer}>
					<SearchInput displayLocation={displayLocation} />
				</View>
			</KeyboardAvoidingView>

			<StatusBar style="auto" />
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
	},

	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 20,
	},

	textStyle: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		textAlign: 'center',
		color: 'white',
	},

	largeText: {
		fontSize: 48,
	},

	smallText: {
		fontSize: 18,
	},

	ImageContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
	},

	image: {
		resizeMode: 'cover',
		opacity: 0.5,
	},
});
