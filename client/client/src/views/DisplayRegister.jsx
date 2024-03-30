import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayRegister = () => {
    // State to manage form data and error messages
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation checks
        if (formData.username.length < 3) {
            setError('Username should be at least 3 characters long.');
            return; // Stop the function from proceeding further
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return; // Stop the function from proceeding further
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return; // Stop the function from proceeding further
        }

        // If validation passes, proceed with the API call
        try {
            await axios.post('http://localhost:8000/api/users', formData);
            navigate('/'); // Navigate to login page after successful registration
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    // Navigate to login page
    const handleNavigateToLogin = () => {
        navigate('/'); // Navigate to the login page
    };

    // Render the component
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Title */}
                    <div className="text-center mb-5">
                        <h1 className="display-4">Join Recall</h1>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Register</h2>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-control" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success">Register</button>
                                    <button type="button" onClick={handleNavigateToLogin} className="btn btn-outline-success">Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayRegister;
