import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken'));

    const login = async (email, password) => {
        const res = await axios.post(`${API_BASE}/admin/login`, { email, password });
        const { token } = res.data;
        localStorage.setItem('adminToken', token);
        setAdminToken(token);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdminToken(null);
    };

    const api = axios.create({ baseURL: API_BASE });
    api.interceptors.request.use(cfg => {
        if (adminToken) cfg.headers.Authorization = `Bearer ${adminToken}`;
        return cfg;
    });

    return (
        <AdminAuthContext.Provider value={{ adminToken, login, logout, api, isAuthenticated: !!adminToken }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminAuthContext);
