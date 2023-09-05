const socketIO = require('socket.io');

let io; 

function setupSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log("Connected & Socket Id is ", socket.id);
  });
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io has not been initialized.');
  }
  return io;
}

module.exports = { setupSocket, getIO };
