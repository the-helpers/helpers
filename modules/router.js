"use strict";

module.exports = function (root, path, http, express, bodyParser) {

  const router = express.Router();

  router.use(bodyParser.json());
  router.use('/', express.static('public'));
  router.use('/js', express.static('dist'));
  router.use('/ext', express.static('chrome/js'));
  router.use('/bower', express.static('bower_components'));

  return router;
};
