angular
    .module('fusionApp')
    .config(['$httpProvider', function ($httpProvider) {

        $httpProvider.interceptors.push(['$q', '$state', function ($q, $state) {
            return {
                'request': function (config) {
                    return config;
                },
                // optional method
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },
                // optional method
                'response': function (response) {
                    return response;
                },
                // optional method
                'responseError': function (rejection) {
                    
                //Checks for status 401 (Unauthorized)
                    if (rejection.status === 401) {
                        
                        if (!$state.current.name == 'recover')                        
                            $state.go('login');                        
                        
                        return $q.reject(rejection);

                    } else {
                        return $q.reject(rejection);
                    }
                }
            }
        }])


        //Attaches with credentials with all $http requests
        $httpProvider.defaults.withCredentials = true;

    }]);
