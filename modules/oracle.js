'use strict';

module.exports = function (redis) {
  const client = redis.createClient();
  return {
    answer: function (question) {
      client.publish('questions', question);
    }
  };
};
