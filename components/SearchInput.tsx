import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchInputProps {
	displayLocation: (location: string) => void;
}

const SearchInput = ({ displayLocation }: SearchInputProps) => {
	const [location, setLocation] = useState('');

	const displayText = (loc: string) => {
		displayLocation(loc);
	};
	return (
		<View>
			<TextInput
				placeholder='Search your city'
				autoCorrect={false}
				style={styles.textInput}
				placeholderTextColor={'white'}
				clearButtonMode='always'
				onChangeText={setLocation}
				value={location}
				onBlur={() => displayText(location)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
		borderRadius: 5,
	},
});

export default SearchInput;
