// app/shared/sidebar/sidebarCtrl.js

angular
    .module('fusionApp')
    .controller('sidebarCtrl', ['$scope', 'appFactory', 'userFactory', 'socketFactory', '$mdDialog', '$http', '$window', function ($scope, appFactory, userFactory, socketFactory, $mdDialog, $http, $window) {
        
        // Controller Variables =========================        

        $scope.user = userFactory.User;

        $scope.socketData = socketFactory.data;

        $scope.releaseNotes;
        
        
        // Button clicks ===============================
        
        // Logs Out the User
        $scope.logout = function () {
            userFactory.Logout();
            $mdDialog.hide();
        }
        
        // Turns of the fusion controller
        $scope.powerOff = function() {
            
            userFactory.Logout().then(function(response){
                
                appFactory.PowerOff();
                
            });
            
            $mdDialog.hide();
        }
        
        // Restarts the fusion controller
        $scope.restart = function() {
            
            userFactory.Logout().then(function(response){
                
                appFactory.Restart();
                
            });
            
            $mdDialog.hide();
        }
        
        // Fetches and displays release notes
        $scope.showReleaseNotes = function (ev) {

            $http.get('/api/fusion/releaseNotes')
                .then(function (response) {

                    var allReleaseNotes = response.data.data;

                    $scope.releaseNotes = response.data.data;

                    $mdDialog.show({
                        contentElement: '#releaseNotesDialog',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true
                    });

                    $scope.closeSidebar();

                }, function (error) {

                });

        }
        
        // Show power options        
        $scope.showFusionPowerOptions = function () {

            $mdDialog.show({
                contentElement: '#powerOffOptionsDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });

            $scope.closeSidebar();

        }
        
        // Opens doc page
        $scope.takeToDocs = function() {
            
            $window.open('assets/docs/fusion/', '_target');
            $scope.closeSidebar();            
            
        }
        
        // Opens about page
        $scope.takeToAbout = function() {
            
            $window.open('assets/docs/fusion/About/', '_target');
            $scope.closeSidebar();            
            
        }
        
        
        // Helper Methods ==============================        

        // Displays username in account section
        $scope.displayUserName = function () {

            var UserName = $scope.user.username;

            if (UserName)
                return UserName;
            else
                return 'No User';

        }

        // Checks if user is logged in
        $scope.userLoggedIn = function () {

            var userLoggedIn = null;

            if ($scope.user.username)
                userLoggedIn = true;
            else
                userLoggedIn = false;

            return userLoggedIn;

        }

        // Closes the fusion sidebar        
        $scope.closeSidebar = function () {
            document.getElementById("fusionSidebar").style.display = "none";
            document.getElementById("fusionOverlay").style.display = "none";

        }

    }]);
