import React, { useState } from 'react';
import '../assets/css/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input changes and update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Submitted:', formData);
        // You can add login submission logic here, e.g., sending the data to an API
    };

    return (
        <main className="login-main">
            <div className="container">
                <h2 className="form-header">Log In</h2>
            </div>

            <div className="form-container">
                <div className="form-title">
                    <h2 className="section-title">Welcome Back</h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="submit-info">
                        <button className="btn" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
