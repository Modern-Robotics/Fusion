angular
    .module('fusionApp')
    .controller('loginCtrl', ['$scope', 'userFactory', 'appFactory', '$location', 'socketFactory', '$window', function ($scope, userFactory, appFactory, $location, socketFactory, $window) {

        // View Variables =================================

        $scope.ShowPassword = false;

        $scope.cloudConnect = false;
        
        $scope.socketData = socketFactory.data;


        // Helper Functions ===============================

        // Attempt to login the user
        $scope.login = function () {

            var data = {
                username: $scope.UserName,
                password: $scope.Password,
                socketId: socketFactory.Socket.id
            }            

            userFactory.Login(data);

        }

        // Attempt to login as guest
        $scope.guestLogin = function () {

            var data = {
                username: 'mriguest',
                password: 'mriguest',
                socketId: socketFactory.Socket.id
            }

            userFactory.Login(data);

        }

        // Toggle password visibility
        $scope.showPasswordToggle = function () {

            $scope.ShowPassword = !$scope.ShowPassword;

            var input = $('input')[1];

            if ($scope.ShowPassword)
                input.type = 'text';
            else
                input.type = 'password';

        }

        // Style password show button
        $scope.stylePasswordToggle = function () {
            if ($scope.ShowPassword)
                return 'fa fa-eye-slash';
            else
                return 'fa fa-eye';
        }

        // View Setup =====================================

        // Set Page Title
        appFactory.ChangePageTitle('LOGIN.TITLE');
        
       //Check for login transfer
       if ($location.search().d){
                      
            // Set Username from passed query string data
            var data = JSON.parse(atob($location.search().d));
            $scope.UserName = data.username;

            // Set focus to password input
            $window.document.getElementById('PasswordInput').focus();

       }

    }]);
