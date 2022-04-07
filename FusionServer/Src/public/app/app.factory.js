angular
    .module('fusionApp')
    .factory('appFactory', ['$mdToast', '$http', '$mdDialog', '$location', '$translate', function ($mdToast, $http, $mdDialog, $location, $translate) {

        var app = {};

        app.data = {
            CurrentPageTitle: '',
            SubTitle: '',
            LoadCookie: true
        }

        // Shows a standard toast message
        app.showToast = function (text, type) {

            if (!text)
                if (type == 'error')
                    text = 'Error communicating with server';
                else if (type == 'error' && text.length > 30)
                text = 'Error communicating with server';

            var pinTo = "bottom";
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .position(pinTo)
                .hideDelay(2000)
                .capsule(false)
                .theme(type + "-toast")
            );
        }

        // Shows a standard alert message
        app.showAlert = function (ev, title, content) {

            // Build title
            var dialogTitle = ''
            if (title) dialogTitle = '<h2 class="md-title">' + title + '</h2>'

            // Build title
            var htmlContent = ''
            if (content) htmlContent = '<div>' + content + '</div>'

            $mdDialog.show({
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    template: '<md-dialog>' +
                        '   <md-dialog-content class="md-dialog-content">' +
                        dialogTitle +
                        htmlContent +
                        '   </md-dialog-content>' +
                        '   <md-dialog-actions>' +
                        '       <md-button class="md-primary md-raised" ng-click="CloseDialog()" md-autofocus>Ok</md-button>' +
                        '   </md-dialog-actions>' +
                        '</md-dialog>',
                    controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                        $scope.CloseDialog = function () {
                            $mdDialog.hide();
                        }
                    }]
                })
                .then(function () {

                }, function () {

                });
        }

        // Shows an ok cancel dialog
        app.showOkCancel = function (data) {

            // Build title
            var dialogTitle = '';
            if (data.title) title = '<h2 class="md-title">' + data.title + '</h2>';

            // Build title
            var content = '';
            if (data.content) content = '<div>' + data.content + '</div>';

            // Build input
            var userInput = '';
            if (data.userInput) userInput = '<form ng-submit="ReturnInput()">' +
                '   <md-input-container layout="row">' +
                '      <input flex md-autofocus type="text" ng-model="InputBox" required>' +
                '   </md-input-container>' +
                '</form>';

            // Build buttons
            var okButtonClass = ((data.warning) ? 'md-warn' : 'md-primary');
            var okFunction = ((data.userInput) ? 'ReturnInput()' : 'OkDialog()');

            var okButton = '<md-button class="' + okButtonClass + ' md-raised" ng-click="' + okFunction + '">Ok</md-button>';
            var cancelButton = '<md-button class="md-accent" ng-click="CancelDialog()">Cancel</md-button>';

            return $mdDialog.show({

                clickOutsideToClose: false,
                escapeToClose: false,
                template: '<md-dialog>' +
                    '   <md-dialog-content class="md-dialog-content">' +
                    title +
                    content +
                    userInput +
                    '   </md-dialog-content>' +
                    '   <md-dialog-actions>' +
                    cancelButton +
                    okButton +
                    '   </md-dialog-actions>' +
                    '</md-dialog>',
                controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                    $scope.InputBox = data.placeholder;
                    $scope.ReturnInput = function () {
                        $mdDialog.hide($scope.InputBox);
                    }
                    $scope.OkDialog = function () {
                        $mdDialog.hide();
                    }
                    $scope.CancelDialog = function () {
                        $mdDialog.cancel();
                    }
                }]
            });

        }

        // Shows a yes, no, cancel message
        app.showYesNoCancel = function (data) {

            // Build title
            var title = '';
            if (data.title) title = '<h2 class="md-title">' + data.title + '</h2>';

            // Build Message
            var message = '';
            if (data.message) message = '<p>' + data.message + '</p>';

            // Define buttons
            var yesButton = '<md-button class="md-primary md-raised" ng-click="PromptClick(\'yes\')" md-autofocus>Yes</md-button>';
            var noButton = '<md-button class="md-warn md-raised" ng-click="PromptClick(\'no\')">No</md-button>';
            var cancelButton = '<md-button class="md-accent" ng-click="PromptCancel()">Cancel</md-button>';

            // Build action options
            var dialogActionOptions = ''
            if (data.buttons.cancel) dialogActionOptions += cancelButton;
            if (data.buttons.no) dialogActionOptions += noButton;
            if (data.buttons.yes) dialogActionOptions += yesButton;

            return $mdDialog.show({
                clickOutsideToClose: false,
                escapeToClose: false,
                template: '<md-dialog>' +
                    '   <md-dialog-content class="md-dialog-content">' +
                    title +
                    message +
                    '   </md-dialog-content>' +
                    '   <md-dialog-actions>' +
                    dialogActionOptions +
                    '   </md-dialog-actions>' +
                    '</md-dialog>',
                controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

                    $scope.PromptClick = function (answer) {
                        $mdDialog.hide(answer);
                    }

                    $scope.PromptCancel = function () {
                        $mdDialog.cancel();
                    };

                }]
            });

        }

        // Shows open file dialog
        app.showOpenFileDialog = function (data) {

            return $mdDialog.show({
                clickOutsideToClose: false,
                escapeToClose: false,
                template: '<md-dialog>' +
                    '   <md-dialog-content class="md-dialog-content">' +
                    '       <h4 class="md-title">Select File To Open</h4>' +
                    '       <div class="fusion-open-file-container">' +
                    '           <md-list flex ng-hide="noFilesFound()">' +
                    '               <md-list-item ng-repeat="file in FilesAvailableForOpen" class="md-1-line" ng-class="isSelected(file)" ng-click="SelectOption(file)">' +
                    '                   <div>{{ file.filename }}</div><div flex></div>' +
                    '               </md-list-item>' +
                    '           </md-list>' +
                    '           <h3 ng-hide="!noFilesFound()" style="text-align:center">No files found</h3>' +
                    '       </div>' +
                    '   </md-dialog-content>' +
                    '   <md-dialog-actions>' +
                    '       <md-button class="md-accent" ng-click="CloseDialog()">Cancel</md-button>' +
                    '       <md-button class="md-primary md-raised" ng-click="SelectFile()" ng-hide="noFilesFound()" md-autofocus>Open</md-button>' +
                    '   </md-dialog-actions>' +
                    '</md-dialog>',
                controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

                    $scope.FilesAvailableForOpen = [];

                    for (var i = 0; i < data.files.length; i++) {

                        $scope.FilesAvailableForOpen.push({
                            filename: data.files[i],
                            Selected: false
                        });

                        $scope.FilesAvailableForOpen[0].Selected = true;

                    }

                    $scope.CloseDialog = function () {
                        $mdDialog.cancel();
                    }
                    $scope.SelectFile = function (file) {

                        var file;

                        for (var i = 0; i < $scope.FilesAvailableForOpen.length; i++) {
                            if ($scope.FilesAvailableForOpen[i].Selected) {
                                file = $scope.FilesAvailableForOpen[i];
                                break;
                            }
                        }

                        $mdDialog.hide(file.filename);
                    }
                    $scope.SelectOption = function (file) {

                        for (var i = 0; i < $scope.FilesAvailableForOpen.length; i++)
                            $scope.FilesAvailableForOpen[i].Selected = false;

                        file.Selected = true;

                    }
                    $scope.isSelected = function (file) {

                        if (file.Selected) {
                            return 'fusion-dialog-selected-item';
                        } else {
                            return '';
                        }

                    }
                    $scope.noFilesFound = function () {

                        if ($scope.FilesAvailableForOpen.length > 0)
                            return false;
                        else
                            return true;

                    }
                }]
            });

        }

        // Shows an import dialog
        app.showImportDialog = function (data) {

            var dialogTitle = ((data.filetype) ? '<h2 class="md-title">Import Files:</h2>' : '');

            var fileExtension = ((data.fileExtension) ? data.fileExtension : '');

            var divText = 'Drop ' + data.filetype + '(' + fileExtension + ') files here or click to upload';

            if (data.filetype == 'any') {
                divText = 'Drop any files here or click to upload';
            }

            var divUploadAttributes = 'ng-model="files" class="fusion-import-drop-box" ngf-drag-over-class="\'fusion-import-dragover\'" ngf-drop ngf-select ngf-multiple="true" ngf-allow-dir="true" accept="' + fileExtension + '" ngf-pattern="\'' + fileExtension + '\'"';

            var uploadDirectory = ((data.uploadDirectory) ? data.uploadDirectory : '');


            var htmlContent =
                '<div ' + divUploadAttributes + '>' +
                divText +
                '</div>' +
                '<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>' +
                '<div>' +
                '   <h4>Files:</h4>' +
                '   <ul class="fusion-import-file-list">' +
                '      <li ng-repeat="f in files" style="font:smaller">{{f.name}} {{f.$error}} {{f.$errorParam}}</li>' +
                '   </ul>' +
                '</div>' +
                '<div>' +
                '   <h4>Upload log:</h4>' +
                '   <pre class="fusion-import-file-log">{{log}}</pre>' +
                '</div>';

            $mdDialog.show({
                clickOutsideToClose: false,
                escapeToClose: false,
                template: '<md-dialog>' +
                    '   <md-dialog-content class="md-dialog-content">' +
                    dialogTitle +
                    htmlContent +
                    '   </md-dialog-content>' +
                    '   <md-dialog-actions>' +
                    '       <md-button class="md-primary md-raised" ng-click="CloseDialog()" md-autofocus>Close</md-button>' +
                    '   </md-dialog-actions>' +
                    '</md-dialog>',
                controller: ['$scope', '$mdDialog', 'Upload', function ($scope, $mdDialog, Upload) {
                    $scope.CloseDialog = function () {
                        $mdDialog.hide();
                    }
                    // Upload files
                    $scope.$watch('files', function () {
                        $scope.upload($scope.files);
                    });
                    $scope.$watch('file', function () {
                        if ($scope.file != null) {
                            $scope.files = [$scope.file];
                        }
                    });
                    $scope.log = '';
                    $scope.upload = function (files) {
                        if (files && files.length) {
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];
                                if (!file.$error) {
                                    Upload.upload({
                                        url: '/api/' + uploadDirectory + '/import',
                                        data: {
                                            'file': file,
                                            'workingDirectory': data.workingDirectory
                                        },
                                        method: 'POST'
                                    }).then(function (resp) {

                                        $scope.log = 'file: ' +
                                            resp.config.data.file.name +
                                            ', Response: ' + JSON.stringify(resp.data) +
                                            '\n' + $scope.log;

                                    }, function (err) {

                                        $scope.log = 'file: ' +
                                            err.config.data.file.name +
                                            ', Response: ' + JSON.stringify(err.data) +
                                            '\n' + $scope.log;

                                    });
                                }
                            }
                        }
                    }
                }]
            });

        }

        // Shows an export dialog
        app.showExportDialog = function (data) {

            var dialogTitle = '<h2 class="md-title">User ' + data.filetype + ' Files</h2>'

            return $mdDialog.show({
                clickOutsideToClose: false,
                escapeToClose: false,
                template: '<md-dialog>' +
                    '   <md-dialog-content class="md-dialog-content">' +
                    dialogTitle +
                    '       <div class="fusion-export-file-container">' +
                    '           <md-list-item ng-repeat="file in FilesForDownload" ng-click="null">' +
                    '               <p> {{ file.Name }} </p>' +
                    '               <md-checkbox class="md-secondary" ng-model="file.Selected"></md-checkbox>' +
                    '           </md-list-item>' +
                    '       </div>' +
                    '   </md-dialog-content>' +
                    '   <md-dialog-actions>' +
                    '       <md-button class="md-accent" ng-click="CloseDialog()">Cancel</md-button>' +
                    '       <md-button class="md-primary md-raised" ng-click="DownloadFiles()" md-autofocus>Download</md-button>' +
                    '   </md-dialog-actions>' +
                    '</md-dialog>',
                controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                    $scope.FilesForDownload = data.files;
                    $scope.CloseDialog = function () {
                        $mdDialog.cancel();
                    }
                    $scope.DownloadFiles = function () {
                        $mdDialog.hide($scope.FilesForDownload);
                    }
                }]
            });

        }


        // Power offs the fusion controller
        app.PowerOff = function () {
            return $http.get('/api/admin/powerOff').then(function (response) {
                app.showToast(response.data.serverMessage, 'success');
            }, function (error) {
                app.showToast(error, 'error');
            });
        }

        // Restarts the fusion controller
        app.Restart = function () {
            return $http.get('/api/admin/restart').then(function (response) {
                app.showToast(response.data.serverMessage, 'success');
            }, function (error) {
                app.showToast(error, 'error');
            });
        }

        // Starts fusion update
        app.updateFusion = function () {

            return $http.get('/api/fusion/update', {}).then(function (response) {

                app.showToast("Updating...", 'success');

            }, function (error) {

                app.showToast("Error updating Fusion", 'error');

            });

        }

        // Restores Fusion
        app.restoreFusion = function () {

            return $http.get('/api/fusion/restore', {}).then(function (response) {

                app.showToast("Restoring...", 'success');

            }, function (error) {

                app.showToast("Error updating Fusion", 'error');

            });

        }

        // Start diagnostic tool
        app.StartDiagnosticTool = function (data) {
            return $http.post('/api/diagnostics/start', data)
                .then(function (response) {
                    app.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    app.showToast(error.data, 'error');
                    return error;
                });
        }

        // Stop diagnostic tool
        app.StopDiagnosticTool = function () {
            return $http.get('/api/diagnostics/stop')
                .then(function (response) {
                    app.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    app.showToast(error.data, 'error');
                    return error;
                });
        }
        
        // Start data logger
        app.StartDataLogger = function (data) {
            return $http.post('/api/util/dataLogger/start', data)
                .then(function (response) {
                    app.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    app.showToast(error.data, 'error');
                    return error;
                });
        }

        // Stop data logger
        app.StopDataLogger = function () {
            return $http.get('/api/util/dataLogger/stop')
                .then(function (response) {
                    app.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    app.showToast(error.data, 'error');
                    return error;
                });
        }

        // Changes language i18n
        app.changeLanguage = function(languageCode) {
            $translate.use(languageCode);
        };

        // Gets available languages
        app.getLanguages = function() {

            let languageKeys = $translate.getAvailableLanguageKeys();
            return languageKeys;

        }

        // Helper methods ============================================

        //Change page title
        app.ChangePageTitle = function (i18nCode) {
            app.data.CurrentPageTitle = i18nCode;
        }

        //Change page sub title
        app.ChangePageSubTitle = function (title) {
            app.data.SubTitle = title;
        }

        return app;

    }]);
