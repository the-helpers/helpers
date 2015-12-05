'use strict';

module.exports = function (root, path, http, express, router) {

  var app = express();
  app.use(router);

  return app;
};
