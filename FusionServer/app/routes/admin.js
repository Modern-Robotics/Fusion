// Dependencies
var fs = require('fs');
var mkdirp = require('mkdirp');
var os = require('os');
var path = require('path');


var wifi = require('node-wifi');

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null 
});



var iwlist = require('wireless-tools/iwlist');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');


module.exports = function (app, User, passport) {

    // api route for admins ====================================================
    // Create User
    app.post('/api/admin/users', authenticationMiddleware(), function (req, res) {

        User.findOne({
            'username': req.body.username
        }, function (err, user) {
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
                newUser.filepath = newUser.generateFileSystem(newUser.username);

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
            configFile = './../etc/hostapd.conf';

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

            // On Linux, since no real config file, send default
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
            var filePath = path.join('..', 'etc', 'ssid_set.py');

            if ((req.body.ssid == null) && (req.body.password == null))
                commands = ['python', filePath, '-d'];
            else
                commands = ['python', filePath, '-s', req.body.ssid, '-p', req.body.password];

            console.log(commands);

            var spawn = require('child_process').spawn;

            python_process = spawn("sudo", commands, {
                stdio: 'pipe'
            });

            python_process.stderr.on('data', function (data) {
                console.log(String(data));
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

            console.log(errors);
            return res.status(500).send(errors);

        }

    });
    // Get Wireless Connections
    app.get('/api/admin/wirelessConnections', function (req, res) {

        if (os.platform() == 'win32') {

            return res.status(200).send();

        } else {

            iwlist.scan('wlan1', function (err, networks) {

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

        try {

            var error;
            var filePath = path.join('..', 'etc', 'wlanConnect.py');
            var commands = ['python', filePath, '-c', '-n', '"' + req.body.ssid + '"'];

            if (req.body.password) {
                commands.push('-p');
                commands.push('"' + req.body.password + '"');
            }

            var spawn = require('child_process').spawn;

            python_process = spawn("sudo", commands, {
                stdio: 'pipe'
            });

            python_process.stderr.on('data', function (data) {
                console.log(String(data));
                error = String(data);
            });

            python_process.stdout.on('close', function (data) {

                if (error)
                    return res.status(500).send(error);
                else
                    return res.status(200).json({
                        serverMessage: 'Connected to ' + req.body.ssid + ' successfully'
                    });

            });

        } catch (errors) {
            console.log(errors);
            return res.status(500).send(errors);
        }

    });
    // Disconnect from network
    app.get('/api/admin/wirelessConnections/disconnect', function (req, res) {

        if (os.platform() == 'win32') {

            res.status(500).send('Disconnect not available on Windows');

        } else {

            wifi.disconnect(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).json({
                    serverMessage: 'Disconnected'
                });
            });

        }

    });

    // Get Crash Report
    app.get('/api/admin/crashReport', function(req, res){

        var filepath = '.crash';

        fs.readdir(filepath, function (err, items) {
            if (err)
                return res.status(500).send(err);

            if (items.length > 0){

                fs.readFile(filepath + '/' + items[0], 'utf8', function (err2, data) {

                    if (err2)
                        return status(500).send('Error reading crash file');
                    
                    res.setHeader('Content-disposition', 'attachment; filename=' + items[0]);

                    return res.status(200).download(filepath + '/' + items[0]);

                });

            }
            else{
                return res.status(200).send('No crash files found');
            }

        });

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

};