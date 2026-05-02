import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from './AdminAuthContext';
import {
    LayoutDashboard, Store, CalendarDays, TrendingUp, DollarSign,
    LogOut, Scissors, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/salons',    icon: Store,           label: 'Salons' },
    { to: '/admin/bookings',  icon: CalendarDays,    label: 'Bookings' },
    { to: '/admin/promotions',icon: TrendingUp,      label: 'Promotions' },
    { to: '/admin/earnings',  icon: DollarSign,      label: 'Earnings' },
];

const AdminLayout = ({ children }) => {
    const { logout } = useAdmin();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const Sidebar = ({ mobile = false }) => (
        <aside className={`${mobile ? 'flex' : 'hidden lg:flex'} flex-col w-64 bg-gray-950 border-r border-white/5 h-full`}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-white font-black text-sm tracking-tight">BookMySalon</p>
                    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">Admin Panel</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                                isActive
                                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                        {label}
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
            {/* Desktop sidebar */}
            <Sidebar />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-64 z-50">
                        <Sidebar mobile />
                    </div>
                </div>
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-white/5"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="hidden lg:block">
                        <p className="text-xs text-gray-500 font-medium">Welcome back, Administrator</p>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <span className="text-orange-400 text-xs font-black">A</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-300 hidden sm:block">Admin</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
