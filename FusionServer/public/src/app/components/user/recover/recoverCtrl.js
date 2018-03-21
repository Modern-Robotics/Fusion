// app/components/user/recover/recoverCtrl.js

angular
    .module('fusionApp')
    .controller('recoverCtrl', ['$scope', 'userFactory', 'appFactory', '$mdDialog', function ($scope, userFactory, appFactory, $mdDialog) {

        // Page Variables =================================

        $scope.SecurityQuestion;
        $scope.SecurityAnswer;
        $scope.SecurityUsername;


        // Set Page Title
        appFactory.ChangePageTitle('- Recover Account -');


        // Helper Methods =================================

        $scope.getUserSecurityQuestion = function () {

            userFactory.GetSecurityQuestion($scope.SecurityUsername).then(function (response) {

                $scope.SecurityQuestion = response;

                var confirm = $mdDialog.prompt()
                    .title($scope.SecurityQuestion)
                    .ok('Okay!')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function (result) {

                    $scope.SecurityAnswer = result;

                    $scope.validateUserSecurityAnswer();

                }, function () {
                    //Action Canceled
                });

            });

        }

        $scope.validateUserSecurityAnswer = function (ev) {

            var data = {
                username: $scope.SecurityUsername,
                password: ' ',
                securityanswer: $scope.SecurityAnswer
            }

            userFactory.LoginWithSecurityAnswer(data, ev);

        }


    }]);
