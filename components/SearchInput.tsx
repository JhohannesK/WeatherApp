import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SearchInputProps } from '../_types';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
	{
		label: 'something',
		value: 'something',
	},
	{
		label: 'great',
		value: 'something',
	},
	{
		label: 'today',
		value: 'something',
	},
];

const SearchInput = ({ displayLocation, navigation }: SearchInputProps) => {
	const [value, setValue] = useState<string | null>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [location, setLocation] = useState('');

	const displayText = (loc: string) => {
		displayLocation(loc);
	};

	const onTextChange = () => {
		setLocation;
		setIsFocus(true);
	};
	return (
		<View>
			<TextInput
				placeholder='Search your city'
				autoCorrect={false}
				style={styles.textInput}
				placeholderTextColor={'gray'}
				clearButtonMode='always'
				onChangeText={setLocation}
				value={location}
				onBlur={() => displayText(location)}
			/>

			<TouchableOpacity
				style={styles.searchBtn}
				onPress={() => navigation.navigate('Forecast', { name: location })}
			>
				<Icon name='search' size={30} color='black' />
			</TouchableOpacity>
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
		position: 'relative',
		backgroundColor: 'white',
		color: 'black',
		height: 50,
		width: '100%',
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: 'center',
		borderRadius: 5,
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: 'white',
	},

	searchBtn: {
		backgroundColor: '#eea',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 20,
		right: 0,
		height: 50,
		width: 42,
	},

	icon: {
		marginRight: 5,
	},

	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});

export default SearchInput;
