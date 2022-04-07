angular
    .module('fusionApp')
    .factory('socketFactory', ['appFactory', '$rootScope', '$state', 'userFactory', '$mdDialog', function (appFactory, $rootScope, $state, userFactory, $mdDialog) {

        var Socket = {};

        Socket.data = {

            DisconnectionEvent: null,

            BatteryLevel: null,
            VersionNumber: null,
            InternetAccess: null,
            ProgramRunning: {
                running: false,
                user: 'None'
            },
            UpdateAvailable: null,
            WifiConnection: {
                ssid: null,
                ip: null,
                mac: null
            },
            Reachable: {
                Gamepad: false,
                Diagnostic: false,
                DataLogger: false
            }
        }

        // Socket Communication Setup ============================================

        Socket.Socket = null;

        Socket.ReconnectAttemptsCounter = 0;
        Socket.MaxReconnectAttempts = 3;
        Socket.Connected = null;

        Socket.OpenSocketCommunication = function () {

            // Get correct button indexes
            var buttons = {
                header: {
                    battery: $(),
                },
                footer: {
                    battery: null,
                }
            }

            // Initializes socket
            Socket.Socket = io.connect('', {
                'transports': ['websocket'],
                'reconnectionDelay': 500,
                'randomizationFactor': 0,
                'timeout': 5000
            });

            // Sends hello to server
            Socket.Socket.on('connect', function (data) {
                Socket.Socket.emit('join', 'Hello from frusion');
                Socket.Connected = true;
            });

            Socket.Socket.on('connect_error', function(error){
                console.log(`Connection error: ${error}`);
            });

            Socket.Socket.on('connect_timeout', function(timeout){
               console.log(`Connection timeout: ${timeout}`);
            });

            Socket.Socket.on('error', function(error){
                console.log(`Socket error: ${error}`);
            });

            Socket.Socket.on('disconnect', function(reason){                
                console.log(`Disconnected: ${reason}`);
                if (reason == 'transport close') {
                    disconnectProtocol();
                }
            });

            Socket.Socket.on('reconnect', function(attemptNumber){
                Socket.ReconnectAttemptsCounter = 0;
                reconnectProtocol();
                console.log(`Reconnected after attempt: ${attemptNumber}`);
            });

            Socket.Socket.on('reconnecting', function(attemptNumber){
                Socket.ReconnectAttemptsCounter = attemptNumber;
                console.log(`Reconnecting attempt: ${attemptNumber}`);
            });

            Socket.Socket.on('reconnect_error', function(error){
                if (Socket.ReconnectAttemptsCounter == Socket.MaxReconnectAttempts) {
                    disconnectProtocol();
                }
                console.log(`Reconnection error: ${error}`);
            });

            Socket.Socket.on('reconnect_failed', function(){
                console.log('Reconnection failed');
            });

            // Socket.Socket.on('ping', function(){
            // });

            // Socket.Socket.on('pong', function(latency){
            //     console.log(`Latency: ${latency}`);
            // });

            // Listens for global messages and outputs as toasts
            Socket.Socket.on('global-message', function (data) {
                appFactory.showToast(data.message, data.type);
            });

            // Listens for battery level
            Socket.Socket.on('battery-level', function (data) {

                Socket.data.BatteryLevel = data;

                var iconOptions = ['fa-battery-empty', 'fa-battery-quarter', 'fa-battery-half', 'fa-battery-three-quarters', 'fa-battery-full'];

                // Header toolbar
                if (data > 78) {
                    $(".header-battery:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], true);
                } else if (data > 55 && data <= 78) {
                    $(".header-battery:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], true)
                        .toggleClass(iconOptions[4], false);
                } else if (data > 33 && data <= 55) {
                    $(".header-battery:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], true)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                } else if (data > 10 && data <= 33) {
                    $(".header-battery:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                } else {
                    $(".header-battery:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                }

                // Footer toolbar
                if (data > 78) {
                    $(".header-battery:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], true);
                } else if (data > 55 && data <= 78) {
                    $(".header-battery:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], true)
                        .toggleClass(iconOptions[4], false);
                } else if (data > 33 && data <= 55) {
                    $(".header-battery:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], true)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                } else if (data > 10 && data <= 33) {
                    $(".header-battery:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                } else {
                    $(".header-battery:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false)
                        .toggleClass(iconOptions[2], false)
                        .toggleClass(iconOptions[3], false)
                        .toggleClass(iconOptions[4], false);
                }

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for version number
            Socket.Socket.on('version-number', function (data) {

                Socket.data.VersionNumber = "Fusion - " + data;

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for gamepad availability
            Socket.Socket.on('gamepad-available', function (data) {

                Socket.data.Reachable.Gamepad = data;

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for diagnostic tool availability
            Socket.Socket.on('diagnostics_running', function (data) {

                Socket.data.Reachable.Diagnostic = data;

                //Forces digest when receiving data
                $rootScope.$digest();

            });
            
            // Listens for datalogger availability
            Socket.Socket.on('dataLogger_running', function (data) {

                Socket.data.Reachable.DataLogger = data;

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for internet access
            Socket.Socket.on('internet-access', function (data) {

                Socket.data.InternetAccess = data;

                var iconOptions = ['fa-exclamation-triangle', 'fa-globe'];

                // Header toolbar
                if (data) {
                    $(".header-internet:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                } else {
                    $(".header-internet:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                }

                // Footer toolbar
                if (data) {
                    $(".header-internet:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                } else {
                    $(".header-internet:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                }

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for internet access
            Socket.Socket.on('program-running', function (data) {

                if (data) {
                    Socket.data.ProgramRunning.running = true
                    Socket.data.ProgramRunning.user = data.User;
                } else {
                    Socket.data.ProgramRunning.running = false
                    Socket.data.ProgramRunning.user = 'None';
                }

                var iconOptions = ['fa-play', 'fa-stop'];

                // Header toolbar
                if (Socket.data.ProgramRunning.running) {
                    $(".header-program:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                } else {
                    $(".header-program:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                }

                // Footer toolbar
                if (Socket.data.ProgramRunning.running) {
                    $(".header-program:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                } else {
                    $(".header-program:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                }

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            // Listens for wifi connections
            Socket.Socket.on('update-available', function (data) {

                if ((Socket.data.UpdateAvailable == false) && (data == true))
                    appFactory.showToast('Update Available', 'success');

                Socket.data.UpdateAvailable = data;

                //Forces digest when receiving data
                $rootScope.$digest();
            });

            // Listens for wifi connections
            Socket.Socket.on('wifi-connection', function (data) {

                if (data.ssid) {
                    Socket.data.WifiConnection.ssid = data.ssid;
                    Socket.data.WifiConnection.ip = data.ip;
                    Socket.data.WifiConnection.bssid = data.bssid;
                } else if (!data.ip) {
                    Socket.data.WifiConnection.ssid = data.ssid;
                    Socket.data.WifiConnection.ip = 'Still retrieving IP';
                    Socket.data.WifiConnection.bssid = data.bssid;
                } else {
                    Socket.data.WifiConnection.ssid = 'No Connection';
                    Socket.data.WifiConnection.ip = 'No IP Address';
                    Socket.data.WifiConnection.bssid = 'N/A';
                }


                var iconOptions = ['fa-unlink', 'fa-wifi'];

                // Header toolbar
                if (Socket.data.WifiConnection.ssid == 'No Connection') {
                    $(".header-wifi:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                } else {
                    $(".header-wifi:eq(0)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                }

                // Footer toolbar
                if (Socket.data.WifiConnection.ssid == 'No Connection') {
                    $(".header-wifi:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], true)
                        .toggleClass(iconOptions[1], false);
                } else {
                    $(".header-wifi:eq(1)")
                        .find('[data-fa-i2svg]')
                        .toggleClass(iconOptions[0], false)
                        .toggleClass(iconOptions[1], true);
                }

                //Forces digest when receiving data
                $rootScope.$digest();

            });

            function disconnectProtocol() {

                if (Socket.Connected) {

                    userFactory.SaveStateToLocal();
                
                    appFactory.showToast('Disconnected from server.', 'error');

                    $mdDialog.show({
                        template: 
                            '<md-dialog>' +
                            '   <md-dialog-content class="md-dialog-content">' +
                            '       <h2 class="md-title">Lost connection. Attempting to to reconnect.</h2>' +
                            '           <p>Please make sure you are connected to the Fusion\'s wireless network.</p>' +
                            '       <div layout="row" layout-align="space-around">' +
                            '           <md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
                            '       </div>' +
                            '   </md-dialog-content>' +
                            '</md-dialog>',
                        parent: angular.element(document.body),
                        escapeToClose: false
                    });

                    Socket.Connected = false;

                }
                
            };

            function reconnectProtocol() {

                Socket.Connected = true;

                // Send cookie to server to see if user is still valid
                userFactory.CheckUser().then(function(response) {

                    $mdDialog.hide();
                    
                    // If not valid, send to login screen
                    if (response.status != 200) {

                        returnToLogin();
                        
                    }

                });
                
            };

            function returnToLogin() {

                userFactory.SoftLogout();

                $state.go('login');

            };

        }

        return Socket;

    }]);
