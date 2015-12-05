'use strict';

module.exports = function (router, oracle) {

  router.post('/answer', function (req, res) {
    if (req.body.id) {
      oracle.answer(req.body.id);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
