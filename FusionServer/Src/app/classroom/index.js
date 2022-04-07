const logger                = require('./../utils/logger');
const classroomConnection   = require('./connection');


// Export module
module.exports = async function() {
	
	try {

		logger.verbose('Configuring classroom connection');
		await classroomConnection.connect();		
		
	} catch(connectError) {
		
		logger.warn('Classroom connection error: ' + connectError);
		
	}
    
    // Check if connected
	if (classroomConnection.connected) {			
		logger.info('Running in classroom mode');		
	} else {		
		logger.info('Running in standalone mode');	
	}
	
}();