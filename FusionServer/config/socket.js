//config/socket.js

var spawn = require('child_process').spawn;
var internetAvailable = require("internet-available");
var wpa_cli = require('wireless-tools/wpa_cli');
var os = require('os');
var shell = require('shelljs');
var env = process.env.NODE_ENV || 'dev';

var connectedClients = [];

var asyncCheckList = 0;

var fusion_battery_level = "";
var fusion_current_SHA = "";
var fusion_current_version = "";
var fusion_latest_SHA = "";
var fusion_latest_version = "";
var fusion_update_available = false;
var fusion_internet_acess = false;
var fusion_wifi_access = false;
var fusion_program_running = false;

module.exports = function (io, fusionProgram) {

    io.set('transports', ['websocket']);

    io.on('connection', function (client) {

        connectedClients.push(client);

        console.log('Client connected...');

        transmitFusionDataOnConnection();

        client.on('join', function (data) {

            console.log(data);

            client.emit('global-message', {
                message: 'Hello from server',
                type: 'success'
            });

        });

        client.on('disconnect', function () {

            console.log('Client disconnected');

            if (fusionProgram.runningProgram)
                if (fusionProgram.runningProgram.SocketId == client.id)
                    fusionProgram.KillProgram();

            var i = connectedClients.indexOf(client);
            connectedClients.splice(i, 1);

        });

    });

    function retrieveFusionData() {

        retrieveFusionBatteryLevel();
        retrieveFusionInternetAvailable();
        retrieveCurrentFusionVersionSHA();
        retrieveUpdateAvailable();
        retrieveFusionWifiConnection();
        retrieveFusionProgramRunning();

    }

    function transmitFusionData() {

        if (asyncCheckList >= 10){

            io.sockets.emit('battery-level', fusion_battery_level);
            io.sockets.emit('internet-access', fusion_internet_acess);
            io.sockets.emit('version-number', fusion_current_version);
            io.sockets.emit('update-available', fusion_update_available);
            io.sockets.emit('wifi-connection', fusion_wifi_access);
            io.sockets.emit('program-running', fusion_program_running);

            asyncCheckList = 0;

        }
        else{

            setTimeout(transmitFusionData, 2000);

        }        
        
    }

    function transmitFusionDataOnConnection(){

        io.sockets.emit('battery-level', fusion_battery_level);
        io.sockets.emit('internet-access', fusion_internet_acess);
        io.sockets.emit('version-number', fusion_current_version);
        io.sockets.emit('update-available', fusion_update_available);
        io.sockets.emit('wifi-connection', fusion_wifi_access);
        io.sockets.emit('program-running', fusion_program_running);

    }

    function retrieveFusionBatteryLevel() {

        if (os.platform() != "win32") {

            var batteryScriptPath = "./scripts/ReadBatt.py";

            var batteryLevel = spawn("python", [batteryScriptPath], {
                stdio: 'pipe'
            });
    
            batteryLevel.stdout.on('data', function (data) {
                fusion_battery_level = String(data).trim();
                asyncCheckList++;
                console.log("Battery  : " + fusion_battery_level);
            });
    
            batteryLevel.stderr.on('data', function (data) {
                console.log("Error reading battery : \n" + String(data));
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

            fusion_internet_acess = true;
            asyncCheckList++;

        }).catch(function () {

            fusion_internet_acess = false;
            asyncCheckList++;

        });

    }

    function retrieveCurrentFusionVersionSHA() {

        shell.exec('git rev-parse HEAD', { silent: true } , function (code, stdout, stderr) {

            (function (output) {

                fusion_current_SHA = output.trim();
                asyncCheckList++;
                console.log("Current sha : " + fusion_current_SHA);

                retrieveCurrentFusionVersionTag();

            })(stdout.trim());
            
        });

    }

    function retrieveCurrentFusionVersionTag() {        

        shell.exec('git describe --tags ' + fusion_current_SHA, { silent: true } , function (code, stdout, stderr) {

            (function (output) {
                
                fusion_current_version = output.trim();
                asyncCheckList++;
                console.log("Current version : " + fusion_current_version);

                fetchLatestGitReferences();

            })(stdout.trim());

        });

    }

    function fetchLatestGitReferences() {

        shell.exec('git fetch', { silent: true } , function (code, stdout, stderr) {
            
            (function (output) {

                asyncCheckList++;
                console.log('Git References Fetched.');

                retreiveLatestFusionVersionSHA();

            })(stdout.trim());

        });

    }

    function retreiveLatestFusionVersionSHA() {

        shell.exec('git rev-list --tags --max-count=1', { silent: true } , function (code, stdout, stderr) {
            
            (function (output) {

                fusion_latest_SHA = output.trim();
                asyncCheckList++;
                console.log("Latest sha : " + fusion_current_SHA);

                retrieveLatestFusionVersionTag();

            })(stdout.trim());
            
        });

    }

    function retrieveLatestFusionVersionTag() {
    
        shell.exec('git describe --tags ' + fusion_latest_SHA, { silent: true } , function (code, stdout, stderr) {
            
            (function (output) {
                
                fusion_latest_version = output.trim();
                asyncCheckList++;
                console.log("Latest version : " + fusion_latest_version);

            })(stdout.trim());

        });
    
    }

    function retrieveUpdateAvailable() {

        if (fusion_current_SHA != fusion_latest_SHA) {
            fusion_update_available = true;
        } else {
            fusion_update_available = false;
        }

        asyncCheckList++;

    }

    function retrieveFusionWifiConnection() {

        wpa_cli.status('wlan1', function (err, status) {

            if (err) {

                status = {
                    ssid: undefined,
                    ip: undefined
                };

            }

            if (status.ssid == undefined)
                status.ssid = 'No Connection';
            if (status.ip == undefined)
                status.ip = "No IP Address";

            fusion_wifi_access = status;
            asyncCheckList++;

        });

    }

    function retrieveFusionProgramRunning() {

        if (fusionProgram.runningProgram) {
            fusion_program_running = {
                running: true,
                user: fusionProgram.runningProgram.User
            }
        } else {
            fusion_program_running = {
                running: false,
                user: 'None'
            }
        }

        asyncCheckList++;

    }

    transmitFusionData();
    retrieveFusionData();    

    setInterval(function () {

        transmitFusionData();
        retrieveFusionData();        

    }, 30000);

};