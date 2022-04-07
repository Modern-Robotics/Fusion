const config    = require('config');
const logger    = require('./app/utils/logger');
const server    = require('./app/http');


module.exports = async function() {

    try {

        // Output environment variables
        logger.verbose(`Server Mode: ${process.env.NODE_ENV || 'development'}`);
        logger.debug(`NIC: ${config.get('Wifi_NIC')}\tWAP: ${config.get('Wifi_WAP')}\tNET: ${config.get('Wire_NET')}`);

        // Get port from configuration file
        const port = config.get('Server.Port');
        
        await require('./app/database');        // Configure database connection
        await require('./app/autonomous');      // Configure autonomous mode
        await require('./app/express/app');     // Configure server application 
        await require('./app/routes');          // Configure server API routes
        await require('./app/authentication');  // Configure authentication
        await require('./app/socket/socket');   // Configure socket communication
		await require('./app/classroom'); 		// Configure classroom server

        // Start server
        server.listen(port, async function() {

            logger.info('Server running on port: ' + port);   

        });
        

    } catch(err) {

        logger.error(err);

    }

}();