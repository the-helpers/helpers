'use strict';

module.exports = function (app, server, peer, config, chalk, logger) {
	
	var PeerServer = peer.PeerServer;
	
	var peerServer = PeerServer({ port: 9000, path: '/', debug: true });
	
	logger.info(chalk.green("p2p server set up at :9000"));
	
	return peerServer;
}