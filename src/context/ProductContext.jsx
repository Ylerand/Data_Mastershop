import React, { createContext, useContext, useState, useEffect } from 'react';
// Asegúrate de que la ruta a tus datos sea correcta
import { products as initialData } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts debe usarse dentro de un ProductProvider');
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todas', 'Ropa', 'Accesorios', 'Joyería', 'Maquillaje', 'Belleza', 'Exclusivos 2026']);
  const [loading, setLoading] = useState(true);

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('mastershop_token');
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (res.ok) setProducts(prev => [...prev, data]);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('mastershop_token');
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (categoryToDelete) => {
    setCategories(categories.filter(c => c !== categoryToDelete));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      categories,
      addCategory,
      deleteCategory,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
};