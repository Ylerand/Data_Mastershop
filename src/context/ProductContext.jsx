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

  // NOTA: Para que el Dashboard funcione como lo programamos, 
  // necesitamos pasar 'setProducts' directamente en el value.
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};