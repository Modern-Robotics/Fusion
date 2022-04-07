// Dependencies
const winston   = require('winston');
require('winston-daily-rotate-file');
const path      = require('path');


// Create file transport
const fileTransport = new winston.transports.DailyRotateFile(

    // File transport configuration
    {
      
        level: 'warn',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: false,
        filename: 'error-%DATE%.log',
        dirname: path.join(__dirname, './../../../../.logs'),
        maxSize: '2m',
        maxFiles: '14d',
        handleExceptions: true,

        // Sets output format
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )

    }

);


// Export file transport
module.exports = fileTransport;