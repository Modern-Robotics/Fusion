const logger            = require('../utils/logger');
const app               = require('.');
const express           = require('express');
const morgan            = require('morgan');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const session           = require('express-session');
const MemoryStore		= require('memorystore')(session);
const passport          = require('passport');
const fs                = require('fs');
const shell             = require('shelljs');
const os                = require('os');
const i18n              = require('i18n');
const path              = require('path');
const helmet            = require('helmet');
const compression       = require('compression');


module.exports = async function () {

    // Set the static files location
    logger.verbose('Configuring public directory');
    app.use(express.static(path.join(__dirname, './../../public')));

    // Sets Application Headers =========================================
    logger.verbose('Configuring API headers')
    app.use(function (req, res, next) {

        // Accepts requests from all origins
        res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');

        // Request headers you wish to allow
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

        // Set to true if you need the website to include cookies in the requests sent
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();

    });    

    // Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    logger.verbose('Configuring API method override');
    app.use(methodOverride('X-HTTP-Method-Override'));    

    // Log every request to the console
    logger.verbose('Configuring API request logging');
    app.use(morgan('dev', {stream: logger.stream}));

    // Support JSON
    logger.verbose('Configuring JSON body parser');
    app.use(bodyParser.json());

    // Support url encoded
    logger.verbose('Configuring URL encodede body parser');
    app.use(bodyParser.urlencoded({extended: true}));

    // Sets up session key
    logger.verbose('Configuring server sessions');
    app.use(session({
        secret: 'ilovemyfusioncontroller',
        resave: false,
        saveUninitialized: false,
		store: new MemoryStore({
			checkPeriod: 86400000 // prune expired entries every 24h
		})
    }));

    // Initializes passport authentication
    logger.verbose('Configuring authentication protocol');
    app.use(passport.initialize());
    app.use(passport.session());

    // Simple express app security
    logger.verbose('Configuring API security');
    app.use(helmet());

    // Add gzip compression for improved performance
    logger.verbose('Configuring response compression');
    app.use(compression());

    // Configure and initialize i18n
    logger.verbose('Configuring i18n defaults');
    i18n.configure({
        defaultLocale: 'en',
        locales: ['en', 'es'],
        directory: path.join(__dirname, './../../config/locales'),
        cookie: 'NG_TRANSLATE_LANG_KEY',
        autoReload: false,
        objectNotation: true,
        syncFiles: false,
        logDebugFn: function (msg) {
            logger.debug(msg);
        },
        logWarnFn: function (msg) {
            logger.warn(msg);
        },
        logErrorFn: function (msg) {
            logger.error(msg);
        }
    });

    logger.verbose('Configuring server with i18n support')
    app.use(i18n.init);


    var filesystemPath = 'app/filesystem';

    // Create if doesn't exist
    if (!fs.existsSync(filesystemPath)){
        logger.verbose('Configuring file system');
        fs.mkdirSync(filesystemPath);
    }

    // Send kill command for lingering diagnostic tool
    if (os.platform() != "win32")
        shell.exec("sudo kill $(ps aux | grep '[s]udo python ../../diagnostics/diagnosticGUI.py' | awk '{print $2}')", {silent:true});

}();