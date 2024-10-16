import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hardcoded credentials
    const hardcodedUser = 'test';
    const hardcodedPass = 'pass';

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration by saving credentials in local storage
        localStorage.setItem('username', hardcodedUser);
        localStorage.setItem('password', hardcodedPass);
        alert('Registered successfully! Please login.');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
