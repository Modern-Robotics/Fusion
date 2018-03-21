//homeCtrl.js

angular
    .module('fusionApp')
    .controller('vncCtrl', ['$scope', 'appFactory', function ($scope, appFactory) {

        // Set Page Title
        appFactory.ChangePageTitle('- VNC -');


    }]);
