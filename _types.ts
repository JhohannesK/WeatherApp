export interface SearchInputProps {
	displayLocation: (location: string) => void;
	navigation: any;
}

export type ResponseType = {
	id: number;
	wikiDataId: string;
	type: string;
	city: string;
	name: string;
	country: string;
	countryCode: string;
	region: string;
	regionCode: string;
	regionWdId: string;
	latitude: number;
	longitude: number;
	population: number;
};

export interface GeoLocation {
	latitude: number;
	longitude: number;
}

export interface IForecast {
	cloud_pct: number;
	feels_like: number;
	humidity: number;
	max_temp: number;
	min_temp: number;
	sunrise: number;
	sunset: number;
	temp: number;
	wind_speed: number;
	wind_degree: number;
}
