const app = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = app()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "https://excals-c58d60f38aa8.herokuapp.com"],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);