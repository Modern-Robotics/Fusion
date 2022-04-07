angular
    .module('fusionApp')
    .factory('userFactory', ['$http', 'appFactory', '$state', '$window', function ($http, appFactory, $state, $window) {

        var User = {};

        // Logged in user ===============================================

        //User Properties
        User.User = {
            username: null,
            firstname: null,
            lastname: null,
            language: null,
            email: null,
            defaultprogramminglanguage: null,
            filepath: null,
            usergroup: null,

            workingEditorFiles: [],
            blocklyProgram: {},
            blocklySettings: {
                Mode: 'intermediate',
                ShowCode: true,
                ShowConsole: true
            },

            forcePasswordChange: false

        }


        // User options =================================================

        // Supported Languages
        User.languages = [
            'en-us'
        ]

        // Supported User Groups
        User.userGroups = [
            'Admin',
            'User'
        ]

        // Allowed new User Groups
        User.allowedUserGroups = []

        //Supported Security Questions
        User.securityQuestions = [
            'SECURITY_QUESTIONS.QUESTION_1',
            'SECURITY_QUESTIONS.QUESTION_2',
            'SECURITY_QUESTIONS.QUESTION_3',
            'SECURITY_QUESTIONS.QUESTION_4',
            'SECURITY_QUESTIONS.QUESTION_5'

        ]


        // HTTP Requests ================================================

        // Get all users
        User.GetAll = function () {
            return $http.get('/api/users')
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        // Create user
        User.Create = function (data) {
            return $http.post('/api/users', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    User.ChangeUser(response.data.user);
                    $state.go('home');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        //Get Specific User
        User.Get = function (UserId) {
            return $http.get('/api/users/' + UserId)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        // Update Specific User
        User.Update = function (UserId, data) {
            return $http.put('/api/users/' + UserId, data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // Delete Specific User
        User.Delete = function (UserId) {
            return $http.delete('/api/users/' + UserId)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // User login
        User.Login = function (data) {
            return $http.post('/api/users/login', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    User.ChangeUser(response.data.user);
                    $state.go('home');
                    return response.data;
                }, function (error) {
                    $("#loginContainer").effect("shake");
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // User Logout
        User.Logout = function (data) {

            var nullUser = {
                username: null,
                firstname: null,
                lastname: null,
                language: null,
                email: null,
                defaultprogramminglanguage: null,
                filepath: null,
                usergroup: null,

                workingEditorFiles: [],
                blocklyProgram: {},
                blocklySettings: {
                    Mode: 'intermediate',
                    ShowCode: true,
                    ShowConsole: true
                },

                forcePasswordChange: false
            }

            return $http.post('/api/users/logout', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    User.ChangeUser(nullUser);
                    $state.go('login');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });

        }


        // Soft logout - only from frontend interface
        User.SoftLogout = function (data) {

            var nullUser = {
                username: null,
                firstname: null,
                lastname: null,
                language: null,
                email: null,
                defaultprogramminglanguage: null,
                filepath: null,
                usergroup: null,

                workingEditorFiles: [],
                blocklyProgram: {},
                blocklySettings: {
                    Mode: 'intermediate',
                    ShowCode: true,
                    ShowConsole: true
                },

                forcePasswordChange: false
            }

            User.ChangeUser(nullUser);

        }


        // Gets the user's security question
        User.GetSecurityQuestion = function (UserId) {
            return $http.get('/api/recovery/' + UserId)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // Logs in user using security answer
        User.LoginWithSecurityAnswer = function (data, ev) {
            return $http.post('/api/recovery', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    User.ChangeUser(response.data.user);
                    User.User.forcePasswordChange = true;
                    $state.go('account');
                    appFactory.showAlert(ev, 'Reminder', 'Please update your password')
                    return response.data;
                }, function (error) {
                    $("#recoveryContainer").effect("shake");
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // Gets allowed user groups
        User.GetAllowedGroups = function () {
            return $http.get('/api/allowedUserGroups')
                .then(function (response) {
                    User.allowedUserGroups = response.data;
                }, function (error) {
                    User.allowedUserGroups = error;
                });
        }

        // Validate the user's session cookie
        User.validateCookie = function () {

            if (appFactory.data.LoadCookie) {

                return $http.get('/api/cookie').then(function (response) {
                    
                    appFactory.data.LoadCookie = false;

                    User.ChangeUser(response.data);

                }, function (error) {

                });

            }
            else{
                
                return new Promise(function(resolve, reject){
                    resolve(); 
                });
                
            }

        }

        User.CheckUser = function() {
            return $http.get('/api/cookie').then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        };

        User.SaveStateToLocal = function() {
            $window.sessionStorage.setItem('fusionSession', JSON.stringify(User.User));
        };

        User.RestoreStateFromLocal = function(username) {
            let previousSessionData = JSON.parse($window.sessionStorage.getItem('fusionSession'));

            if (previousSessionData) {

                if (previousSessionData.username == username) {

                    User.User.workingEditorFiles =  previousSessionData.workingEditorFiles;

                    User.User.blocklyProgram = {
                        Name: previousSessionData.blocklyProgram.Name,
                        Code: previousSessionData.blocklyProgram.Code,
                        Filepath: previousSessionData.blocklyProgram.Filepath
                    };

                    User.User.blocklySettings = {
                        Mode: previousSessionData.blocklySettings.Mode,
                        ShowCode: previousSessionData.blocklySettings.ShowCode,
                        ShowConsole: previousSessionData.blocklySettings.ShowConsole
                    };

                    $window.sessionStorage.removeItem('fusionSession');
    
                };

            };

        };

        // Helper functions ============================================= 

        // Changes the current user
        User.ChangeUser = function (user) {

            User.User.username = user.username;
            User.User.firstname = user.firstname;
            User.User.lastname = user.lastname;
            User.User.language = user.language;
            User.User.email = user.email;
            User.User.defaultprogramminglanguage = user.defaultprogramminglanguage;
            User.User.filepath = user.filepath;
            User.User.usergroup = user.usergroup;

            User.User.workingEditorFiles = [];
            User.User.blocklyProgram = {
                Name: null,
                Code: null
            };
            User.User.blocklySettings = {
                Mode: 'intermediate',
                ShowCode: true,
                ShowConsole: true
            }

            User.User.forcePasswordChange = false;

            User.RestoreStateFromLocal(user.username);

        }

        return User;

    }]);
