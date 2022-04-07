angular
    .module('fusionApp')
    .controller('diagnosticsCtrl', ['$scope', 'appFactory', 'socketFactory', '$sce', '$location', '$window', function ($scope, appFactory, socketFactory, $sce, $location, $window) {


        // Change Page Title
        appFactory.ChangePageTitle('Diagnostic Tool');


        // Run Diagnostic tool if possible
        if (socketFactory.data.ProgramRunning.running == false) {

            // try to launch diagnostics tool

            var data = {
                socketId: socketFactory.Socket.id
            }

            appFactory.StartDiagnosticTool(data).then(function (response) {

                // Check if windows response
                if (response.serverMessage == "Diagnostic tool does not run on windows") {

                    // Tell user to stop running program            
                    $scope.diagnosticToolHtml = $sce.trustAsHtml('<div style="margin-left:auto;margin-right:auto;padding:30px;color:red;">' +
                        '   <h3>Diagnostic tool not available on windows environment.</h3>' +
                        '</div>');

                } else {

                    setTimeout(function () {

                        var url = 'http://' + $location.host() + ':8081';
                        
                        $scope.diagnosticToolHtml = $sce.trustAsHtml('<iframe src="' + url + '" style="width:100%;">' +
                            '   <p>Iframes not supported...</p>' +
                            '</iframe>');

                    }, 500);

                }

            });

        } else {

            // Tell user to stop running program            
            $scope.diagnosticToolHtml = $sce.trustAsHtml('<div style="margin-left:auto;margin-right:auto;padding:30px;color:red;">' +
                '   <h3>Please stop any running programs before accessing this tool.</h3>' +
                '</div>');

        }


    }]);
