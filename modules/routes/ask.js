'use strict';

module.exports = function (router, oracle) {

  router.post('/ask', function (req, res) {
    if (req.body.question) {
      const id = oracle.ask(req.body.question);
      res.send(id);
    } else {
      res.sendStatus(500);
    }
  });
  	
};
