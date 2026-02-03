import React, { createContext, useContext, useState } from 'react';
// Asegúrate de que la ruta a tus datos sea correcta
import { products as initialData } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts debe usarse dentro de un ProductProvider');
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialData);
  const [categories, setCategories] = useState(['Ropa', 'Accesorios', 'Joyas', 'Calzado']);

  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const deleteCategory = (name) => {
    setCategories(categories.filter(c => c !== name));
  };

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      categories,
      addCategory,
      deleteCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};