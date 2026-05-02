import React from 'react';
import { ChevronRight, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import CitySelector from '../common/CitySelector';
import SearchBar from '../common/SearchBar';
import Carousel from '../common/Carousel';

const SearchSection = ({ cities, error }) => {
    return (
        <>
            {error && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-md shadow-sm mb-4">
                    <p className="text-sm text-orange-700 font-medium">{error}</p>
                </div>
            )}

            {/* Banner Carousel */}
            <div className="-mx-2 lg:mx-0">
                <Carousel />
            </div>

            {/* Search & City Discovery */}
            <div className="relative -mt-16 z-20">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-orange-100 border border-orange-50/50">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
                            Find the Best <span className="text-orange-500">Salons</span> in Your City
                        </h1>
                        <p className="text-gray-500 font-medium">Book appointments at top-rated salons, all in one place</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch gap-4">
                        <CitySelector cities={cities} />
                        <div className="flex-1">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Finder CTA */}
            <div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl gap-6 overflow-hidden relative group">
                    <div className="z-10 text-white text-center md:text-left">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-1 flex items-center justify-center md:justify-start gap-3">
                            <Navigation className="text-orange-500" />
                            Interactive Map Finder
                        </h2>
                        <p className="text-gray-400 max-w-sm text-sm">Explore salons around you on our live interactive map.</p>
                    </div>
                    <Link
                        to="/salon-finder"
                        className="z-10 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl flex items-center gap-2"
                    >
                        Open Map <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SearchSection;
