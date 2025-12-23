import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session on load
        const storedUser = localStorage.getItem('warehouse_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (pin) => {
        try {
            const response = await api.verifyPin(pin);
            if (response.success) {
                setUser(response.user);
                localStorage.setItem('warehouse_user', JSON.stringify(response.user));
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('warehouse_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
