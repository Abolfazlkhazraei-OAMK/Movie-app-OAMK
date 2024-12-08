import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './profile.css';

function Profile() {
    const [profileData, setProfileData] = useState(null); // Store fetched profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [deleteError, setDeleteError] = useState(null); // Error state for deletion
    const [deleteSuccess, setDeleteSuccess] = useState(false); // Success state for deletion

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));

        if (userFromSession && userFromSession.token) {
            fetch(`${process.env.REACT_APP_API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userFromSession.token}`, // Pass the token
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch profile data');
                    }
                    return response.json();
                })
                .then((data) => {
                    setProfileData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setError('User is not logged in or missing token');
            setLoading(false);
        }
    }, []);

    const handleDeleteUser = () => {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));

        if (userFromSession && userFromSession.token) {
            fetch(`${process.env.REACT_APP_API_URL}/profile`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userFromSession.token}`, // Pass the token
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    return response.json();
                })
                .then(() => {
                    sessionStorage.removeItem('user'); // Remove user data from session storage
                    setDeleteSuccess(true); // Set success state
                    setTimeout(() => {
                        navigate('/'); // Redirect to home page after successful deletion
                    }, 2000);
                })
                .catch((err) => {
                    setDeleteError(err.message); // Set error state for deletion
                });
        }
    };

    if (loading) {
        console.log('Loading profile data...'); // Debug log for loading state
        return (
            <div className="profile-container">
                <p className="profile-loading">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        console.error('Error state:', error); // Debug log for error state
        return (
            <div className="profile-container">
                <p className="profile-error">Error: {error}</p>
            </div>
        );
    }

    if (deleteSuccess) {
        return (
            <div className="profile-container">
                <p className="profile-success">Your account has been successfully deleted.</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-info">
                <strong className="profile-label">First Name:</strong>
                <span className="profile-value">{profileData.firstname}</span>
            </p>
            <p className="profile-info">
                <strong className="profile-label">Last Name:</strong>
                <span className="profile-value">{profileData.lastname}</span>
            </p>
            <p className="profile-info">
                <strong className="profile-label">Email:</strong>
                <span className="profile-value">{profileData.email}</span>
            </p>
            <p className="profile-info">
                <strong className="profile-label">Account Created:</strong>
                <span className="profile-value">
                    {new Date(profileData.createdAt).toLocaleDateString()}
                </span>
            </p>

            {deleteError && <p className="profile-error">Error: {deleteError}</p>}

            {/* Go Back Button */}
            <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>

            {/* Delete Account Button */}
            <button className="delete-account-button" onClick={handleDeleteUser}>Delete Account</button>
        </div>
    );
}

export default Profile;
