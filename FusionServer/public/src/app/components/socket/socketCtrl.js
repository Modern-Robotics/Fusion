angular
    .module('fusionApp')
    .controller('socketCtrl', [ '$scope', 'socketFactory', function ($scope, socketFactory) {

        socketFactory.OpenSocketCommunication();

    }]);
