import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import {
    LayoutDashboard,
    ShoppingBag,
    BarChart3,
    Plus,
    Trash2,
    Package,
    LogOut,
    Search,
    Bell,
    Settings
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
    const { products, deleteProduct } = useProducts();
    const { orders } = useOrders(); // Simulating orders if context available, or placeholder
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('inventory');

    // Security Guard 🛡️
    useEffect(() => {
        if (!user || user.email !== 'admin@mastershop.com') {
            window.location.hash = 'admin-login';
        }
    }, [user]);

    if (!user || user.email !== 'admin@mastershop.com') return null;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Master<span>Shop</span></h2>
                    <p>Admin Console</p>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        <LayoutDashboard size={20} /> Inventario
                    </button>
                    <button className="nav-btn">
                        <Package size={20} /> Pedidos <span className="badge-cnt">{orders?.length || 0}</span>
                    </button>
                    <button className="nav-btn">
                        <BarChart3 size={20} /> Finanzas
                    </button>
                    <button className="nav-btn">
                        <Settings size={20} /> Configuración
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-logout-sidebar" onClick={logout}>
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="search-bar">
                        <Search size={18} color="#888" />
                        <input type="text" placeholder="Buscar productos, pedidos..." />
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn"><Bell size={20} /></button>
                        <div className="admin-avatar">A</div>
                    </div>
                </header>

                <div className="dashboard-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon bg-blue"><ShoppingBag size={24} color="#007bff" /></div>
                            <div>
                                <h3>{products.length}</h3>
                                <p>Productos Totales</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon bg-green"><BarChart3 size={24} color="#28a745" /></div>
                            <div>
                                <h3>$12.5M</h3>
                                <p>Ventas Mensuales</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon bg-purple"><Package size={24} color="#6f42c1" /></div>
                            <div>
                                <h3>{orders?.filter(o => o.payNow).length || 5}</h3>
                                <p>Pedidos Pendientes</p>
                            </div>
                        </div>
                    </div>

                    <div className="content-card">
                        <div className="card-header">
                            <h3>Gestión de Inventario</h3>
                            <button className="btn-add-primary"><Plus size={18} /> Añadir Producto</button>
                        </div>

                        <div className="table-responsive">
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td className="product-cell">
                                                <img src={p.image} alt="" />
                                                <div>
                                                    <strong>{p.name}</strong>
                                                    <span>ID: #{p.id}</span>
                                                </div>
                                            </td>
                                            <td>{p.category || 'General'}</td>
                                            <td className="price-cell">{p.price.toFixed(2)} €</td>
                                            <td><span className="status-pill active">En Stock</span></td>
                                            <td>
                                                <button className="action-btn delete" onClick={() => deleteProduct(p.id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}