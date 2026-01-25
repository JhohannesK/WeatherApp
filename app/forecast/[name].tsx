import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useGeoLocation } from '../../components/api/search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IForecast } from '../../_types';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';

const RAPIDAPI_KEY = Constants.expoConfig?.extra?.RAPIDAPI_KEY ?? '';

const options = (lat: number, lon: number) => {
    return {
        method: 'GET',
        url: 'https://open-weather13.p.rapidapi.com/latlon',
        params: { latitude: `${lat}`, longitude: `${lon}` },
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
        },
    };
};

const displayDate = () => {
    const date = new Date();
    const dayOfWeek = date
        .toLocaleString('en-us', { weekday: 'long' })
        .split(',')[0];
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'long' });

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

    return <Text style={styles.date}>{formattedDate}</Text>;
};

export default function Forecast() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const router = useRouter();
    const [forecastData, setForecastData] = useState<IForecast>();
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const { getGeoLocation, error: geoError } = useGeoLocation((latitude, longitude) => {
        setLoading(true);
        setApiError(false);

        axios
            .request(options(latitude, longitude))
            .then((response) => {
                setForecastData(response.data);
                setApiError(false);
            })
            .catch((error) => {
                console.error('Weather API Error:', error);
                setApiError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    });

    useEffect(() => {
        if (name) {
            setLoading(true);
            getGeoLocation(name);
        }
    }, [name]);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View>
                    <Text style={styles.loading}>Loading weather data...</Text>
                </View>
            ) : geoError || apiError ? (
                <View>
                    <Text style={styles.error}>
                        An error occurred while fetching data
                    </Text>
                    <Text style={styles.errorText}>
                        {geoError
                            ? `Unable to find location: ${name}. Please check the city name.`
                            : 'Unable to fetch weather data. Please check your internet connection and API key.'}
                    </Text>
                    <View style={styles.button}>
                        <Button
                            title="Go back"
                            onPress={() => router.back()}
                            color={'transparent'}
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={styles.location}>
                        {name?.[0].toUpperCase() + name?.substring(1)}
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'black',
                            borderRadius: 70,
                            paddingVertical: 5 * 2,
                            paddingHorizontal: 7 * 2,
                        }}
                    >
                        {displayDate()}
                    </View>
                    <Text style={styles.temp}>{forecastData?.temp}&#176;</Text>
                    <View style={styles.summary}>
                        <Text style={styles.summaryTitle}>Data Summary</Text>
                        <Text style={styles.summaryDesc}>
                            It actually feels like {forecastData?.feels_like}&#176; now
                        </Text>
                        <Text style={styles.summaryDesc}>
                            The temperature is felt between {forecastData?.min_temp}
                            &#176; and {forecastData?.max_temp}&#176;
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.innerContainer}>
                            <FontAwesome5 name="wind" size={46} color={'#eea'} />
                            <Text style={styles.info}>
                                {forecastData?.wind_speed}km/h
                            </Text>
                            <Text style={styles.text}>Wind-speed</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <FontAwesome5 name="tint" size={46} color={'#eea'} />
                            <Text style={styles.info}>{forecastData?.humidity}%</Text>
                            <Text style={styles.text}>Humidity</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <FontAwesome5 name="location-arrow" size={46} color={'#eea'} />
                            <Text style={styles.info}>
                                {forecastData?.wind_degrees}&#176;
                            </Text>
                            <Text style={styles.text}>Wind-direction</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Go back"
                            onPress={() => router.back()}
                            color={'transparent'}
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eea',
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },

    location: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    date: {
        fontSize: 20,
        textAlign: 'center',
        color: '#eea',
    },

    temp: {
        fontSize: 180,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    summary: {
        width: '100%',
        marginBottom: 30,
    },

    summaryTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    summaryDesc: {
        fontSize: 13,
    },

    infoContainer: {
        flexDirection: 'row',
        gap: 35,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 40,
    },

    innerContainer: {
        alignItems: 'center',
    },

    info: {
        color: '#eea',
    },

    text: { color: '#eea' },

    button: {
        backgroundColor: 'black',
        color: '#eea',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 20,
    },

    error: {
        fontSize: 20,
        color: 'red',
        fontWeight: '500',
        marginBottom: 10,
    },

    errorText: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },

    loading: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});
