import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Update to your backend URL if needed

const Gong = () => {
    const [gongCount, setGongCount] = useState(0);

    useEffect(() => {
        // Fetch initial gong count
        fetchGongCount();

        // Listen for gong event from the server
        socket.on('gong', () => {
            setGongCount((prevCount) => prevCount + 1);
        });

        // Cleanup socket connection on component unmount
        return () => {
            socket.off('gong');
        };
    }, []);

    const fetchGongCount = async () => {
        try {
            const response = await fetch('/api/gong/count');
            const data = await response.json();
            setGongCount(data.count);
        } catch (error) {
            console.error('Error fetching gong count:', error);
        }
    };

    const handleGongClick = () => {
        const userId = '123'; // Replace with actual user ID
        socket.emit('gong', userId);
    };

    return (
        <div>
            <h1>Gong Count: {gongCount}</h1>
            <button onClick={handleGongClick}>Strike the Gong!</button>
        </div>
    );
};

export default Gong;
