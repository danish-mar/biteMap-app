import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faPhone, faClock, faLocationArrow, faStar, faGlobe, faWifi, faCouch, faLeaf, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const RestaurantDetail = ({ restaurant, onBack }) => {
    if (!restaurant) return null;

    const renderBadge = (icon, label, color) => (
        <View className={`flex-row items-center bg-${color}-500/10 px-3 py-1.5 rounded-full mr-2 mb-2 border border-${color}-500/20`}>
            <FontAwesomeIcon icon={icon} size={12} color={color === 'orange' ? '#FF9800' : color === 'green' ? '#10B981' : '#3B82F6'} />
            <Text className={`ml-1.5 text-[10px] font-bold text-${color}-600 uppercase tracking-tighter`}>{label}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            {/* Header Image Area */}
            <View className="h-64 bg-primary/20 items-center justify-center">
                <Text className="text-6xl">{restaurant.cuisine?.toLowerCase().includes('pizza') ? '🍕' : restaurant.cuisine?.toLowerCase().includes('burger') ? '🍔' : '🍽️'}</Text>
                <TouchableOpacity
                    onPress={onBack}
                    className="absolute top-12 left-6 p-3 bg-white/80 dark:bg-black/40 rounded-full"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#FF9800" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-background-light dark:bg-background-dark -mt-12 rounded-t-[48px] px-8 pt-8">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                        <Text className="text-3xl font-bold text-text-light dark:text-text-dark mb-1">
                            {restaurant.name}
                        </Text>
                        <Text className="text-primary font-semibold text-lg">{restaurant.cuisine}</Text>
                    </View>
                    <View className="items-end">
                        <View className="flex-row items-center bg-primary px-3 py-1.5 rounded-2xl shadow-md">
                            <FontAwesomeIcon icon={faStar} size={18} color="white" />
                            <Text className="ml-1 text-white font-bold text-lg">{restaurant.rating}</Text>
                        </View>
                        <Text className="text-gray-500 text-xs mt-1">{restaurant.reviews} reviews</Text>
                    </View>
                </View>

                {/* Dynamic Badges Row */}
                <View className="flex-row flex-wrap mt-4">
                    {restaurant.dietary?.vegetarian && renderBadge(faLeaf, 'Vegetarian', 'green')}
                    {restaurant.dietary?.vegan && renderBadge(faLeaf, 'Vegan', 'green')}
                    {restaurant.facilities?.wifi && renderBadge(faWifi, 'Free WiFi', 'blue')}
                    {restaurant.facilities?.outdoor && renderBadge(faCouch, 'Outdoor Seating', 'orange')}
                    {restaurant.payment?.cards && renderBadge(faCreditCard, 'Accepts Cards', 'blue')}
                </View>

                <View className="h-[1px] bg-gray-200 dark:bg-gray-800 my-6" />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex-row items-center mb-6">
                        <View className="p-3 bg-accent-light dark:bg-accent-dark/10 rounded-2xl mr-4">
                            <FontAwesomeIcon icon={faMapMarkerAlt} size={24} color="#FF9800" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-text-light dark:text-text-dark font-medium">{restaurant.address}</Text>
                            <Text className="text-gray-500 text-sm">{restaurant.distance} away</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center mb-6">
                        <View className="p-3 bg-accent-light dark:bg-accent-dark/10 rounded-2xl mr-4">
                            <FontAwesomeIcon icon={faClock} size={24} color="#FF9800" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-text-light dark:text-text-dark font-medium">{restaurant.status}</Text>
                            <Text className="text-gray-500 text-sm">{restaurant.hours}</Text>
                        </View>
                    </View>

                    {restaurant.phone && (
                        <View className="flex-row items-center mb-6">
                            <View className="p-3 bg-green-500/10 rounded-2xl mr-4">
                                <FontAwesomeIcon icon={faPhone} size={20} color="#10B981" />
                            </View>
                            <Text className="text-text-light dark:text-text-dark font-medium">{restaurant.phone}</Text>
                        </View>
                    )}

                    {restaurant.website && (
                        <TouchableOpacity
                            className="flex-row items-center mb-6"
                            onPress={() => Linking.openURL(restaurant.website)}
                        >
                            <View className="p-3 bg-blue-500/10 rounded-2xl mr-4">
                                <FontAwesomeIcon icon={faGlobe} size={20} color="#3B82F6" />
                            </View>
                            <Text className="text-blue-500 font-medium flex-1" numberOfLines={1}>{restaurant.website}</Text>
                        </TouchableOpacity>
                    )}

                    <View className="h-20" /> {/* Spacer */}
                </ScrollView>

                {/* Action Buttons */}
                <View className="flex-row absolute bottom-10 left-8 right-8 bg-background-light/80 dark:bg-background-dark/80 pt-4">
                    <TouchableOpacity
                        className="flex-1 bg-primary py-4 rounded-3xl shadow-lg items-center flex-row justify-center mr-4"
                        onPress={() => { }}
                    >
                        <FontAwesomeIcon icon={faLocationArrow} size={20} color="white" />
                        <Text className="text-white font-bold text-lg ml-2">Navigate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-16 bg-accent-light dark:bg-accent-dark/20 h-16 rounded-3xl items-center justify-center border border-primary/10"
                        onPress={() => { }}
                    >
                        <FontAwesomeIcon icon={faPhone} size={24} color="#FF9800" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RestaurantDetail;
