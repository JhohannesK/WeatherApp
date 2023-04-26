import axios from 'axios';
import { useState } from 'react';
import { GeoResponse } from '../../_types';

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

export const useGeoLocation = () => {
	const [data, setData] = useState<Pick<GeoResponse, 'city' | 'regionCode'>>();
	console.log('🚀 ~ file: search.tsx:19 ~ useGeoLocation ~ data:', data);
	const getGeoLocation = (location: string) => {
		axios
			.request(getUrl(location))
			.then(function (response) {
				console.log('this data', response.data);
				setData(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	return {
		getGeoLocation,
		data,
	};
};
