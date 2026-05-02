import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Scissors, Loader2 } from 'lucide-react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getPremiumImage } from '../../services/utils';
import { premiumImages } from '../../constants/salonImages';
import SEO from '../../components/common/SEO';

import HeroSection from '../../components/salonDetails/HeroSection';
import AboutSection from '../../components/salonDetails/AboutSection';
import RatingSection from '../../components/salonDetails/RatingSection';
import OwnerSection from '../../components/salonDetails/OwnerSection';
import ServicesSection from '../../components/salonDetails/ServicesSection';
import GallerySection from '../../components/salonDetails/GallerySection';
import LightboxModal from '../../components/salonDetails/LightboxModal';
import LocationSection from '../../components/salonDetails/LocationSection';
import BottomBar from '../../components/salonDetails/BottomBar';

const buildDisplayData = (salon, id, passedSalon) => ({
    name: salon.name || salon.salonName,
    tagline: salon.tagline || 'Experience Premium Grooming',
    rating: salon.rating || '4.8',
    reviews: salon.reviews || salon.reviewsCount || '1,250',
    interested: '5k+',
    fullAddress: salon.salonAddress || salon.location || 'Location details not available',
    location: salon.city || 'Mumbai',
    hours: '10:00 AM - 9:00 PM',
    priceRange: '₹299 - ₹1,999',
    established: '2020',
    about: salon.about || `Welcome to ${salon.name || salon.salonName}. A premium salon providing world-class grooming services.`,
    distance: '0.5 km',
    coverImage: salon.image || passedSalon?.image || getPremiumImage(id, premiumImages),
    posterImage: salon.image || passedSalon?.image || getPremiumImage(id, premiumImages),
    gallery: (salon.gallery && salon.gallery.length > 0)
        ? salon.gallery
        : [salon.image || passedSalon?.image || getPremiumImage(id, premiumImages)],
    badges: ['Verified', 'Top Rated'],
    owner: { name: salon.ownerId?.name || 'Salon Manager', phone: '+91 99999 99999' }
});

const SalonDetails = () => {
    const { slugOrId } = useParams();
    const location = useLocation();
    const passedSalon = location.state?.salon;
    const { user } = useAuth();

    const [salon, setSalon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [ratingLoading, setRatingLoading] = useState(false);

    useEffect(() => {
        const fetchSalon = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/salons/${slugOrId}`);
                setSalon(response.data.data);
                setError(null);
            } catch (err) {
                if (passedSalon) {
                    setSalon({
                        _id: slugOrId,
                        name: passedSalon.name,
                        image: passedSalon.image,
                        rating: 4.8,
                        location: 'Location details not available',
                        services: ['Haircut', 'Styling', 'Spa'],
                        about: `Welcome to ${passedSalon.name}. Experience premium grooming services.`
                    });
                    setError(null);
                } else {
                    setError('Salon details not found. Please try again.');
                }
                console.error('Error fetching salon:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSalon();
    }, [slugOrId]);

    const handleRateSalon = async (rating) => {
        if (!user) { alert('Please sign in to rate this salon.'); return; }
        setRatingLoading(true);
        try {
            const res = await API.post(`/salons/${salon._id || salon.id}/rate`, { rating });
            setUserRating(rating);
            setRatingSubmitted(true);
            setSalon(prev => prev ? { ...prev, rating: res.data.data.rating, reviewsCount: res.data.data.reviewsCount } : prev);
        } catch (err) {
            console.error('Rating error:', err);
        } finally {
            setRatingLoading(false);
        }
    };

    const displayData = salon ? buildDisplayData(salon, slugOrId, passedSalon) : null;

    const handlePrevImg = () => setLightboxIdx(i => (i - 1 + displayData.gallery.length) % displayData.gallery.length);
    const handleNextImg = () => setLightboxIdx(i => (i + 1) % displayData.gallery.length);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-gray-500 font-medium">Loading salon magic...</p>
            </div>
        );
    }

    if (error || !salon) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
                <div className="bg-orange-50 p-5 rounded-full">
                    <Scissors className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Salon Not Found</h2>
                <p className="text-gray-500 max-w-md">{error || "The salon you're looking for doesn't exist."}</p>
                <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition">
                    Back to Home
                </Link>
            </div>
        );
    }

    const salonName = salon.name || salon.salonName;
    const city = salon.city || 'Mumbai';

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": salonName,
        "image": salon.image || displayData.coverImage,
        "@id": `https://bookmysalon.in/salon/${salon.slug || salon._id}`,
        "url": `https://bookmysalon.in/salon/${salon.slug || salon._id}`,
        "telephone": displayData.owner.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": displayData.fullAddress,
            "addressLocality": city,
            "addressRegion": "IN",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": salon.location?.coordinates?.[1],
            "longitude": salon.location?.coordinates?.[0]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": salon.rating || 4.5,
            "reviewCount": salon.reviewsCount || 10
        }
    };

    return (
        <div className="animate-fade-in -mx-4 sm:-mx-6 lg:-mx-8 -mt-6">
            <SEO 
                title={`${salonName} - Book Salon in ${city}`}
                description={displayData.about}
                image={salon.image || displayData.coverImage}
                url={`/salon/${salon.slug || slugOrId}`}
                type="business.business"
                schema={structuredData}
            />

            <HeroSection id={slugOrId} salon={salon} displayData={displayData} liked={liked} onToggleLike={() => setLiked(!liked)} />

            <div className="w-full px-4 sm:px-6 lg:px-12 py-8 space-y-10">
                <AboutSection salon={salon} displayData={displayData} />
                <RatingSection
                    salon={salon} user={user}
                    userRating={userRating} setUserRating={setUserRating}
                    hoverRating={hoverRating} setHoverRating={setHoverRating}
                    ratingSubmitted={ratingSubmitted} ratingLoading={ratingLoading}
                    onRateSalon={handleRateSalon}
                />
                <OwnerSection displayData={displayData} />
                <ServicesSection salon={salon} displayData={displayData} />
                <GallerySection salon={salon} displayData={displayData} onOpenLightbox={setLightboxIdx} />
                <LightboxModal
                    gallery={displayData.gallery}
                    currentIdx={lightboxIdx}
                    onClose={() => setLightboxIdx(null)}
                    onPrev={handlePrevImg}
                    onNext={handleNextImg}
                    onSetIdx={setLightboxIdx}
                />
                <LocationSection displayData={displayData} />
            </div>

            <BottomBar id={salon._id || slugOrId} displayData={displayData} />
        </div>
    );
};

export default SalonDetails;

