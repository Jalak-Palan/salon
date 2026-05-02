import React from 'react';

const ServicesSection = ({ salon, displayData }) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Services Offered</h2>
            <div className="flex flex-wrap gap-2">
                {salon.services && salon.services.map((service, idx) => (
                    <span key={idx} className="bg-orange-50 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full border border-orange-100 hover:bg-orange-100 transition cursor-default">
                        {service}
                    </span>
                ))}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium">Price Range</span>
                <span className="text-xl font-bold text-gray-800">{displayData.priceRange}</span>
            </div>
        </section>
    );
};

export default ServicesSection;
