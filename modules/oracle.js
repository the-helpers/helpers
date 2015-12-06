'use strict';

module.exports = function (logger, redis, socket, shortid, Promise) {
  const client = redis.createClient();
  Promise.promisifyAll(client);

  socket.on('connection', function (socket){
    logger.info('A user connected');

    client.keysAsync(`assigned:*`).map(function (key) {
      const assignedId = key.split(':').pop();
      return assignedId;
    }).then(function(assignedIds) {

      client.keysAsync('question:*').each(function (key) {
        const id = key.split(':').pop();
        if (assignedIds.indexOf(id) == -1) {
          client.getAsync(key).then(function (value) {
            return { id: id, text: value };
          }).then(function(obj) {
            client.ttlAsync(key).then(function (ttl) {
              obj.ttl = ttl;
              socket.emit('question', obj);
            });
          });
        }
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
      client.setex(`assigned:${id}`, 300, true);
      socket.emit('answer', id);
      return id;
    }
  };
};
