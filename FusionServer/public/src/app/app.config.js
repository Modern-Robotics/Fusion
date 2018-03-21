angular
    .module('fusionApp')
    .config( ['$mdThemingProvider', function ($mdThemingProvider) {

        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('info-toast');

    }]);
