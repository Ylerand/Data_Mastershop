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

    const login = (email, password) => {
        // 1. Check Admin
        if (email === 'admin@mastershop.com' && password === 'admin123') {
            const adminUser = { email, name: 'Admin Master', role: 'admin' };
            setUser(adminUser);
            localStorage.setItem('mastershop_active_user', JSON.stringify(adminUser));
            return { success: true, role: 'admin' };
        }

        // 2. Check Local Users
        const users = JSON.parse(localStorage.getItem('mastershop_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...safeUser } = foundUser; // Remove password from session
            setUser(safeUser);
            localStorage.setItem('mastershop_active_user', JSON.stringify(safeUser));
            return { success: true, role: 'user' };
        }

        return { success: false, message: 'Credenciales incorrectas' };
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('mastershop_users') || '[]');

        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'El correo ya está registrado' };
        }

        const newUser = { ...userData, id: Date.now(), role: 'user', joinDate: new Date().toLocaleDateString() };
        users.push(newUser);
        localStorage.setItem('mastershop_users', JSON.stringify(users));

        // Auto-login
        const { password, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem('mastershop_active_user', JSON.stringify(safeUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mastershop_active_user');
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
