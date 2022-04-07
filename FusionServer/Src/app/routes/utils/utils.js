// app/routes/utils

// Dependencies =============================================
var os = require('os');
var spawn = require('child_process').spawn;
var shell = require('shelljs');

const logger            = require('../../utils/logger');
const app               = require('../../express');
const io                = require('../../socket');
const FusionSettings    = require('../../global/fusionSettings');


module.exports = function () {

    var util_process = null;

    app.route('/api/util/dataLogger/start')

        // Start data logger
        .post(function(req, res){

            if (os.platform() != "win32") {
                
                // Launch data logger
                util_process = spawn('sudo', ['sh', '../../logging/runRemi.sh', '../../logging/dataLogger.py', req.user.username]);

                util_process.stdout.on('data', function(data) {
                    logger.info(String(data));
                });

                util_process.stderr.on('data', function(data) {
                    logger.error(String(data));
                });


                // Checks on interval for running process

                var attempts = 1;
                var maxAttempts = 3;

                var checkDataLoggerInterval = setInterval(function () {

                    if (attempts <= maxAttempts){

                        var processNumber = shell.exec("ps aux | grep '[s]udo python ../../logging/dataLogger.py' | awk '{print $2}'", {silent:true}).stdout;
                        logger.info('process number ' + processNumber);
                        if (processNumber){
                            logger.info('process found')
                            clearInterval(checkDataLoggerInterval);
                            FusionSettings.SocketVariables.fusion_dataLogger_running = { process: processNumber, socket: req.body.socketId};
                            io.sockets.emit('dataLogger_running', FusionSettings.SocketVariables.fusion_dataLogger_running);
                            return res.status(200).json({
                                serverMessage: 'Data logger started successfully'
                            });
                        }
                        else{
                            logger.info('process not found');
                            attempts++;
                        }

                    }
                    else{
                        clearInterval(checkDataLoggerInterval);
                        return res.status(500).send('Error starting data logger');
                    }

                }, 300);

            }
            else{

                return res.status(500).json({
                    serverMessage: 'Data Logger does not run on windows'
                });

            }

        });

    app.route('/api/util/dataLogger/stop')

        // Stop data logger
        .get(function(req, res){

            if (os.platform() != "win32") {

                // Send kill command
                shell.exec("sudo kill $(ps aux | grep '[s]udo python ../../logging/dataLogger.py' | awk '{print $2}')", {silent:true});    
    
                // Check if running
                shell.exec("ps aux | grep '[s]udo python ../../logging/dataLogger.py' | awk '{print $2}'", { silent: true } , function (code, stdout, stderr) {
                    
                    (function (output) {                        
                        var processData = output.trim();
                            
                        // Process found - running!
                        if (processData){    
                            return res.status(500).send('Unable to stop data logger');    
                        }

                        // Process not found - not running
                        else{    
                            FusionSettings.SocketVariables.fusion_dataLogger_running = null;    
                            io.sockets.emit('dataLogger_running', FusionSettings.SocketVariables.fusion_dataLogger_running);  
                            util_process = null;

                            return res.status(200).json({
                                serverMessage: 'Data logger stopped successfully'
                            });    
                        }    
                    })(stdout.trim());    
                });            
    
            } else {
    
                return res.status(200).json({
                    serverMessage: 'Data Logger does not run on windows'
                });
    
            }

        });

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.status(401).send("User Unauthenticated");
            }
        };
    }

}();