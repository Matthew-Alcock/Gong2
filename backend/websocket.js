const socketIO = require('socket.io');

const setupWebSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('gong', () => {
      // Broadcast gong to all users
      io.emit('gong');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  });

  return io;
};

module.exports = setupWebSocket;
