import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
    const [profileData, setProfileData] = useState(null); // Store fetched profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [deleteError, setDeleteError] = useState(null); // Error state for deletion
    const [deleteSuccess, setDeleteSuccess] = useState(false); // Success state for deletion
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const [updatedProfile, setUpdatedProfile] = useState({ firstname: '', lastname: '' }); // State for updated profile

    const navigate = useNavigate();

    useEffect(() => {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));

        if (userFromSession && userFromSession.token) {
            fetch(`${process.env.REACT_APP_API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userFromSession.token}`,
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
                    setUpdatedProfile({ firstname: data.firstname, lastname: data.lastname });
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
                    Authorization: `Bearer ${userFromSession.token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    return response.json();
                })
                .then(() => {
                    sessionStorage.removeItem('user'); // Clear user data from session storage
                    setDeleteSuccess(true);
                    alert('Your profile has been successfully deleted!');
                    navigate('/'); // Redirect to the home page
                    setTimeout(() => {
                        window.location.reload(); // Force page refresh after redirect
                    }, 100);
                })
                .catch((err) => {
                    setDeleteError(err.message);
                });
        }
    };

    const handleSaveProfile = () => {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    
        if (userFromSession && userFromSession.token) {
            fetch(`${process.env.REACT_APP_API_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userFromSession.token}`,
                },
                body: JSON.stringify(updatedProfile),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update profile');
                    }
                    return response.json();
                })
                .then((data) => {
                    setProfileData(data);
                    setEditMode(false);
                    alert('Profile updated successfully!');
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <p className="profile-loading">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
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
            {/* Display Initials in a Circle */}
            <div className="profile-initials">
                {profileData.firstname && profileData.lastname ? (
                    <div className="initials-circle">
                        {profileData.firstname[0].toUpperCase()}{profileData.lastname[0].toUpperCase()}
                    </div>
                ) : (
                    <div className="initials-circle">?</div>
                )}
            </div>

            {/* Edit Mode */}
            {editMode ? (
                <>
                    <p className="profile-info">
                        <strong className="profile-label">First Name:</strong>
                        <input
                            className="profile-input"
                            type="text"
                            value={updatedProfile.firstname}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, firstname: e.target.value })}
                        />
                    </p>
                    <p className="profile-info">
                        <strong className="profile-label">Last Name:</strong>
                        <input
                            className="profile-input"
                            type="text"
                            value={updatedProfile.lastname}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, lastname: e.target.value })}
                        />
                    </p>
                    <div className="buttons-container">
                        <button className="save-button" onClick={handleSaveProfile}>Save</button>
                        <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p className="profile-info">
                        <strong className="profile-label">First Name:</strong>
                        <span className="profile-value">{profileData.firstname}</span>
                    </p>
                    <p className="profile-info">
                        <strong className="profile-label">Last Name:</strong>
                        <span className="profile-value">{profileData.lastname}</span>
                    </p>
                    <button className="edit-button" onClick={() => setEditMode(true)}>Edit Profile</button>
                </>
            )}

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

            <div className="buttons-container">
                <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
                <button className="delete-account-button" onClick={handleDeleteUser}>Delete Account</button>
            </div>
        </div>
    );
}

export default Profile;
