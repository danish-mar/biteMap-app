import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Inject Leaflet CSS via CDN to avoid bundler issues with local assets
if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
}

// Use a CDN-hosted default icon to avoid local resolution issues in Metro
let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 14, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center]);
    return null;
};

const MapComponent = ({ restaurants, onRestaurantPress, center }) => {
    // Use provided center or fallback to Bangalore
    const position = center || [12.9716, 77.5946];

    return (
        <MapContainer
            center={position}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ChangeView center={center} />
            {restaurants.map((res) => (
                <Marker
                    key={res.id}
                    position={[res.location.latitude, res.location.longitude]}
                    eventHandlers={{
                        click: () => onRestaurantPress(res),
                    }}
                >
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-bold text-orange-600">{res.name}</h3>
                            <p className="text-xs text-gray-600">{res.cuisine} • ⭐{res.rating}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
