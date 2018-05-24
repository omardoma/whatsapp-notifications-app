const io = require('socket.io')();
const redisAdapter = require('socket.io-redis');
const config = require('./config');

io.adapter(redisAdapter({ host: config.REDIS_HOST, port: config.REDIS_PORT }));

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room, (err) => {
      if (!err) {
        socket.to(data.room).emit('join', data);
      }
    });
  });

  socket.on('notification', (data) => {
    io.of('/').adapter.clientRooms(socket.id, (err, rooms) => {
      if (!err) {
        rooms.forEach((room) => {
          socket.to(room).emit('notification', data);
        });
      }
    });
  });

  socket.on('message', (data) => {
    socket.to(data.room).emit('message', data);
  });

  socket.on('leave', (data) => {
    socket.leave(data.room, (err) => {
      if (!err) {
        socket.to(data.room).emit('leave', data);
      }
    });
  });
});

module.exports = io;
