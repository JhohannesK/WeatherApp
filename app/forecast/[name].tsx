import {
	Button,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useGeoLocation } from '../../components/api/search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IForecast, IForecast5Day, IHourlyForecast } from '../../_types';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { convertToCelsius } from '../../utils';
import { get5DayForecast, getHourlyForecast } from '../../components/api/forecast';
import FavoriteButton from '../../components/FavoriteButton';
import MetricsCard from '../../components/MetricsCard';
import HourlyForecast from '../../components/HourlyForecast';
import ForecastCard from '../../components/ForecastCard';

const RAPIDAPI_KEY = Constants.expoConfig?.extra?.RAPIDAPI_KEY ?? '';

const options = (lat: number, lon: number) => {
	return {
		method: 'GET',
		url: 'https://open-weather13.p.rapidapi.com/latlon',
		params: { latitude: `${lat}`, longitude: `${lon}` },
		headers: {
			'X-RapidAPI-Key': RAPIDAPI_KEY,
			'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
		},
	};
};

const displayDate = () => {
	const date = new Date();
	const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }).split(',')[0];
	const dayOfMonth = date.getDate();
	const month = date.toLocaleString('en-us', { month: 'long' });

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

	return <Text style={styles.date}>{formattedDate}</Text>;
};

type TabType = 'current' | 'hourly' | '5day';

