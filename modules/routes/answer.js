'use strict';

module.exports = function (router, oracle) {

  router.post('/answer', function (req, res) {
    if (req.body.id) {
      const id = oracle.answer(req.body.id);
      res.send(id);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
