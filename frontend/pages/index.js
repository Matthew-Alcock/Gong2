import React, { useEffect, useState } from 'react';
import Gong from '../components/Gong';
import Profile from '../components/Profile';
import io from 'socket.io-client';

const socket = io(); // Connect to WebSocket server

const IndexPage = () => {
  const [gongCount, setGongCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch initial gong count
    fetch('/api/gong/count')
      .then(res => res.json())
      .then(data => setGongCount(data.count))
      .catch(err => console.error('Error fetching gong count:', err));

    // Fetch user profile
    const userId = 'some_user_id'; // Replace with actual user ID or fetch dynamically
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(err => console.error('Error fetching user profile:', err));

    // WebSocket event listener for real-time gongs
    socket.on('gong', () => {
      setGongCount(prevCount => prevCount + 1);
    });

    return () => {
      socket.off('gong');
    };
  }, []);

  // Function to handle gong clicks (make sure this is passed to the Gong component)
  const handleGongClick = () => {
    socket.emit('gong', userId); // Replace with actual user ID if necessary
  };

  return (
    <div>
      <h1>Gong as a Service</h1>
      <p>Total gongs: {gongCount}</p>
      <Gong onClick={handleGongClick} /> {/* Pass the handleGongClick function */}
      {userProfile && <Profile user={userProfile} />}
    </div>
  );
};

export default IndexPage;
