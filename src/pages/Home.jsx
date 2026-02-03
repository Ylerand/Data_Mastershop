import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './Home.css';

export default function Home() {
    const { products } = useProducts();
    const { addToCart } = useCart();

    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="hero-text">
                    <h1 className="hero-title">Nueva Colección - <br /><span>Elegancia Atemporal</span></h1>
                    <p>Luxurolo e-commerce de la web appliinop</p>
                    <button
                        className="btn-primary"
                        onClick={() => document.querySelector('.product-showcase').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Comprar Ahora
                    </button>
                </div>
                <div className="hero-visual">
                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000" alt="Fashion" />
                </div>
            </header>

            <section className="product-showcase">
                <div className="product-grid">
                    {products.map((p) => (
                        <div key={p.id} className="item-card">
                            <div className="item-img">
                                <img src={p.image} alt={p.name} />
                            </div>
                            <div className="item-details">
                                <h4>{p.name}</h4>
                                <p className="price">{p.price.toFixed(2)} €</p>
                                <button
                                    onClick={() => {
                                        addToCart(p);
                                        alert("¡Producto añadido con estilo! 👜");
                                    }}
                                    className="btn-add-cart"
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}