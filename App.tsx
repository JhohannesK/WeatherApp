import { StatusBar } from 'expo-status-bar';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import SearchInput from './components/SearchInput';
import { useState } from 'react';

export default function App() {
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
				source={require('./assets/images/cold.jpg')}
				style={styles.ImageContainer}
				imageStyle={styles.image}
			>
				<View style={styles.detailsContainer}>
					<Text style={[styles.largeText, styles.textStyle]}>
						{location.length ? location : 'San Francisco'}
					</Text>
					<Text style={styles.textStyle}>Light Cloud</Text>
					<Text style={[styles.textStyle, styles.largeText]}>
						32&#176;C
					</Text>
					<SearchInput displayLocation={displayLocation} />
				</View>

				<StatusBar style='auto' />
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

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
