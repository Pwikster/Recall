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
        }
        // Clear items and selected category when location changes
        setSelectedCategory('');
        setItems([]);
    }, [selectedLocation, token]);

    const fetchCategories = async (locationId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/categories?location=${locationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        // This check ensures fetchItems is called even if selectedCategory is cleared (set to '')
        if (selectedLocation && selectedCategory) {
            fetchItems(selectedLocation, selectedCategory);
        }
    }, [selectedLocation, selectedCategory, token]);

    const fetchItems = async (locationId, categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/items/${locationId}/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(response.data); // Set items if found
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setItems([]); // Set items to an empty array if no items are found
            } else {
                console.error('Error fetching items:', error);
                // Handle other errors differently or show a notification to the user
            }
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
                    <select className="form-select" value={selectedCategory} onChange={e => {
                        setSelectedCategory(e.target.value);
                        setItems([]); // Immediately clear items when a new category is selected
                    }}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                </div>
            )}
            <button className="btn btn-primary mb-3" onClick={handleAddItem}>Add New Item</button>
            {items.length > 0 ? (
                <div className="list-group">
                    {items.map(item => (
                        <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} - {item.amount}
                            <button className="btn btn-secondary btn-sm" onClick={() => handleEditItem(item._id)}>Edit Item</button>
                        </div>
                    ))}
                </div>
            ) : selectedLocation && selectedCategory && (
                <div className="text-center">
                    <p>No items found for this category and location.</p>
                </div>
            )}
        </div>
    );
};

export default DisplayDashboard;
