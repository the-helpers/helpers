'use strict';

module.exports = function (app, server, peer, config, chalk, logger) {
	
	var PeerServer = peer.PeerServer;
	var options = config.get('p2p');
	
	var peerServer = PeerServer({ port: 9000, path: '/' });
	
	logger.info(chalk.green("p2p server set up at :9000"));
	
	return peerServer;
}