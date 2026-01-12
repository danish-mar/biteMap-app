import { create } from 'zustand';
import { apiService } from '../services/apiService';

export const useAppStore = create((set, get) => ({
    restaurants: [],
    weather: null,
    currentLocation: {
        name: 'Bangalore',
        latitude: 12.9716,
        longitude: 77.5946
    },
    isLoading: false,
    error: null,

    // Actions
    fetchDataForLocation: async (lat, lon, name) => {
        set({ isLoading: true, error: null });
        try {
            const [restaurants, weather] = await Promise.all([
                apiService.fetchRestaurants(lat, lon),
                apiService.fetchWeather(lat, lon)
            ]);

            set({
                restaurants,
                weather,
                currentLocation: { name, latitude: lat, longitude: lon },
                isLoading: false
            });
        } catch (err) {
            console.warn('Store fetch failed', err);
            // We don't set a blocking error here because the service now returns fallback data
            set({ isLoading: false });
        }
    },

    searchAndMove: async (query) => {
        set({ isLoading: true });
        try {
            const loc = await apiService.searchLocation(query);
            if (loc) {
                await get().fetchDataForLocation(loc.latitude, loc.longitude, loc.name);
            } else {
                set({ error: 'Location not found', isLoading: false });
            }
        } catch (err) {
            set({ error: 'Search failed', isLoading: false });
        }
    }
}));
