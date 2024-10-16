import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ searchKeyword, setSearchKeyword, isLoggedIn, setIsLoggedIn }) => {
    const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Handle logout logic here
        navigate('/'); // Redirect to homepage
    };

    return (
        <nav className="navbar">
            <div className="logo">YourLogo</div>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }} className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FaSearch />
                </button>
            </form>
            <div className="nav-links">
                <Link to="/" onClick={() => setSearchKeyword('')}>Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile">My Profile</Link>
                        <Link to="/wishlist">Wishlist</Link>
                        <Link to="/cart">Cart</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <div
                        className="dropdown"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <span>My Profile</span>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
