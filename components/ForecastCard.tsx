import { StyleSheet, Text, View } from 'react-native';
import { IForecastItem } from '../_types';
import { convertToCelsius } from '../utils';

interface ForecastCardProps {
	forecast: IForecastItem;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
	const date = new Date(forecast.dt * 1000);
	const dayOfWeek = date.toLocaleString('en-us', { weekday: 'short' });
	const dayOfMonth = date.getDate();
	const month = date.toLocaleString('en-us', { month: 'short' });
	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

	const weather = forecast.weather[0];
	const icon = weather.icon;
	const description = weather.description;

	return (
		<View style={styles.container}>
			<Text style={styles.date}>{formattedDate}</Text>
			<Text style={styles.temp}>{convertToCelsius(forecast.main.temp)}°</Text>
			<Text style={styles.description}>{description}</Text>
			<View style={styles.tempRange}>
				<Text style={styles.tempText}>
					H: {convertToCelsius(forecast.main.temp_max)}°
				</Text>
				<Text style={styles.tempText}>
					L: {convertToCelsius(forecast.main.temp_min)}°
				</Text>
			</View>
			<View style={styles.details}>
				<Text style={styles.detailText}>Humidity: {forecast.main.humidity}%</Text>
				<Text style={styles.detailText}>Wind: {forecast.wind.speed} km/h</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		borderRadius: 20,
		padding: 20,
		marginVertical: 10,
		marginHorizontal: 5,
		width: 280,
	},
	date: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#eea',
		marginBottom: 10,
	},
	temp: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#eea',
		marginBottom: 5,
	},
	description: {
		fontSize: 14,
		color: '#eea',
		textTransform: 'capitalize',
		marginBottom: 10,
	},
	tempRange: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	tempText: {
		fontSize: 16,
		color: '#eea',
	},
	details: {
		marginTop: 10,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: '#eea',
	},
	detailText: {
		fontSize: 12,
		color: '#eea',
		marginVertical: 2,
	},
});
