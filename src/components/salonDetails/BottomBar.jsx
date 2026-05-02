import React from 'react';
import { Link } from 'react-router-dom';

const BottomBar = ({ id, displayData }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30 px-6 py-4 md:hidden">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div>
                    <p className="text-xs text-gray-500 font-medium">Starting from</p>
                    <p className="text-lg font-bold text-gray-800">{displayData.priceRange.split(' - ')[0]}</p>
                </div>
                <Link
                    to={`/booking/${id}`}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all"
                >
                    Book Salon
                </Link>
            </div>
        </div>
    );
};

export default BottomBar;
