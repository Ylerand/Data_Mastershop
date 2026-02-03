import React from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-pro">
            <div className="footer-content">
                <div className="footer-col brand-col">
                    <h2 className="footer-logo">Master<span>Shop</span></h2>
                    <p>La experiencia definitiva en moda y lujo. Calidad premium garantizada en cada detalle.</p>
                    <div className="social-icons">
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="footer-col links-col">
                    <h3>Explorar</h3>
                    <a href="#home">Inicio</a>
                    <a href="#home">Colecciones</a>
                    <a href="#account">Mi Cuenta</a>
                    <a href="#admin-login">Admin</a>
                </div>

                <div className="footer-col contact-col">
                    <h3>Contacto Vip</h3>
                    <div className="contact-item">
                        <Phone size={18} className="icon-gold" />
                        <span>Whatsapp: <a href="https://wa.me/56930514851" target="_blank" rel="noreferrer">+56 9 3051 4851</a></span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} className="icon-gold" />
                        <span>Email: <a href="mailto:em.ylerand@duocuc.cl">em.ylerand@duocuc.cl</a></span>
                    </div>
                    <div className="contact-item">
                        <MapPin size={18} className="icon-gold" />
                        <span>Santiago, Chile</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MasterShop Pro. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
