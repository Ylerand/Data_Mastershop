import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import './App.css';

// MasterShop Expert Upgrade - Build Sync 2026-02-03
export default function App() {
  const [view, setView] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => setView(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isAdminView = view === 'dashboard';
  const isAuthView = view === 'login' || view === 'register' || view === 'admin-login';

  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <div className="master-app">
              {!isAdminView && !isAuthView && (
                <Navbar
                  onAccount={() => window.location.hash = 'account'}
                  onCartClick={() => setCartOpen(true)}
                  onHome={() => window.location.hash = 'home'}
                />
              )}

              <main className="fade-in">
                {view === 'dashboard' ? <Dashboard /> :
                  view === 'login' ? <Login /> :
                    view === 'register' ? <Register /> :
                      view === 'admin-login' ? <Login /> : // Redirect old admin route to unified login
                        view === 'account' ? <Account /> :
                          <Home />}
              </main>

              <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

              {!isAdminView && !isAuthView && <Footer />}
            </div>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}