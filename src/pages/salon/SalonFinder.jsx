import React, { useState, useEffect, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import API from '../../services/api';
import SalonModal from '../../components/salon/SalonModal';

import FinderHeader from './components/FinderHeader';
import FinderGrid from './components/FinderGrid';
import FinderMap from './components/FinderMap';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyB83xgX99fgfIWFXwfpiaAKA71FE4vhPlw';
const libraries = ['places'];
const cities = ['Agra', 'Ahmedabad', 'Ajmer', 'Aligarh', 'Allahabad', 'Amritsar', 'Aurangabad', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Coimbatore', 'Dehradun', 'Delhi-NCR', 'Dhanbad', 'Faridabad', 'Ghaziabad', 'Guwahati', 'Gwalior', 'Hyderabad', 'Indore', 'Jabalpur', 'Jaipur', 'Jalandhar', 'Jamshedpur', 'Jodhpur', 'Kanpur', 'Kochi', 'Kolkata', 'Kota', 'Lucknow', 'Ludhiana', 'Madurai', 'Meerut', 'Mumbai', 'Mysore', 'Nagpur', 'Nashik', 'Patna', 'Pune', 'Raipur', 'Rajkot', 'Ranchi', 'Srinagar', 'Surat', 'Thiruvananthapuram', 'Tiruchirappalli', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam', 'Warangal'];

const SalonFinder = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const initialSearch = searchParams.get('search') || '';
    const initialCity = searchParams.get('city') || '';

    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(initialCity);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries
    });

    useEffect(() => {
        const params = new URLSearchParams(search);
        setSelectedCity(params.get('city') || '');
        setSearchTerm(params.get('search') || '');
    }, [search]);

    const fetchSalons = useCallback(async (params = {}) => {
        const queryCity = params.city !== undefined ? params.city : selectedCity;
        const queryName = params.name !== undefined ? params.name : searchTerm;

        if (!queryCity && !params.lat) {
            setError('Please select a city to browse salons.');
            setSalons([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const finalParams = { city: queryCity, name: queryName, category: '', ...params };
            Object.keys(finalParams).forEach(key => {
                if (finalParams[key] === undefined || finalParams[key] === '') delete finalParams[key];
            });

            const response = await API.get('/salons', { params: finalParams });
            if (response.data.success) {
                setSalons(response.data.data);
                setError(response.data.data.length === 0 ? `No salons found in ${queryCity}.` : null);
            } else {
                setError('Failed to load salons.');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedCity, searchTerm]);

    useEffect(() => {
        if (initialCity || initialSearch) {
            fetchSalons();
        } else if (navigator.geolocation) {
            handleDetectLocation();
        } else {
            setLoading(false);
            setError('Please select a city to begin.');
        }
    }, [initialCity, initialSearch]);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        fetchSalons({ city });
    };

    const handleDetectLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
                    setUserLocation(loc);
                    fetchSalons({ lat: loc.lat, lng: loc.lng, radius: 3000 });
                    if (map) map.panTo(loc);
                },
                () => {
                    setError('Location access denied. Please select "Nearby" again or enter a city.');
                    setLoading(false);
                },
                { timeout: 5000 }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    };

    const onMapLoad = useCallback((map) => setMap(map), []);

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-50 overflow-hidden rounded-3xl border border-slate-200 shadow-xl mt-4">
            <FinderHeader 
                selectedCity={selectedCity}
                handleCityChange={handleCityChange}
                cities={cities}
                handleDetectLocation={handleDetectLocation}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            <div className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
                <FinderGrid 
                    salons={salons}
                    loading={loading}
                    error={error}
                    viewMode={viewMode}
                    setSelectedSalon={setSelectedSalon}
                />

                <FinderMap 
                    apiKey={GOOGLE_MAPS_API_KEY}
                    isLoaded={isLoaded}
                    userLocation={userLocation}
                    salons={salons}
                    onMapLoad={onMapLoad}
                    mapStyles={mapStyles}
                    setSelectedSalon={setSelectedSalon}
                    setActiveMarker={setActiveMarker}
                    viewMode={viewMode}
                />
            </div>

            {selectedSalon && (
                <SalonModal 
                    salon={selectedSalon} 
                    onClose={() => setSelectedSalon(null)} 
                />
            )}
        </div>
    );
};

const mapStyles = [
    { "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#f97316" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#f97316" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#475569" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#334155" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#1e293b" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#475569" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#334155" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#fdba74" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#334155" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#f97316" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#334155" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] }
];

export default SalonFinder;
