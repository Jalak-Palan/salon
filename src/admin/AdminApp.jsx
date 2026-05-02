import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdmin } from './AdminAuthContext';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSalons from './pages/AdminSalons';
import AdminBookings from './pages/AdminBookings';
import AdminPromotions from './pages/AdminPromotions';
import AdminEarnings from './pages/AdminEarnings';

const AdminRouter = () => {
    const { isAuthenticated } = useAdmin();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return (
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="salons" element={<AdminSalons />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="promotions" element={<AdminPromotions />} />
                <Route path="earnings" element={<AdminEarnings />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </AdminLayout>
    );
};

const AdminApp = () => (
    <AdminAuthProvider>
        <AdminRouter />
    </AdminAuthProvider>
);

export default AdminApp;
