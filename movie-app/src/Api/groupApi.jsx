import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:3001/group';


// Create a new group
export const createGroup = async (token, groupData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, groupData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get all groups with optional pagination
export const getAllGroups = async (token, limit = 500, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Invalid token. Please log in again.");
      // Handle token refresh logic here if applicable
    } else {
      console.error("Error fetching groups:", error.response ? error.response.data : error.message);
    }
    throw error;
  }
};


// Get details of a specific group by ID
export const getGroupById = async (token, groupId) => {
  try {
    const response = await axios.get(`${API_URL}/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching group:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Delete a group by ID
export const deleteGroup = async (token, groupId) => {
  try {
    const response = await axios.delete(`${API_URL}/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Send a join request to a group
export const addJoinRequest = async (token, groupId) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    const requestData = {
      userId: user.id,
      groupId: groupId,
      status: 'pending',
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email
    };
    
    const response = await axios.post(`${API_URL}/${groupId}/join`, requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data); // More detailed error logging
    throw error;
  }
};

// Fetch join requests for a group
export const getJoinRequests = async (token, groupId) => {
  try {
    const response = await axios.get(`${API_URL}/${groupId}/join-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching join requests:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Handle a join request (accept/reject)
export const handleJoinRequest = async (token, requestId, status) => {
  try {
    const response = await axios.put(`${API_URL}/join-requests/${requestId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Requestid: ${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Error handling join request:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Remove a member from a group
export const removeMember = async (token, groupId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${groupId}/members/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing member:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get user's groups
export const getUserGroups = async (token, userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user groups:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch members of a group
export const getGroupMembers = async (token, groupId) => {
  try {
    const response = await axios.get(`${API_URL}/${groupId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching group members:", error.response ? error.response.data : error.message);
    throw error;
  }
};