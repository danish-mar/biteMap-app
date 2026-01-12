import "./src/global.css";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import Home from './src/screens/Home';
import CuisineView from './src/screens/CuisineView';
import RestaurantDetail from './src/screens/RestaurantDetail';
import { useAppStore } from './src/store/useAppStore';
import { useEffect } from 'react';

export default function App() {
  const colorScheme = useColorScheme();
  const fetchDataForLocation = useAppStore(state => state.fetchDataForLocation);

  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Initial fetch for Bangalore
    fetchDataForLocation(12.9716, 77.5946, 'Bangalore');
  }, []);

  const navigateToCuisine = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('cuisine');
  };

  const navigateToDetail = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('detail');
  };

  const goBack = () => {
    if (currentScreen === 'detail') setCurrentScreen('cuisine');
    else setCurrentScreen('home');
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {currentScreen === 'home' && (
        <Home onCategoryPress={navigateToCuisine} onRestaurantPress={navigateToDetail} />
      )}
      {currentScreen === 'cuisine' && (
        <CuisineView
          category={selectedCategory}
          onBack={goBack}
          onRestaurantPress={navigateToDetail}
        />
      )}
      {currentScreen === 'detail' && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onBack={goBack}
        />
      )}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

