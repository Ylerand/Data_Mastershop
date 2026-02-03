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
    Settings,
    X
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
    const { products, deleteProduct, addProduct } = useProducts();
    const { orders } = useOrders();
    const { user, logout } = useAuth();

    // State
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // New Product Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Ropa',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'
    });

    // Security Guard 🛡️
    useEffect(() => {
        if (!user || user.email !== 'admin@mastershop.com') {
            window.location.hash = 'admin-login';
        }
    }, [user]);

    if (!user || user.email !== 'admin@mastershop.com') return null;

    // Filter Logic
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredOrders = orders.filter(o =>
        o.id.toString().includes(searchTerm) ||
        o.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = (e) => {
        e.preventDefault();
        addProduct({
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            category: newProduct.category,
            image: newProduct.image,
            stock: true
        });
        setAddModalOpen(false);
        setNewProduct({ name: '', price: '', category: 'Ropa', image: '' });
        alert("¡Producto añadido al catálogo! 🛍️");
    };

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
                    <button
                        className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <Package size={20} /> Pedidos <span className="badge-cnt">{orders.length}</span>
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'finance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('finance')}
                    >
                        <BarChart3 size={20} /> Finanzas
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings size={20} /> Configuración
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-logout-sidebar" onClick={() => {
                        logout();
                        window.location.hash = 'admin-login';
                    }}>
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="search-bar">
                        <Search size={18} color="#888" />
                        <input
                            type="text"
                            placeholder="Buscar productos, pedidos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn"><Bell size={20} /></button>
                        <div className="admin-avatar">A</div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {/* Stats Row */}
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
                                <h3>${orders.reduce((acc, o) => acc + parseFloat(o.total.replace('€', '') || 0), 0).toFixed(2)}</h3>
                                <p>Ventas Totales</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon bg-purple"><Package size={24} color="#6f42c1" /></div>
                            <div>
                                <h3>{orders.filter(o => o.payNow).length}</h3>
                                <p>Pedidos Pendientes</p>
                            </div>
                        </div>
                    </div>

                    {/* VISTA: INVENTARIO */}
                    {activeTab === 'inventory' && (
                        <div className="content-card">
                            <div className="card-header">
                                <h3>Inventario Global</h3>
                                <button className="btn-add-primary" onClick={() => setAddModalOpen(true)}>
                                    <Plus size={18} /> Añadir Producto
                                </button>
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
                                        {filteredProducts.map(p => (
                                            <tr key={p.id}>
                                                <td className="product-cell">
                                                    <img src={p.image} alt="" />
                                                    <div>
                                                        <strong>{p.name}</strong>
                                                        <span>ID: #{p.id}</span>
                                                    </div>
                                                </td>
                                                <td>{p.category}</td>
                                                <td className="price-cell">{p.price.toFixed(2)} €</td>
                                                <td><span className="status-pill active">En Stock</span></td>
                                                <td>
                                                    <button className="action-btn delete" onClick={() => {
                                                        if (confirm('¿Eliminar producto?')) deleteProduct(p.id);
                                                    }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* VISTA: PEDIDOS */}
                    {activeTab === 'orders' && (
                        <div className="content-card">
                            <div className="card-header"><h3>Gestión de Pedidos</h3></div>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>ID Pedido</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length === 0 ? <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No hay pedidos</td></tr> : filteredOrders.map(o => (
                                        <tr key={o.id}>
                                            <td>#{o.id}</td>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td className="price-cell">{o.total}</td>
                                            <td>
                                                <span className={`status-pill ${o.payNow ? 'warning' : 'active'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* VISTA: FINANZAS / SETTINGS */}
                    {(activeTab === 'finance' || activeTab === 'settings') && (
                        <div className="content-card empty-state">
                            <Settings size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
                            <h3>Próximamente</h3>
                            <p>Estas secciones estarán disponibles en la versión v2.0</p>
                        </div>
                    )}
                </div>
            </main>

            {/* ADD PRODUCT MODAL */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-top">
                            <h3>Nuevo Producto</h3>
                            <X className="close" onClick={() => setAddModalOpen(false)} />
                        </div>
                        <form onSubmit={handleAddProduct}>
                            <input
                                type="text" placeholder="Nombre del Producto" required
                                value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                            <div className="flex-row">
                                <input
                                    type="number" placeholder="Precio (€)" required
                                    value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                                <select
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option>Ropa</option>
                                    <option>Joyería</option>
                                    <option>Accesorios</option>
                                    <option>Exclusivos 2026</option>
                                </select>
                            </div>
                            <input
                                type="text" placeholder="URL Imagen (https://...)" required
                                value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                            <button type="submit" className="btn-save">Guardar Producto</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}