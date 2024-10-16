import React from 'react';

const Cart = ({ cartItems, setCartItems }) => {
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevCart =>
            prevCart.map(item =>
                item["Unnamed: 0"] === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleRemoveItem = (productId) => {
        console.log("Removing item with ID:", productId); // Debugging line
        setCartItems(prevCart => {
            const updatedCart = prevCart.filter(item => item["Unnamed: 0"] !== productId); // Use correct ID property
            console.log("Updated Cart after removal:", updatedCart); // Debugging line
            return updatedCart;
        });
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.discount_price) * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item["Unnamed: 0"]} className="cart-item">
                            <h2>{item.name}</h2>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <p>Price: {item.discount_price}</p>
                            <p>Quantity: 
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item["Unnamed: 0"], parseInt(e.target.value))}
                                    min="1"
                                />
                            </p>
                            <button onClick={() => handleRemoveItem(item["Unnamed: 0"])}>Remove</button> {/* Use correct ID */}
                        </div>
                    ))}
                    <h3>Total Price: ${calculateTotalPrice()}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
