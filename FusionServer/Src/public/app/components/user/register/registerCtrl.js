angular
    .module('fusionApp')
    .controller('registerCtrl', ['$scope', 'userFactory', 'appFactory', 'socketFactory', '$translate', function ($scope, userFactory, appFactory, socketFactory, $translate) {

        // Set Page Title
        appFactory.ChangePageTitle('REGISTER.TITLE');

        // Retrieves options
        $scope.languages = userFactory.languages;
        $scope.securityQuestions = userFactory.securityQuestions;

        userFactory.GetAllowedGroups().then(function () {
            $scope.userGroups = userFactory.allowedUserGroups;
        });


        // Registers a new user
        $scope.registerUser = function () {

            if ($scope.Password != $scope.Password2) {

                appFactory.showToast($translate.instant('REGISTER.PASSWORD_MISMATCH'), 'error');

            } else {

                var data = {
                    username: $scope.UserName,
                    password: $scope.Password,
                    usergroup: $scope.UserGroup,
                    securityquestion: $scope.SecurityQuestion,
                    securityanswer: $scope.SecurityAnswer,
                    socketId: socketFactory.Socket.id
                };

                if ($scope.Email) {
                    data.email = $scope.Email;
                };
                if ($scope.FirstName) {
                    data.firstname = $scope.FirstName;
                };
                if ($scope.LastName) {
                    data.lastname = $scope.LastName;
                };
                if ($scope.Language) {
                    data.language = $scope.Language;
                }

                userFactory.Create(data);

            }

        }

    }]);