export default function Forecast() {
	const { name } = useLocalSearchParams<{ name: string }>();
	const router = useRouter();
	const [forecastData, setForecastData] = useState<IForecast>();
	const [hourlyData, setHourlyData] = useState<IHourlyForecast>();
	const [fiveDayData, setFiveDayData] = useState<IForecast5Day>();
	const [loading, setLoading] = useState(true);
	const [apiError, setApiError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [activeTab, setActiveTab] = useState<TabType>('current');
	const [currentLat, setCurrentLat] = useState<number>();
	const [currentLon, setCurrentLon] = useState<number>();

	const fetchAllData = async (latitude: number, longitude: number) => {
		setLoading(true);
		setApiError(false);

		try {
			const [currentResponse, hourlyResponse, fiveDayResponse] = await Promise.allSettled([
				axios.request(options(latitude, longitude)),
				getHourlyForecast(latitude, longitude),
				get5DayForecast(latitude, longitude),
			]);

			if (currentResponse.status === 'fulfilled') {
				setForecastData(currentResponse.value.data);
			} else {
				console.error('Current weather error:', currentResponse.reason);
				setApiError(true);
			}

			if (hourlyResponse.status === 'fulfilled') {
				setHourlyData(hourlyResponse.value);
			} else {
				console.error('Hourly forecast error:', hourlyResponse.reason);
			}

			if (fiveDayResponse.status === 'fulfilled') {
				setFiveDayData(fiveDayResponse.value);
			} else {
				console.error('5-day forecast error:', fiveDayResponse.reason);
			}
		} catch (error) {
			console.error('Weather API Error:', error);
			setApiError(true);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const { getGeoLocation, error: geoError } = useGeoLocation((latitude, longitude) => {
		setCurrentLat(latitude);
		setCurrentLon(longitude);
		fetchAllData(latitude, longitude);
	});

	const onRefresh = async () => {
		if (currentLat && currentLon) {
			setRefreshing(true);
			await fetchAllData(currentLat, currentLon);
		} else if (name) {
			setRefreshing(true);
			getGeoLocation(name);
		}
	};

	useEffect(() => {
		if (name) {
			setLoading(true);
			getGeoLocation(name);
		}
	}, [name]);

	const renderCurrentTab = () => {
		if (!forecastData) return null;

		const weather = forecastData.weather;
		const description = weather.description;

		return (
			<View>
				<Text style={styles.location}>
					{name?.[0].toUpperCase() + name?.substring(1)}
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
				<Text style={styles.temp}>
					{convertToCelsius(forecastData?.main.temp ?? 0)}°
				</Text>
				<Text style={styles.weatherDescription}>{description}</Text>
				<View style={styles.summary}>
					<Text style={styles.summaryTitle}>Data Summary</Text>
					<Text style={styles.summaryDesc}>
						It actually feels like {convertToCelsius(forecastData?.main.feels_like ?? 0)}°
						now
					</Text>
					<Text style={styles.summaryDesc}>
						The temperature is felt between{' '}
						{convertToCelsius(forecastData?.main.temp_min ?? 0)}° and{' '}
						{convertToCelsius(forecastData?.main.temp_max ?? 0)}°
					</Text>
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.innerContainer}>
						<FontAwesome5 name="wind" size={46} color={'#eea'} />
						<Text style={styles.info}>{forecastData?.wind.speed}km/h</Text>
						<Text style={styles.text}>Wind-speed</Text>
					</View>
					<View style={styles.innerContainer}>
						<FontAwesome5 name="tint" size={46} color={'#eea'} />
						<Text style={styles.info}>{forecastData?.main.humidity}%</Text>
						<Text style={styles.text}>Humidity</Text>
					</View>
					<View style={styles.innerContainer}>
						<FontAwesome5 name="location-arrow" size={46} color={'#eea'} />
						<Text style={styles.info}>{forecastData?.wind.deg}°</Text>
						<Text style={styles.text}>Wind-direction</Text>
					</View>
				</View>
				<MetricsCard forecastData={forecastData} />
			</View>
		);
	};

	const renderHourlyTab = () => {
		if (!hourlyData || !hourlyData.list) {
			return (
				<View style={styles.emptyTab}>
					<Text style={styles.emptyText}>Hourly forecast data not available</Text>
				</View>
			);
		}
		return <HourlyForecast hourlyData={hourlyData.list} />;
	};

	const render5DayTab = () => {
		if (!fiveDayData || !fiveDayData.list) {
			return (
				<View style={styles.emptyTab}>
					<Text style={styles.emptyText}>5-day forecast data not available</Text>
				</View>
			);
		}

		const dailyForecasts = fiveDayData.list.filter((item, index) => {
			if (index === 0) return true;
			const prevDate = new Date(fiveDayData.list[index - 1].dt * 1000);
			const currentDate = new Date(item.dt * 1000);
			return currentDate.getDate() !== prevDate.getDate();
		});

		return (
			<View style={styles.fiveDayContainer}>
				<Text style={styles.tabTitle}>5-Day Forecast</Text>
				{dailyForecasts.slice(0, 5).map((forecast) => (
					<ForecastCard key={forecast.dt} forecast={forecast} />
				))}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{loading && !refreshing ? (
				<View>
					<Text style={styles.loading}>Loading weather data...</Text>
				</View>
			) : geoError || apiError ? (
				<View>
					<Text style={styles.error}>An error occurred while fetching data</Text>
					<Text style={styles.errorText}>
						{geoError
							? `Unable to find location: ${name}. Please check the city name.`
							: 'Unable to fetch weather data. Please check your internet connection and API key.'}
					</Text>
					<View style={styles.button}>
						<Button title="Go back" onPress={() => router.back()} color={'transparent'} />
					</View>
				</View>
			) : (
				<View style={styles.contentContainer}>
					<View style={styles.header}>
						<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
							<FontAwesome5 name="arrow-left" size={24} color="#333" />
						</TouchableOpacity>
						<View style={styles.favoriteButtonContainer}>
							<FavoriteButton cityName={name || ''} />
						</View>
					</View>

					<View style={styles.tabContainer}>
						<TouchableOpacity
							style={[styles.tab, activeTab === 'current' && styles.activeTab]}
							onPress={() => setActiveTab('current')}
						>
							<Text
								style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}
							>
								Current
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.tab, activeTab === 'hourly' && styles.activeTab]}
							onPress={() => setActiveTab('hourly')}
						>
							<Text
								style={[styles.tabText, activeTab === 'hourly' && styles.activeTabText]}
							>
								Hourly
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.tab, activeTab === '5day' && styles.activeTab]}
							onPress={() => setActiveTab('5day')}
						>
							<Text
								style={[styles.tabText, activeTab === '5day' && styles.activeTabText]}
							>
								5-Day
							</Text>
						</TouchableOpacity>
					</View>

					<ScrollView
						style={styles.scrollView}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
						contentContainerStyle={styles.scrollContent}
					>
						{activeTab === 'current' && renderCurrentTab()}
						{activeTab === 'hourly' && renderHourlyTab()}
						{activeTab === '5day' && render5DayTab()}
					</ScrollView>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eea',
	},
	contentContainer: {
		flex: 1,
		paddingTop: 60,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 25,
		marginBottom: 20,
	},
	backButton: {
		padding: 10,
	},
	favoriteButtonContainer: {
		position: 'absolute',
		right: 25,
		top: 10,
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	tab: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
	activeTab: {
		backgroundColor: 'black',
	},
	tabText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	activeTabText: {
		color: '#eea',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 25,
		paddingBottom: 40,
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
	},
	temp: {
		fontSize: 180,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	weatherDescription: {
		fontSize: 18,
		textAlign: 'center',
		color: '#333',
		textTransform: 'capitalize',
		marginBottom: 20,
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
	text: {
		color: '#eea',
	},
	button: {
		backgroundColor: 'black',
		color: '#eea',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginTop: 20,
	},
	error: {
		fontSize: 20,
		color: 'red',
		fontWeight: '500',
		marginBottom: 10,
	},
	errorText: {
		fontSize: 14,
		color: 'red',
		textAlign: 'center',
		marginBottom: 20,
	},
	loading: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
	},
	emptyTab: {
		padding: 40,
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
	fiveDayContainer: {
		width: '100%',
	},
	tabTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 20,
	},
});
