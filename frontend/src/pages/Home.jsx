// src/pages/Home.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

const Home = () => {
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div>
            <Navbar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
            <ProductList searchKeyword={searchKeyword} />
        </div>
    );
};

export default Home;
