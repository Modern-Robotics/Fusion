
// config/app.js

module.exports = function (app, express, rootDir,  morgan, cookieParser, bodyParser, methodOverride, session, passport, flash, env) {


    // Configuration ====================================================

    // Set the static files location based on environment
    var publicDir;

    if (env == 'dev')
        publicDir = '/public/src';
    else
        publicDir = '/public/dist';

    app.use(express.static(rootDir + publicDir));

    // Set up crash reports
    require('crashreporter').configure({
        outDir: '.crash',
        exitOnCrash: true,
        maxCrashFile: 1
    });

    // Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    // Log every request to the console
    app.use(morgan('dev')); 

    // Read cookies (needed for auth)//
    app.use(cookieParser()); 


    // Sets Application Headers =========================================

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

    
    // Set up body parser ===============================================

    // Support JSON
    app.use(bodyParser.json());

    // Support url encoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    // Set Up Sessions =================================================

    // Sets up session key
    app.use(session({
        secret: 'ilovemyfusioncontroller',
        resave: false,
        saveUninitialized: true
    }));
    
    // Initializes passport authentication
    app.use(passport.initialize());

    // Initializes persistent login sessions
    app.use(passport.session());

    // use connect-flash for flash messages stored in session
    app.use(flash());

};