'use strict';

module.exports = function (logger, socket) {
  socket.on('connection', function (socket){
    logger.info('A user connected to messanger');
  });

  return {
    msg: function (message, usrid) {
      socket.emit('message', { message: message, usrid: usrid });
    }
  };
};
