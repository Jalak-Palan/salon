import React from 'react';
import { Scissors, Clock, Navigation, Star, Award } from 'lucide-react';

const AboutSection = ({ salon, displayData }) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Scissors className="w-6 h-6 text-primary" />
                About Salon
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{displayData.about}</p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-orange-50/70 rounded-xl p-4 text-center border border-orange-100">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Working Hours</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{displayData.hours}</p>
                </div>
                <div className="bg-orange-50/70 rounded-xl p-4 text-center border border-orange-100">
                    <Navigation className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Distance</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{displayData.distance}</p>
                </div>
                <div className="bg-orange-50/70 rounded-xl p-4 text-center border border-orange-100">
                    <Star className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Rating</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{salon.rating}/5</p>
                </div>
                <div className="bg-orange-50/70 rounded-xl p-4 text-center border border-orange-100">
                    <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Established</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{displayData.established}</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
