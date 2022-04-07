angular
    .module('fusionApp')
    .controller('footerCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'appFactory', 'userFactory', '$location', 'socketFactory', '$state', '$translate', function ($scope, $mdSidenav, $mdDialog, appFactory, userFactory, $location, socketFactory, $state, $translate) {



        // Controller Variables =======================================

        // Gets User
        $scope.user = userFactory.User;

        // Socket data
        var socketData = socketFactory.data;


        //Get Page Title from appFactory
        $scope.appData = appFactory.data;

        // Language
        $scope.selectedLanguage = function() {
            return $translate.use();
        }


        // Footer symbols click =======================================

        // Opens Fusion sidebar menu
        $scope.openFusionMenu = function () {
            $mdSidenav('fusionMenu').toggle();
        }

        // Navigate to home
        $scope.navigateHome = function () {

            $state.go('home');

        }

        // Show battery details
        $scope.showBatteryDetails = function (ev) {

            var title = "Battery Details"
            var content;

            if (socketFactory.data.BatteryLevel == -1 || socketFactory.data.BatteryLevel == "") {

                content = "Battery Level: No Battery Connected";

            } else {

                content = "Battery Level: " + socketFactory.data.BatteryLevel + " %";

            }

            appFactory.showAlert(ev, title, content);

        }

        // Shows Internet connection details
        $scope.showInternetDetails = function (ev) {

            var text = '';

            if (socketFactory.data.InternetAccess)
                text = 'Available';
            else
                text = 'Not Available';

            var title = "Internet Details"

            var content = "Access: " + text;

            appFactory.showAlert(ev, title, content);

        }

        // Shows Wifi connection details
        $scope.showWifiDetails = function (ev) {

            var title = "Wireless Details"

            var content = "Connection: " + socketFactory.data.WifiConnection.ssid;
            content += "<br>";
            content += "IP: " + socketFactory.data.WifiConnection.ip;

            appFactory.showAlert(ev, title, content);

        }

        // Shows running program details
        $scope.showProgramDetails = function (ev) {

            if (socketFactory.data.ProgramRunning.running == undefined)
                socketFactory.data.ProgramRunning.running = false;

            if (socketFactory.data.ProgramRunning.user == undefined)
                socketFactory.data.ProgramRunning.user = 'None';

            var title = "Program Details"

            var content = "Program Running: " + socketFactory.data.ProgramRunning.running;
            content += '<br>';
            content += 'User: ' + socketFactory.data.ProgramRunning.user;

            appFactory.showAlert(ev, title, content);

        }

        // Opens power options
        $scope.openPowerMenu = function ($mdOpenMenu, ev) {
            var originatorEv = ev;
            $mdOpenMenu(ev);
        }

        // Opens language options
        $scope.openLanguageMenu = function ($mdOpenMenu, ev) {
            var originatorEv = ev;
            $mdOpenMenu(ev);
        };


        // Power off menu actions =====================================

        // Poweroff
        $scope.powerOff = function () {
            
            var data = {
                socketId: socketFactory.Socket.id
            }
            
            userFactory.Logout(data).then(function (response) {
                appFactory.PowerOff();
            });
        }

        // Restart function
        $scope.restart = function () {
            
            var data = {
                socketId: socketFactory.Socket.id
            }
            
            userFactory.Logout(data).then(function (response) {
                appFactory.Restart();
            });
        }

        // Poweroff
        $scope.logout = function () {

            var data = {
                socketId: socketFactory.Socket.id
            }

            userFactory.Logout(data);
        }



        // Helper Methods =============================================

        // Returns if user is logged in
        $scope.userLoggedIn = function () {

            var userLoggedIn = null;

            if ($scope.user.username)
                userLoggedIn = true;
            else
                userLoggedIn = false;

            return userLoggedIn;

        }




    }]);
