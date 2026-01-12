import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faStar, faMapMarkerAlt, faClock, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CuisineView = ({ category, onBack, onRestaurantPress }) => {
    const restaurants = useAppStore(state => state.restaurants);

    const filteredRestaurants = restaurants.filter(r =>
        r.cuisine.toLowerCase().includes(category.name.toLowerCase()) ||
        category.name === 'Local Special' ||
        category.name === 'Vegetarian'
    ).sort((a, b) => b.rating - a.rating);

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark px-4 pt-12">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={onBack} className="p-2 bg-accent-light dark:bg-accent-dark/20 rounded-full">
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="#FF9800" />
                </TouchableOpacity>
                <Text className="ml-4 text-2xl font-bold text-text-light dark:text-text-dark">
                    {category.name} near you
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredRestaurants.map((res, index) => (
                    <TouchableOpacity
                        key={res.id}
                        onPress={() => onRestaurantPress(res)}
                        className="mb-4 p-5 bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-sm border border-primary/5 flex-row items-center"
                    >
                        <View className="flex-1">
                            <View className="flex-row items-center mb-1">
                                {index === 0 && <Text className="mr-2">🏆</Text>}
                                <Text className="text-xl font-bold text-text-light dark:text-text-dark">
                                    {res.name}
                                </Text>
                            </View>

                            <View className="flex-row items-center mb-3">
                                <View className="flex-row items-center bg-primary/10 px-2 py-1 rounded-lg mr-3">
                                    <FontAwesomeIcon icon={faStar} size={14} color="#FF9800" />
                                    <Text className="ml-1 font-bold text-primary-dark dark:text-primary-light">
                                        {res.rating}
                                    </Text>
                                </View>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                                    ({res.reviews} ratings)
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <View className="flex-row items-center mr-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={12} color="#9CA3AF" />
                                    <Text className="ml-1 text-xs text-gray-500">{res.distance}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <FontAwesomeIcon icon={faClock} size={12} color="#9CA3AF" />
                                    <Text className="ml-1 text-xs text-gray-500">{res.time}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="items-end">
                            <Text className={`text-xs font-bold mb-2 ${res.status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
                                {res.status}
                            </Text>
                            <View className="p-2 bg-accent-light dark:bg-accent-dark/20 rounded-full">
                                <FontAwesomeIcon icon={faChevronRight} size={20} color="#FF9800" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CuisineView;
