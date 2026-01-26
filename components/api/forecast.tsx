import axios from 'axios';
import Constants from 'expo-constants';
import { IForecast5Day, IHourlyForecast } from '../../_types';

const RAPIDAPI_KEY = Constants.expoConfig?.extra?.RAPIDAPI_KEY ?? '';

const get5DayForecastOptions = (lat: number, lon: number) => {
	return {
		method: 'GET',
		url: 'https://open-weather13.p.rapidapi.com/forecast/5days',
		params: { lat: `${lat}`, lon: `${lon}` },
		headers: {
			'X-RapidAPI-Key': RAPIDAPI_KEY,
			'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
		},
	};
};

const getHourlyForecastOptions = (lat: number, lon: number) => {
	return {
		method: 'GET',
		url: 'https://open-weather13.p.rapidapi.com/forecast/hourly',
		params: { lat: `${lat}`, lon: `${lon}` },
		headers: {
			'X-RapidAPI-Key': RAPIDAPI_KEY,
			'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
		},
	};
};

export const get5DayForecast = async (lat: number, lon: number): Promise<IForecast5Day> => {
	try {
		const response = await axios.request(get5DayForecastOptions(lat, lon));
		return response.data;
	} catch (error) {
		console.error('5-Day Forecast API Error:', error);
		throw error;
	}
};

export const getHourlyForecast = async (lat: number, lon: number): Promise<IHourlyForecast> => {
	try {
		const response = await axios.request(getHourlyForecastOptions(lat, lon));
		return response.data;
	} catch (error) {
		console.error('Hourly Forecast API Error:', error);
		throw error;
	}
};
