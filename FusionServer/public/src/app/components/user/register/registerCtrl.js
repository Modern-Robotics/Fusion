angular
    .module('fusionApp')
    .controller('registerCtrl', ['$scope', 'userFactory', 'appFactory', function ($scope, userFactory, appFactory) {

        // Set Page Title
        appFactory.ChangePageTitle('- Register New User -');

        // Retrieves options
        $scope.languages = userFactory.languages;
        $scope.securityQuestions = userFactory.securityQuestions;
        
        userFactory.GetAllowedGroups().then(function(){
            $scope.userGroups = userFactory.allowedUserGroups;
        });

    
        // Registers a new user
        $scope.registerUser = function () {

            if ($scope.Password != $scope.Password2) {

                appFactory.showToast('Passwords do not match', 'error');

            } else {

                var data = {
                    username: $scope.UserName,
                    password: $scope.Password,
                    usergroup: $scope.UserGroup,
                    securityquestion: $scope.SecurityQuestion,
                    securityanswer: $scope.SecurityAnswer
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