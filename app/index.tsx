import React, { useState } from 'react';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import SearchInput from '../components/SearchInput';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
	const router = useRouter();
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
				<TouchableOpacity
					style={styles.favoritesButton}
					onPress={() => router.push('/favorites')}
				>
					<Ionicons name="heart" size={28} color="#eea" />
				</TouchableOpacity>
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
	favoritesButton: {
		position: 'absolute',
		top: 60,
		right: 20,
		zIndex: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 25,
		padding: 12,
	},
});
