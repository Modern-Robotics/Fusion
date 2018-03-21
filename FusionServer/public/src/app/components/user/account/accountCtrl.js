angular
    .module('fusionApp')
    .controller('accountCtrl', [ '$scope', 'userFactory', 'appFactory', '$window' , function ($scope, userFactory, appFactory, $window) {

        // Set Page Title
        appFactory.ChangePageTitle('- User Account -');


        $scope.user = userFactory.User;

        $scope.languages = userFactory.languages;
        $scope.userGroups = userFactory.userGroups;
        $scope.securityQuestions = userFactory.securityQuestions;

        $scope.disableField = function () {
            return true;
        }

        $scope.updateAccount = function () {

            var data = {};

            if ($scope.NewPassword1 != $scope.NewPassword2)
                appFactory.showToast('Passwords do not match', 'error');
            else {

                if ($scope.user.username) data.username = $scope.user.username;
                if ($scope.user.email) data.email = $scope.user.email;
                if ($scope.user.firstname) data.firstname = $scope.user.firstname;
                if ($scope.user.lastname) data.lastname = $scope.user.lastname;
                if ($scope.user.language) data.language = $scope.user.language;
                if ($scope.user.usergroup) data.usergroup = $scope.user.usergroup;
                if ($scope.NewPassword1) data.password = $scope.NewPassword1;
                if ($scope.NewSecurityQuestion) data.securityquestion = $scope.NewSecurityQuestion;
                if ($scope.NewSecurityAnswer) data.securityanswer = $scope.NewSecurityAnswer;

                userFactory.Update($scope.user.username, data);

            }

        }
        
        $scope.returnToPrevious = function(){
            $window.history.back();
        }

    }]);