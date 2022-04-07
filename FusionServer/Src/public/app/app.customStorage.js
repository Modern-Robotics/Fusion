angular
    .module('fusionApp')
    .factory('customStorage', [ '$window', '$cookies', function($window, $cookies) {

        return {
            
            // Store a custom cookie
            put: function(name, value) {

                if (typeof(Storage) !== "undefined") {       
                    
                    $window.localStorage.setItem(name, value);
                    $cookies.put(name, value);

                } else {

                    $cookies.put(name, value);

                }

            },

            // Retrieve custom cookie
            get: function(name, value) {

                if (typeof(Storage) !== "undefined") {       
                    
                    return $window.localStorage.getItem(name);


                } else {

                    return $cookies.get(name);

                }          

            }

        };

    }]);