import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { IForecast } from '../_types';

interface MetricsCardProps {
	forecastData: IForecast;
}

export default function MetricsCard({ forecastData }: MetricsCardProps) {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<FontAwesome5 name="tachometer-alt" size={46} color={'#eea'} />
				<Text style={styles.info}>{forecastData.main.pressure} hPa</Text>
				<Text style={styles.text}>Pressure</Text>
			</View>
			<View style={styles.innerContainer}>
				<FontAwesome5 name="eye" size={46} color={'#eea'} />
				<Text style={styles.info}>
					{forecastData.visibility ? (forecastData.visibility / 1000).toFixed(1) : 'N/A'} km
				</Text>
				<Text style={styles.text}>Visibility</Text>
			</View>
			<View style={styles.innerContainer}>
				<FontAwesome5 name="cloud" size={46} color={'#eea'} />
				<Text style={styles.info}>{forecastData.clouds.all}%</Text>
				<Text style={styles.text}>Cloud Cover</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 35,
		backgroundColor: 'black',
		borderRadius: 50,
		padding: 40,
		marginTop: 20,
	},
	innerContainer: {
		alignItems: 'center',
	},
	info: {
		color: '#eea',
		fontSize: 16,
		marginTop: 8,
	},
	text: {
		color: '#eea',
		fontSize: 12,
		marginTop: 4,
	},
});
