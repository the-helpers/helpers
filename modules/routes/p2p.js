'use strict';

module.exports = function (app, server, peer, config, chalk, logger) {
	
	var ExpressPeerServer = peer.ExpressPeerServer;
	var options = config.get('p2p');
	
	var path = '/p2p';
	
	app.use(path, ExpressPeerServer(server, options));
	logger.info(chalk.green("p2p server set up at %s"), path);
}