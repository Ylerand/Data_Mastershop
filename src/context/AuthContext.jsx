import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar sesión inicial
    useEffect(() => {
        const savedUser = localStorage.getItem('mastershop_active_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('mastershop_active_user', JSON.stringify(data.user));
                localStorage.setItem('mastershop_token', data.token);
                return { success: true, role: data.user.role };
            } else {
                return { success: false, message: data.message || 'Error en el login' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'No se pudo conectar con el servidor' };
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('mastershop_active_user', JSON.stringify(data.user));
                localStorage.setItem('mastershop_token', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Error en el registro' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'No se pudo conectar con el servidor' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mastershop_active_user');
        localStorage.removeItem('mastershop_token');
        window.location.hash = 'home';
    };

    const updateProfile = (newData) => {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem('mastershop_active_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
