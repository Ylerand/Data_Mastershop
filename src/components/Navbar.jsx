import React from 'react'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCartClick, onAccount, onHome }) => {
    const { cart } = useCart();
    const { user } = useAuth();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav style={styles.nav}>
            <h1 onClick={onHome} style={{ ...styles.logo, cursor: 'pointer' }}>
                Master<span style={styles.logoSpan}>Shop</span> 🌸
            </h1>

            <div style={styles.links}>
                <a href="#home" style={styles.link}>Inicio</a>
                <a href="#home" style={styles.link}>Colecciones</a>

                {user?.role === 'admin' && (
                    <a href="#dashboard" style={{ ...styles.link, color: '#d43f3f' }}>Panel Admin</a>
                )}

                {user ? (
                    <a href="#account" style={styles.link}>Mi Cuenta</a>
                ) : (
                    <a href="#login" style={styles.link}>Iniciar Sesión</a>
                )}

                <button onClick={onCartClick} style={styles.cartBtn}>
                    <span>Tu Carrito</span>
                    {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
                </button>
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
        backdropFilter: 'blur(10px)'
    },
    logo: {
        margin: 0,
        fontSize: '2rem',
        fontFamily: "'Playfair Display', serif",
        color: '#2d2d2d',
        letterSpacing: '-0.5px'
    },
    logoSpan: {
        color: '#d48296', // Returning to the previous soft rose gold for sophistication
        fontStyle: 'italic',
        fontWeight: '400'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '35px'
    },
    link: {
        textDecoration: 'none',
        color: '#555',
        fontWeight: '600',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'color 0.3s',
    },
    cartBtn: {
        backgroundColor: '#1a1a1a',
        color: 'white',
        border: 'none',
        padding: '12px 28px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s'
    },
    badge: {
        backgroundColor: '#d48296',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 8px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        minWidth: '18px',
        textAlign: 'center'
    }
}

export default Navbar