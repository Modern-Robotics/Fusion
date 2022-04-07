angular
    .module('fusionApp')
    .controller('settingsCtrl', ['$scope', 'appFactory', 'socketFactory', 'userFactory', '$mdDialog', 'settingsFactory', '$state', '$translate', function ($scope, appFactory, socketFactory, userFactory, $mdDialog, settingsFactory, $state, $translate) {

        // View Variables ====================================        

        $scope.ShowPasswordToConnect = false;

        // Holds Wireless Settings
        $scope.wirelessSettings = {}
        $scope.displayedWirelessSettings = {}

        // Holds data for a new user
        $scope.newUser;

        // Holds data for user to edit
        $scope.editData;

        // Holds available languages
        $scope.languages = userFactory.languages;

        // Holds available user groups
        $scope.userGroups = userFactory.userGroups;

        // Holds available security questions
        $scope.securityQuestions = userFactory.securityQuestions;

        // Holds users for the grid
        $scope.fusionUserList;

        // Holds available wifi connections
        $scope.availableWifiConnections = [];

        // Makes update button clickable when update available
        $scope.allowUpdate = function () {

            if (socketFactory.data.UpdateAvailable && socketFactory.data.InternetAccess)
                return false;
            else
                return true;

        }

        // Make restore button clickable
        $scope.allowRestore = function () {
            return true;
        }


        // View Methods ======================================

        // Changes wifi settings
        $scope.changeWifiSettings = function () {

            //Settings input fields
            var wifiName = $scope.displayedWirelessSettings.SSID;
            var wifiPassword = $scope.displayedWirelessSettings.Password;

            if (wifiPassword.length < 8) {

                appFactory.showAlert(
                    '', 
                    $translate.instant('SETTINGS.WIFI_PASSWORD_ERROR.TITLE'), 
                    $translate.instant('SETTINGS.WIFI_PASSWORD_ERROR.MESSAGE')
                );

            } else if (wifiName.length < 8) {

                appFactory.showAlert(
                    '', 
                    $translate.instant('SETTINGS.SSID_error.TITLE'), 
                    $translate.instant('SETTINGS.SSID_error.MESSAGE')
                );

            } else {

                appFactory.showOkCancel({
                    title: $translate.instant('SETTINGS.SSID_CONFIRMATION.TITLE'),
                    content: $translate.instant('SETTINGS.SSID_CONFIRMATION.CONTENT')
                }).then(function (answer) {

                    // Action accepted
                    var data = {
                        ssid: wifiName,
                        password: wifiPassword
                    }

                    //Pass input fields to SetWifiSettings method
                    settingsFactory.SetWifiSettings(data).then(function () {

                        $scope.refreshWirelessSettings();

                    });

                }, function () {

                    // Action canceled

                });

            }
        }

        $scope.restoreWifiSettings = function () {

            appFactory.showOkCancel({
                title: $translate.instant('SETTINGS.SSID_RESTORE_CONFIRMATION.TITLE'),
                content: $translate.instant('SETTINGS.SSID_RESTORE_CONFIRMATION.CONTENT')
            }).then(function (answer) {

                // Action accepted
                var data = {
                    ssid: null,
                    password: null
                }

                //Pass input fields to SetWifiSettings method
                settingsFactory.SetWifiSettings(data).then(function () {

                    $scope.refreshWirelessSettings();

                });

            }, function () {

                // Action canceled

            });

        }

        // Fetches users and fills fusionUserList variable
        $scope.refreshUserGrid = function () {

            userFactory.GetAll().then(function (data) {
                $scope.fusionUserList = data;
            });

        }

        // Fetches Wireless Settings data
        $scope.refreshWirelessSettings = function () {

            settingsFactory.GetWifiSettings().then(function (data) {

                $scope.wirelessSettings.SSID = data.SSID;
                $scope.wirelessSettings.Password = data.Password;

                $scope.displayedWirelessSettings.SSID = data.SSID;
                $scope.displayedWirelessSettings.Password = data.Password;

            });

        }

        // Fetches Wirless Connections
        $scope.refreshWirelessConnections = function () {

            settingsFactory.GetWirelessConnections().then(function (data) {

                if (data) {

                    for (var i = data.length - 1; i >= 0; i--) {

                        if (data[i].ssid == $scope.wirelessSettings.SSID) {
                            data.splice(data.indexOf(data[i]), 1);
                        } else if (data[i].ssid == socketFactory.data.WifiConnection.ssid && data[i].address == socketFactory.data.WifiConnection.bssid) {
                            data[i].Connected = true;
                        }

                    }

                    $scope.availableWifiConnections = data;

                }

            });

        }

        // Only allows apply changes when there was a user change
        $scope.DisableWirelessSettingChange = function () {

            if (($scope.wirelessSettings.SSID == $scope.displayedWirelessSettings.SSID) &&
                $scope.wirelessSettings.Password == $scope.displayedWirelessSettings.Password)
                return true;
            else
                return false;

        };

        // Connects to the desired connection
        $scope.connectToNetwork = function (connection) {

            if (connection.Connected) {

                appFactory.showOkCancel({
                    title: $translate.instant('SETTINGS.DISCONNECT_FROM_NETWORK.TITLE'),
                    warning: true
                }).then(function (answer) {

                    // Action accepted

                    settingsFactory.DisconnectWirelessConnection().then(function (response) {

                        $scope.refreshWirelessConnections();

                    });


                }, function () {

                    // Action canceled

                });

            } else if (connection.security != 'open') {

                $scope.SelectedWirelessConnectionSSID = connection.ssid;

                $mdDialog.show({
                    contentElement: '#settingsConnectNetworkDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

            } else {

                var data = {
                    ssid: connection.ssid,
                    password: null
                }

                settingsFactory.SetWirelessConnection(data).then(function (response) {

                    $scope.refreshWirelessConnections();

                });

            }

        }

        $scope.connectToNetworkPassword = function () {

            var data = {
                ssid: $scope.SelectedWirelessConnectionSSID,
                password: $scope.SelectedWirelessConnectionPassword,
            }

            $scope.closeDialog();

            settingsFactory.SetWirelessConnection(data).then(function (response) {
                $scope.SelectedWirelessConnectionSSID = null;
                $scope.SelectedWirelessConnectionPassword = null;

                $scope.refreshWirelessConnections();

            });

        }

        $scope.togglePasswordShowing = function () {

            $scope.ShowPasswordToConnect = !$scope.ShowPasswordToConnect;

            var input = $('#selectedWirelessConnectionPasswordInput')[0];

            if ($scope.ShowPasswordToConnect)
                input.type = 'text';
            else
                input.type = 'password';

        }

        $scope.closeDialog = function () {
            $mdDialog.hide();
        }

        $scope.cancelDialog = function () {
            $mdDialog.cancel();
        };

        // Disables unneeded fields
        $scope.disableField = function () {
            return true;
        }

        // Fetches user data for editing
        $scope.readyForEdit = function (username) {

            userFactory.Get(username).then(function (data) {

                $mdDialog.show({
                    contentElement: '#fusion-edit-user-dialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

                $scope.editData = data;

            });

        }

        // Opens dialog to create user
        $scope.openCreateUserDialog = function () {

            $mdDialog.show({
                contentElement: '#fusion-create-user-dialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });

        }

        // Creates a new user - Administrator
        $scope.createUser = function () {

            if (!$scope.newUser) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_USER'), 'error');
            else if (!$scope.newUser.UserName) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_USERNAME'), 'error');
            else if (!$scope.newUser.Password) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_PASSWORD'), 'error');
            else if ($scope.newUser.Password != $scope.newUser.Password2) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.PASSWORD_MISMATCH'), 'error');
            else if (!$scope.newUser.UserGroup) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_GROUP'), 'error');
            else if (!$scope.newUser.SecurityQuestion) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_SECURITY_QUESTION'), 'error');
            else if (!$scope.newUser.SecurityAnswer) appFactory.showToast($translate.instant('SETTINGS.CREATE_NEW_USER.MISSING_SECURITY_ANSWER'), 'error');
            else {

                var data = {
                    username: $scope.newUser.UserName,
                    password: $scope.newUser.Password,
                    usergroup: $scope.newUser.UserGroup,
                    securityquestion: $scope.newUser.SecurityQuestion,
                    securityanswer: $scope.newUser.SecurityAnswer
                };

                if ($scope.newUser.Email) data.email = $scope.newUser.Email;
                if ($scope.newUser.FirstName) data.firstname = $scope.newUser.FirstName;
                if ($scope.newUser.LastName) data.lastname = $scope.newUser.LastName;
                if ($scope.newUser.Language) data.language = $scope.newUser.Language;

                settingsFactory.CreateUser(data).then(function (response) {

                    if (response) {

                        var userData = {
                            UserName: response.UserName,
                            Password: response.Password,
                            UserGroup: response.UserGroup,
                            SecurityQuestion: response.SecurityQuestion,
                            SecurityAnswer: response.SecurityAnswer
                        }

                        $scope.newUser = userData;

                        if (response.email) $scope.newUser.Email = response.Email;
                        if (response.firstname) $scope.newUser.FirstName = response.FirstName;
                        if (response.lastname) $scope.newUser.LastName = response.LastName;
                        if (response.language) $scope.newUser.Language = response.Language;

                    } else
                        $scope.newUser = null;

                    $scope.closeDialog();

                    $scope.refreshUserGrid();

                });

            }

        }

        // Edits a user - Administrator
        $scope.userEdit = function () {

            var data = {};

            if ($scope.NewPassword1 != $scope.NewPassword2)
                appFactory.showToast($translate.instant('ACCOUNT.MESSAGES.MISMATCHED_PASSWORDS'), 'error');
            else {

                if ($scope.editData.username) data.username = $scope.editData.username;
                if ($scope.editData.email) data.email = $scope.editData.email;
                if ($scope.editData.firstname) data.firstname = $scope.editData.firstname;
                if ($scope.editData.lastname) data.lastname = $scope.editData.lastname;
                if ($scope.editData.language) data.language = $scope.editData.language;
                if ($scope.editData.usergroup) data.usergroup = $scope.editData.usergroup;
                if ($scope.NewPassword1) data.password = $scope.NewPassword1;
                if ($scope.NewSecurityQuestion) data.securityquestion = $scope.NewSecurityQuestion;
                if ($scope.NewSecurityAnswer) data.securityanswer = $scope.NewSecurityAnswer;

                userFactory.Update($scope.editData.username, data).then(function (response) {

                    $scope.NewPassword1 = null;
                    $scope.NewPassword2 = null;
                    $scope.NewSecurityQuestion = null;
                    $scope.NewSecurityAnswer = null;

                    $scope.closeDialog();

                    $scope.refreshUserGrid();

                });

            }

        }

        // Deletes a user - Administrator
        $scope.userDelete = function (ev, username) {

            appFactory.showOkCancel({
                title: $translate.instant('SETTINGS.DELETE_USER.TITLE') + ' ' + username,
                warning: true
            }).then(function (answer) {

                // Action accepted
                settingsFactory.DeleteUser(username).then(function (response) {

                    if (userFactory.User.username == username){
                        userFactory.SoftLogout();
                        $state.go('login');
                    }
                    else
                        $scope.refreshUserGrid();

                });

            }, function () {

                // Action canceled

            });

        }

        // Launches Fusion Update
        $scope.updateFusion = function () {

            appFactory.showOkCancel({
                title: $translate.instant('SETTINGS.UPDATE_FUSION.TITLE'),
                content: $translate.instant('SETTINGS.UPDATE_FUSION.CONTENT')
            }).then(function (answer) {

                // Action accepted
                appFactory.updateFusion().then(function (data) {

                });

            }, function () {

                // Action canceled

            });

        }

        // Resets Fusion
        $scope.restoreFusion = function () {

            appFactory.restoreFusion().then(function (data) {

            });

        }

        // Gets available user programs
        $scope.getAvailableUserPrograms = function(){
            settingsFactory.getAvailableAutonomousPrograms($scope.autonomousUser, $scope.autonomousType).then(function(data){
                $scope.autonomousAvailablePrograms = data;
            });
        };

        // Gets autonomus settings
        $scope.getAutonomousSettings = function(){
            settingsFactory.getAutonomousProgram().then(function(data){
                
                $scope.autonomousActive = data.active;
                $scope.autonomousUser = data.user;
                $scope.autonomousType =  data.type;

                if (data.program) {
                    $scope.autonomousAvailablePrograms = [data.program];
                }
                $scope.autonomousProgram =  data.program;
                
            });
        };   

        // Sets autonomous program
        $scope.setAutonomousProgram = function() {
            settingsFactory.setAutonomousProgram($scope.autonomousActive, $scope.autonomousUser, $scope.autonomousType, $scope.autonomousProgram);
        };

        // Sets autonomous program
        $scope.defaultAutonomousProgram = function() {
            $scope.autonomousActive = false;
            $scope.autonomousUser = null;
            $scope.autonomousType = null;
            $scope.autonomousProgram = null;
            $scope.setAutonomousProgram();
        };

        // Styles used wireless connection
        $scope.styleUsedConnection = function (connection) {

            if (connection.Connected)
                return 'fusion-settings-connected-wireless-connection';
            else
                return '';

        }

        // Selects icon for open connection
        $scope.styleOpenConnection = function (connection) {

            if (connection.security != 'open')
                return 'fa-key';
            else
                return 'fa-lock-open';

        }


        // Prep View =========================================

        // Set Page Title
        appFactory.ChangePageTitle('SETTINGS.TITLE');

        // Populate Wireless Settings
        $scope.refreshWirelessSettings();

        // Populate Wireless Connections
        $scope.refreshWirelessConnections();

        // Populate User Grid
        $scope.refreshUserGrid();

        // Get autonomous settings
        $scope.getAutonomousSettings();

        // Socket Communication for console =========================        
        socketFactory.Socket.on('update-output', function (msg) {

            var console = document.getElementById("update-console");
            var incomingText = msg.output;

            if (!incomingText.includes("Update Finished!")) {

                var incomingText = msg.output;

                //Only keeps the last 500 characters displayed to avoid lag over time
                //                $scope.updateConsole = $scope.updateConsole.slice(-(500 - incomingText.length)) + incomingText;
                $scope.updateConsole += incomingText;
                $scope.$apply();

                //Scrolls output textbox down automattically
                console.scrollTop = console.scrollHeight

            } else {

                var incomingText = msg.output;

                $scope.updateConsole += incomingText;
                $scope.$apply();

            }

        });


    }]);
