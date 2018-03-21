
// server.js

// Dependencies =================================================================

var express             = require('express');
var app                  = express();
var server               = require('http').Server(app);
var io                   = require('socket.io')(server, {
                                                    origins : '*:*',
                                                    serveClient : false,
                                                    cookie : false,
                                                });
var port                 = process.env.PORT || 8080;
var mongoose             = require('mongoose');
var passport             = require('passport');
var methodOverride       = require('method-override');
var flash                = require('connect-flash');
var fusionProgram        = require('./app/fusionProgram.js')(io);
var fs                   = require('fs');
var multiparty           = require('connect-multiparty');
var FileUploadController = require('./app/controllers/FileUploadController');
var multipartyMiddleware = multiparty();
var morgan               = require('morgan');
var cookieParser         = require('cookie-parser');
var bodyParser           = require('body-parser');
var session              = require('express-session');
var configDB             = require('./config/database.js');
var env                  = process.env.NODE_ENV || 'dev';
var user                 = require('./app/models/user');

console.log('Running in "' + env + '" mode');

// configuration ===============================================================

// Configure Database
require('./config/database')(mongoose, user);

// Configure Authentication Strategies
require('./config/passport')(passport);

// Configure App
require('./config/app')(app, express, __dirname, morgan, cookieParser, bodyParser, methodOverride, session, passport, flash, env);

// Configure Socket Communication
require('./config/socket.js')(io, fusionProgram);

// Configure App Routes+
require('./app/routes.js')(app, passport, fusionProgram, io, multipartyMiddleware, FileUploadController, env);


// launch ======================================================================
server.listen(port);

console.log('The magic happens on port ' + port);