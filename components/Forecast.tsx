import { Route } from '@react-navigation/native';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useGeoLocation } from './api/search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IForecast } from '../_types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

type MyRoute = Route<'Forecast', { name: string }>;
const options = (lat: number, lon: number) => {
	const option = {
		method: 'GET',
		url: `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather`,
		params: { lat: `${lat}`, lon: `${lon}` },
		headers: {
			'content-type': 'application/octet-stream',
			'X-RapidAPI-Key': '71156a074amshb03fcd9292793aep19c323jsn5519e168243d',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
		},
	};
	return option;
};

const displayDate = () => {
	const date = new Date();
	const dayOfWeek = date
		.toLocaleString('en-us', { weekday: 'long' })
		.split(',')[0];
	const dayOfMonth = date.getDate();
	const month = date.toLocaleString('en-us', { month: 'long' });

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

	return <Text style={styles.date}>{formattedDate}</Text>;
};

const Forecast = ({
	navigation,
	route,
}: {
	navigation: any;
	route: MyRoute;
}) => {
	const { name } = route.params;
	const [forecastData, setForecastData] = useState<IForecast>();

	const { getGeoLocation, data } = useGeoLocation((latitude, longitude) => {
		try {
			const response = axios
				.request(options(latitude, longitude))
				.then((response) => {
					console.log(
						'🚀 ~ file: Forecast.tsx:41 ~ .then ~ response:',
						response.data
					);
					setForecastData(response.data);
				});
		} catch (error) {
			console.error(error);
		}
	});
	useEffect(() => {
		getGeoLocation(name);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.location}>
				{name[0].toUpperCase() + name.substring(1)}
			</Text>
			<View
				style={{
					backgroundColor: 'black',
					borderRadius: 70,
					paddingVertical: 5 * 2,
					paddingHorizontal: 7 * 2,
				}}
			>
				{displayDate()}
			</View>
			<Text style={styles.temp}>{forecastData?.temp}&#176;</Text>
			<View style={styles.summary}>
				<Text style={styles.summaryTitle}>Data Summary</Text>
				<Text style={styles.summaryDesc}>
					It actually feels like {forecastData?.feels_like}&#176; now
				</Text>
				<Text style={styles.summaryDesc}>
					The temperature is felt between {forecastData?.min_temp}&#176;
					and {forecastData?.max_temp}&#176;
				</Text>
			</View>
			<View style={styles.infoContainer}>
				<View style={styles.innerContainer}>
					<Icon name='wind' size={46} color={'#eea'} />
					<Text style={styles.info}>{forecastData?.wind_speed}km/h</Text>
					<Text style={styles.text}>Wind-speed</Text>
				</View>
				<View style={styles.innerContainer}>
					<Icon name='tint' size={46} color={'#eea'} />
					<Text style={styles.info}>{forecastData?.humidity}%</Text>
					<Text style={styles.text}>Humidity</Text>
				</View>
				<View style={styles.innerContainer}>
					<Icon name='location-arrow' size={46} color={'#eea'} />
					<Text style={styles.info}>
						{forecastData?.wind_degrees}&#176;
					</Text>
					<Text style={styles.text}>Wind-direction</Text>
				</View>
			</View>
			<View style={styles.button}>
				<Button
					title='Go back'
					onPress={() => navigation.goBack()}
					color={'transparent'}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Forecast;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eea',
		paddingTop: 60,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 25,
	},

	location: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 30,
	},

	date: {
		fontSize: 20,
		textAlign: 'center',
		color: '#eea',
		// backgroundColor: '#aaa',
	},

	temp: {
		fontSize: 180,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	summary: {
		width: '100%',
		marginBottom: 30,
	},

	summaryTitle: {
		fontSize: 17,
		fontWeight: 'bold',
	},

	summaryDesc: {
		fontSize: 13,
	},

	infoContainer: {
		flexDirection: 'row',
		gap: 35,
		backgroundColor: 'black',
		borderRadius: 50,
		padding: 40,
	},

	innerContainer: {
		alignItems: 'center',
	},

	info: {
		color: '#eea',
	},

	text: { color: '#eea' },

	button: {
		backgroundColor: 'black',
		color: '#eea',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginTop: 20,
	},
});
