import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById, getGroupMembers } from '../Api/groupApi';
import './GroupDetails.css';
import Header from '../pages/Header';
import BackToTopBtn from './BackToTopBtn';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    if (groupId && token) {
      fetchData();
    }
  }, [groupId, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [groupData, membersData] = await Promise.all([
        getGroupById(token, groupId),
        getGroupMembers(token, groupId)
      ]);
      setGroup(groupData);
      setMembers(membersData || []); // Ensure members is always an array
    } catch (err) {
      setError('Failed to load group details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // constantly listens to the scroll position
  useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  if (loading) return <div className="group-details-container">Loading...</div>;
  if (error) return <div className="group-details-container">{error}</div>;

  return (
    <section>
    <div className="group-details-container">
      <h1 className="group-details-title">{group?.name || 'Group Name'}</h1>
      <div className="group-details-description">
        <p>{group?.description || 'No description available'}</p>
      </div>
      <div className="members-section">
        <h2 className="members-title">Members</h2>
        {members && members.length > 0 ? (
          members.map((member) => (
            <div key={member.user_id} className="member-card">
              <p>{`${member.firstName || ''} ${member.lastName || ''}`}</p>
            </div>
          ))
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
    <Header scroll={scroll}/>
    <BackToTopBtn scroll={scroll}/>
    </section>
  );
};

export default GroupDetails;
