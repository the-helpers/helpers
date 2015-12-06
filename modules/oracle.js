'use strict';

module.exports = function (logger, redis, socket, shortid, Promise) {
  const client = redis.createClient();
  Promise.promisifyAll(client);

  socket.on('connection', function (socket){
    logger.info('A user connected');

    client.keysAsync('question:*').each(function (key) {
      client.getAsync(key).then(function (value) {
        const id = key.split(':').pop();
        return { id: id, text: value };
      }).then(function(obj) {
        client.ttlAsync(key).then(function (ttl) {
          obj.ttl = ttl;
          socket.emit('question', obj);
        });
      });
    });
  });

  return {
    ask: function (question) {
      const id = shortid.generate();
      client.setex(`question:${id}`, 300, question);
      socket.emit('question', { id: id, text: question });
      return id;
    },

    answer: function (id) {
      client.set(`assigned:${id}`, true);
      socket.emit('answer', id);
      return id;
    }
  };
};
