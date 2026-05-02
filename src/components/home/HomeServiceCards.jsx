import React from 'react';
import { ChevronRight } from 'lucide-react';

const homeServices = [
    { id: 1, name: 'Hair Care', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 2, name: 'Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 3, name: 'Facials', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 4, name: 'Nail Care', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=400' }
];

const HomeServiceCards = () => {
    return (
        <div className="pt-2">
            <div className="flex items-center justify-between mb-6 px-2 md:px-0">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Home Services</h2>
                <button className="hidden md:flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
                    Explore All <ChevronRight size={16} />
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                {homeServices.map((service) => (
                    <div
                        key={service.id}
                        className="relative aspect-[4/3] md:aspect-[3/2] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group"
                    >
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                            <h3 className="font-black text-white text-lg md:text-xl tracking-wide flex justify-between items-end">
                                {service.name}
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                    <ChevronRight size={18} className="text-white" />
                                </div>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeServiceCards;
