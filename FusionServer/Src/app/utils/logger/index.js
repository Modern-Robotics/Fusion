// Dependencies
const winston           = require('winston');
const consoleTransport  = require('./transports/consoleTransport');
const fileTransport     = require('./transports/fileTransport');


// Create logger
const logger = winston.createLogger({

    // Usable log levels //
    ///////////////////////
    //      error:0      //
    //      warn:1       //
    //      info:2       //
    //      verbose:3    //
    //      debug:4      //
    //      silly:5      //
    ///////////////////////

    // Set log message level
    level: 'silly',
    format: winston.format.json(),

    // Add Transports
    transports: [
        consoleTransport,
        fileTransport
    ]

});

// Create a stream object with write functionality for use by 'morgan'
logger.stream = {
    write: function(message, encoding) {
        logger.debug(message.substring(0,message.lastIndexOf('\n')));
    }
};

// Export logger
module.exports = logger;