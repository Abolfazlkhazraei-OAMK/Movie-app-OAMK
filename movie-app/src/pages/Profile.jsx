import React, { useEffect, useState } from 'react';
import './profile.css';

function Profile() {
    const [profileData, setProfileData] = useState(null); // Store fetched profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

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
    

    if (loading) {
        console.log("Loading profile data..."); // Debug log for loading state
        return (
            <div className="profile-container">
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        console.error("Error state:", error); // Debug log for error state
        return (
            <div className="profile-container">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1>Your Profile</h1>
            <p><strong>First Name:</strong> {profileData.firstname}</p>
            <p><strong>Last Name:</strong> {profileData.lastname}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Account Created:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default Profile;
