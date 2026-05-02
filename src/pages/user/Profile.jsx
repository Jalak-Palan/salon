import React, { useState } from 'react';
import { User, CalendarCheck, Heart, Settings, LogOut, ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const Profile = () => {
    const { user, logout, setUser } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage({ type: '', text: '' });
            
            const response = await API.put('/auth/profile', formData);
            
            if (response.data.success) {
                // Update local storage and context
                const updatedUser = response.data.user;
                setUser(updatedUser);
                const authData = JSON.parse(localStorage.getItem('auth'));
                localStorage.setItem('auth', JSON.stringify({ ...authData, user: updatedUser }));
                
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 py-8 animate-fade-in pb-20">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your details, bookings, and saved salons.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Sidebar Navigation */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* User Summary */}
                        <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center space-x-4">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-2xl uppercase border-4 border-white shadow-inner">
                                {user ? user.name.charAt(0) : 'G'}
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="text-xl font-bold text-gray-800 truncate">{user?.name || 'Guest User'}</h2>
                                <p className="text-xs text-gray-400 truncate">{user?.email || 'Not logged in'}</p>
                            </div>
                        </div>

                        {/* Nav Links */}
                        <nav className="p-4 space-y-2">
                            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-orange-50 text-primary font-bold transition-all shadow-sm shadow-orange-100">
                                <span className="flex items-center space-x-3"><User className="w-5 h-5" /> <span>Account Details</span></span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => navigate('/my-bookings')}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 font-bold transition-all"
                            >
                                <span className="flex items-center space-x-3"><CalendarCheck className="w-5 h-5 text-gray-400" /> <span>My Bookings</span></span>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 font-bold transition-all">
                                <span className="flex items-center space-x-3"><Heart className="w-5 h-5 text-gray-400" /> <span>Saved Salons</span></span>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 font-bold transition-all">
                                <span className="flex items-center space-x-3"><Settings className="w-5 h-5 text-gray-400" /> <span>Settings</span></span>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </button>
                        </nav>
                        
                        <div className="p-4 border-t border-gray-100">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center space-x-2 p-3.5 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all border border-transparent hover:border-red-100"
                            >
                                <LogOut className="w-5 h-5" /> <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Content Area (Account Details View) */}
                <div className="w-full md:w-3/4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <User className="w-32 h-32" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Details</h2>
                        <p className="text-gray-500 mb-8">Update your personal information to help us serve you better.</p>

                        <form onSubmit={handleSave} className="space-y-6 max-w-2xl relative z-10">
                            {message.text && (
                                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-fade-in ${
                                    message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <span className="text-sm font-bold">{message.text}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-800" 
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                disabled 
                                                defaultValue={user?.email}
                                                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed outline-none font-medium" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210" 
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-800" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className={`bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 transition-all flex items-center gap-3 ${
                                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        'Save All Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
