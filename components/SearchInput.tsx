import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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

interface SearchInputProps {
	displayLocation: (location: string) => void;
}

const SearchInput = ({ displayLocation }: SearchInputProps) => {
	const [value, setValue] = useState<string | null>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [location, setLocation] = useState('');

	const displayText = (loc: string) => {
		displayLocation(loc);
	};
	return (
		<View>
			{/* <TextInput
				placeholder='Search your city'
				autoCorrect={false}
				style={styles.textInput}
				placeholderTextColor={'white'}
				clearButtonMode='always'
				onChangeText={setLocation}
				value={location}
				onBlur={() => displayText(location)}
			/> */}
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				data={data}
				placeholder={!isFocus ? 'Search City' : '...'}
				searchPlaceholder='Search...'
				value={'try'}
				search
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				labelField={'label'}
				valueField={'value'}
				onChange={(item) => {
					setIsFocus(false);
					setValue(item.value);
				}}
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
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: 'white',
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
