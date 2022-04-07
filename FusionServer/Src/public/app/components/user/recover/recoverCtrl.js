// app/components/user/recover/recoverCtrl.js

angular
    .module('fusionApp')
    .controller('recoverCtrl', ['$scope', 'userFactory', 'appFactory', '$mdDialog', 'socketFactory', '$translate', function ($scope, userFactory, appFactory, $mdDialog, socketFactory, $translate) {

        // Page Variables =================================

        $scope.SecurityQuestion;
        $scope.SecurityAnswer;
        $scope.SecurityUsername;


        // Set Page Title
        appFactory.ChangePageTitle('RECOVER.TITLE');


        // Helper Methods =================================

        $scope.getUserSecurityQuestion = function () {

            userFactory.GetSecurityQuestion($scope.SecurityUsername).then(function (response) {

                if (!response.status) {

                    $scope.SecurityQuestion = $translate.instant(response);

                    var confirm = $mdDialog.prompt()
                        .title($scope.SecurityQuestion)
                        .ok($translate.instant('DIALOG_BOX.OK'))
                        .cancel($translate.instant('DIALOG_BOX.CANCEL'));

                    $mdDialog.show(confirm).then(function (result) {

                        $scope.SecurityAnswer = result;

                        $scope.validateUserSecurityAnswer();

                    }, function () {
                        //Action Canceled

                    });


                }

            });

        }

        $scope.validateUserSecurityAnswer = function (ev) {

            var data = {
                username: $scope.SecurityUsername,
                password: ' ',
                securityanswer: $scope.SecurityAnswer,
                socketId: socketFactory.Socket.id
            }

            userFactory.LoginWithSecurityAnswer(data, ev);

        }


    }]);
