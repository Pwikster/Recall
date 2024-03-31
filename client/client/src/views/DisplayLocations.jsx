import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const DisplayLocations = () => {
    const { authState: { token } } = useAuth(); // Using the auth token for authorization in API requests
    const navigate = useNavigate(); // Hook for navigation
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locationName, setLocationName] = useState('');
    const [isNewLocation, setIsNewLocation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchLocations();
    }, [token]);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/locations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLocations(response.data);
            setSelectedLocation('');
            setLocationName('');
            setIsNewLocation(false);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setErrorMessage('Failed to fetch locations. Please try again.');
        }
    };

    const handleLocationChange = (e) => {
        const selected = e.target.value;
        setSelectedLocation(selected);
        if (selected === 'Add new') {
            setIsNewLocation(true);
            setLocationName('');
        } else {
            const selectedLoc = locations.find(loc => loc._id === selected);
            setLocationName(selectedLoc ? selectedLoc.name : '');
            setIsNewLocation(false);
        }
    };

    const handleSave = async () => {
        try {
            if (isNewLocation && locationName) {
                await axios.post('http://localhost:8000/api/locations', { name: locationName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else if (!isNewLocation && locationName && selectedLocation) {
                await axios.put(`http://localhost:8000/api/locations/${selectedLocation}`, { name: locationName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchLocations();
        } catch (error) {
            console.error('Error saving location:', error);
            setErrorMessage('Failed to save location. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/locations/${selectedLocation}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchLocations();
        } catch (error) {
            console.error('Error deleting location:', error);
            setErrorMessage('Failed to delete location. Please try again.');
        }
    };

    return (
        <div className="container mt-3">
            <h2>Edit Location</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="input-group mb-3">
                <select className="form-select" onChange={handleLocationChange} value={selectedLocation}>
                    <option value="">Select a location</option>
                    {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>{loc.name}</option>
                    ))}
                    <option value="Add new">Add new</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location name"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    disabled={!selectedLocation || selectedLocation === 'Add new' && !isNewLocation}
                />
            </div>
            <div>
                <button className="btn btn-primary me-2" onClick={handleSave} disabled={!locationName}>Save</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={isNewLocation || !selectedLocation}>Delete</button>
            </div>
        </div>
    );
};

export default DisplayLocations;
