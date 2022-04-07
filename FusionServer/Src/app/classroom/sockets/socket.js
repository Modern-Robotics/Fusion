
// Dependencies ==========================
const io        = require('socket.io-client');
const socket    = io('https://172.16.0.1:8443', { rejectUnauthorized: false });

// Export socket
module.exports = socket;