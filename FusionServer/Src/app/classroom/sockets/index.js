
// Dependencies =============================
const socket                = require('./socket');
const logger                = require('./../../utils/logger');
const classroomConnection   = require('./../connection/');
const eventEmitter 			= require('./../../events');


module.exports = async function() {

    const serialData  = await require('../../serial');
    const serialId = serialData.serialId;

    // Check for successful connection
    socket.on('connect', function(){

        logger.verbose('Connected to classroom socket');
        
        // Identify as fusion
        socket.emit('identify', {clientType: 'fusion', serial: serialId});
        
    });

    socket.on('disconnect', function(){

        logger.verbose('Disconnected from classroom socket');

        classroomConnection.connected = false;

    });

    eventEmitter.on('client-connected', function(){
        console.log('event capture - connected');
        socket.emit('fusion-change', {state: 3});
    });

    eventEmitter.on('client-disconnected', function(){
        console.log('event capture - disconnected');
        socket.emit('fusion-change', {state: 2});
    });

}();