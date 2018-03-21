angular
    .module('fusionApp')
    .run( ['$rootScope', '$state', '$transitions', 'userFactory', 'appFactory', '$location', function ($rootScope, $state, $transitions, userFactory, appFactory, $location) {

        // Check if cookie is valid before setting routes
        userFactory.validateCookie().then(function (response) {
            
            if (userFactory.User.username){
                
                $location.path($location.path());
                
            }
                        
            $transitions.onStart({
                to: function(state){
                    
                    if (state.data.NeedsLogin)
                        return true;
                    else
                        return false;
                }
            }, function (trans){
                
                var $state = trans.router.stateService;
                
                if (!userFactory.User.username){
                    
                    appFactory.showToast('Must login first', 'error');
                    $state.go('login');
                    
                }
                
            });
            
            $transitions.onStart({
                to: function(state){
                    
                    if (!state.data.AllowGuest)
                        return true;
                    else
                        return false;
                }
            }, function (trans){
                
                var $state = trans.router.stateService;
                
                if (userFactory.User.usergroup == 'Guest'){
                    
                    appFactory.showToast('Guest account not allowed', 'error');
                    
                    return false;
                    
                }
                
            });
            
            $transitions.onStart({
                to: function(state){
                    
                    if (state.data.NeedsAdmin)
                        return true;
                    else
                        return false;
                }
            }, function (trans){
                
                var $state = trans.router.stateService;
                
                if (userFactory.User.usergroup != 'Admin'){
                    
                    appFactory.showToast('User does not have access', 'error');
                    $state.go('home');
                    
                }
                
            });

        });
    }]);
