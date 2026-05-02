import React from 'react';
import { Search, Navigation, ChevronDown, Grid, Map as MapIcon } from 'lucide-react';

const FinderHeader = ({ 
    selectedCity, 
    handleCityChange, 
    cities, 
    handleDetectLocation, 
    viewMode, 
    setViewMode 
}) => {
    return (
        <div className="bg-white p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 z-10 shadow-sm">
            <div className="flex items-center gap-6 flex-1">
                <div className="relative flex-1 group max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <select 
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none font-medium text-slate-700"
                    >
                        <option value="">Select City or Detect Location</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                
                <button 
                    onClick={handleDetectLocation}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-200"
                >
                    <Navigation size={18} />
                    <span className="hidden sm:inline">Nearby</span>
                </button>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Grid size={18} />
                    <span className="text-sm font-bold">GRID</span>
                </button>
                <button 
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <MapIcon size={18} />
                    <span className="text-sm font-bold">MAP</span>
                </button>
            </div>
        </div>
    );
};

export default FinderHeader;
