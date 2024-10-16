import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams(); // Extract product ID from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>Discount Price: <span className="discount-price">{product.discount_price}</span></p>
            <p>Actual Price: <span className="actual-price">{product.actual_price}</span></p>
            <p>Ratings: {product.ratings ? product.ratings : 'No reviews yet'} ({product.no_of_ratings} reviews)</p>
            <p>Category: {product.main_category}</p>
            <p>Sub Category: {product.sub_category}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer">View on Amazon</a> {/* Optional if needed */}
        </div>
    );
};

export default ProductDetail;
