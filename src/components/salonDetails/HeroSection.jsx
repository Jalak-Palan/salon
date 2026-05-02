import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Navigation, Clock, Heart, Share2, Shield, Award, Scissors, Sparkles, Users } from 'lucide-react';

const HeroSection = ({ id, salon, displayData, liked, onToggleLike }) => {
    return (
        <div className="relative w-full h-[420px] md:h-[480px] overflow-hidden">
            {/* Cover Image */}
            <img
                src={displayData.coverImage}
                alt={salon.name}
                loading="lazy"
                className="w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            {/* Action buttons (top right) */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
                <button
                    onClick={onToggleLike}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                    <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <Share2 className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-8 flex items-end gap-6 md:gap-8">
                {/* Poster Image */}
                <div className="hidden sm:block w-[180px] h-[260px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 flex-shrink-0 -mb-2">
                    <img src={displayData.posterImage} alt={salon.name} loading="lazy" className="w-full h-full object-cover" />
                </div>

                {/* Salon Info */}
                <div className="flex-1 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{salon.name}</h1>
                    <p className="text-white/70 text-lg mt-1 italic">{displayData.tagline}</p>

                    {/* Interest & Rating Bar */}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-400 fill-current mr-1.5" />
                            <span className="font-bold text-lg">{salon.rating}/5</span>
                            <span className="text-white/60 ml-2 text-sm">({displayData.reviews} Reviews)</span>
                        </div>
                        <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Users className="w-4 h-4 text-green-400 mr-1.5" />
                            <span className="font-semibold">{displayData.interested}</span>
                            <span className="text-white/60 ml-1 text-sm">interested</span>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-white/70">
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{displayData.hours}</span>
                        <span>&bull;</span>
                        <span>{displayData.priceRange}</span>
                        <span>&bull;</span>
                        <span className="flex items-center"><Navigation className="w-3.5 h-3.5 mr-1" />{salon.location}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {displayData.badges.map((badge, idx) => (
                            <span key={idx} className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                                {badge === 'Verified' && <Shield className="w-3 h-3 inline mr-1" />}
                                {badge === 'Top Rated' && <Award className="w-3 h-3 inline mr-1" />}
                                {badge === 'Premium' && <Sparkles className="w-3 h-3 inline mr-1" />}
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Book Salon Button */}
                    <Link
                        to={`/booking/${salon._id || id}`}
                        className="mt-5 inline-block bg-primary hover:bg-primary-hover text-white px-10 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:scale-[1.02]"
                    >
                        Book Salon
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
