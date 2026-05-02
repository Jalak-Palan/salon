import React from 'react';
import { MapPin } from 'lucide-react';

const LocationSection = ({ displayData }) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
            <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-gray-700 font-medium">{displayData.fullAddress}</p>
                    <p className="text-sm text-gray-500 mt-1">{displayData.distance} from your location</p>
                </div>
            </div>
            {/* Map Placeholder */}
            <div className="mt-4 h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-medium">Map view coming soon</p>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
