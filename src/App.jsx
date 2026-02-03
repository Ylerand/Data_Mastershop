import React, { useState, useEffect } from 'react'
// Importamos los contextos (Los "Cerebros" de la app)
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext' // <--- ¡AQUÍ ESTÁ LO NUEVO!

// Importamos las páginas y componentes
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import AdminLogin from './pages/AdminLogin'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import './App.css'

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { cart } = useCart();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'admin-login':
        return <AdminLogin />;
      case 'dashboard':
        return <Dashboard />;
      case 'account':
        return <Account />;
      case 'home':
      case 'shop':
      default:
        return <Home />;
    }
  };

  const isAdminPage = currentPage === 'admin-login' || currentPage === 'dashboard';

  return (
    <div className="app-container">
      {!isAdminPage && (
        <Navbar
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}

      <main className="fade-in">
        {renderPage()}
      </main>

      {!isAdminPage && <Footer />}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

// AQUÍ ESTÁ EL CAMBIO CLAVE DEL PASO 2:
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider> {/* <--- ESTO ES LO QUE AGREGAMOS (El envoltorio) */}

          <AppContent />

        </ProductProvider> {/* <--- AQUÍ SE CIERRA */}
      </CartProvider>
    </AuthProvider>
  )
}

export default App