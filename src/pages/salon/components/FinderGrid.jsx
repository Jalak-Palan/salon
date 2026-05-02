import React from 'react';
import { Search, Filter } from 'lucide-react';
import SalonCard from '../../../components/salon/SalonCard';

const FinderGrid = ({ salons, loading, error, viewMode, setSelectedSalon }) => {
    return (
        <div className={`flex-1 overflow-y-auto p-6 scrollbar-hide ${viewMode === 'map' ? 'hidden md:block md:w-1/2 lg:w-2/5' : 'w-full'}`}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {salons.length} Salons Found
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                    <Filter size={14} />
                    <span>FILTER</span>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[1, 2, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <p>{error}</p>
                </div>
            ) : salons.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p className="font-medium">No salons found in this area.</p>
                </div>
            ) : (
                <div className={`grid gap-6 ${viewMode === 'map' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}`}>
                    {salons.map(salon => (
                        <SalonCard 
                            key={salon._id} 
                            salon={salon} 
                            onClick={setSelectedSalon} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FinderGrid;
