import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MessageCircle, ChevronRight, User, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardMenu from './components/DashboardMenu';

const getThemeConfig = (type) => {
    switch (type) {
        case 'men':
            return { 
                accent: 'blue', 
                primary: 'text-blue-600', 
                bg: 'bg-blue-50', 
                border: 'border-blue-100', 
                badge: 'bg-blue-100 text-blue-700',
                label: 'Men\'s Grooming',
                image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600'
            };
        case 'women':
            return { 
                accent: 'pink', 
                primary: 'text-pink-600', 
                bg: 'bg-pink-50', 
                border: 'border-pink-100', 
                badge: 'bg-pink-100 text-pink-700',
                label: 'Women\'s Beauty',
                image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
            };
        case 'home':
            return { 
                accent: 'amber', 
                primary: 'text-amber-600', 
                bg: 'bg-amber-50', 
                border: 'border-amber-100', 
                badge: 'bg-amber-100 text-amber-700',
                label: 'Home Service',
                image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600'
            };
        case 'spa':
            return { 
                accent: 'emerald', 
                primary: 'text-emerald-600', 
                bg: 'bg-emerald-50', 
                border: 'border-emerald-100', 
                badge: 'bg-emerald-100 text-emerald-700',
                label: 'Spa Mode',
                image: '/images/spa-interior.png'
            };
        default:
            return { 
                accent: 'orange', 
                primary: 'text-primary', 
                bg: 'bg-orange-50', 
                border: 'border-orange-100', 
                badge: '',
                label: '',
                image: ''
            };
    }
};

const Dashboard = ({ serviceType }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = getThemeConfig(serviceType);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[calc(100vh-100px)] flex flex-col pt-4 animate-fade-in relative overflow-hidden">
            
            {theme.image && (
                <div className="absolute top-0 left-0 right-0 h-48 z-0 opacity-20 pointer-events-none">
                    <img src={theme.image} className="w-full h-full object-cover blur-[2px]" alt="" />
                </div>
            )}

            <div className={`relative z-10 flex items-center justify-between px-6 pb-6 border-b border-gray-100 ${theme.label ? 'pt-4' : ''}`}>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                       {theme.label && <span className={`${theme.badge} text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter`}>{theme.label}</span>}
                       <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Hey, {user?.name.split(' ')[0] || 'User'}!</h1>
                    </div>
                    <button 
                        onClick={() => navigate('/profile')}
                        className="text-gray-500 flex items-center mt-1 hover:text-primary transition-colors font-medium text-sm"
                    >
                        Edit Profile <ChevronRight className="w-4 h-4 ml-0.5" />
                    </button>
                </div>
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center overflow-hidden border-4 ${theme.border} ${theme.bg} ${!theme.badge ? 'shadow-lg' : ''}`}>
                    {user?.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <User className={`w-8 h-8 ${theme.primary}`} />
                    )}
                </div>
            </div>

            <div className="bg-orange-50 border-b border-orange-100 cursor-pointer hover:bg-orange-100/50 transition-colors">
                <div className="flex items-start px-6 py-4">
                    <div className="w-6 flex justify-center mt-0.5">
                        <MessageCircle className="w-5 h-5 text-orange-500 stroke-[1.5]" />
                    </div>
                    <div className="ml-4 flex-1">
                        <div className="font-bold text-gray-800">Get updates on WhatsApp!</div>
                        <div className="text-sm text-gray-500 mt-0.5">{user?.phone ? 'WhatsApp notifications enabled' : 'Add your Mobile Number'}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            <DashboardMenu navigate={navigate} />

            <div className="p-6 mt-auto">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-200 text-red-500 font-bold bg-white hover:bg-red-50 transition-colors shadow-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
