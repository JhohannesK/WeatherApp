import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'weather',
	slug: 'weather',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	scheme: 'weather app',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#ffffff',
		},
		package: 'com.jhohannes.weather',
	},
	web: {
		favicon: './assets/favicon.png',
	},
	extra: {
		eas: {
			projectId: '327f351f-ba40-41fd-8572-7f388c245df8',
		},
		RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
	},
	plugins: ['expo-router'],
});
