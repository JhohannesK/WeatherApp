import { FlatList, StyleSheet, Text, View } from 'react-native';
import { IForecastItem } from '../_types';
import { convertToCelsius } from '../utils';

interface HourlyForecastProps {
	hourlyData: IForecastItem[];
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString('en-us', { hour: 'numeric', hour12: true });
	};

	const renderHourlyItem = ({ item }: { item: IForecastItem }) => {
		const weather = item.weather[0];
		return (
			<View style={styles.hourItem}>
				<Text style={styles.time}>{formatTime(item.dt)}</Text>
				<Text style={styles.temp}>{convertToCelsius(item.main.temp)}°</Text>
				<Text style={styles.description} numberOfLines={1}>
					{weather.description}
				</Text>
				<Text style={styles.humidity}>{item.main.humidity}%</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>24-Hour Forecast</Text>
			<FlatList
				data={hourlyData.slice(0, 24)}
				renderItem={renderHourlyItem}
				keyExtractor={(item) => item.dt.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 15,
		paddingHorizontal: 5,
	},
	listContent: {
		paddingHorizontal: 5,
	},
	hourItem: {
		backgroundColor: 'black',
		borderRadius: 15,
		padding: 15,
		marginRight: 10,
		alignItems: 'center',
		width: 100,
	},
	time: {
		fontSize: 12,
		color: '#eea',
		marginBottom: 8,
		fontWeight: '600',
	},
	temp: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#eea',
		marginBottom: 5,
	},
	description: {
		fontSize: 10,
		color: '#eea',
		textTransform: 'capitalize',
		textAlign: 'center',
		marginBottom: 5,
	},
	humidity: {
		fontSize: 10,
		color: '#eea',
		opacity: 0.8,
	},
});
