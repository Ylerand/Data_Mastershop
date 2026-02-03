import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const Dashboard = () => {
    const { products, setProducts } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para el formulario de nuevo producto
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    // Calcular estadísticas
    const totalValue = products.reduce((acc, p) => acc + Number(p.price), 0);

    // Manejadores (Handlers)
    const handleLogout = () => {
        window.location.hash = 'home';
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Seguro que quieres eliminar esta flor? 🥀')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSave = () => {
        if (!newProduct.name || !newProduct.price) return alert('Ponle nombre y precio 🌸');

        const productToAdd = {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            image: newProduct.image || 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=80', // Imagen por defecto
            category: 'Flores'
        };

        setProducts([...products, productToAdd]);
        setIsModalOpen(false);
        setNewProduct({ name: '', price: '', image: '' }); // Limpiar formulario
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>🌹 MasterShop Admin</h2>
                <button style={styles.logoutBtn} onClick={handleLogout}>Cerrar Sesión</button>
            </nav>

            <div style={styles.content}>
                {/* Encabezado */}
                <div style={styles.headerTitle}>
                    <div>
                        <h1 style={{ color: '#9e475b', margin: 0 }}>Panel de Control</h1>
                        <p style={{ color: '#888', margin: '5px 0' }}>Gestiona tu inventario con amor</p>
                    </div>
                    <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>
                        + Nuevo Producto
                    </button>
                </div>

                {/* Tarjetas de Resumen (Grid) */}
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Total Productos</h3>
                        <p style={styles.cardValue}>{products.length}</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Valor del Inventario</h3>
                        <p style={styles.cardValue}>${totalValue.toLocaleString()}</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Estado</h3>
                        <p style={styles.cardValue}><span style={{ fontSize: '1rem' }}>Activo 🟢</span></p>
                    </div>
                </div>

                {/* Tabla de Productos */}
                <div style={styles.section}>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Producto</th>
                                    <th style={styles.th}>Precio</th>
                                    <th style={styles.th}>Categoría</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={styles.productImg}
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                                                />
                                                <span style={{ fontWeight: 'bold', color: '#555' }}>{product.name}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>${Number(product.price).toLocaleString()}</td>
                                        <td style={styles.td}><span style={styles.badge}>{product.category || 'General'}</span></td>
                                        <td style={styles.td}>
                                            <button style={styles.deleteBtn} onClick={() => handleDelete(product.id)}>
                                                🗑️ Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para Agregar */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={{ color: '#9e475b', marginTop: 0 }}>✨ Nueva Flor</h2>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.label}>Nombre del Producto</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. Ramo de Rosas Rojas"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.label}>Precio</label>
                            <input
                                type="number"
                                style={styles.input}
                                placeholder="Ej. 15000"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={styles.label}>URL de la Imagen</label>
                            <input
                                style={styles.input}
                                placeholder="https://..."
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            <button style={styles.saveBtn} onClick={handleSave}>Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- TUS ESTILOS ROSE EDITION ---
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#fff', // Corregido para mejor contraste inicial
        backgroundImage: 'linear-gradient(to bottom right, #fff0f5, #ffffff)', // Un degradado sutil
        fontFamily: "'Segoe UI', sans-serif",
    },
    navbar: {
        display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem',
        backgroundColor: 'white', borderBottom: '2px solid #fce4ec',
        boxShadow: '0 4px 15px rgba(212, 130, 150, 0.1)'
    },
    logo: { margin: 0, color: '#9e475b', fontFamily: 'serif', letterSpacing: '1px' },
    logoutBtn: {
        padding: '8px 16px', backgroundColor: 'white', color: '#9e475b',
        border: '1px solid #9e475b', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
    },
    content: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    headerTitle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    addButton: {
        backgroundColor: '#d48296', color: 'white', border: 'none',
        padding: '12px 24px', borderRadius: '25px', cursor: 'pointer',
        fontWeight: 'bold', boxShadow: '0 4px 10px rgba(212, 130, 150, 0.4)'
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
    card: {
        backgroundColor: 'white', padding: '20px', borderRadius: '15px',
        borderLeft: '5px solid #d48296', boxShadow: '0 4px 15px rgba(212, 130, 150, 0.1)'
    },
    cardTitle: { margin: '0 0 10px 0', fontSize: '0.9rem', color: '#9e475b', textTransform: 'uppercase' },
    cardValue: { margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#4a4a4a' },
    section: { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(212, 130, 150, 0.1)' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
    th: { padding: '15px', textAlign: 'left', borderBottom: '2px solid #ffebee', color: '#9e475b', fontWeight: 'bold' },
    td: { padding: '15px', borderBottom: '1px solid #ffebee', verticalAlign: 'middle' },
    productImg: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ffebee' },
    badge: { backgroundColor: '#ffebee', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', color: '#9e475b', fontWeight: '600' },
    deleteBtn: { color: '#e57373', border: '1px solid #ffebee', backgroundColor: 'white', padding: '5px 10px', borderRadius: '15px', cursor: 'pointer' },

    // Modal Rosa
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(50, 20, 30, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '500px', borderTop: '10px solid #d48296' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#666' },
    input: { width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '10px', boxSizing: 'border-box', backgroundColor: '#fffafa' },
    saveBtn: { flex: 1, padding: '12px', backgroundColor: '#d48296', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
    cancelBtn: { flex: 1, padding: '12px', backgroundColor: '#f5f5f5', color: '#666', border: 'none', borderRadius: '10px', cursor: 'pointer' }
};

export default Dashboard;