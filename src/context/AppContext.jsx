import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'farmer' or 'buyer'

  // Dummy Farmers
  const [farmers] = useState([
    { id: 'f1', name: 'Ramesh Patil', location: 'Nashik', distance: 4.2, rating: 4.7, verified: true },
    { id: 'f2', name: 'Suresh Farm', location: 'Nashik', distance: 7.8, rating: 4.6, verified: true },
    { id: 'f3', name: 'Meena Agro Farm', location: 'Nashik', distance: 12.5, rating: 4.9, verified: true },
  ]);

  // Dummy Products
  const [products, setProducts] = useState([
    { id: 'p1', farmerId: 'f1', name: 'Tomato', category: 'Vegetables', price: 28, quantity: 120, minOrder: 5, condition: 'Fresh', radius: 15, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80' },
    { id: 'p2', farmerId: 'f1', name: 'Onion', category: 'Vegetables', price: 30, quantity: 200, minOrder: 10, condition: 'Stored', radius: 15, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80' },
    { id: 'p3', farmerId: 'f2', name: 'Onion', category: 'Vegetables', price: 32, quantity: 250, minOrder: 5, condition: 'Fresh', radius: 20, image: 'https://images.unsplash.com/photo-1628773822503-ae4cfc968f2f?w=500&q=80' },
    { id: 'p4', farmerId: 'f2', name: 'Potato', category: 'Vegetables', price: 25, quantity: 300, minOrder: 10, condition: 'Stored', radius: 20, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80' },
    { id: 'p5', farmerId: 'f3', name: 'Wheat', category: 'Grains', price: 42, quantity: 500, minOrder: 50, condition: 'Fresh', radius: 50, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80' },
  ]);

  // Cart: array of cart items
  const [cart, setCart] = useState([]);
  
  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity, farmer: farmers.find(f => f.id === product.farmerId) }];
    });
  };

  const clearCart = () => setCart([]);

  // Orders
  const [orders, setOrders] = useState([]);
  const addOrder = (order) => setOrders(prev => [order, ...prev]);

  return (
    <AppContext.Provider value={{
      userRole, setUserRole,
      farmers,
      products, setProducts,
      cart, addToCart, clearCart,
      orders, addOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};
