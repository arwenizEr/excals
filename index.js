const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});