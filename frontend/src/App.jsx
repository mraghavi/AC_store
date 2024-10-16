import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart'; // Ensure Cart is imported

const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]); // State to manage cart items

    return (
        <Router>
            <Navbar 
                searchKeyword={searchKeyword} 
                setSearchKeyword={setSearchKeyword} 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
            />
            <Routes>
                <Route path="/" element={<ProductList searchKeyword={searchKeyword} cartItems={cartItems} setCartItems={setCartItems} isLoggedIn={isLoggedIn}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} isLoggedIn={isLoggedIn}/>} />
                <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} /> {/* Cart route */}
            </Routes>
        </Router>
    );
};

export default App;
