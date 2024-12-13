import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getJoinRequests, handleJoinRequest } from '../Api/groupApi';
import './JoinRequests.css';

const JoinRequests = () => {
  const { groupId } = useParams(); // Get groupId from URL
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.token;

  const fetchJoinRequests = useCallback(async () => {
    if (!token || !groupId) return;
    
    try {
      const data = await getJoinRequests(token, groupId);
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching join requests:', error);
    }
  }, [token, groupId]);

  useEffect(() => {
    fetchJoinRequests();
  }, [fetchJoinRequests]);

  const handleDecision = async (requestId, status) => {
    try {
      await handleJoinRequest(token, requestId, status);
      // Remove the request from local state immediately
      setRequests(prevRequests => 
        prevRequests.filter(request => request.group_request_id !== requestId)
      );
      alert(`Request ${status} successfully`);
    } catch (error) {
      console.error(`Error handling request (${status}):`, error.message);
      alert('Failed to process request. Please try again.');
    }
  };

  return (
    <div className="requests-container">
      <h1 className="requests-title">Join Requests</h1>
      {requests.length === 0 ? (
        <p className="no-requests">No join requests available.</p>
      ) : (
        <div className="requests-list">
          {requests.map((request) => {
            return (
              <div key={request.group_request_id} className="request-card">
                <div className="request-info">
                  <p className="member-name">
                    Name: {`${request.first_name || ''} ${request.last_name || ''}`}
                  </p>
                  <p className="member-email">Email: {request.email}</p>
                </div>
                <div className="button-container">
                  <button
                    className="accept-button"
                    onClick={() => handleDecision(request.group_request_id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleDecision(request.group_request_id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JoinRequests;
