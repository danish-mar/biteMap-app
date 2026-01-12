import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, TextInput } from 'react-native';
import { CATEGORIES } from '../data/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faMapMarkerAlt, faStar, faCloudSun, faTemperatureHigh, faCircleNotch, faLeaf, faWifi, faCouch } from '@fortawesome/free-solid-svg-icons';
import WebMap from '../components/WebMap';
import { useAppStore } from '../store/useAppStore';
import debounce from 'lodash.debounce';

const { height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const Home = ({ onCategoryPress, onRestaurantPress }) => {
    const [activeCategory, setActiveCategory] = useState('1');
    const [searchText, setSearchText] = useState('');

    const {
        restaurants,
        weather,
        currentLocation,
        isLoading,
        searchAndMove
    } = useAppStore();

    const handleSearch = useCallback(
        debounce((query) => {
            if (query.length > 2) {
                searchAndMove(query);
            }
        }, 800),
        []
    );

    return (
        <View className="flex-1 overflow-hidden">
            {/* Interactive Map Background */}
            <View className="absolute inset-0 bg-accent-light dark:bg-background-dark">
                {isWeb ? (
                    <WebMap
                        restaurants={restaurants}
                        onRestaurantPress={onRestaurantPress}
                        center={[currentLocation.latitude, currentLocation.longitude]}
                    />
                ) : (
                    <View className="flex-1 items-center justify-center bg-primary/10">
                        <Text className="text-primary font-bold">Map Placeholder (Mobile)</Text>
                    </View>
                )}
            </View>

            {/* Loading Indicator */}
            {isLoading && (
                <View className="absolute top-28 left-0 right-0 items-center z-50">
                    <View className="bg-white/90 dark:bg-black/60 px-4 py-2 rounded-full flex-row items-center border border-primary/20">
                        <View className="animate-spin mr-2">
                            <FontAwesomeIcon icon={faCircleNotch} size={14} color="#FF9800" />
                        </View>
                        <Text className="text-primary font-bold text-xs">Finding best spots...</Text>
                    </View>
                </View>
            )}

            {/* Top UI Area */}
            <View className="absolute top-12 left-4 right-4 z-50">
                {/* Search Bar */}
                <View className="flex-row items-center bg-surface-light dark:bg-surface-dark px-4 py-3 rounded-2xl shadow-lg border border-primary/20 mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#FF9800" />
                    <TextInput
                        className="ml-2 flex-1 text-text-light dark:text-text-dark font-medium outline-none"
                        placeholder="Search a city..."
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            handleSearch(text);
                        }}
                    />
                    <TouchableOpacity className="p-1">
                        <FontAwesomeIcon icon={faSearch} size={18} color="#FF9800" />
                    </TouchableOpacity>
                </View>

                {/* Weather & Location Status */}
                <View className="flex-row justify-between items-center px-2">
                    <View className="bg-white/80 dark:bg-black/40 px-3 py-1.5 rounded-xl border border-white/20">
                        <Text className="text-text-light dark:text-text-dark text-xs font-bold uppercase tracking-wider">
                            {currentLocation.name}
                        </Text>
                    </View>

                    {weather && (
                        <View className="bg-orange-500/90 px-3 py-1.5 rounded-xl flex-row items-center shadow-sm">
                            <FontAwesomeIcon icon={faTemperatureHigh} size={12} color="white" />
                            <Text className="text-white font-bold ml-1.5 text-xs">{weather.temp}°C</Text>
                            <View className="w-[1px] h-3 bg-white/30 mx-2" />
                            <Text className="text-white font-medium text-[10px] uppercase">{weather.condition}</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Bottom Sheet UI */}
            <View className="absolute bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark rounded-t-[40px] shadow-2xl pb-8" style={{ height: height * 0.45 }}>
                <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full self-center my-4" />

                <View className="px-6">
                    <Text className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                        Restaurants near you
                    </Text>

                    {/* Categories Chips */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => {
                                    setActiveCategory(cat.id);
                                    onCategoryPress(cat);
                                }}
                                className={`mr-3 px-6 py-3 rounded-2xl flex-row items-center ${activeCategory === cat.id
                                    ? 'bg-primary shadow-md'
                                    : 'bg-accent-light dark:bg-accent-dark/20 border border-primary/10'
                                    }`}
                            >
                                <Text className="mr-2 text-lg">{cat.icon}</Text>
                                <Text className={`font-semibold ${activeCategory === cat.id ? 'text-white' : 'text-text-light dark:text-text-dark'
                                    }`}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Featured Cards */}
                    <Text className="text-lg font-bold text-text-light dark:text-text-dark mb-3">Top Rated</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {restaurants.map((res) => (
                            <TouchableOpacity
                                key={res.id}
                                onPress={() => onRestaurantPress(res)}
                                className="mr-4 p-4 bg-accent-light/30 dark:bg-accent-dark/10 rounded-3xl border border-primary/5 w-64"
                            >
                                <View className="flex-row justify-between items-start mb-2">
                                    <Text className="text-lg font-bold text-text-light dark:text-text-dark flex-1" numberOfLines={1}>
                                        {res.name}
                                    </Text>
                                    <View className="flex-row items-center bg-primary/20 px-2 py-1 rounded-lg">
                                        <FontAwesomeIcon icon={faStar} size={12} color="#FF9800" />
                                        <Text className="ml-1 text-xs font-bold text-primary-dark dark:text-primary-light">
                                            {res.rating}
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm mb-2">{res.cuisine} • {res.distance}</Text>

                                <View className="flex-row items-center mb-3">
                                    {res.dietary?.vegetarian && <FontAwesomeIcon icon={faLeaf} size={10} color="#10B981" className="mr-2" />}
                                    {res.facilities?.wifi && <FontAwesomeIcon icon={faWifi} size={10} color="#3B82F6" className="mr-2" />}
                                    {res.facilities?.outdoor && <FontAwesomeIcon icon={faCouch} size={10} color="#FF9800" className="mr-2" />}
                                </View>

                                <View className="flex-row items-center">
                                    <View className={`w-2 h-2 rounded-full mr-2 ${res.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <Text className="text-xs text-gray-600 dark:text-gray-300">{res.status}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Home;
