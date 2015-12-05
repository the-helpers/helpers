'use strict';

module.exports = function (logger, redis, socket, shortid) {
  const client = redis.createClient();

  socket.on('connection', function (socket){
    logger.info('A user connected');

    client.keys('question:*', function (err, keys) {
      keys.forEach(function (key) {
        client.get(key, function (err, value) {
          const id = key.split(':').pop();
          socket.emit('question', { id: id, text: value });
        });
      });
    });
  });

  return {
    ask: function (question) {
      const id = shortid.generate();
      client.set(`question:${id}`, question);
      socket.emit('question', { id: id, text: question });
      return id;
    },

    answer: function (id) {
      client.set(`assigned:${id}`, true);
      socket.emit('answer', id);
    }
  };
};
