import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';

const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // Load login state from localStorage (preserves login state on refresh)
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    // Update localStorage when login state changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <Router>
            <Navbar 
                searchKeyword={searchKeyword} 
                setSearchKeyword={setSearchKeyword} 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
            />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ProductList 
                            searchKeyword={searchKeyword} 
                            cartItems={cartItems} 
                            setCartItems={setCartItems} 
                            isLoggedIn={isLoggedIn} 
                        />
                    } 
                />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/login" 
                    element={
                        <Login 
                            setIsLoggedIn={setIsLoggedIn} 
                        />
                    } 
                />
                <Route 
                    path="/product/:id" 
                    element={
                        <ProductDetail 
                            cartItems={cartItems} 
                            setCartItems={setCartItems} 
                            isLoggedIn={isLoggedIn} 
                        />
                    } 
                />
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cartItems} 
                            setCartItems={setCartItems} 
                        />
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;
