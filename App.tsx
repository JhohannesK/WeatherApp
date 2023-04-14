import { StatusBar } from 'expo-status-bar';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={[styles.largeText, styles.textStyle]}>Accra </Text>
			<Text style={styles.textStyle}>Light Cloud</Text>
			<Text style={[styles.textStyle, styles.largeText]}>42</Text>

			<TextInput
				placeholder='Search your city'
				autoCorrect={false}
				style={styles.textInput}
				placeholderTextColor={'white'}
				clearButtonMode='always'
			/>
			<KeyboardAvoidingView />
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		textAlign: 'center',
	},

	largeText: {
		fontSize: 44,
	},

	smallText: {
		fontSize: 18,
	},

	textInput: {
		backgroundColor: '#666',
		color: 'white',
		height: 40,
		width: 300,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: 'center',
	},
});
