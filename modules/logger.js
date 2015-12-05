'use strict';

var sprintf = require('sprintf').sprintf;

var logLevel = {
  trace: 0,
  debug: 1,
  info:  2,
  warn:  3,
  error: 4,
  fatal: 5
};

module.exports = function (config, chalk) {

  config = config.get('logging');

  function log() {
    var args = [].slice.call(arguments);
    var level = args.shift();
    var format = '%-5s %s ' + args.shift();
    args.unshift(new Date().toISOString());
    args.unshift(level.toUpperCase());
    args.unshift(format);
    console.log(sprintf.apply(null, args));
  }

  var logger = {};
  Object.keys(logLevel).forEach(function (level) {
    if (logLevel[level] >= logLevel[config.level]) {
      logger[level] = log.bind(null, level);
    } else {
      logger[level] = function () {};
    }
  });

  return logger;

};