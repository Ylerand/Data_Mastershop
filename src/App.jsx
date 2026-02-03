import React, { useState, useEffect } from 'react'

// 1. Importamos los Contextos (La lógica global)
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider, useCart } from './context/CartContext'

// 2. Importamos Páginas y Componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import Account from './pages/Account' // ✅ ¡Recuperado!

// 3. Importamos Estilos
import './App.css'

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { cart } = useCart();

  // Lógica para detectar el cambio de página (Rutas con #)
  useEffect(() => {
    const handleHashChange = () => {
      // Si la ruta es #dashboard, toma 'dashboard'. Si está vacía, toma 'home'
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    // Escuchar cambios y ejecutar al inicio
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Calcular total de items en el carrito para el icono
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Función para decidir qué página mostrar
  const renderPage = () => {
    switch (currentPage) {
      case 'admin-login':
        return <AdminLogin />;
      case 'dashboard':
        return <Dashboard />;
      case 'account':
        return <Account />; // ✅ Ahora la página de Cuenta funciona
      case 'home':
      case 'shop':
      default:
        return <Home />;
    }
  };

  // Ocultar Navbar y Footer en páginas de administración
  // Nota: Account SÍ lleva Navbar, así que no lo incluimos aquí
  const isAdminPage = currentPage === 'admin-login' || currentPage === 'dashboard';

  return (
    <div className="app-container">
      {/* Mostramos Navbar solo si NO estamos en admin */}
      {!isAdminPage && (
        <Navbar
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}

      <main className="fade-in">
        {renderPage()}
      </main>

      {/* Mostramos Footer solo si NO estamos en admin */}
      {!isAdminPage && <Footer />}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

// Componente Principal que envuelve todo
export default function App() {
  return (
    <AuthProvider>
      {/* 🧠 MEJORA EXPERTA: ProductProvider envuelve al CartProvider */}
      {/* Porque primero existen los productos, luego se agregan al carrito */}
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}