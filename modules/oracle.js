'use strict';

module.exports = function (logger, redis, socket, shortid) {
  const client = redis.createClient();

  socket.on('connection', function (socket){
    logger.info('A user connected');

    client.keys('question:*', function (err, keys) {
      keys.forEach(function (key) {
        client.get(key, function (err, value) {
          socket.emit('question', value);
        });
      });
    });
  });

  return {
    answer: function (question) {
      const id = shortid.generate();
      client.set(`question:${id}`, question);
      client.publish('questions', question);
    }
  };
};
