import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { CreditCard, Lock, X } from 'lucide-react';
import './Account.css';

import { useAuth } from '../context/AuthContext'; // Import Auth

export default function Account() {
    const { orders, payOrder, payAllOrders } = useOrders();
    const { user, logout } = useAuth(); // Destructure logout
    const [activeOrder, setActiveOrder] = useState(null); // Can be order ID or 'ALL'
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const pendingOrdersCount = orders.filter(o => o.payNow).length;
    const isAdmin = user?.email === 'admin@mastershop.com';

    const openPaymentModal = (orderId = 'ALL') => {
        setActiveOrder(orderId);
        setPaymentModalOpen(true);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Simulate processing delay
        setTimeout(() => {
            if (activeOrder === 'ALL') {
                payAllOrders();
            } else {
                payOrder(activeOrder);
            }
            setPaymentModalOpen(false);
            alert("¡Pago Aprobado! Gracias por su compra 💎");
        }, 1500);
    };

    return (
        <div className="account-view">
            <div className="account-header">
                <div>
                    <h2>Mi Cuenta</h2>
                    <p>Bienvenido, {user?.name || 'Cliente MasterShop'}</p>
                </div>
                <div className="account-actions">
                    {isAdmin && (
                        <a href="#dashboard" className="btn-admin-access">
                            ⚙️ Panel Admin
                        </a>
                    )}
                    <button onClick={logout} className="btn-logout">
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <section className="order-history">
                <div className="section-title-row">
                    <h3>Mis Pedidos Recientes</h3>
                    {pendingOrdersCount > 0 && (
                        <button className="btn-pay-all-luxury" onClick={() => openPaymentModal('ALL')}>
                            Pagar Todo ({pendingOrdersCount})
                        </button>
                    )}
                </div>

                <div className="order-list">
                    {orders.length === 0 ? <p className="no-orders">Aún no tienes pedidos.</p> : orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <span className="order-id">{order.id}</span>
                                <span className={`badge ${order.payNow ? 'wait' : 'done'}`}>{order.status}</span>
                            </div>
                            <div className="order-previews">
                                {order.items.map((item, i) => <img key={i} src={item.image} alt="" />)}
                            </div>
                            <div className="order-footer">
                                <span className="total">{order.total}</span>
                                {order.payNow && (
                                    <button className="btn-pay-luxury" onClick={() => openPaymentModal(order.id)}>PAGAR CON TARJETA</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {isPaymentModalOpen && (
                <div className="modal-overlay">
                    <div className="pay-modal luxury-modal">
                        <div className="modal-top">
                            <h3><CreditCard size={24} color="#d43f3f" /> Pasarela Segura</h3>
                            <X className="close" onClick={() => setPaymentModalOpen(false)} />
                        </div>
                        <p className="modal-amount">
                            Total a Pagar: <span>{activeOrder === 'ALL' ? 'Todos los pendientes' : 'Pedido Actual'}</span>
                        </p>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="card-visual">
                                {/* Visual placeholder for a card */}
                                <div className="card-chip"></div>
                                <div className="card-number-display">•••• •••• •••• 4242</div>
                            </div>

                            <div className="card-input">
                                <label>Nombre del Titular</label>
                                <input type="text" placeholder="EJ: JUAN PEREZ" required />
                            </div>
                            <div className="card-input">
                                <label>Número de Tarjeta</label>
                                <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                            </div>
                            <div className="flex-row">
                                <div className="card-input">
                                    <label>Vencimiento</label>
                                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                                </div>
                                <div className="card-input">
                                    <label>CVC</label>
                                    <input type="password" placeholder="123" maxLength="3" required />
                                </div>
                            </div>
                            <button type="submit" className="btn-confirm-luxury">CONFIRMAR PAGO SEGURO</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}