import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplayDashboard = () => {
    const { authState: { token } } = useAuth();
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchLocations();
    }, [token]);

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

    useEffect(() => {
        if (selectedLocation) {
            fetchCategories(selectedLocation);
        } else {
            setCategories([]);
            setItems([]);
        }
    }, [selectedLocation, token]);

    const fetchCategories = async (locationId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/categories?location=${locationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
            setSelectedCategory('');
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        if (selectedLocation && selectedCategory) {
            fetchItems(selectedLocation, selectedCategory);
        } else {
            setItems([]);
        }
    }, [selectedLocation, selectedCategory, token]);

    const fetchItems = async (locationId, categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/items?location=${locationId}&category=${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleAddItem = () => {
        navigate('/additem');
    };

    const handleEditItem = (itemId) => {
        navigate(`/edititem/${itemId}`);
    };

    return (
        <div className="container mt-3">
            <h2>Dashboard</h2>
            <div className="mb-3">
                <select className="form-select" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {locations.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)}
                </select>
            </div>
            {selectedLocation && (
                <div className="mb-3">
                    <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                </div>
            )}
            {selectedLocation && selectedCategory && (
                <>
                    {items.length > 0 ? (
                        <div className="list-group">
                            {items.map(item => (
                                <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name} - {item.amount}
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleEditItem(item._id)}>Edit Item</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>No items found for this category and location.</p>
                            <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DisplayDashboard;
