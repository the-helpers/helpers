'use strict';

module.exports = function (router, oracle) {

  router.post('/ask', function (req, res) {
    if (req.body.question) {
      oracle.ask(req.body.question);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
