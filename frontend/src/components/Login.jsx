// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../assets/css/login.css';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/login', {
//                 username: formData.username,
//                 password: formData.password
//             });
    
//             const user = response.data;
    
//             console.log('Backend Response:', user);  // Check the entire response structure
    
//             // Make sure the role is being saved here, not the username
//             localStorage.setItem('userRole', user.role);  // Save the role instead of username
    
//             // Redirect based on role
//             if (user.role === 'ADMIN') {
//                 navigate('/admin/dashboard');
//             } else if (user.role === 'COACH') {
//                 navigate('/coach/dashboard');
//             } else if (user.role === 'MEMBER') {
//                 navigate('/member/dashboard');
//             }
//         } catch (err) {
//             console.error('Error occurred:', err);
//             setError(
//                 err.response && err.response.data && err.response.data.message
//                     ? err.response.data.message
//                     : 'Something went wrong. Please try again.'
//             );
//         }
//     };

//     return (
//         <main className="login-main">
//             <div className="container">
//                 <h2 className="form-header">Log In</h2>
//             </div>
//             <div className="form-container">
//                 <div className="form-title">
//                     <h2 className="section-title">Welcome Back</h2>
//                 </div>
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>
//                     {error && <p className="error-message">{error}</p>}
//                     <div className="submit-info">
//                         <button className="btn" type="submit">
//                             Log In
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </main>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock response based on username
        const mockUserDatabase = {
            admin: { role: 'ADMIN' },
            coach: { role: 'COACH' },
            member: { role: 'MEMBER' },
        };

        const user = mockUserDatabase[formData.username.toLowerCase()]; // Mock lookup

        if (user && formData.password === '123') { // Mock password validation
            localStorage.setItem('userRole', user.role); // Save the role in localStorage

            // Redirect based on role
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (user.role === 'COACH') {
                navigate('/coach/dashboard');
            } else if (user.role === 'MEMBER') {
                navigate('/member/dashboard');
            }
        } else {
            setError('Invalid username or password'); // Show error for invalid login
        }
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
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
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
                    {error && <p className="error-message">{error}</p>}
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

