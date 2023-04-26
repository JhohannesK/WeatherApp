import { Route } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

type MyRoute = Route<'Forecast', { name: string }>;

const Forecast = ({
	navigation,
	route,
}: {
	navigation: any;
	route: MyRoute;
}) => {
	const { name } = route.params;
	console.log('🚀 ~ file: Forecast.tsx:8 ~ Forecast ~ location:', name);
	return (
		<View>
			<Text>hello</Text>
			<Button title='Go back' onPress={() => navigation.goBack()} />
		</View>
	);
};

export default Forecast;
