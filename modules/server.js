module.exports = function (chalk, http, app, config, logger, $done) {

  config = config.get('web');

  var server = http.Server(app);

  server.on('error', $done);

  server.listen(config.port, function () {
    logger.info(chalk.green('listening on port %s'), config.port);
    $done(null, server);
  });

};
