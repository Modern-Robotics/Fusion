

// Dependencies =========================
const mac       = require('getmac');
const logger    = require('../utils/logger');


module.exports = async function() {

    const serialData = {};

    await new Promise(function(resolve, reject){

        logger.verbose('Retrieving serial Id');

        mac.getMac({
            iface: 'eth0'
        }, function (macReadError, macAddress) {
    
            if (macReadError){

                logger.warn(macReadError.message);

                serialData.serialId = '123456';
                return resolve();

            }
            else {

                serialData.macAddress = macAddress;
                serialData.serialId = macAddress.split(":").join("").substr(-6);

                logger.verbose('Serial Id is ' + serialData.serialId);

                return resolve();
    
            }
    
        });

    });
    
    return serialData;

}();