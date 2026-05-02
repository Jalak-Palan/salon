import React from 'react';
import { Phone } from 'lucide-react';

const OwnerSection = ({ displayData }) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Salon Owner</h2>
            <div className="flex items-center gap-5 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {displayData.owner.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{displayData.owner.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Owner &amp; Manager</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-primary mr-2" />
                        <a href={`tel:${displayData.owner.phone}`} className="hover:text-primary transition font-medium">
                            {displayData.owner.phone}
                        </a>
                    </div>
                </div>
                <a
                    href={`tel:${displayData.owner.phone}`}
                    className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                    <Phone className="w-4 h-4" /> Call Now
                </a>
            </div>
        </section>
    );
};

export default OwnerSection;
