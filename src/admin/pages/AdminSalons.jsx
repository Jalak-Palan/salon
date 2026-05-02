import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminAuthContext';
import { 
    Search, Filter, Check, X, Trash2, ExternalLink, 
    MoreHorizontal, MapPin, Loader2, AlertCircle, ShieldCheck
} from 'lucide-react';

const AdminSalons = () => {
    const { api } = useAdmin();
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [actionLoading, setActionLoading] = useState(null); // ID of salon being updated

    const fetchSalons = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/salons');
            setSalons(res.data.data);
        } catch (err) {
            setError('Failed to fetch salons list.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalons();
    }, [api]);

    const handleStatusUpdate = async (id, action) => {
        setActionLoading(id);
        try {
            await api.put(`/admin/salons/${id}/${action}`);
            setSalons(prev => prev.map(s => s._id === id ? { ...s, status: action === 'approve' ? 'approved' : 'rejected' } : s));
        } catch (err) {
            alert(`Failed to ${action} salon.`);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this salon? All linked bookings and data will be removed.')) return;
        
        setActionLoading(id);
        try {
            await api.delete(`/admin/salons/${id}`);
            setSalons(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            alert('Failed to delete salon.');
        } finally {
            setActionLoading(null);
        }
    };

    const filteredSalons = salons.filter(s => {
        const matchesSearch = s.salonName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             s.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-gray-500 font-medium">Loading salons...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Salon Management</h1>
                    <p className="text-gray-500 text-sm">Review, approve, or manage registered salons.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search by salon or owner name..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-gray-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all min-w-[160px]"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Salons Table */}
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-black/20">
                                <th className="px-6 py-4">Salon Info</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSalons.map((salon) => (
                                <tr key={salon._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                                                <Store className="w-5 h-5 text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-2">
                                                    {salon.salonName}
                                                    {salon.isRecommended && <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />}
                                                </p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{salon.category || 'SPA'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-300">{salon.ownerName}</p>
                                        <p className="text-xs text-gray-500">{salon.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-sm">{salon.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                                            salon.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                                            salon.status === 'pending' ? 'bg-orange-500/10 text-orange-400' :
                                            'bg-red-500/10 text-red-400'
                                        }`}>
                                            {salon.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {salon.status !== 'approved' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(salon._id, 'approve')}
                                                    disabled={actionLoading === salon._id}
                                                    className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all disabled:opacity-50"
                                                    title="Approve Salon"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            {salon.status !== 'rejected' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(salon._id, 'reject')}
                                                    disabled={actionLoading === salon._id}
                                                    className="p-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
                                                    title="Reject/Reject Salon"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(salon._id)}
                                                disabled={actionLoading === salon._id}
                                                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                title="Delete Salon"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredSalons.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <AlertCircle className="w-8 h-8 mb-2 opacity-20" />
                                            <p className="font-medium">No salons found matching your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSalons;
