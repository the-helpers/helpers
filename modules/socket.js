'use strict';

module.exports = function (io, server) {
  
  var socket = io(server);

  return socket;
};
