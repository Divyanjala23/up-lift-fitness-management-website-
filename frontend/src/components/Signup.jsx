import React, { useState } from 'react';
import '../assets/css/signUp.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        console.log('Form Submitted:', formData);
        // You can add form submission logic here, e.g., sending the data to an API
    };

    return (
        <main className="signup-main">
            <div className="container">
                <h2 className="form-header">Sign Up</h2>
            </div>

            <div className="form-container">
                <div className="form-title">
                    <h2 className="section-title">Create Your Account</h2>
                </div>

                <form onSubmit={handleSubmit} className="Signup-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="submit-info">
                        <button className="btn" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Signup;
