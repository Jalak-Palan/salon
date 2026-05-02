import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Search, Loader2 } from 'lucide-react';
import API from '../../services/api';
import SearchBar from '../../components/common/SearchBar';
import CitySelector from '../../components/common/CitySelector';
import SEO from '../../components/common/SEO';

const CitySalons = () => {
    const { cityName } = useParams();
    const [salons, setSalons] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params = { city: cityName, category: '' };
                if (searchTerm) {
                    params.name = searchTerm;
                }

                const [salonsRes, citiesRes] = await Promise.all([
                    API.get('/salons', { params }),
                    API.get('/cities')
                ]);
                
                if (salonsRes.data.success) {
                    setSalons(salonsRes.data.data);
                }
                if (citiesRes.data.success) {
                    setCities(citiesRes.data.data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load salons for this city.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityName, searchTerm]);

    const handleLocalSearch = (query) => {
        setSearchTerm(query);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <SEO 
                title={`Top Salons in ${cityName}`}
                description={`Find and book the best salons, spas, and beauty parlors in ${cityName}. View ratings, services, and prices.`}
                url={`/city/${cityName}`}
            />

            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-100 pt-10 pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-2 text-orange-500 font-bold mb-2">
                                <MapPin size={18} />
                                <span className="uppercase tracking-widest text-xs">Browsing City</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                                Top Salons in <span className="text-orange-500">{cityName}</span>
                            </h1>
                        </div>
                        <div className="w-full md:w-3/5 flex flex-col md:flex-row gap-3">
                            <CitySelector cities={cities} currentCity={cityName} />
                            <div className="flex-1">
                                <SearchBar initialCity={cityName} onSearch={handleLocalSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading salons in {cityName}...</p>
                    </div>
                ) : salons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {salons.map((salon) => (
                            <Link 
                                key={salon._id} 
                                to={`/salon/${salon.slug || salon._id}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={salon.image || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600'} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        alt={salon.name || salon.salonName}
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                                        <span className="text-xs font-bold text-gray-800">{salon.rating || '4.5'}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1 truncate group-hover:text-orange-600 transition-colors uppercase">
                                        {salon.salonName || salon.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                        <MapPin size={14} />
                                        {salon.city}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {salon.services?.slice(0, 3).map((s, idx) => (
                                            <span key={idx} className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded font-bold uppercase tracking-wider">
                                                {typeof s === 'object' ? s.name : s}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide group-hover:bg-orange-600 transition-colors">
                                        Book Appointment
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center p-6 bg-orange-50 rounded-full mb-6">
                            <Search size={48} className="text-orange-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Salons Found</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any salons in {cityName} right now. Try searching for another city or browsing all salons.</p>
                        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all">
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitySalons;

