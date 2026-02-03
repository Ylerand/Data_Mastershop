import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { CreditCard, Lock, X } from 'lucide-react';
import './Account.css';

import { useAuth } from '../context/AuthContext'; // Import Auth

export default function Account() {
    const { orders, payOrder, payAllOrders } = useOrders(); // Destructure payAllOrders
    const { user } = useAuth(); // Get user for Admin check
    const [activeOrder, setActiveOrder] = useState(null);

    const pendingOrdersCount = orders.filter(o => o.payNow).length;
    const isAdmin = user?.email === 'admin@mastershop.com';

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        payOrder(activeOrder);
        setActiveOrder(null);
        alert("¡Pago procesado con éxito! ✨");
    };

    const handlePayAll = () => {
        if (confirm(`¿Deseas pagar los ${pendingOrdersCount} pedidos pendientes?`)) {
            payAllOrders();
            alert("¡Todos los pedidos han sido pagados! 🚀");
        }
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
                            ⚙️ Panel Administrador
                        </a>
                    )}
                </div>
            </div>

            <section className="order-history">
                <div className="section-title-row">
                    <h3>Mis Pedidos Recientes</h3>
                    {pendingOrdersCount > 0 && (
                        <button className="btn-pay-all" onClick={handlePayAll}>
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
                                    <button className="btn-pay" onClick={() => setActiveOrder(order.id)}>Pagar con Tarjeta</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {activeOrder && (
                <div className="modal-overlay">
                    <div className="pay-modal">
                        <div className="modal-top">
                            <h3><Lock size={18} /> Pago Seguro</h3>
                            <X className="close" onClick={() => setActiveOrder(null)} />
                        </div>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="card-input">
                                <label>Nombre del Titular</label>
                                <input type="text" placeholder="Como aparece en la tarjeta" required />
                            </div>
                            <div className="card-input">
                                <label>Número de Tarjeta</label>
                                <input type="text" placeholder="0000 0000 0000 0000" maxLength="16" required />
                            </div>
                            <div className="flex-row">
                                <input type="text" placeholder="MM/YY" maxLength="5" required />
                                <input type="password" placeholder="CVC" maxLength="3" required />
                            </div>
                            <button type="submit" className="btn-confirm">FINALIZAR COMPRA</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}