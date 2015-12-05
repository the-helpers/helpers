'use strict';

module.exports = function (router, oracle) {

  router.post('/answer', function (req, res) {
    if (req.body.id) {
      oracle.answer(req.body.id);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
