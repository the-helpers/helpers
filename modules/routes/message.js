'use strict';

module.exports = function (router, messanger, socket) {

  router.post('/message', function (req, res) {
    if (req.body.message) {
      messanger.msg(req.body.message, req.body.usrid);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
