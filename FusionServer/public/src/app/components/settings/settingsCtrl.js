angular
    .module('fusionApp')
    .controller('settingsCtrl', [ '$scope', 'appFactory', 'socketFactory', 'userFactory', '$mdDialog', 'settingsFactory', '$state', function ($scope, appFactory, socketFactory, userFactory, $mdDialog, settingsFactory, $state) {

        // View Variables ====================================

        $scope.DisableWirelessSettingChange = true;
        $scope.ShowPasswordToConnect = false;

        // Holds Wireless Settings
        $scope.wirelessSettings = {}

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
        $scope.allowUpdate = function(){
            
            if (socketFactory.data.UpdateAvailable && socketFactory.data.InternetAccess)
                return false;
            else
                return true;
            
        }
        
        // Make restore button clickable
        $scope.allowRestore = function() {
            return true;
        }


        // View Methods ======================================

        // Changes wifi settings
        $scope.changeWifiSettings = function () {

            //Settings input fields
            var wifiName = $scope.wirelessSettings.SSID;
            var wifiPassword = $scope.wirelessSettings.Password;

            if (wifiPassword.length < 8) {

                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error')
                    .content('Password must be atleast 8 characters')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok!')
                );

            } else {

                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Alert')
                    .content('Remember to connect to the new network to continue using this interface.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok!')
                );

                var data = {
                    ssid: wifiName,
                    password: wifiPassword
                }

                //Pass input fields to setSpartanPiSettings method
                settingsFactory.SetWifiSettings(data).then(function () {

                    settingsFactory.GetWifiSettings().then(function (data) {

                        $scope.wirelessSettings.SSID = data.SSID;
                        $scope.wirelessSettings.Password = data.Password;

                        $scope.DisableWirelessSettingChange = true;

                    });

                });

            }

        }

        $scope.restoreWifiSettings = function () {

            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Alert')
                .content('Remember to connect to the new network to continue using this interface.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
            );

            var data = {
                ssid: null,
                password: null
            }

            //Pass input fields to setSpartanPiSettings method
            settingsFactory.SetWifiSettings(data).then(function () {

                settingsFactory.GetWifiSettings().then(function (data) {

                    $scope.wirelessSettings.SSID = data.SSID;
                    $scope.wirelessSettings.Password = data.Password;

                    $scope.DisableWirelessSettingChange = true;

                });

            });

        }


        $scope.wirelessSettingChange = function () {
            $scope.DisableWirelessSettingChange = false;
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

            });

        }

        // Fetches Wirless Connections
        $scope.refreshWirelessConnections = function () {

            settingsFactory.GetWirelessConnections().then(function (data) {

                $scope.availableWifiConnections = data;

            });

        }

        // Connects to the desired connection
        $scope.connectToNetwork = function (connection) {

            if (connection.security != 'open') {
                
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

                settingsFactory.SetWirelessConnection(data);

            }

        }
        
        $scope.connectToNetworkPassword = function(){
            
            var data = {
                ssid: $scope.SelectedWirelessConnectionSSID,
                password: $scope.SelectedWirelessConnectionPassword,
            }
            
            $scope.closeDialog();

            settingsFactory.SetWirelessConnection(data).then(function(response){
                $scope.SelectedWirelessConnectionSSID = null;
                $scope.SelectedWirelessConnectionPassword = null;
            });
            
        }
        
        $scope.togglePasswordShowing = function(){
            
            $scope.ShowPasswordToConnect = !$scope.ShowPasswordToConnect;

            var input = $('#selectedWirelessConnectionPasswordInput')[0];

            if ($scope.ShowPasswordToConnect)
                input.type = 'text';
            else
                input.type = 'password';
            
            
            
            
            
        }
        
        $scope.closeDialog = function(){
            $mdDialog.hide();
        }

        // Disables unneeded fields
        $scope.disableField = function () {
            return true;
        }

        // Fetches user data for editing
        $scope.readyForEdit = function (username) {

            userFactory.Get(username).then(function (data) {

                $scope.editData = data;

            });

        }

        // Creates a new user - Administrator
        $scope.createUser = function () {

            if (!$scope.newUser) appFactory.showToast('Must fill in new user data', 'error');
            else if (!$scope.newUser.UserName) appFactory.showToast('Must fill Username', 'error');
            else if (!$scope.newUser.Password) appFactory.showToast('Must fill Passord', 'error');
            else if ($scope.newUser.Password != $scope.newUser.Password2) appFactory.showToast('Passwords do not match', 'error');
            else if (!$scope.newUser.UserGroup) appFactory.showToast('Must fill User Group', 'error');
            else if (!$scope.newUser.SecurityQuestion) appFactory.showToast('Must fill Security Question', 'error');
            else if (!$scope.newUser.SecurityAnswer) appFactory.showToast('Must fill Security Answer', 'error');
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

                    $scope.refreshUserGrid();

                });

            }

        }

        // Edits a user - Administrator
        $scope.userEdit = function () {

            var data = {};

            if ($scope.NewPassword1 != $scope.NewPassword2)
                appFactory.showToast('Passwords do not match', 'error');
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

                    $('#editUserModal').modal('hide');

                    $scope.refreshUserGrid();

                });

            }

        }

        // Deletes a user - Administrator
        $scope.userDelete = function (ev, username) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete: ' + username + ' ?')
                .targetEvent(ev)
                .ok('Okay!')
                .clickOutsideToClose(true)
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {

                settingsFactory.DeleteUser(username).then(function (response) {

                    if (userFactory.User.username == username)
                        $state.go('login');
                    else                    
                        $scope.refreshUserGrid();

                });

            }, function () {
                //Action Canceled
            });

        }

        // Launches Fusion Update
        $scope.updateFusion = function () {

            appFactory.updateFusion().then(function (data) {

            });

        }

        // Resets Fusion
        $scope.restoreFusion = function () {

            appFactory.restoreFusion().then(function (data) {

            });

        }

        // Fixes links to wireless connection names
        $scope.fixWirelessLinks = function (connection) {

            var modified = connection.ssid.replace(/ /g, "_");
            modified = modified.replace(/,/g, "_");
            modified = modified.replace(/\./g, "_");

            return modified;

        }

        // Styles used wireless connection
        $scope.styleUsedConnection = function (connection) {

            //if (connection.Connected)
            return 'w3-green';
            //else
            //return '';

        }

        // Selects icon for open connection
        $scope.styleOpenConnection = function (connection) {

            if (connection.security != 'open')
                return 'fa-key';
            else
                return 'fa-unlock';

        }


        // Prep View =========================================

        // Set Page Title
        appFactory.ChangePageTitle('- Settings -');

        // Populate Wireless Settings
        $scope.refreshWirelessSettings();

        // Populate Wireless Connections
        $scope.refreshWirelessConnections();

        // Populate User Grid
        $scope.refreshUserGrid();

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
