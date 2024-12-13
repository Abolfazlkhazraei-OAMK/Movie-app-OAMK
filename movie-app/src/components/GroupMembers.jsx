import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupMembers, removeMember, deleteGroup, getGroupById } from '../Api/groupApi';
import './GroupMembers.css';

const GroupMembers = () => {
  const { groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.token;
  const userId = user?.id;

  useEffect(() => {
    if (groupId && token) {
      fetchData();
    }
  }, [groupId, token]);

  const fetchData = async () => {
    try {
      const [membersData, groupData] = await Promise.all([
        getGroupMembers(token, groupId),
        getGroupById(token, groupId)
      ]);
      setMembers(membersData || []);
      setGroup(groupData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(token, groupId, memberId);
      fetchData();
      alert('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error.message);
      alert('Failed to remove member');
    }
  };

  const handleLeave = async () => {
    try {
      await removeMember(token, groupId, userId);
      window.location.href = '/community';
    } catch (error) {
      console.error('Error leaving group:', error.message);
      alert('Failed to leave group');
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await deleteGroup(token, groupId);
        window.location.href = '/community';
      } catch (error) {
        console.error('Error deleting group:', error.message);
        alert('Failed to delete group');
      }
    }
  };

  const isOwner = group?.owner_id === userId;

  return (
    <div className="members-container">
      <h1 className="members-title">Group Members</h1>
      <div className="members-list">
        {members.map((member) => {
          return (
            <div key={member.user_id} className="member-card">
              <div className="member-info">
                <p className="member-name">
                  Name: {`${member.firstname || ''} ${member.lastname || ''}`}
                  {member.user_id === group?.owner_id && (
                    <span className="admin-badge" title="Group Admin">👑</span>
                  )}
                </p>
                <p className="member-email">Email: {member.email}</p>
              </div>
              {isOwner && member.user_id !== userId ? (
                <button 
                  className="remove-button"
                  onClick={() => handleRemove(member.user_id)}
                >
                  Remove Member
                </button>
              ) : member.user_id === userId && !isOwner && (
                <button 
                  className="leave-button"
                  onClick={handleLeave}
                >
                  Leave Group
                </button>
              )}
            </div>
          );
        })}
      </div>
      {isOwner && (
        <button 
          className="delete-group-button"
          onClick={handleDeleteGroup}
        >
          Delete Group
        </button>
      )}
    </div>
  );
};

export default GroupMembers;
