angular
    .module('fusionApp')
    .controller('accountCtrl', ['$scope', 'userFactory', 'appFactory', '$window', '$state', 'socketFactory', '$translate', function ($scope, userFactory, appFactory, $window, $state, socketFactory, $translate) {

        // Set Page Title
        appFactory.ChangePageTitle('ACCOUNT.TITLE');


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
                appFactory.showToast($translate.instant('ACCOUNT.MESSAGES.MISMATCHED_PASSORDS'), 'error');
            else {

                // No password change required
                if (!$scope.user.forcePasswordChange) {

                    if ($scope.user.username) data.username = $scope.user.username;
                    if ($scope.user.email) data.email = $scope.user.email;
                    if ($scope.user.firstname) data.firstname = $scope.user.firstname;
                    if ($scope.user.lastname) data.lastname = $scope.user.lastname;
                    if ($scope.user.language) data.language = $scope.user.language;
                    if ($scope.user.usergroup) data.usergroup = $scope.user.usergroup;
                    if ($scope.NewPassword1) data.password = $scope.NewPassword1;
                    if ($scope.NewSecurityQuestion) data.securityquestion = $scope.NewSecurityQuestion;
                    if ($scope.NewSecurityAnswer) data.securityanswer = $scope.NewSecurityAnswer;

                    userFactory.Update($scope.user.username, data).then(function () {
                        $scope.user.forcePasswordChange = false;
                        $state.go('home');
                    });

                } else {

                    // Check if password entered
                    if ($scope.NewPassword1) {

                        if ($scope.user.username) data.username = $scope.user.username;
                        if ($scope.user.email) data.email = $scope.user.email;
                        if ($scope.user.firstname) data.firstname = $scope.user.firstname;
                        if ($scope.user.lastname) data.lastname = $scope.user.lastname;
                        if ($scope.user.language) data.language = $scope.user.language;
                        if ($scope.user.usergroup) data.usergroup = $scope.user.usergroup;
                        if ($scope.NewPassword1) data.password = $scope.NewPassword1;
                        if ($scope.NewSecurityQuestion) data.securityquestion = $scope.NewSecurityQuestion;
                        if ($scope.NewSecurityAnswer) data.securityanswer = $scope.NewSecurityAnswer;

                        userFactory.Update($scope.user.username, data).then(function () {
                            $scope.user.forcePasswordChange = false;
                            
                            var data = {
                                socketId: socketFactory.Socket.id
                            }
                            
                            userFactory.Logout(data);
                        });

                    } else {
                        appFactory.showToast($translate.instant('ACCOUNT.MESSAGES.NEW_PASSWORD_REQUEST'), 'error');
                    }

                }

            }

        }

        $scope.forcePasswordChange = function () {

            if ($scope.user.forcePasswordChange) {
                return 'fusion-password-change';
            } else {
                return '';
            }

        }

        $scope.stopNavigation = function () {

            if ($scope.user.forcePasswordChange)
                return true;
            else
                return false;

        }

        $scope.returnToPrevious = function () {
            $window.history.back();
        }

    }]);
