import React from 'react';
import { Star, Loader2 } from 'lucide-react';

const RatingSection = ({
    salon, user,
    userRating, setUserRating,
    hoverRating, setHoverRating,
    ratingSubmitted, ratingLoading,
    onRateSalon
}) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400 fill-current" />
                Rate This Salon
            </h2>

            {ratingSubmitted ? (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">
                        Thanks for your {userRating}-star rating! It helps everyone find great salons.
                    </span>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                        {user ? 'Share your experience with this salon:' : 'Sign in to rate this salon.'}
                    </p>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                disabled={!user || ratingLoading}
                                onClick={() => onRateSalon(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="transition-transform hover:scale-125 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Star
                                    className={`w-9 h-9 transition-colors ${
                                        star <= (hoverRating || userRating)
                                            ? 'text-orange-400 fill-current'
                                            : 'text-gray-200'
                                    }`}
                                />
                            </button>
                        ))}
                        {ratingLoading && <Loader2 className="w-5 h-5 animate-spin text-orange-400 ml-2" />}
                    </div>
                    {salon?.reviewsCount > 0 && (
                        <p className="text-xs text-gray-400">
                            {salon.reviewsCount} review{salon.reviewsCount !== 1 ? 's' : ''} · Average: {Number(salon.rating || 0).toFixed(1)} ★
                        </p>
                    )}
                </div>
            )}
        </section>
    );
};

export default RatingSection;
