'use strict';

var WhiteHorse = require('white-horse');

var whiteHorse = new WhiteHorse()


.on('before_init', function (module) {
    console.log('Initializing', module);
})

.on('after_init', function (module) {
    console.log('Initialized', module);
})

.on('require', function (file) {
    console.log('Requiring', file);
});

whiteHorse.register('root', __dirname);

whiteHorse
  .use(require('./package.json'))
  .useAs('uuid-1345', 'UUID')
  .useAs('body-parser', 'bodyParser')
  .useAs('socket.io', 'io')
  .useAs('url', 'URL')
  .use('http')
  .use('path')
  .run(__dirname, 'modules', function (err) {
    if (err) {
      console.log('Failed to initialize app');
      if (err.error) {
        console.log(err.module, 'failed to load');
        console.log(err.error.stack);
      } else {
        console.log(err);
      }
      process.exit(1);
      return;
    }
  });
