angular
    .module('fusionApp')
    .run(['$rootScope', '$state', '$transitions', 'userFactory', 'appFactory', '$location', 'socketFactory', function ($rootScope, $state, $transitions, userFactory, appFactory, $location, socketFactory) {

        $transitions.onBefore({}, function (transition) {
            
            var transitionFromState = transition.from();
            var transitionToState = transition.to();

            return new Promise(function (resolve) {

                userFactory.validateCookie().then(function () {

                    // Block unlogged in users
                    if (transitionToState.data.NeedsLogin && !userFactory.User.username) {
                        appFactory.showToast('Must login first', 'error');
                        resolve(transition.router.stateService.target('login'));
                    }

                    // Block guest accounts
                    else if (!transitionToState.data.AllowGuest && userFactory.User.usergroup == 'Guest') {
                        appFactory.showToast('Guest account not allowed', 'error');
                        resolve(false);
                    }

                    // Blocks non admins
                    else if (transitionToState.data.NeedsAdmin && userFactory.User.usergroup != 'Admin') {
                        appFactory.showToast('User does not have access', 'error');
                        resolve(false);
                    }

                    // Checks for forcing of password change
                    else if (userFactory.User.forcePasswordChange && transitionFromState.name == 'account') {
                        appFactory.showToast('Please change your password first', 'error');
                        resolve(false);
                    }

                    // Checks if leaving diagnostics state - force shut down tool
                    else if (transitionFromState.name == 'diagnostics') {
                        appFactory.StopDiagnosticTool().then(function(){
							resolve(true);
						});
                    }
                    
                    // Checks if leaving diagnostics state - force shut down tool
                    else if (transitionFromState.name == 'datalogger') {
                        appFactory.StopDataLogger().then(function(){
							resolve(true);
						});
                    }

                    // Prevent navigation to login page when logged in
                    else if (transitionToState.name == 'login' && userFactory.User.username) {
                        var data = {
                            socketId: socketFactory.Socket.id
                        }
                        userFactory.Logout(data).then(function () {
                            resolve(false);
                        });
                    }
                    
                    // Allow transition
                    else{
                        resolve(true);
                    }

                });

            });

        });

    }]);
