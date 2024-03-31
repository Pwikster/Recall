import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplayEditItem = () => {
    const { id } = useParams(); // Capture the item's ID from the URL
    const { authState: { token } } = useAuth();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({
        name: '',
        id: '',
        amount: '',
        location: '',
        category: ''
    });
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchItemDetails();
        fetchLocations();
        fetchCategories();
    }, [token]); // Fetch item details, locations, and categories when the component mounts

    const fetchItemDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItemData(response.data);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

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
        setItemData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/items/${id}`, itemData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/dashboard'); // Navigate to the dashboard or a confirmation page after successful update
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={itemData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Item ID</label>
                    <input type="text" className="form-control" id="id" name="id" value={itemData.id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={itemData.amount} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <select className="form-select" id="location" name="location" value={itemData.location} onChange={handleChange} required>
                        <option value="">Select Location</option>
                        {locations.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" name="category" value={itemData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Item</button>
            </form>
        </div>
    );
};

export default DisplayEditItem;
