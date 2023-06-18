const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // เพิ่ม module path

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;

  setInterval(() => {
    io.emit('onlineUsers', onlineUsers);
  }, 1000);

  socket.on('disconnect', () => {
    onlineUsers--;
  });
});

// เพิ่มเส้นทางสำหรับไฟล์ index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
