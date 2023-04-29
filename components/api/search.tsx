import axios from 'axios';
import { useState } from 'react';
import { GeoLocation } from '../../_types';

const getUrl = (location: string) => {
	const options = {
		method: 'GET',
		url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
		params: { namePrefix: `${location}`, countryIds: 'Gh' },
		headers: {
			'X-RapidAPI-Key': '71156a074amshb03fcd9292793aep19c323jsn5519e168243d',
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
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
		axios
			.request(getUrl(location))
			.then(function (response) {
				const { longitude, latitude } = response.data.data[0];
				onSucess && onSucess(latitude, longitude);
				setData({ longitude, latitude });
				setError(false);
			})
			.catch(function (error) {
				setError(true);
			});
	};
	return {
		getGeoLocation,
		data,
		error,
	};
};
