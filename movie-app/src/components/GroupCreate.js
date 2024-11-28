import React, { useState } from 'react';
import axios from 'axios';

const GroupCreateComponent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get token from sessionStorage
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('You must be logged in to create a group.');
            }

            // API request to create a group
            const response = await axios.post(
                'http://localhost:3001/group/create',
                { name, description },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Group created:', response.data);
            setSuccess('Group created successfully!');
            setError(null);
        } catch (error) {
            console.error('Error creating group:', error.message);
            setError(error.response?.data?.message || 'Error creating group');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Create a Group</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Group Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default GroupCreateComponent;
