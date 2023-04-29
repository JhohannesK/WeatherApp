import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Forecast from './components/Forecast';
import { SafeAreaView } from 'react-native';

type RootStackParamList = {
	Home: undefined;
	Forecast: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Forecast' component={Forecast} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
