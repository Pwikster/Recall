// Importing necessary React hooks and components for navigation and context.
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider.jsx' // Import the useAuth hook for authentication logic.

// The DashboardNav component for navigation.
const Navbar = () => {
    const { logout } = useAuth() // Destructure the logout function from useAuth hook.
    const navigate = useNavigate() // Hook to navigate users.

    // Handler function for the logout action.
    const handleLogout = () => {
        logout() // ogout function from useAuth.
        navigate('/') // Redirect to the login page after logout.
    }

    // Returns the navigation bar with links to different parts of Recall.
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/user">Recall</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">Locations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>
                    </ul>
                    {/* Logout button with an onClick event to handle logout. */}
                    <button onClick={handleLogout} className="btn btn-outline-danger">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

// Export the Navbar component for use
export default Navbar
