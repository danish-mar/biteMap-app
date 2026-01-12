# 🍛 BiteMap

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)](https://github.com/pmndrs/zustand)

**BiteMap** is a tourist-oriented food discovery application designed to provide immediate answers to the question: *"What food do people love here?"* 

Built with a **Material You** aesthetic, it features real-time data integration from OpenStreetMap and OpenWeatherMap to create a seamless, professional discovery experience.

---

## ✨ Key Features

- 🗺️ **Interactive Food Map**: Powered by Leaflet & OpenStreetMap, providing real-time restaurant locations.
- 🔍 **Professional Search**: Global city search via Nominatim (OSM Geocoding).
- ☁️ **Live Weather Integration**: Real-time temperature and conditions via OpenWeatherMap to help plan your meals.
- 🥗 **Deep Data Extraction**: Automatically identifies Vegetarian/Vegan options, WiFi, and Outdoor seating from OSM tags.
- 📱 **Adaptive Design**: Dark mode default with a stunning orange theme inspired by Android 16's Material You.
- ⚡ **Centralized State**: Built with Zustand for a lightning-fast, predictable data flow.

---

## 🚀 Tech Stack

- **Framework**: [Expo SDK 52](https://expo.dev/)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Map Engine**: [Leaflet](https://leafletjs.com/) (Web)
- **APIs**: 
    - **Overpass API**: For real-world restaurant data.
    - **OpenWeatherMap**: For localized weather updates.
    - **Nominatim**: For worldwide geocoding.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go (for mobile testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danish-mar/biteMap-app.git
   cd biteMap-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start --web
   ```

---

## 🎨 Design Philosophy

BiteMap follows the **Material You** principles, prioritizing:
- **Consistency**: Unified color tokens for light and dark modes.
- **Micro-interactions**: Smooth transitions and debounced search for data efficiency.
- **Minimalism**: Focusing on action-oriented details (Navigate, Call, Website) rather than clutter.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for foodies worldwide</p>
