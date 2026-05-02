import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { premiumImages } from '../../constants/salonImages';

const TopRatedSalons = ({ salons }) => {
    return (
        <div className="pt-8 border-t border-gray-100 mt-8 px-2 md:px-0">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Top Rated Salons</h2>
                    <p className="text-gray-500 font-medium mt-1">Highly acclaimed professionals in your city</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
                {salons.map((salon, idx) => (
                    <div
                        key={salon.id || `tr-${idx}`}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 border border-gray-100 group flex flex-col h-full relative"
                    >
                        {/* Floating Rating Badge */}
                        <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center justify-center border border-white/50">
                            <span className="font-black text-gray-900 text-sm leading-none pt-0.5">{salon.rating}</span>
                            <Star className="w-2.5 h-2.5 text-orange-500 fill-current mt-0.5" />
                        </div>

                        <div className="relative h-56 md:h-60 overflow-hidden shrink-0">
                            <img
                                src={salon.image}
                                alt={salon.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                onError={(e) => { e.target.src = premiumImages[0]; }}
                            />
                            <div className="absolute left-4 bottom-4 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-gray-700">
                                {salon.badge}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow bg-white">
                            <h3 className="font-black text-xl text-gray-900 truncate mb-1 pr-4">{salon.name}</h3>
                            <div className="flex items-center text-sm font-medium text-gray-500 mb-4 truncate">
                                <MapPin className="w-4 h-4 text-gray-400 mr-1 shrink-0" />
                                <span className="truncate">{salon.location} &bull; {salon.distance}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {salon.services?.slice(0, 3).map((srv, i) => (
                                    <span key={i} className="text-[10px] uppercase tracking-widest font-bold bg-gray-50 text-gray-600 border border-gray-100 px-2.5 py-1.5 rounded-lg">
                                        {srv}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto pt-2">
                                {salon.id ? (
                                    <Link
                                        to={`/salon/${salon.slug || salon.id}`}
                                        state={{ salon: { name: salon.name, image: salon.image } }}
                                        className="block w-full text-center bg-gray-900 hover:bg-orange-600 text-white py-4 rounded-xl font-black text-sm transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.98]"
                                    >
                                        Book Appointment
                                    </Link>
                                ) : (
                                    <button disabled className="w-full block bg-gray-100 text-gray-400 py-4 rounded-xl font-black text-sm cursor-not-allowed border border-gray-200">
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRatedSalons;
