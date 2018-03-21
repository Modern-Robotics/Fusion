// app/routes.js

// Dependencies
var fs = require('fs');
var mkdirp = require('mkdirp');
var os = require('os');



var wifi = require('node-wifi');

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null 
});

// grab the nerd model we just created
var User = require('./models/user');

module.exports = function (app, passport, fusionProgram, io, multipartyMiddleware, FileUploadController, env) {    

    // Import Admin Routes
    require('./routes/admin')(app, User, passport);

    // Import User Routes
    require('./routes/users')(app, User, passport, fusionProgram);

    // Import Program Routes
    require('./routes/program')(app, fs, passport, mkdirp, fusionProgram, multipartyMiddleware, FileUploadController);

    // Import Blockly Routes
    require('./routes/blockly')(app, fs, passport, mkdirp, fusionProgram);    

    // Import Fusion Routes
    require('./routes/fusion')(app, io);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {

        var publicDir;
        
            if (env == 'dev')
                publicDir = 'public/src';
            else
                publicDir = 'public/dist';

        res.sendFile('./index.html', {
            root: publicDir
        });
    });

};