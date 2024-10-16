import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import axios from 'axios';

const ProductList = ({ searchKeyword }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fallbackImage = 'https://www.pngmart.com/files/21/AC-PNG-Clipart.png';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const filteredProducts = searchKeyword
        ? products.filter(product =>
            product.name && product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
            product.discount_price && product.actual_price
        )
        : products.filter(product => product.discount_price && product.actual_price);

    return (
        <div className="product-list">
            {filteredProducts.map(product => (
                <div 
                    key={product["Unnamed: 0"]} 
                    className="product-card" 
                    onClick={() => handleProductClick(product["Unnamed: 0"])}
                    style={{ cursor: 'pointer' }}
                >
                    <img 
                        src={product.image || fallbackImage} 
                        alt={product.name} 
                        className="product-image" 
                        onError={(e) => { e.target.src = fallbackImage; }} 
                    />
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-pricing">
                        <span className="discount-price">{product.discount_price}</span>
                        <span className="actual-price">{product.actual_price}</span>
                    </p>
                    <p className="product-ratings">
                        Ratings: {product.ratings ? product.ratings : 'No reviews yet'} ({product.no_of_ratings} reviews)
                    </p>
                </div>
            ))}
            {filteredProducts.length === 0 && <p>No products found</p>}
        </div>
    );
};

export default ProductList;
