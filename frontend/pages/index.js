import React, { useEffect, useState } from 'react';
import Gong from '../components/Gong';
import Profile from '../components/Profile';
import io from 'socket.io-client';

const socket = io();  // Connect to WebSocket server

const IndexPage = () => {
  const [gongCount, setGongCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch gong count
    fetch('/api/gong/count')
      .then(res => res.json())
      .then(data => setGongCount(data.count));

    // WebSocket event listener for real-time gongs
    socket.on('gong', () => {
      setGongCount(prevCount => prevCount + 1);
    });

    return () => {
      socket.off('gong');
    };
  }, []);

  return (
    <div>
      <h1>Gong as a Service</h1>
      <p>Total gongs: {gongCount}</p>
      <Gong />
      {userProfile && <Profile user={userProfile} />}
    </div>
  );
};

export default IndexPage;
