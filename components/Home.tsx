import React, { Component, useState } from 'react';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import SearchInput from './SearchInput';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { log } from 'react-native-reanimated';

const Home = ({ navigation }: { navigation: any }) => {
	const [location, setLocation] = useState('');

	const displayLocation = (location: string) => {
		setLocation(location);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ImageBackground
				source={require('../assets/images/cold.jpg')}
				style={styles.ImageContainer}
				imageStyle={styles.image}
			>
				<View style={styles.detailsContainer}>
					<TouchableOpacity onPress={() => console.log('here')}>
						<Text>Please click</Text>
					</TouchableOpacity>
					<SearchInput
						displayLocation={displayLocation}
						navigation={navigation}
					/>
				</View>

				<StatusBar style='auto' />
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
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
		justifyContent: 'center',
		// opacity: 0.5,
		// backgroundColor: 'black',
	},

	image: {
		flex: 1,
		width: '100%',
		height: undefined,
		resizeMode: 'cover',
		opacity: 0.5,
		backgroundColor: 'black',
	},
});
