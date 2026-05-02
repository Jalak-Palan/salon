import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminAuthContext';
import { 
    Users, Store, Calendar, DollarSign, TrendingUp, 
    ArrowUpRight, Clock, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-all group">
        <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-lg">
                    <ArrowUpRight className="w-3 h-3" />
                    {trend}
                </div>
            )}
        </div>
        <div className="mt-4">
            <h3 className="text-gray-400 text-sm font-medium">{label}</h3>
            <p className="text-2xl font-black text-white mt-1">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const { api } = useAdmin();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data.data);
            } catch (err) {
                setError('Failed to load dashboard statistics.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [api]);

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                <p className="text-gray-500 font-medium">Loading statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-sm text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">Retry</button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm">Real-time platform performance and growth metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    label="Total Salons" 
                    value={stats.totalSalons || 0} 
                    icon={Store} 
                    color="bg-blue-500" 
                    trend="+12%"
                />
                <StatCard 
                    label="Total Bookings" 
                    value={stats.totalBookings || 0} 
                    icon={Calendar} 
                    color="bg-purple-500" 
                    trend="+25%"
                />
                <StatCard 
                    label="Active Subscriptions" 
                    value={stats.activeSubscriptions || 0} 
                    icon={CheckCircle2} 
                    color="bg-green-500" 
                />
                <StatCard 
                    label="Total Revenue" 
                    value={`₹${(stats.totalEarnings || 0).toLocaleString()}`} 
                    icon={DollarSign} 
                    color="bg-orange-500" 
                    trend="+18%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Promotion Stats */}
                <div className="lg:col-span-1 bg-gray-900/50 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        Promotion Mix
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800/40 rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <span className="text-sm font-medium text-gray-400">Recommended</span>
                            <span className="text-lg font-black text-white">{stats.recommendedCount || 0}</span>
                        </div>
                        <div className="bg-gray-800/40 rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <span className="text-sm font-medium text-gray-400">Top Rated</span>
                            <span className="text-lg font-black text-white">{stats.topRatedCount || 0}</span>
                        </div>
                        <div className="pt-4 mt-4 border-t border-white/5">
                            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-widest px-1">
                                <span>Utilization</span>
                                <span>{Math.round(((stats.recommendedCount + stats.topRatedCount) / (stats.totalSalons || 1)) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                                <div 
                                    className="bg-orange-500 h-full rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                                    style={{ width: `${((stats.recommendedCount + stats.topRatedCount) / (stats.totalSalons || 1)) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="lg:col-span-2 bg-gray-900/50 border border-white/5 rounded-2xl p-6 overflow-hidden">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        Recent Bookings
                    </h2>
                    <div className="overflow-x-auto -mx-6 sm:mx-0">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Salon</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {(stats.recentBookings || []).map((booking) => (
                                    <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">{booking.userId?.name || 'Customer'}</p>
                                            <p className="text-xs text-gray-500 mt-1">{booking.userId?.email || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-300">{booking.salonId?.name || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                                                booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400' :
                                                booking.status === 'pending' ? 'bg-orange-500/10 text-orange-400' :
                                                'bg-red-500/10 text-red-400'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {(!stats.recentBookings || stats.recentBookings.length === 0) && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic text-sm">No recent bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
