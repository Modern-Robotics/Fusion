angular
    .module('fusionApp')
    .controller('sidebarCtrl', ['$scope', 'appFactory', 'userFactory', 'socketFactory', '$mdDialog', '$http', '$window', '$mdSidenav', '$state', function ($scope, appFactory, userFactory, socketFactory, $mdDialog, $http, $window, $mdSidenav, $state) {



        // Controller Variables =========================        

        $scope.user = userFactory.User;

        $scope.socketData = socketFactory.data;



        // Helper Methods ==============================
        
        // Change state of application
        $scope.changeState = function(state){
            
            $state.go(state);
            $scope.closeFusionMenu();
            
        }

        // Opens new tab with given path
        $scope.takeToExternal = function (path) {
            $window.open(path, '_blank');
            $scope.closeFusionMenu();
        }

        // Closes Fusion sidebar menu
        $scope.closeFusionMenu = function () {
            $mdSidenav('fusionMenu').close()
        }

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

        // Fetches and displays release notes
        $scope.showReleaseNotes = function (ev) {

            $http.get('/api/fusion/releaseNotes')
                .then(function (response) {
                
                    appFactory.showAlert(ev, response.data.version, response.data.changeLog);

                    $scope.closeFusionMenu();

                }, function (error) {

                });

        }
        
        

    }]);
