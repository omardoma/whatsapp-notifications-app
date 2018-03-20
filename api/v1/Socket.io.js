const io = require('socket.io')(),
  redisAdapter = require('socket.io-redis'),
  config = require('./config');

io.adapter(redisAdapter({ host: config.REDIS_HOST, port: config.REDIS_PORT }));

io.on('connection', socket => {
  socket.on('join', data => {
    socket.join(data.room, () => {
      socket.to(data.room).emit('join', data);
    });
  });

  socket.on('notification', notification => {
    io.of('/').adapter.clientRooms(socket.id, (err, rooms) => {
      if (!err) {
        rooms.forEach(room => {
          socket.to(room).emit('notification', notification);
        });
      }
    });
  });
});

module.exports = io;
