const app       = require('./../express');
const logger    = require('./../utils/logger');
const path      = require('path');


module.exports = async function () {

    // Import Admin Routes
    logger.verbose('Configuring API route: admin');
    require('./admin');

    // Import User Routes
    logger.verbose('Configuring API route: users');
    require('./users');

    // Import Program Routes
    logger.verbose('Configuring API route: program');
    require('./program');

    // Import Blockly Routes
    logger.verbose('Configuring API route: blockly');
    require('./blockly');    

    // Import Fusion Routes
    logger.verbose('Configuring API route: fusion');
    require('./fusion');    

    // Import File Routes
    logger.verbose('Configuring API route: files');
    require('./files');

    // Import Util Routes
    logger.verbose('Configuring API route: utils');
    require('./utils');
    
    // Forward all non API calls to the front end
    logger.verbose('Configuring API catch-all');
    app.get('*', function (req, res) {
        return res.sendFile('index.html', {
            root: path.join(__dirname, './../../public')
        });
    });

}();