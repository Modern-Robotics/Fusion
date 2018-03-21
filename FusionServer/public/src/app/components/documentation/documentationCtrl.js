// app/components/documentation/documentationCtrl.js

angular
    .module('fusionApp')
    .controller('documentationCtrl', ['$scope', '$window', 'appFactory', function ($scope, $window, appFactory) {

        
        $scope.openDocumentation = function (link) {

            if (link) {
                $window.open(link, "_blank");
            } else
                alert("No documentation yet");

        }
        
        
        $scope.blocklyModules = [
            
            {
                ID: 1,
                Name: "Blockly Documentation",
                Description: "Get started with Blockly.",
                Image: "/assets/img/documentation/pen-8-256x256.png",
                Color: "lightpink",
                Link: "/assets/docs/documentation/blockly/Core_Spartan_Documentation.pdf"
            },
            {
                ID: 1,
                Name: "Blockly Documentation",
                Description: "Get started with Blockly.",
                Image: "/assets/img/documentation/pen-8-256x256.png",
                Color: "lightpink",
                Link: "/assets/docs/documentation/blockly/Core_Spartan_Documentation.pdf"
            }
            
        ]

        $scope.editorModules = [
        ]

        $scope.pythonModules = [
            
            {
                ID: 1,
                Name: "Full Documentation",
                Description: "Read the full Python library here!",
                Image: "/assets/img/documentation/pythonLogo.png",
                Color: "lightblue",
                Link: "/assets/docs/documentation/python/Fusion_Lib.pdf"
            }

        ]

        $scope.settingsModules = [

        ]

    }]);
