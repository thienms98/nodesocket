const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);

const PORT = process.env.PORT || 3333;
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => res.send('hello'));

io.on('connection', (socket) => {
  // console.log('a user connected');
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('create-room', (room) => {
    console.log('a room creating');
    io.sockets.emit('rooms', { flag: 'create', room });
  });

  socket.on('update-room', ({ index, room }) => {
    console.log('a room creating');
    io.sockets.emit('rooms', { flag: 'update', index, room });
  });

  socket.on('delete-room', (index) => {
    console.log('a room creating');
    io.sockets.emit('rooms', { flag: 'delete', index });
  });
});

server.listen(PORT, () => {
  console.log('listening on port: ', PORT);
});
