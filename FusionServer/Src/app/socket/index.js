const server = require('./../http');
const socket    = require('socket.io');

const io = socket(server, {
    origins : '*:*',
    serveClient : true,
    cookie : false,
    pingTimeout: 4000,
    pingInterval: 5000
});

module.exports = io;