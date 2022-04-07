// Dependencies
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var os = require('os');
var path = require('path');
var shell = require('shelljs');
var wpa_cli = require('wireless-tools/wpa_cli');
var iwlist = require('wireless-tools/iwlist');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');
var spawn = require('child_process').spawn;
const config = require('config');
const autonomous = require('../../models/autonomous');
const logger = require('../../utils/logger');
let nicInterface = config.get('Wifi_NIC');

const app               = require('../../express');
const User              = require('../../models/user');
const io                = require('../../socket');
const FusionSettings    = require('../../global/fusionSettings');


module.exports = function () {

    // api route for admins ====================================================
    // Create User
    app.post('/api/admin/users', authenticationMiddleware(), function (req, res) {

        User.findOne({
            'username': req.body.username
        }, async function (err, user) {
            // if there are any errors, return the error
            if (err)
                return res.status(500).send(err);

            // check to see if theres already a user with that username
            if (user) {

                return res.status(500).send("Username already taken.");

            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User(req.body);

                // set the user's local credentials
                newUser.username = req.body.username;
                newUser.password = newUser.generateHash(req.body.password); // use the generateHash function in our user model
                newUser.filepath = await newUser.generateFileSystem(newUser.username);

                // save the user
                newUser.save(function (err2) {
                    if (err2)
                        return res.status(500).send(err2);

                    return res.status(200).json({
                        serverMessage: "User created!",
                    });

                });
            }

        });

    });
    // Power Off Fusion
    app.get('/api/admin/powerOff', function (req, res) {

        res.status(200).json({
            serverMessage: 'Shut Down Commencing'
        });

        var spawn = require('child_process').spawn;

        var process = spawn('sudo', ['poweroff']);

    });
    // Restart Fusion
    app.get('/api/admin/restart', function (req, res) {

        res.status(200).send('Restart Commencing');

        var spawn = require('child_process').spawn;

        var process = spawn('sudo', ['reboot']);

    });
    // Gets Wireless Settings
    app.get('/api/admin/wirelessSettings', function (req, res) {

        var configFile;
        var splitBy = require('os').EOL;
        var dataSplitIntoLines;
        var splitData;
        var wirelessSettings = {};

        // Check if on windows (development) or linux (production)
        if (os.platform() == 'win32') {

            // On windows, since no real config file, send default
            configFile = '../../etc/config-wap/hostapd.conf__npp.sh';

            // Read default file
            fs.readFile(configFile, 'utf8', function (err, data) {

                if (err) res.status(500).send('Wifi file not found');

                // Split data into lines
                dataSplitIntoLines = data.split('\n');

                // Loop through lines looking for ssid and password
                for (var i = 0; i < dataSplitIntoLines.length; i++) {

                    // Split each line by '='
                    splitData = dataSplitIntoLines[i].split("=");

                    if (splitData[0] == 'ssid') wirelessSettings.SSID = splitData[1];
                    else if (splitData[0] == 'wpa_passphrase') wirelessSettings.Password = splitData[1];

                }

                res.status(200).json({
                    'SSID': wirelessSettings.SSID,
                    'Password': wirelessSettings.Password
                });

            });
        } else {

            // On Linux, send real hostapd file
            configFile = '/etc/hostapd/hostapd.conf';

            // Read default file
            fs.readFile(configFile, 'utf8', function (err, data) {

                if (err) res.status(500).send('Wifi file not found');

                // Split data into lines
                dataSplitIntoLines = data.split(splitBy);

                // Loop through lines looking for ssid and password
                for (var i = 0; i < dataSplitIntoLines.length; i++) {

                    // Split each line by '='
                    splitData = dataSplitIntoLines[i].split("=");

                    if (splitData[0] == 'ssid') wirelessSettings.SSID = splitData[1];
                    else if (splitData[0] == 'wpa_passphrase') wirelessSettings.Password = splitData[1];

                }

                if (!wirelessSettings.SSID) {
                    wirelessSettings.SSID = 'Not configured..';
                    wirelessSettings.Password = '';
                }

                res.status(200).json({
                    'SSID': wirelessSettings.SSID,
                    'Password': wirelessSettings.Password
                });

            });

        }

    });
    // Sets Wireless Settings
    app.post('/api/admin/wirelessSettings', function (req, res) {

        try {

            var error;
            var commands;
            var filePath = path.join('..', '..', 'etc', 'ssid_set.py');

            if ((req.body.ssid == null) && (req.body.password == null))
                commands = ['python', filePath, '-d'];
            else
                commands = ['python', filePath, '-s', req.body.ssid, '-p', req.body.password];

            //logger.info(commands);

            var spawn = require('child_process').spawn;

            python_process = spawn("sudo", commands, {
                stdio: 'pipe'
            });

            python_process.stderr.on('data', function (data) {
                logger.info(String(data));
                error = String(data);
            });

            python_process.stdout.on('close', function (data) {

                if (error)
                    return res.status(500).send(error);
                else
                    return res.status(200).json({
                        serverMessage: 'Successfully changed wifi settings'
                    });

            });

        } catch (errors) {

            logger.info(errors);
            return res.status(500).send(errors);

        }

    });
    // Get Wireless Connections
    app.get('/api/admin/wirelessConnections', function (req, res) {

        if (os.platform() == 'win32') {

            return res.status(200).send();

        } else {

            iwlist.scan(nicInterface, function (err, networks) {

                if (err)
                    return res.status(500).send('Wireless interface not found');

                else
                    return res.status(200).send({
                        serverMessage: 'Retreived wireless connections',
                        data: networks
                    });

            });

        }

    });
    // Set Wireless Connection
    app.post('/api/admin/wirelessConnections', function (req, res) {

        var WifiData = undefined;

        // Required supplicant data
        var WpaSupplicantData = 'ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n' +
            'update_config=1\n' +
            'country=US\n\n';

        var SecretNetworkData = 'network={\n' +
            '\tssid="' + req.body.ssid + '"\n' +
            '\tscan_ssid=1\n' +
            '\tpsk="' + req.body.password + '"\n' +
            '\tkey_mgmt=WPA-PSK\n' +
            '}\n\n';

        // Generated supplicant data for new wifi connection
        if (req.body.password) {
            WifiData = shell.exec('wpa_passphrase "' + req.body.ssid + '" "' + req.body.password + '"', {
                silent: true
            }).stdout;
        } else {
            WifiData = 'network={\n' +
                '    ssid="' + req.body.ssid + '"\n' +
                '    key_mgmt=NONE\n' +
                '}\n';
        }

        let supplicantText = '';
        if (req.body.hiddenNetwork)
            supplicantText = WpaSupplicantData + SecretNetworkData;
        else
            supplicantText = WpaSupplicantData + WifiData;

        // Create the new supplicant file
        fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', supplicantText, function (err) {

            if (err)
                return res.status(500).send(err);

            // Reconfigure interface with new supplicant file
            shell.exec(`sudo wpa_cli -i ${nicInterface} reconfigure`, {
                silent: true
            });

            const timeout = 15000;
            var timeInterval = 300;
            var timeTracker = 0;

            // Begins interval of checking wifi status
            var checkWifiInterval = setInterval(function () {

                // List of approved statuses - keep checking
                var connectingStatuses = ['SCANNING', '4WAY_HANDSHAKE', 'AUTHENTICATING', 'DISCONNECTED', 'ASSOCIATING'];

                // Check status
                wpa_cli.status(nicInterface, function (scanError, status) {

                    // Check for error
                    if (scanError)
                        return res.status(500).send(scanError);

                    // Check for status to complete
                    if (status.wpa_state == 'COMPLETED') {

                        // Status completed, now check for assigned ip address
                        if (status.ip) {

                            logger.info('Ip address: ' + status.ip + ' assigned');

                            // Stop interval
                            clearInterval(checkWifiInterval);

                            // Set global variable and transmit
                            FusionSettings.SocketVariables.fusion_wifi_access = status;
                            io.sockets.emit('wifi-connection', status);

                            return res.status(200).json({
                                serverMessage: 'Connected to ' + req.body.ssid + ' successfully'
                            });

                        }     
                        else if (timeTracker > timeout) {

                            logger.info('Took too long to connect. Something must be wrong.');

                            clearInterval(checkWifiInterval);

                            return res.status(500).send('Error connecting to ' + req.body.ssid);

                        }

                        timeTracker += timeInterval;

                    }
                    // Unapproved status, return error
                    else if (connectingStatuses.indexOf(status.wpa_state) == -1) {

                        // Stop interval
                        clearInterval(checkWifiInterval);

                        // Socket transmission
                        io.sockets.emit('wifi-connection', status);

                        return res.status(500).send('Error connecting to ' + req.body.ssid);

                    }

                });

            }, timeInterval);

        });

    });

    // Disconnect from network
    app.get('/api/admin/wirelessConnections/disconnect', function (req, res) {

        if (os.platform() == 'win32') {

            res.status(500).send('Disconnect not available on Windows');

        } else {

            // Required supplicant data
            var WpaSupplicantData = 'ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n' +
                'update_config=1\n' +
                'country=US\n\n';

            // Create the new supplicant file
            fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', WpaSupplicantData, function (err) {

                if (err)
                    return res.status(500).send(err);

                // Reconfigure interface with new supplicant file
                shell.exec(`sudo wpa_cli -i ${nicInterface} reconfigure`, {
                    silent: true
                });

                // Begins interval of checking wifi status
                var checkWifiInterval = setInterval(function () {

                    // List of approved statuses - keep checking
                    var disconnectingStatuses = [];

                    wpa_cli.status(nicInterface, function (scanError, status) {

                        // Check for error
                        if (scanError)
                            return res.status(500).send(scanError);

                        // Set global variable and transmit
                        FusionSettings.SocketVariables.fusion_wifi_access = status;
                        io.sockets.emit('wifi-connection', status);

                        // If complete return details
                        if (status.wpa_state == 'DISCONNECTED' || status.wpa_state == 'INACTIVE') {

                            // Stop interval
                            clearInterval(checkWifiInterval);

                            // Socket transmission
                            io.sockets.emit('wifi-connection', status);

                            return res.status(200).json({
                                serverMessage: 'Disconnected successfully'
                            });

                        }
                        // Unapproved status, return error
                        else if (connectingStatuses.indexOf(status.wpa_state) == -1) {

                            // Stop interval
                            clearInterval(checkWifiInterval);

                            // Socket transmission
                            io.sockets.emit('wifi-connection', status);

                            return res.status(500).send('Error disconnecting');

                        }

                    });

                }, 300);

            });

        }

    });

    // Get Crash Report
    app.get('/api/admin/crashReport', function (req, res) {

        var filepath = '.crash';

        fs.readdir(filepath, function (err, items) {
            if (err)
                return res.status(500).send(err);

            if (items.length > 0) {

                fs.readFile(filepath + '/' + items[0], 'utf8', function (err2, data) {

                    if (err2)
                        return status(500).send('Error reading crash file');

                    res.setHeader('Content-disposition', 'attachment; filename=' + items[0]);

                    return res.status(200).download(filepath + '/' + items[0]);

                });

            } else {
                return res.status(200).send('No crash files found');
            }

        });

    });


    var diagnostic_process = null;

    // Start diagnostic tool
    app.post('/api/diagnostics/start', function (req, res) {

        if (os.platform() != "win32") {

            // Launch diagnostic tool
            diagnostic_process = spawn('sudo', ['sh', '../../diagnostics/runRemi.sh', '../../diagnostics/diagnosticGUI.py']);

            diagnostic_process.stdout.on('data', function(data) {
            logger.info(String(data));
            });

            diagnostic_process.stderr.on('data', function(data) {
            logger.info(String(data));
            });

            var attempts = 1;
            var maxAttempts = 3;

            // Checks on interval for running process
            var checkDiagnosticInterval = setInterval(function () {

                if (attempts <= maxAttempts){

                    var processNumber = shell.exec("ps aux | grep '[s]udo python ../../diagnostics/diagnosticGUI.py' | awk '{print $2}'", {silent:true}).stdout;

                    if (processNumber){

                        clearInterval(checkDiagnosticInterval);

                        FusionSettings.SocketVariables.fusion_diagnostics_running = { process: processNumber, socket: req.body.socketId};

                        io.sockets.emit('diagnostics_running', FusionSettings.SocketVariables.fusion_diagnostics_running);

                        return res.status(200).json({
                            serverMessage: 'Diagnostic tool started successfully'
                        });

                    }
                    else{

                        attempts++;

                    }

                }
                else{

                    clearInterval(checkDiagnosticInterval);

                    return res.status(500).send('Error starting diagnostic tool');

                }

            }, 300);

        } else {

            return res.status(200).json({
                serverMessage: 'Diagnostic tool does not run on windows'
            });

        }

    });


    // Stop diagnostic tool
    app.get('/api/diagnostics/stop', function (req, res) {

        if (os.platform() != "win32") {

            // Send kill command
            shell.exec("sudo kill $(ps aux | grep '[s]udo python ../../diagnostics/diagnosticGUI.py' | awk '{print $2}')", {silent:true});


            // Check if running
            shell.exec("ps aux | grep '[s]udo python ../../diagnostics/diagnosticGUI.py' | awk '{print $2}'", { silent: true } , function (code, stdout, stderr) {
                
                (function (output) {
                    
                    var processData = output.trim();

                    // Process found - running!
                    if (processData){

                        return res.status(500).send('Unable to stop diagnostic tool');

                    }
                    // Process not found - not running
                    else{

                        FusionSettings.SocketVariables.fusion_diagnostics_running = null;

                        io.sockets.emit('diagnostics_running', FusionSettings.SocketVariables.fusion_diagnostics_running);

                        diagnostic_process = null;

                        return res.status(200).json({
                            serverMessage: 'Diagnostic tool stopped successfully'
                        });

                    }

                })(stdout.trim());

            });            

        } else {

            return res.status(200).json({
                serverMessage: 'Diagnostic tool does not run on windows'
            });

        }

    });

    app.get('/api/autonomous', async function(req, res) {
        try {
            const autonomousSettings = await autonomous.findOne().exec();
            return res.json(autonomousSettings);
        } catch (err) {
            return res.status(500).send(error.message);
        }
    });

    app.post('/api/autonomous', async function(req, res) {
        try {
            const autonomousSettings = await autonomous.findOneAndUpdate({}, req.body);
            return res.status(200).json({serverMessage: 'Updated successfully'})
        } catch (err) {
            return res.status(500).send(err.message);
        }
    });

    app.post('/api/autonomousPrograms', async function(req, res){
        try {
            const username = req.body.username;
            const type = req.body.type;
            const files = await fs.readdir(`./app/filesystem/${username}/${type}`);
            return res.status(200).json({ 'files': files});
        } catch(err) {
            return res.status(500).send(err.message);
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