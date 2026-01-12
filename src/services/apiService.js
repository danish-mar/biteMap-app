import axios from 'axios';
import { RESTAURANTS as MOCK_RESTAURANTS } from '../data/mockData';

const OPEN_WEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Placeholder/Demo key if not provided

export const apiService = {
    // Fetch restaurants via Overpass API (OpenStreetMap)
    fetchRestaurants: async (lat, lon, radius = 1000) => {
        // Optimized query: 1000m radius, 'nwr' shorthand, and 'out center' for efficiency
        const query = `[out:json][timeout:15];nwr["amenity"="restaurant"](around:${radius},${lat},${lon});out center;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url);

            if (!response.data.elements || response.data.elements.length === 0) {
                return [];
            }

            return response.data.elements
                .map(e => {
                    const tags = e.tags || {};
                    return {
                        id: e.id.toString(),
                        name: tags.name || 'Unnamed Restaurant',
                        cuisine: tags.cuisine || 'Various',
                        rating: (4.0 + Math.random() * 0.9).toFixed(1),
                        reviews: Math.floor(Math.random() * 500) + 50,
                        distance: 'Nearby',
                        status: 'Open',
                        address: tags['addr:street'] || tags['addr:full'] || 'Nearby',
                        location: {
                            latitude: e.lat || e.center?.lat,
                            longitude: e.lon || e.center?.lon
                        },
                        hours: tags.opening_hours || 'Sun-Sat 11:00 AM - 10:00 PM',
                        // Advanced Data
                        phone: tags.phone || tags['contact:phone'],
                        website: tags.website || tags['contact:website'],
                        dietary: {
                            vegetarian: tags['diet:vegetarian'] === 'yes',
                            vegan: tags['diet:vegan'] === 'yes',
                            gluten_free: tags['diet:gluten_free'] === 'yes'
                        },
                        facilities: {
                            wifi: tags.wifi === 'yes' || tags.internet_access === 'wlan',
                            outdoor: tags.outdoor_seating === 'yes',
                            wheelchair: tags.wheelchair === 'yes'
                        },
                        payment: {
                            cards: tags['payment:credit_cards'] === 'yes' || tags['payment:debit_cards'] === 'yes',
                            cash: tags['payment:cash'] !== 'no'
                        }
                    };
                })
                .filter(res => res.location.latitude && res.location.longitude)
                .slice(0, 20);
        } catch (error) {
            console.warn('Overpass API failed, using fallback data:', error.message);
            // Fallback to randomized mock data near the requested location
            return MOCK_RESTAURANTS.map(res => ({
                ...res,
                location: {
                    latitude: lat + (Math.random() - 0.5) * 0.01,
                    longitude: lon + (Math.random() - 0.5) * 0.01
                }
            }));
        }
    },

    // Search location via Nominatim (OpenStreetMap Geocoding)
    searchLocation: async (query) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            const loc = response.data[0];
            return {
                name: loc.display_name.split(',')[0],
                fullName: loc.display_name,
                latitude: parseFloat(loc.lat),
                longitude: parseFloat(loc.lon)
            };
        }
        return null;
    },

    // Fetch weather data via OpenWeatherMap
    fetchWeather: async (lat, lon) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
            const response = await axios.get(url);
            return {
                temp: Math.round(response.data.main.temp),
                condition: response.data.weather[0].main,
                icon: response.data.weather[0].icon
            };
        } catch (error) {
            console.warn('Weather fetch failed', error);
            return null;
        }
    }
};
