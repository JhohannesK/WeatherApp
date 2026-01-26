import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFavoriteLocation } from '../_types';

const FAVORITES_KEY = '@weather_app_favorites';

export const getFavorites = async (): Promise<IFavoriteLocation[]> => {
	try {
		const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
		return jsonValue != null ? JSON.parse(jsonValue) : [];
	} catch (error) {
		console.error('Error getting favorites:', error);
		return [];
	}
};

export const addFavorite = async (name: string): Promise<void> => {
	try {
		const favorites = await getFavorites();
		const exists = favorites.some((fav) => fav.name.toLowerCase() === name.toLowerCase());
		if (!exists) {
			const newFavorite: IFavoriteLocation = {
				name,
				timestamp: Date.now(),
			};
			await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, newFavorite]));
		}
	} catch (error) {
		console.error('Error adding favorite:', error);
		throw error;
	}
};

export const removeFavorite = async (name: string): Promise<void> => {
	try {
		const favorites = await getFavorites();
		const filtered = favorites.filter((fav) => fav.name.toLowerCase() !== name.toLowerCase());
		await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
	} catch (error) {
		console.error('Error removing favorite:', error);
		throw error;
	}
};

export const isFavorite = async (name: string): Promise<boolean> => {
	try {
		const favorites = await getFavorites();
		return favorites.some((fav) => fav.name.toLowerCase() === name.toLowerCase());
	} catch (error) {
		console.error('Error checking favorite:', error);
		return false;
	}
};
