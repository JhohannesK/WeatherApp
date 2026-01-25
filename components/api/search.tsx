import axios from 'axios';
import { useState } from 'react';
import { GeoLocation } from '../../_types';
import Constants from 'expo-constants';

const RAPIDAPI_KEY = Constants.expoConfig?.extra?.RAPIDAPI_KEY ?? '';

const getUrl = (location: string) => {
	const options = {
		method: 'GET',
		url: 'https://open-weather13.p.rapidapi.com/city',
		params: { city: `${location}`, lang: 'EN' },
		headers: {
			'X-RapidAPI-Key': RAPIDAPI_KEY,
			'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
		},
	};
	return options;
};

export const useGeoLocation = (
	onSucess: (latitude: number, longitude: number) => void
) => {
	const [data, setData] = useState<GeoLocation>();
	const [error, setError] = useState<Boolean>(false);
	const getGeoLocation = (location: string) => {
		setError(false);
		axios
			.request(getUrl(location))
			.then((response) => {
				if (response.data && response.data.coord) {
					const { lat, lon } = response.data.coord;
					onSucess && onSucess(lat, lon);
					setData({ latitude: lat, longitude: lon });
					setError(false);
				} else {
					console.error('Invalid response structure:', response.data);
					setError(true);
				}
			})
			.catch((error) => {
				console.error('GeoLocation API Error:', error.response?.data || error.message);
				setError(true);
			});
	};
	return {
		getGeoLocation,
		data,
		error,
	};
};
