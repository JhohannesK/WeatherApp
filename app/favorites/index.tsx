import { useEffect, useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IFavoriteLocation } from '../../_types';
import { getFavorites, removeFavorite } from '../../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
	const router = useRouter();
	const [favorites, setFavorites] = useState<IFavoriteLocation[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadFavorites();
	}, []);

	const loadFavorites = async () => {
		try {
			const favs = await getFavorites();
			setFavorites(favs);
		} catch (error) {
			console.error('Error loading favorites:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleRemove = async (name: string) => {
		try {
			await removeFavorite(name);
			await loadFavorites();
		} catch (error) {
			console.error('Error removing favorite:', error);
		}
	};

	const handlePress = (name: string) => {
		router.push(`/forecast/${name}`);
	};

	const renderFavorite = ({ item }: { item: IFavoriteLocation }) => (
		<TouchableOpacity
			style={styles.favoriteItem}
			onPress={() => handlePress(item.name)}
		>
			<View style={styles.favoriteContent}>
				<Ionicons name="location" size={24} color="#eea" />
				<Text style={styles.favoriteName}>{item.name}</Text>
			</View>
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => handleRemove(item.name)}
			>
				<Ionicons name="trash-outline" size={20} color="#ff4444" />
			</TouchableOpacity>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.loading}>Loading favorites...</Text>
			</SafeAreaView>
		);
	}

	if (favorites.length === 0) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.emptyContainer}>
					<Ionicons name="heart-outline" size={64} color="#999" />
					<Text style={styles.emptyText}>No favorites yet</Text>
					<Text style={styles.emptySubtext}>
						Add cities to favorites from the forecast screen
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Favorite Locations</Text>
			</View>
			<FlatList
				data={favorites}
				renderItem={renderFavorite}
				keyExtractor={(item) => item.name}
				contentContainerStyle={styles.listContent}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eea',
		paddingTop: 60,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#333',
	},
	listContent: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	favoriteItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'black',
		borderRadius: 15,
		padding: 20,
		marginBottom: 15,
	},
	favoriteContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	favoriteName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#eea',
		marginLeft: 15,
	},
	deleteButton: {
		padding: 5,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	emptyText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 20,
		marginBottom: 10,
	},
	emptySubtext: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
	loading: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
		marginTop: 50,
	},
});
