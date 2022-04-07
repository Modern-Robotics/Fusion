// Dependencies
const winston   = require('winston');


// Create console transport
const consoleTransport = new winston.transports.Console(

    // Console transport configuration
    {

        // Sets minimum transport level
        level: 'silly',                           

        // Sets output format
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(info => `[${info.level}] ${info.message}`)
        )
    }

);

// Export console transport
module.exports = consoleTransport;