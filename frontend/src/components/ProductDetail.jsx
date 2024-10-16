import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ cartItems, setCartItems, isLoggedIn }) => {
    const { id } = useParams(); // Extract product id from URL
    const [product, setProduct] = useState(null); // State to hold the fetched product
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate fetching product from an API or a data source
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`); // Fetch from your API
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Fetch product when component mounts or when `id` changes

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const productInCart = cartItems.find(item => item["Unnamed: 0"] === product["Unnamed: 0"]);
    const quantityInCart = productInCart ? productInCart.quantity : 0;

    const handleAddToCart = () => {
        setCartItems(prevCart => {
            const existingProduct = prevCart.find(item => item["Unnamed: 0"] === product["Unnamed: 0"]);
            if (existingProduct) {
                return prevCart.map(item =>
                    item["Unnamed: 0"] === existingProduct["Unnamed: 0"]
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = () => {
        setCartItems(prevCart => {
            return prevCart.map(item =>
                item["Unnamed: 0"] === product["Unnamed: 0"]
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    };

    const decreaseQuantity = () => {
        setCartItems(prevCart => {
            return prevCart.map(item =>
                item["Unnamed: 0"] === product["Unnamed: 0"]
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: {product.discount_price}</p>
            
            {isLoggedIn ? (
                <>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    {quantityInCart > 0 && (
                        <div className="quantity-controls">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>Quantity: {quantityInCart}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Please log in to add items to your cart.</p>
            )}
        </div>
    );
};

export default ProductDetail;
