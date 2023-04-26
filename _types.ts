export interface SearchInputProps {
	displayLocation: (location: string) => void;
	navigation: any;
}

export type GeoResponse = {
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
