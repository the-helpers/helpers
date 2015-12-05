"use strict";

module.exports = function (root, path, http, express, bodyParser, oracle) {

  const router = express.Router();

  router.use(bodyParser.json());
  router.use('/', express.static('public'));
  router.use('/js', express.static('dist'));

  router.post('/ask', function (req, res) {
    if (req.body.question) {
      oracle.answer(req.body.question);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });

  return router;
};
