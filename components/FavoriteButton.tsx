import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';

interface FavoriteButtonProps {
	cityName: string;
}

export default function FavoriteButton({ cityName }: FavoriteButtonProps) {
	const [favorited, setFavorited] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkFavorite = async () => {
			if (cityName) {
				const isFav = await isFavorite(cityName);
				setFavorited(isFav);
				setLoading(false);
			}
		};
		checkFavorite();
	}, [cityName]);

	const handleToggle = async () => {
		if (loading || !cityName) return;

		try {
			if (favorited) {
				await removeFavorite(cityName);
				setFavorited(false);
			} else {
				await addFavorite(cityName);
				setFavorited(true);
			}
		} catch (error) {
			console.error('Error toggling favorite:', error);
		}
	};

	if (loading || !cityName) {
		return null;
	}

	return (
		<TouchableOpacity style={styles.button} onPress={handleToggle}>
			<Ionicons
				name={favorited ? 'heart' : 'heart-outline'}
				size={28}
				color={favorited ? '#eea' : '#333'}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
});
