import React from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { premiumImages } from '../../constants/salonImages';

const RecommendedSalons = ({ salons, scrollContainerRef, onScrollLeft, onScrollRight }) => {
    return (
        <div className="relative group/section pt-8 border-t border-gray-100 mt-12 px-2 md:px-0">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Recommended For You</h2>
                    <p className="text-gray-500 font-medium mt-1">Handpicked salons based on your preferences</p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={onScrollLeft}
                        className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all text-gray-600 hover:text-orange-500"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={onScrollRight}
                        className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all text-gray-600 hover:text-orange-500"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x scroll-smooth -mx-4 px-4 md:mx-0 md:px-0"
            >
                {salons.map((salon, idx) => {
                    const cardContent = (
                        <div className="w-56 md:w-64 shrink-0 snap-start">
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-200 mb-4 shadow-sm group-hover:shadow-xl group-hover:shadow-orange-500/10 transition-all duration-300">
                                <img
                                    src={salon.image}
                                    alt={salon.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    onError={(e) => { e.target.src = premiumImages[0]; }}
                                />
                                {!salon.id && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full uppercase tracking-wider">Coming Soon</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="w-3.5 h-3.5 text-orange-500 fill-current" />
                                    {(salon.rating).toFixed(1)}
                                </div>
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pt-12 pb-4 px-4 flex justify-between items-end text-white">
                                    <div className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                                        {salon.likes} / trending
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-black text-gray-900 text-lg truncate group-hover:text-orange-500 transition-colors pr-2">{salon.name}</h3>
                            <p className="text-sm font-medium text-gray-500 flex items-center gap-1 mt-1 truncate">
                                <MapPin size={14} className="text-gray-400" /> {salon.city}
                            </p>
                        </div>
                    );

                    const isMock = salon.id && salon.id.toString().startsWith('mock-');
                    if (salon.id) {
                        return (
                            <Link
                                key={salon.id}
                                to={`/salon/${salon.slug || salon.id}`}
                                state={{ salon: { name: salon.name, image: salon.image } }}
                                className={`group block ${isMock ? 'opacity-90' : ''}`}
                            >
                                {cardContent}
                            </Link>
                        );
                    }
                    return <div key={`fallback-${idx}`} className="group block opacity-70 cursor-default">{cardContent}</div>;
                })}
            </div>
        </div>
    );
};

export default RecommendedSalons;
