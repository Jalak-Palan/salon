import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminAuthContext';
import { 
    DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight,
    Users, PieChart, CreditCard, Loader2, Download
} from 'lucide-react';

const AdminEarnings = () => {
    const { api } = useAdmin();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                setLoading(true);
                const res = await api.get('/admin/earnings');
                setData(res.data.data);
            } catch (err) {
                setError('Failed to fetch platform earnings.');
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, [api]);

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-gray-500 font-medium">Calculating revenue...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Earnings & Revenue</h1>
                    <p className="text-gray-500 text-sm">Monitor your platform revenue and subscription performance.</p>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:shadow-orange-500/20">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
                    <p className="text-3xl font-black text-white mt-2">₹{(data.totalRevenue || 0).toLocaleString()}</p>
                    <div className="mt-4 flex items-center gap-1 text-green-400 text-xs font-bold">
                        <ArrowUpRight className="w-4 h-4" /> 22% vs last month
                    </div>
                </div>
                <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active MRR</p>
                    <p className="text-3xl font-black text-white mt-2">₹{(data.activeRevenue || 0).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">Estimated monthly</p>
                </div>
                <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Transactions</p>
                    <p className="text-3xl font-black text-white mt-2">{data.totalTransactions || 0}</p>
                    <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">Lifetime payments</p>
                </div>
                <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Plans</p>
                    <p className="text-3xl font-black text-white mt-2">{data.activeSubscriptions || 0}</p>
                    <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">Active users</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Breakdown */}
                <div className="lg:col-span-1 bg-gray-900 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-orange-500" />
                        Plan Breakdown
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                <span className="text-gray-400">Recommended</span>
                                <span className="text-white">₹{data.planBreakdown?.recommended || 0}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(data.planBreakdown?.recommended / (data.totalRevenue || 1)) * 100}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                <span className="text-gray-400">Top Rated</span>
                                <span className="text-white">₹{data.planBreakdown?.top || 0}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(data.planBreakdown?.top / (data.totalRevenue || 1)) * 100}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Earning Salons */}
                <div className="lg:col-span-2 bg-gray-900 border border-white/5 rounded-2xl p-6 overflow-hidden">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        Top Revenue Partners
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="px-6 py-4">Partner</th>
                                    <th className="px-6 py-4">Total Earning</th>
                                    <th className="px-6 py-4">Payments</th>
                                    <th className="px-6 py-4 text-right">Loyalty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.perSalon?.slice(0, 5).map((salon) => (
                                    <tr key={salon.salonId} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight">{salon.salonName}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{salon.ownerName}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-black text-orange-400 tracking-tighter">₹{salon.total.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-gray-500">
                                            {salon.subscriptions?.length || 0} bills
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                <span className="text-xs font-bold text-gray-400">High</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 overflow-hidden">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    Latest Transactions
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/5">
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-black/20">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Salon</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.recentTransactions?.map((tx) => (
                                <tr key={tx._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-gray-400 text-[10px]">TXN-{tx._id.slice(-8).toUpperCase()}</td>
                                    <td className="px-6 py-4 font-bold text-gray-300">{tx.salonName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${tx.planType === 'top' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                            {tx.planType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-black">₹{tx.amount}</td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest border border-green-500/20 rounded-lg">PAID</span>
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

export default AdminEarnings;
