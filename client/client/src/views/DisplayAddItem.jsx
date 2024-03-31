import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplayAddItem = () => {
    const { authState: { token } } = useAuth();
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        amount: '',
        location: '',
        category: ''
    });

    useEffect(() => {
        fetchLocations();
        fetchCategories();
    }, [token]); // Fetch locations and categories when the component mounts

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/locations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/items', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/dashboard'); // Navigate to the dashboard or a success page after submission
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Item ID</label>
                    <input type="text" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <select className="form-select" id="location" name="location" value={formData.location} onChange={handleChange} required>
                        <option value="">Select Location</option>
                        {locations.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
        </div>
    );
};

export default DisplayAddItem;
