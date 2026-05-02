import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminAuthContext';
import { 
    Search, Filter, Calendar, Clock, MapPin, 
    XCircle, CheckCircle, Loader2, AlertCircle, FileText
} from 'lucide-react';

const AdminBookings = () => {
    const { api } = useAdmin();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/admin/bookings${cityFilter ? `?city=${cityFilter}` : ''}`);
            setBookings(res.data.data);
        } catch (err) {
            setError('Failed to fetch bookings list.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [api, cityFilter]);

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        
        setActionLoading(id);
        try {
            await api.put(`/admin/bookings/${id}/cancel`);
            setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
        } catch (err) {
            alert('Failed to cancel booking.');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-gray-500 font-medium">Loading bookings...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Booking Management</h1>
                    <p className="text-gray-500 text-sm">Monitor all platform appointments and manage cancellations.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Filter by city..." 
                        value={cityFilter}
                        onChange={e => setCityFilter(e.target.value)}
                        className="w-full bg-gray-900 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-black/20">
                                <th className="px-6 py-4">Booking Info</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Salon</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white">{booking.service || 'General Service'}</p>
                                            <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {booking.slot?.time || booking.time || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-300">{booking.userId?.name || 'Customer'}</p>
                                        <p className="text-xs text-gray-500">{booking.userId?.phone || 'No phone'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-300">{booking.salonId?.salonName || 'N/A'}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                            <MapPin className="w-2.5 h-2.5" />
                                            {booking.salonId?.city || 'N/A'}
                                        </div>
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
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status !== 'cancelled' && (
                                                <button 
                                                    onClick={() => handleCancel(booking._id)}
                                                    disabled={actionLoading === booking._id}
                                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                    title="Cancel Booking"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                                                <FileText className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
