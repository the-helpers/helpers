'use strict';

module.exports = function (root, path, http, express, bodyParser) {

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(express.static(path.join(root, 'public')));

  return app;
};