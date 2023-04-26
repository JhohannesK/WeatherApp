import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Forecast from './components/Forecast';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Forecast' component={Forecast} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
