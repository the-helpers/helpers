"use strict";

module.exports = function (root, path, http, express, bodyParser) {

  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: false }));
  router.use('/', express.static('public'));
  router.use('/js', express.static('dist'));

  router.post('/ask', function (req, res) {
    if (req.body.question) {
      console.log('Received a new question: ' + req.body.question);
    }
  });

  return router;
};
