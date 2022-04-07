const app   = require('../express');
const http  = require('http');

// Create HTTP server
const server = http.Server(app);

// Export HTTP server
module.exports = server;