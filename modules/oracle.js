'use strict';

module.exports = function (redis, socket) {
  const client = redis.createClient();

  socket.on('connection', function(socket){
    console.log('a user connected');
  });

  return {
    answer: function (question) {
      client.publish('questions', question);
    }
  };
};
