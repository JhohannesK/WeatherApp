import axios from 'axios';

const options = {
	method: 'GET',
	url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
	params: { namePrefix: 'kumasi', countryIds: 'Gh' },
	headers: {
		'X-RapidAPI-Key': '71156a074amshb03fcd9292793aep19c323jsn5519e168243d',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	},
};

export const startSearch = () => {
	axios
		.request(options)
		.then(function (response) {
			console.log('this data', response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
};
