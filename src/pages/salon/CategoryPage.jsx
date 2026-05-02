import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Search } from 'lucide-react';
import SalonCard from '../../components/salon/SalonCard';
import SEO from '../../components/common/SEO';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  
  // Simulated Big Data payload since the real DB is empty
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    // Re-trigger visual loading state when category changes
    setLoading(true);
    window.scrollTo(0, 0);

    const generateMockData = () => {
      const titles = {
        hair: ['Lumina Hair Studio', 'The Cutting Room', 'Strands & Co.', 'Velvet Hair Salon', 'Urban Shears'],
        spa: ['Zen Rejuvenation', 'Lotus Flower Spa', 'Serenity Wellness Center', 'Oasis Day Spa', 'Nirvana Spa'],
        nails: ['Polished Perfection', 'Glitzy Nails', 'The Nail Bar', 'Luxe Canvas Nails', 'Pastel Fingerprints'],
        massage: ['Healing Hands Massage', 'Breathe Deep Therapies', 'Muscle Therapy Institute', 'Tranquil Touch', 'Relieve & Restore']
      };

      const imgs = {
        hair: 'https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?auto=format&fit=crop&q=80&w=800',
        spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
        nails: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800',
        massage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800'
      };

      const catList = titles[categoryName.toLowerCase()] || titles.hair;
      const bgImg = imgs[categoryName.toLowerCase()] || imgs.hair;

      return catList.map((title, i) => ({
        _id: `mock-${categoryName}-${i}`,
        name: title,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        city: 'Premium Local Access',
        image: bgImg,
        services: [categoryName.charAt(0).toUpperCase() + categoryName.slice(1), 'Consultation', 'Premium Care'],
      }));
    };

    const timer = setTimeout(() => {
      setSalons(generateMockData());
      setLoading(false);
    }, 800); // Simulate network delay for effect

    return () => clearTimeout(timer);
  }, [categoryName]);

  const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="w-full pb-12">
      <SEO 
        title={`Premium ${capitalize(categoryName)} Salons`}
        description={`Explore the best ${categoryName} salons and studios. Hand-picked for excellence, luxury, and premium care.`}
        url={`/category/${categoryName}`}
      />

      {/* Category Hero */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden mb-12 relative shadow-2xl mx-4 md:mx-0">
        <div className="absolute inset-0 opacity-40">
           <img 
              src={salons[0]?.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600'} 
              className="w-full h-full object-cover" 
              alt={`${categoryName} Category Background`} 
              loading="lazy"
            />
        </div>
        <div className="relative z-10 px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center backdrop-blur-sm">
          <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold uppercase tracking-widest text-xs mb-6 backdrop-blur-md">
            Explore Category
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            Premium {capitalize(categoryName)}
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl">
            Discover the highest rated {categoryName} specialists and studios in our network. Hand-picked for excellence and luxury.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {loading ? 'Finding locations...' : `${salons.length} Premium Locations Found`}
          </h2>
          <div className="flex gap-2">
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">Sort by Rating</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div key={sk} className="h-[400px] bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map(salon => (
              <SalonCard key={salon._id} salon={salon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

