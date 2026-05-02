import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Map as MapIcon } from 'lucide-react';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 20.5937, // Center of India
    lng: 78.9629
};

const FinderMap = ({ 
    apiKey, 
    isLoaded, 
    userLocation, 
    salons, 
    onMapLoad, 
    mapStyles, 
    setSelectedSalon, 
    setActiveMarker, 
    viewMode 
}) => {
    if (!apiKey) {
        return (
            <div className={`flex-1 ${viewMode === 'grid' ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full h-full'}`}>
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-3xl flex items-center justify-center mb-6">
                        <MapIcon size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Google Maps API Key Required</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">
                        Please provide <code>VITE_GOOGLE_MAPS_API_KEY</code> in your <code>.env</code> file to enable the map view.
                    </p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className={`flex-1 ${viewMode === 'grid' ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full h-full'}`}>
                <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
                    <span className="font-bold text-slate-400">Loading Map...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex-1 ${viewMode === 'grid' ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full h-full'}`}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || defaultCenter}
                zoom={12}
                onLoad={onMapLoad}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
            >
                {salons.map((salon, idx) => {
                    const lat = salon.location?.coordinates?.[1];
                    const lng = salon.location?.coordinates?.[0];
                    
                    if (lat === undefined || lng === undefined) return null;

                    return (
                        <Marker
                            key={salon._id || idx}
                            position={{ lat, lng }}
                            onClick={() => {
                                setActiveMarker(salon._id);
                                setSelectedSalon(salon);
                            }}
                            icon={window.google ? {
                                url: 'https://cdn-icons-png.flaticon.com/512/2377/2377840.png',
                                scaledSize: new window.google.maps.Size(40, 40)
                            } : null}
                        />
                    );
                })}

                {userLocation && (
                    <Marker 
                        position={userLocation}
                        icon={window.google ? {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            fillColor: '#3B82F6',
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: '#FFFFFF',
                            scale: 8
                        } : null}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default FinderMap;
