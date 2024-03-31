import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const DisplayCategories = () => {
    const { authState: { token } } = useAuth(); // Using the auth token for authorization
    const navigate = useNavigate(); // For future navigation
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [token]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
            setSelectedCategory('');
            setCategoryName('');
            setIsNewCategory(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setErrorMessage('Failed to fetch categories. Please try again.');
        }
    };

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);
        if (selected === 'Add new') {
            setIsNewCategory(true);
            setCategoryName('');
        } else {
            const selectedCat = categories.find(cat => cat._id === selected);
            setCategoryName(selectedCat ? selectedCat.name : '');
            setIsNewCategory(false);
        }
    };

    const handleSave = async () => {
        try {
            if (isNewCategory && categoryName) {
                await axios.post('http://localhost:8000/api/categories', { name: categoryName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else if (!isNewCategory && categoryName && selectedCategory) {
                await axios.put(`http://localhost:8000/api/categories/${selectedCategory}`, { name: categoryName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            setErrorMessage('Failed to save category. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/categories/${selectedCategory}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            setErrorMessage('Failed to delete category. Please try again.');
        }
    };

    return (
        <div className="container mt-3">
            <h2>Edit Category</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="input-group mb-3">
                <select className="form-select" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                    <option value="Add new">Add new</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={!selectedCategory || selectedCategory === 'Add new' && !isNewCategory}
                />
            </div>
            <div>
                <button className="btn btn-primary me-2" onClick={handleSave} disabled={!categoryName}>Save</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={isNewCategory || !selectedCategory}>Delete</button>
            </div>
        </div>
    );
};

export default DisplayCategories;
