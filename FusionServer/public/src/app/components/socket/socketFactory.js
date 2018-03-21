angular
    .module('fusionApp')
    .factory('socketFactory', [ 'appFactory', '$rootScope', '$state', 'userFactory', '$mdDialog', function (appFactory, $rootScope, $state, userFactory, $mdDialog) {

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
            }

        }

        // Socket Communication Setup ============================================

        Socket.Socket = null;

        Socket.OpenSocketCommunication = function () {

            // Initializes socket
            Socket.Socket = io.connect('', {
                'reconnection': true,
                'reconnectionDelay': 1000,
                'transports': ['websocket']
            });

            // Sends hello to server
            Socket.Socket.on('connect', function (data) {
                Socket.Socket.emit('join', 'Hello World from client');
            });

            Socket.Socket.on('reconnect', function (number) {

                $mdDialog.hide();

                var nullUser = {
                    username: null,
                    firstname: null,
                    lastname: null,
                    language: null,
                    email: null,
                    defaultprogramminglanguage: null,
                    filepath: null,
                    usergroup: null,

                    workingEditorFiles: [],
                    blocklyProgram: {
                        name: null,
                        xml: null
                    }
                }

                userFactory.ChangeUser(nullUser);

                $state.go('login');

            });

            Socket.Socket.on('disconnect', function (reason) {

                appFactory.showToast('Disconnected from server.', 'error');

                $mdDialog.show({
                    template: '<md-dialog>' +
                        '   <md-dialog-content class="md-dialog-content">' +
                        '       <h3>Server down. Attempting to to reconnect.</h3>' +
                        '           <p>Please make sure you are connected to the Fusion\'s wireless network.</p>' +
                        '       <div layout="row" layout-sm="column" layout-align="space-around">' +
                        '           <md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
                        '       </div>' +
                        '   </md-dialog-content>' +
                        '</md-dialog>',
                    parent: angular.element(document.body),
                    escapeToClose: false
                });

            });

            // Listens for global messages and outputs as toasts
            Socket.Socket.on('global-message', function (data) {
                appFactory.showToast(data.message, data.type);
            });

            // Listens for battery level
            Socket.Socket.on('battery-level', function (data) {
                Socket.data.BatteryLevel = data;

                //Forces digest when receiving data
                $rootScope.$digest();
            });

            // Listens for version number
            Socket.Socket.on('version-number', function (data) {
                Socket.data.VersionNumber = "Fusion - " + data;

                //Forces digest when receiving data
                $rootScope.$digest();
            });

            // Listens for internet access
            Socket.Socket.on('internet-access', function (data) {
                Socket.data.InternetAccess = data;

                //Forces digest when receiving data
                $rootScope.$digest();
            });

            // Listens for internet access
            Socket.Socket.on('program-running', function (data) {
                Socket.data.ProgramRunning.running = data.running;
                Socket.data.ProgramRunning.user = data.user;

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
                
                Socket.data.WifiConnection.ssid = data.ssid;
                Socket.data.WifiConnection.ip = data.ip;

                //Forces digest when receiving data
                $rootScope.$digest();
            });

        }

        return Socket;

    }]);
