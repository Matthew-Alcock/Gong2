import React, { useState } from 'react';

const Gong = () => {
  const [vibrating, setVibrating] = useState(false);

  const playGong = () => {
    const gongSound = new Audio('/gong.mp3');
    gongSound.play();

    // Trigger vibration for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);  // Pattern for vibration
    }

    setVibrating(true);
    setTimeout(() => setVibrating(false), 2000);  // Reset vibration effect after 2s
  };

  const handleClick = () => {
    playGong();
    fetch('/api/gong', { method: 'POST' });
  };

  return (
    <div className={`gong-container ${vibrating ? 'vibrating' : ''}`} onClick={handleClick}>
      <img src="/gong.png" alt="Gong" />
    </div>
  );
};

export default Gong;
