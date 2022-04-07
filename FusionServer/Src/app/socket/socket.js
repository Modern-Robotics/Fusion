const config                = require('config');
const logger                = require('../utils/logger');
const io                    = require('.');
const FusionSettings        = require('../global/fusionSettings');
const fusionProgram         = require('../fusionProgram');
const spawn                 = require('child_process').spawn;
const internetAvailable     = require("internet-available");
const wpa_cli               = require('wireless-tools/wpa_cli');
const os                    = require('os');
const shell                 = require('shelljs');
const path                  = require('path');
const request               = require('request');
const eventEmitter			= require('./../events');


module.exports = async function () {

    logger.verbose('Configuring socket communication');

    FusionSettings.connectedClients = [];

    var runDirectory = path.dirname(__dirname).split(path.sep).pop();
    var asyncCheckList = 0;
    var totalAsyncChecks = 11;

    io.on('connection', function (client) {

        FusionSettings.connectedClients.push(client);
        
        logger.debug(`Client connected: ${client.id}`);

        transmitFusionDataOnConnection();

        client.on('join', function (data) {

            client.emit('global-message', {
                message: 'Connected to server',
                type: 'success'
            });

            // Emit client connected to fusion socket event
            eventEmitter.emit('client-connected');

        });

        client.on('disconnect', function (reason) {

            logger.debug(`Client disconnected: ${client.id} because "${reason}"`);

            if (FusionSettings.SocketVariables.fusion_program_running)
                if (FusionSettings.SocketVariables.fusion_program_running.SocketId == client.id)
                    fusionProgram.KillProgram();

            if (FusionSettings.SocketVariables.fusion_diagnostics_running)
                if (FusionSettings.SocketVariables.fusion_diagnostics_running.socket == client.id){

                    logger.verbose('Terminating diagnostic tools due to absent client');

                     // Sends request to self to stop diagnostic tool
                     request({
                        url: 'http://localhost:8080/api/diagnostics/stop',
                        method: 'GET'
                    }, function (stopDiagnosticToolError, response, body) {

                        // Error setting wireless connection
                        if (stopDiagnosticToolError)
                            logger.error('Error terminating diagnostic tools : ' + stopDiagnosticToolError);

                        else{
                            
                            // Connected successfully
                            if (response.statusCode == 200){

                                FusionSettings.SocketVariables.fusion_diagnostics_running = null;

                            }

                        }

                        io.sockets.emit('diagnostics_running', FusionSettings.SocketVariables.fusion_diagnostics_running);

                    });

                }


            var i = FusionSettings.connectedClients.indexOf(client);
            FusionSettings.connectedClients.splice(i, 1);

            // Emit client disconnected to fusion socket event
            eventEmitter.emit('client-disconnected');

        });

        client.on('error', function(error){
            logger.error('Socket error - ' + error);
        });

    });

    function retrieveFusionData() {

        retrieveFusionBatteryLevel();
        retrieveFusionInternetAvailable();
        retrieveCurrentFusionVersionSHA();
        retrieveUpdateAvailable();
        retrieveFusionGamepadAvailable();
        retrieveFusionDiagnosticsRunning();
        retrieveFusionWifiConnection();

    }

    function transmitFusionData() {

        if (asyncCheckList >= totalAsyncChecks){

            logger.debug(JSON.stringify(FusionSettings.SocketVariables));

            // logger.info('-----------------------------------------------------');
            // logger.info('fusion_battery_level : ' + FusionSettings.SocketVariables.fusion_battery_level);
            // logger.info('fusion_internet_access : ' + FusionSettings.SocketVariables.fusion_internet_access);
            // logger.info('fusion_current_version : ' + FusionSettings.SocketVariables.fusion_current_version);
            // logger.info('fusion_update_available : ' + FusionSettings.SocketVariables.fusion_update_available);
            // logger.info('fusion_gamepad_available : ' + FusionSettings.SocketVariables.fusion_gamepad_available);
            // logger.info('fusion_diagnostics_running : ' + JSON.stringify(FusionSettings.SocketVariables.fusion_diagnostics_running));
            // logger.info('fusion_wifi_access : ' + JSON.stringify(FusionSettings.SocketVariables.fusion_wifi_access));
            // logger.info('fusion_storage_type : ' + FusionSettings.Storage.type);
            // logger.info('fusion_program_running : ' + JSON.stringify(FusionSettings.SocketVariables.fusion_program_running));
            // logger.info('-----------------------------------------------------');

            io.sockets.emit('battery-level', FusionSettings.SocketVariables.fusion_battery_level);
            io.sockets.emit('internet-access', FusionSettings.SocketVariables.fusion_internet_access);
            io.sockets.emit('version-number', FusionSettings.SocketVariables.fusion_current_version);
            io.sockets.emit('update-available', FusionSettings.SocketVariables.fusion_update_available);
            io.sockets.emit('gamepad-available', FusionSettings.SocketVariables.fusion_gamepad_available);
            io.sockets.emit('diagnostics_running', FusionSettings.SocketVariables.fusion_diagnostics_running);
            io.sockets.emit('wifi-connection', FusionSettings.SocketVariables.fusion_wifi_access);
            io.sockets.emit('wifi-fusion_storage_type', FusionSettings.Storage.type);
            io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);

            asyncCheckList = 0;

        }
        else{

            setTimeout(transmitFusionData, 2000);

        }        
        
    }

    function transmitFusionDataOnConnection(){        

        io.sockets.emit('battery-level', FusionSettings.SocketVariables.fusion_battery_level);
        io.sockets.emit('internet-access', FusionSettings.SocketVariables.fusion_internet_access);
        io.sockets.emit('version-number', FusionSettings.SocketVariables.fusion_current_version);
        io.sockets.emit('update-available', FusionSettings.SocketVariables.fusion_update_available);
        io.sockets.emit('gamepad-available', FusionSettings.SocketVariables.fusion_gamepad_available);
        io.sockets.emit('diagnostics_running', FusionSettings.SocketVariables.fusion_diagnostics_running);
        io.sockets.emit('wifi-connection', FusionSettings.SocketVariables.fusion_wifi_access);
        io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);

    }

    function retrieveFusionBatteryLevel() {

        if (os.platform() != "win32") {

            var batteryScriptPath = "./scripts/ReadBatt.py";

            var batteryLevel = spawn("python", [batteryScriptPath], {
                stdio: 'pipe'
            });
    
            batteryLevel.stdout.on('data', function (data) {
                FusionSettings.SocketVariables.fusion_battery_level = String(data).trim();
                asyncCheckList++;
                //logger.info("Battery  : " + fusion_battery_level);
            });
    
            batteryLevel.stderr.on('data', function (data) {
                logger.error("Error reading battery : \n" + String(data));
            });

        }
        else{
            asyncCheckList++;
        }

    }

    function retrieveFusionInternetAvailable() {

        internetAvailable({
            timeout: 10000,
            retries: 5
        }).then(function () {

            FusionSettings.SocketVariables.fusion_internet_access = true;
            asyncCheckList++;

        }).catch(function () {

            FusionSettings.SocketVariables.fusion_internet_access = false;
            asyncCheckList++;

        });

    }

    function retrieveCurrentFusionVersionSHA() {

        shell.exec('git rev-parse HEAD', { silent: true } , function (code, stdout, stderr) {

            (function (output) {

                FusionSettings.SocketVariables.fusion_current_SHA = output.trim();
                asyncCheckList++;
                //logger.info("Current sha : " + fusion_current_SHA);

                retrieveCurrentFusionVersionTag();

            })(stdout.trim());
            
        });

    }

    function retrieveCurrentFusionVersionTag() {        

        shell.exec('git describe --tags ' + FusionSettings.SocketVariables.fusion_current_SHA, { silent: true } , function (code, stdout, stderr) {

            (function (output) {
                
                FusionSettings.SocketVariables.fusion_current_version = output.trim();
                asyncCheckList++;
                //logger.info("Current version : " + fusion_current_version);

                fetchLatestGitReferences();

            })(stdout.trim());

        });

    }

    function fetchLatestGitReferences() {

        if (runDirectory == 'Build'){

            shell.exec('git fetch', { silent: true } , function (code, stdout, stderr) {
            
                (function (output) {
    
                    asyncCheckList++;
    
                    retrieveLatestFusionVersionSHA();
    
                })(stdout.trim());
    
            });

        }
        else{

            asyncCheckList++;
    
            retrieveLatestFusionVersionSHA();

        }        

    }

    function retrieveLatestFusionVersionSHA() {

        shell.exec('git rev-list --tags --max-count=1', { silent: true } , function (code, stdout, stderr) {
            
            (function (output) {

                FusionSettings.SocketVariables.fusion_latest_SHA = output.trim();
                asyncCheckList++;
                //logger.info("Latest sha : " + fusion_current_SHA);

                retrieveLatestFusionVersionTag();

            })(stdout.trim());
            
        });

    }

    function retrieveLatestFusionVersionTag() {
    
        shell.exec('git describe --tags ' + FusionSettings.SocketVariables.fusion_latest_SHA, { silent: true } , function (code, stdout, stderr) {
            
            (function (output) {
                
                FusionSettings.SocketVariables.fusion_latest_version = output.trim();
                asyncCheckList++;

            })(stdout.trim());

        });
    
    }

    function retrieveUpdateAvailable() {

        if (FusionSettings.SocketVariables.fusion_current_SHA != FusionSettings.SocketVariables.fusion_latest_SHA) {
            FusionSettings.SocketVariables.fusion_update_available = true;
        } else {
            FusionSettings.SocketVariables.fusion_update_available = false;
        }

        asyncCheckList++;

    }

    function retrieveFusionGamepadAvailable(){

        if (os.platform() != "win32") {

            shell.exec('sudo netstat -panp | grep 5000 | grep LISTEN', { silent: true } , function (code, stdout, stderr) {
                
                (function (output) {
                    
                    FusionSettings.SocketVariables.fusion_gamepad_available = output.trim();

                    if (!FusionSettings.SocketVariables.fusion_gamepad_available)
                        FusionSettings.SocketVariables.fusion_gamepad_available = false;
                    else
                        FusionSettings.SocketVariables.fusion_gamepad_available = true;

                    asyncCheckList++;

                })(stdout.trim());

            });

        }
        else{

            FusionSettings.SocketVariables.fusion_gamepad_available = false;
            asyncCheckList++;

        }

    }

    function retrieveFusionDiagnosticsRunning() {

        if (os.platform() != "win32") {

            shell.exec("ps aux | grep '[s]udo python ../../diagnostics/diagnosticGUI.py' | awk '{print $2}'", { silent: true } , function (code, stdout, stderr) {
                
                (function (output) {
                    
                    var processData = output.trim();

                    if (processData){

                        if (FusionSettings.SocketVariables.fusion_diagnostics_running)
                            FusionSettings.SocketVariables.fusion_diagnostics_running.process = processData;
                            
                        // Diagnostic process started independent of fusion server
                        else{
                            FusionSettings.SocketVariables.fusion_diagnostics_running = {
                                process: processData,
                                socket: -1
                            }
                        }
                    }
                    else
                        FusionSettings.SocketVariables.fusion_diagnostics_running = null;

                    asyncCheckList++;

                })(stdout.trim());

            });

        }
        else{

            FusionSettings.SocketVariables.fusion_gamepad_available = null;
            asyncCheckList++;

        }

    }

    function retrieveFusionWifiConnection() {

        wpa_cli.status(config.get('Wifi_NIC'), function (err, status) {

            if (err) {

                status = {
                    ssid: undefined,
                    ip: undefined,
                    mac: undefined
                };

            }

            FusionSettings.SocketVariables.fusion_wifi_access = status;
            asyncCheckList++;

        });

    }

    transmitFusionData();
    retrieveFusionData();    

    setInterval(function () {

        transmitFusionData();
        retrieveFusionData();        

    }, 10000);

}();