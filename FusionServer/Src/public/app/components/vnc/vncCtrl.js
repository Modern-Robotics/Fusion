//homeCtrl.js

angular
    .module('fusionApp')
    .controller('vncCtrl', ['$scope', 'appFactory', '$sce', '$location', function ($scope, appFactory, $sce, $location) {

        
        var url = 'http://' + $location.host() + ':6080/vnc.html';
        
        $scope.vncToolHtml = $sce.trustAsHtml('<iframe src="' + url + '" style="width:100%;">' +
                            '   <p>Iframes not supported...</p>' +
                            '</iframe>');
        
        
        // Set Page Title
        appFactory.ChangePageTitle('VNC');


    }]);
