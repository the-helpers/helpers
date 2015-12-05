"use strict";

module.exports = function (root, path, http, express, bodyParser) {

  const router = express.Router();

  router.use(bodyParser.json());
  router.use('/', express.static('public'));
  router.use('/js', express.static('dist'));

  return router;
};
