import React, { useState, useEffect } from 'react';
import { createGroup, getAllGroups, addJoinRequest, getGroupMembers } from '../Api/groupApi';
import './GroupCreate.css';

const GroupCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState({});

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      setToken(user.token);
      setUserId(user.id);
      fetchGroups(user.token);
    } else {
      console.log('No user found in session storage');
    }
  }, []); // Removed user dependency to ensure it only runs on mount

  useEffect(() => {
    if (groups.length > 0) {
      checkMembershipStatus();
    }
  }, [groups]);

  const fetchGroups = async (userToken) => {
    try {
      const data = await getAllGroups(userToken || token);
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  const checkMembershipStatus = async () => {
    try {
      const statusMap = {};
      const promises = groups.map(async (group) => {
        const members = await getGroupMembers(token, group.group_id);
        statusMap[group.group_id] = members.some(member => member.user_id === userId);
      });
      await Promise.all(promises);
      setMembershipStatus(statusMap);
    } catch (error) {
      console.error('Error checking membership:', error.message);
    }
  };

  const handleCreateGroup = async () => {
    if (!token) {
      alert('You must be logged in to create a group.');
      return;
    }

    setError('');

    if (!name.trim() || !description.trim()) {
      setError('Group name and description are required.');
      return;
    }

    if (name.trim().length < 3) {
      setError('Group name must be at least 3 characters long.');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters long.');
      return;
    }

    try {
      await createGroup(token, { name: name.trim(), description: description.trim() });
      fetchGroups();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating group:', error.message);
      setError('Failed to create group. Please try again.');
    }
  };

  const handleJoin = async (groupId) => {
    if (!token) {
      alert('You must be logged in to join a group.');
      return;
    }

    try {
      await addJoinRequest(token, groupId);
      alert('Join request sent!');
    } catch (error) {
      console.error('Error sending join request:', error.message);
    }
  };

  const renderGroupButton = (group) => {
    if (group.owner_id === userId || membershipStatus[group.group_id]) {
      return (
        <button
          className="view-group-button"
          onClick={() => window.location.href = `/community/group/${group.group_id}/members`}
        >
          View Group
        </button>
      );
    }

    return (
      <>
        <button className="join-button" onClick={() => handleJoin(group.group_id)}>
          Join
        </button>
        <button
          className="view-button"
          onClick={() => window.location.href = `/community/group/${group.group_id}`}
        >
          View
        </button>
      </>
    );
  };

  return (
    <div className="group-container">
      <h1 className="group-title">Group Management</h1>
      <div className="create-group-section">
        <h2 className="section-title">Create Group</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <input
          className="group-input"
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="group-textarea"
          placeholder="Group Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="create-button" onClick={handleCreateGroup}>Create Group</button>
      </div>
      <div className="groups-list">
        <h2 className="section-title">All Groups</h2>
        {groups.length === 0 ? (
          <p className="no-groups">No groups available.</p>
        ) : (
          groups.map((group) => (
            <div key={group.group_id} className="group-card">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-description">{group.description}</p>
              <div className="button-container">
                {renderGroupButton(group)}
                {group.owner_id === userId && (
                  <button
                    className="manage-button"
                    onClick={() => window.location.href = `/community/group/${group.group_id}/requests`}
                  >
                    Manage Requests
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupCreate;