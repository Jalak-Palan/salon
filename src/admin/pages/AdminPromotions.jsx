import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminAuthContext';
import { 
    TrendingUp, Zap, Crown, Check, X, 
    Search, Store, ShieldCheck, Loader2, AlertCircle, History
} from 'lucide-react';

const AdminPromotions = () => {
    const { api } = useAdmin();
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    const fetchSalons = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/salons');
            setSalons(res.data.data);
        } catch (err) {
            setError('Failed to fetch salons for promotions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalons();
    }, [api]);

    const handlePromote = async (salonId, planType) => {
        setActionLoading(`${salonId}-${planType}`);
        try {
            // Create a 30-day subscription
            await api.post('/admin/subscriptions', { salonId, planType, durationDays: 30 });
            await fetchSalons(); // Refresh to see updated flags
        } catch (err) {
            alert('Failed to update promotion.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemovePromotion = async (subId) => {
        if (!subId) return;
        setActionLoading(subId);
        try {
            await api.put(`/admin/subscriptions/${subId}/cancel`);
            await fetchSalons();
        } catch (err) {
            alert('Failed to remove promotion.');
        } finally {
            setActionLoading(null);
        }
    };

    const filteredSalons = salons.filter(s => 
        s.salonName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-gray-500 font-medium">Loading promotions...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Promotion Control</h1>
                    <p className="text-gray-500 text-sm">Manage Recommended and Top Rated salon listings.</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-900 border border-white/5 rounded-2xl px-6 py-3">
                    <div className="flex items-center gap-2 pr-4 border-r border-white/5">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-gray-400">Rec: ₹999</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-bold text-gray-400">Top: ₹1499</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search salons to promote..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all"
                />
            </div>

            {/* Promotions Table */}
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-black/20">
                                <th className="px-6 py-4 text-center w-16">#</th>
                                <th className="px-6 py-4">Salon Info</th>
                                <th className="px-6 py-4 text-center">Recommended</th>
                                <th className="px-6 py-4 text-center">Top Rated</th>
                                <th className="px-6 py-4 text-right">Subscription Info</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSalons.map((salon, idx) => (
                                <tr key={salon._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 text-center text-xs text-gray-500 font-bold">{idx + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center border border-white/5 overflow-hidden">
                                                {salon.image ? <img src={salon.image} className="w-full h-full object-cover" /> : <Store className="w-4 h-4 text-gray-600" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{salon.salonName}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{salon.city}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {salon.isRecommended ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="bg-blue-500/10 text-blue-400 p-1.5 rounded-lg border border-blue-500/20">
                                                    <Zap className="w-4 h-4 fill-current" />
                                                </div>
                                                {salon.subscription?.planType === 'recommended' && (
                                                    <button 
                                                        onClick={() => handleRemovePromotion(salon.subscription._id)}
                                                        disabled={actionLoading === salon.subscription._id}
                                                        className="text-[9px] text-red-400 font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handlePromote(salon._id, 'recommended')}
                                                disabled={actionLoading === `${salon._id}-recommended`}
                                                className="px-3 py-1 bg-gray-800 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                                            >
                                                Add
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {salon.isTopRated ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="bg-orange-500/10 text-orange-400 p-1.5 rounded-lg border border-orange-500/20">
                                                    <Crown className="w-4 h-4 fill-current" />
                                                </div>
                                                {salon.subscription?.planType === 'top' && (
                                                    <button 
                                                        onClick={() => handleRemovePromotion(salon.subscription._id)}
                                                        disabled={actionLoading === salon.subscription._id}
                                                        className="text-[9px] text-red-400 font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handlePromote(salon._id, 'top')}
                                                disabled={actionLoading === `${salon._id}-top`}
                                                className="px-3 py-1 bg-gray-800 hover:bg-orange-600 text-orange-400 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                                            >
                                                Add
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {salon.subscription ? (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Expires: {new Date(salon.subscription.expiryDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-[10px] text-gray-600 flex items-center justify-end gap-1">
                                                    <History className="w-2.5 h-2.5" />
                                                    {salon.subscription.paymentStatus}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">No Active Plan</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPromotions;
