// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, [cartItems]);

  const incrementCartCount = () => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  };

  return (
    <Router>
      <div>
        <NavBar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<ProductList incrementCartCount={incrementCartCount} />} />
          <Route path="/products/:id" element={<ProductDetail incrementCartCount={incrementCartCount} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
