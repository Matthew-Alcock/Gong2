const dotenv = require('dotenv');
dotenv.config();

console.log('Environment variables loaded.');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { updateGongCount, getGongCount, getUserProfile } = require('./db');
//const scheduleGong = require('./scheduleGong');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware for JSON
app.use(express.json());

// Serve frontend (Next.js)
app.use(express.static('frontend/out'));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // When the gong is struck
  socket.on('gong', async (userId) => {
    // Update gong count in the database
    await updateGongCount(userId);
    
    // Broadcast to all users
    io.emit('gong');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST API: Get gong strike count
app.get('/api/gong/count', async (req, res) => {
  try {
    const count = await getGongCount();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching gong count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// REST API: Get user profile
app.get('/api/user/:id', async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.params.id);
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// REST API: Schedule gong strike
app.post('/api/gong/schedule', (req, res) => {
  const { userId, date } = req.body;
  scheduleGong(userId, date, io);
  res.json({ message: 'Gong scheduled' });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
