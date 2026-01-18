import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCart = async () => {
      if (!user) {
          setCartItems([]);
          setCartCount(0);
          return;
      }
      try {
          const { data } = await api.get('/cart');
          setCartItems(data.items);
          const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(count);
      } catch (error) {
          console.error("Failed to fetch cart", error);
      }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (bookId) => {
      if (!user) throw new Error("Please login to add items to cart");
      await api.post('/cart', { bookId, quantity: 1 });
      fetchCart();
  };

  const removeFromCart = async (bookId) => {
    if (!user) return;
    await api.delete(`/cart/${bookId}`);
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
