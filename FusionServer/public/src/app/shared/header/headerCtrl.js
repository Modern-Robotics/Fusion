// app/shared/header/headerCtrl.js

angular
    .module('fusionApp')
    .controller('headerCtrl', ['$scope', 'appFactory', 'socketFactory', 'userFactory', '$location', function ($scope, appFactory, socketFactory, userFactory, $location) {

        // Header Variables ==========================================

        // Gets User
        $scope.user = userFactory.User;

        // Socket data
        var socketData = socketFactory.data;


        //Get Page Title from appFactory
        $scope.appData = appFactory.data;


        // Header symbols =============================================

        // Wifi Connected symbol
        $scope.getBatteryLevelClass = function () {

            if (socketData.BatteryLevel > 78)
                return 'fa-battery-full';
            else if (socketData.BatteryLevel > 55 && socketData.BatteryLevel <= 78)
                return 'fa-battery-three-quarters';
            else if (socketData.BatteryLevel > 33 && socketData.BatteryLevel <= 55)
                return 'fa-battery-half';
            else if (socketData.BatteryLevel > 10 && socketData.BatteryLevel <= 33)
                return 'fa-battery-quarter';
            else
                return 'fa-battery-empty';

        }

        // Internet Access Symbol
        $scope.getInternetAccessClass = function () {

            if (!socketFactory.data.InternetAccess)
                return 'fa-exclamation-triangle';
            else
                return 'fa-globe';

        }

        // Program running symbol
        $scope.getProgramRunningClass = function () {

            if (!socketFactory.data.ProgramRunning.running == true)
                return 'fa-stop';
            else
                return 'fa-play';

        }

        // Wifi Connected symbol
        $scope.getWifiConnectedClass = function () {

            if (socketFactory.data.WifiConnection.ssid == 'No Connection')
                return 'fa-chain-broken';
            else
                return 'fa-wifi';

        }


        // Header symbols click =======================================

        // Opens side navigation bar
        $scope.openSidebar = function () {

            document.getElementById("fusionSidebar").style.display = "block";
            document.getElementById("fusionOverlay").style.display = "block";

        }

        // Shows Wifi connection details
        $scope.showWifiDetails = function (ev) {

            var title = "Wireless Details"

            var content = "Connection: " + socketFactory.data.WifiConnection.ssid;
            content += "<br>";
            content += "IP: " + socketFactory.data.WifiConnection.ip;

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

        // Show battery details
        $scope.showBatteryDetails = function (ev) {

            var title = "Battery Details"
            var content;
            
            if (socketFactory.data.BatteryLevel == -1){
                
                content = "Battery Level: No Battery Connected";
                
            }
            else{
                
                content = "Battery Level: " + socketFactory.data.BatteryLevel + " %";
                
            }

            appFactory.showAlert(ev, title, content);

        }


        // Helper Methods =============================================
        $scope.userLoggedIn = function () {

            var userLoggedIn = null;

            if ($scope.user.username)
                userLoggedIn = true;
            else
                userLoggedIn = false;

            return userLoggedIn;

        }
        
        $scope.showLoginHeaderButton = function(){
            
            var show = false;
            
            if (($location.path() == '/Home') && ($scope.userLoggedIn() == false)){
            
                show = true;
                
            }
            
            return show;
            
        }

    }]);
