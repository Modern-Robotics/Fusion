angular
    .module('fusionApp')
    .controller('loginCtrl', ['$scope', 'userFactory', 'appFactory', function ($scope, userFactory, appFactory) {

        // View Variables =================================

        $scope.ShowPassword = false;


        // Helper Functions ===============================

        // Attempt to login the user
        $scope.login = function () {

            var data = {
                username: $scope.UserName,
                password: $scope.Password
            }

            userFactory.Login(data);

        }

        // Attempt to login as guest
        $scope.guestLogin = function () {

            var data = {
                username: 'mriguest',
                password: 'mriguest'
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
        appFactory.ChangePageTitle('- Login -');



    }]);
