angular
    .module('fusionApp')
    .controller('editorCtrl', ['$scope', '$mdDialog', 'userFactory', 'editorFactory', 'appFactory', 'socketFactory', '$window', 'Upload', '$sce', function ($scope, $mdDialog, userFactory, editorFactory, appFactory, socketFactory, $window, Upload, $sce) {


        // Editor File Class ========================================

        var UntitledCounter = 1;

        function EditorFile(name, code, needsSaving, filepath, selected, fileType, preventUnsavedExit) {
            this.Selected = selected;
            this.Name = name;
            this.Code = code;
            this.Filepath = filepath;
            this.NeedsSaving = needsSaving;
            this.FileType = fileType;
            this.PreventUnsavedExit = preventUnsavedExit;
        }

        EditorFile.prototype.save = function () {

            var file = this;
            var fileName = this.Name;
            var fileType = this.FileType;
            var data = {
                code: this.Code
            }

            return new Promise(function (resolve, reject) {

                if (fileType == 'example') {

                    file.saveAs().then(function(){
                        resolve();
                    });

                } else if (fileType == 'new') {

                    file.saveAs().then(function(){
                        resolve();
                    });

                } else if (fileType == 'existing') {

                    editorFactory.UpdateProgram(fileName, data).then(function (data) {

                        $scope.SelectedFile.NeedsSaving = false;
                        
                        resolve();

                    });

                }

            });

        }

        EditorFile.prototype.saveAs = function () {

            var file = this;
            var fileName = this.Name;
            var fileType = this.FileType;
            var fileCode = this.Code;

            return new Promise(function (resolve, reject) {

                var confirm = $mdDialog.prompt()
                    .title('What would you like to name your file?')
                    .ariaLabel('File Name')
                    .ok('Okay!')
                    .initialValue(fileName)
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function (result) {

                    if (result) {

                        var data = {
                            filename: $scope.fixFileName(result),
                            code: $scope.SelectedFile.Code
                        }

                        editorFactory.CreateProgram(data).then(function (response) {
                            
                            if (response.status != 500){
                                
                                if ( file.FileType == 'new'){
                                
                                    file.Name = data.filename;
                                    file.Code = data.code;
                                    file.NeedsSaving = false;
                                    file.FileType = 'existing';

                                    resolve(response);
                                
                                }
                                else{

                                    $scope.OpenEditorFile(data.filename).then(function(){

                                        resolve(response);

                                    });

                                }      
                                
                            }
                            else{
                                reject();
                            }
                                                  

                        });

                    }
                    else{
                        
                        appFactory.showToast('Must specify file name', 'error');
                        
                    }

                }, function () {
                    //Action Canceled
                    reject();

                });

            });

        }


        // Controller Variables =====================================

        $scope.SelectedProgrammingLanguage = 'python';
        $scope.WorkingFiles = userFactory.User.workingEditorFiles;
        $scope.SelectedFile;
        $scope.NewFileCounter = 1;
        $scope.outputConsole = '';


        // Helper Methods ==========================================

        // Loads the current work space
        $scope.LoadWorkSpace = function () {

            if ($scope.WorkingFiles.length == 0)
                $scope.CreateNewWorkspaceFile();
            else
                $scope.LoadLastSelectedFile();

        }

        // Creates a new file in the workspace
        $scope.CreateNewWorkspaceFile = function () {

            editorFactory.GetPrograms().then(function (programs) {

                $scope.UnselectFiles();

                var name = $scope.GenerateNewFileName(programs);

                var defaultCode = 'import Fusion\n\nf = Fusion.driver()';

                var file = new EditorFile(name, defaultCode, true, userFactory.User.filepath + '/Editor/' + name, true, 'new', false);

                $scope.WorkingFiles.push(file);

                $scope.LoadLastSelectedFile();

            });

        }

        // Generates a file name for a new file
        $scope.GenerateNewFileName = function (programs) {

            var name = 'Untitled' + $scope.NewFileCounter + '.py';
            $scope.NewFileCounter++;
            var contains = false;

            for (var i = 0; i < programs.length; i++) {

                if (programs[i] == name) {
                    contains = true;
                    break;
                }

            }

            if (contains)
                name = $scope.GenerateNewFileName(programs);

            return name;

        }

        // Loads the last selected file
        $scope.LoadLastSelectedFile = function () {

            for (var i = 0; i < $scope.WorkingFiles.length; i++) {
                if ($scope.WorkingFiles[i].Selected) {
                    $scope.SelectedFile = $scope.WorkingFiles[i];
                    break;
                }
            }

        }

        // Displays * when file has changed
        $scope.displaySaveSymbol = function (NeedsSaving) {

            if (NeedsSaving)
                return "*";
            else
                return "";

        }

        // Darkens file when it is selected
        $scope.isSelectedFile = function (file) {
            if (file.Selected)
                return 'w3-blue';
            else
                return 'w3-light-gray w3-border w3-hover-border-black';
        }

        // Unselects all files
        $scope.UnselectFiles = function () {

            for (var i = 0; i < $scope.WorkingFiles.length; i++) {
                $scope.WorkingFiles[i].Selected = false;
            }

        }

        // User selects a different working file
        $scope.SelectWorkingFile = function (file) {

            if ($scope.SelectedFile != file) {

                $scope.UnselectFiles();

                file.Selected = true;
                $scope.SelectedFile = file;

            }

        }

        // Dialog to open editor file
        $scope.OpenFileDialog = function (ev) {

            editorFactory.GetPrograms().then(function (data) {

                $scope.FilesAvailableForOpen = data;

                $mdDialog.show({
                    contentElement: '#editorOpenFileDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

            });

        }

        // Opens the file with matching name
        $scope.OpenEditorFile = function (name) {

            $mdDialog.hide();

            return new Promise(function (resolve, reject) {

                if (!$scope.FileInWorkSpace(name)) {

                    editorFactory.GetProgram(name).then(function (data) {

                        $scope.UnselectFiles();

                        var file = new EditorFile(data.filename, data.code, false, userFactory.User.filepath + '/Editor/' + data.filename, true, 'existing', true);

                        $scope.WorkingFiles.push(file);

                        $scope.LoadLastSelectedFile();

                        resolve();

                    });

                } else {

                    appFactory.showToast('File Already Open.', 'error');

                    reject();

                }

            });

        }

        // Checks if file is in workspace
        $scope.FileInWorkSpace = function (name) {

            var exists = false;

            for (var i = 0; i < $scope.WorkingFiles.length; i++) {

                if ($scope.WorkingFiles[i].Name == name) {
                    exists = true;
                    break;
                }

            }

            return exists;

        }

        // Closes the file from the workspace
        $scope.CloseFile = function (file) {

            if (!(file.NeedsSaving && file.PreventUnsavedExit)) {

                if ($scope.SelectedFile == file) {

                    $scope.WorkingFiles.splice($scope.WorkingFiles.indexOf(file), 1);

                    if ($scope.WorkingFiles.length == 0)
                        $scope.LoadWorkSpace();
                    else
                        $scope.SelectWorkingFile($scope.WorkingFiles[0]);

                } else {

                    $scope.WorkingFiles.splice($scope.WorkingFiles.indexOf(file), 1);

                }

            } else {

                var confirm = $mdDialog.confirm()
                    .title('Save before closing?')
                    .ok('Okay!')
                    .cancel('No');

                $mdDialog.show(confirm).then(function (result) {

                    $scope.SaveSpecificFileDialog(file);
                    $scope.ForceCloseFile(file);

                }, function () {
                    //Action Canceled

                    $scope.ForceCloseFile(file);

                });

            }

        }

        // Closes a file forcefully
        $scope.ForceCloseFile = function (file) {

            if ($scope.SelectedFile == file) {

                $scope.WorkingFiles.splice($scope.WorkingFiles.indexOf(file), 1);

                if ($scope.WorkingFiles.length == 0)
                    $scope.LoadWorkSpace();
                else
                    $scope.SelectWorkingFile($scope.WorkingFiles[0]);

            } else {

                $scope.WorkingFiles.splice($scope.WorkingFiles.indexOf(file), 1);

            }

        }

        // Dialog to save the editor file
        $scope.SaveFileDialog = function () {

            $scope.SelectedFile.save();

        }

        // Dialog to save specific file
        $scope.SaveSpecificFileDialog = function (file) {

            editorFactory.GetPrograms().then(function (programs) {

                var contains = false;

                for (var i = 0; i < programs.length; i++) {

                    if (programs[i] == file.Name) {
                        contains = true;
                        break;
                    }

                }

                if (contains) {

                    var data = {
                        code: file.Code
                    }

                    editorFactory.UpdateProgram(file.Name, data).then(function (data) {

                        file.NeedsSaving = false;

                    });

                } else {

                    var data = {
                        filename: $scope.fixFileName(file.Name),
                        code: file.Code
                    }

                    editorFactory.CreateProgram(data).then(function (response) {

                        file.NeedsSaving = false;

                    });

                }

            });

        }

        // Dialog to save all editor files
        $scope.SaveAllDialog = function () {

            editorFactory.GetPrograms().then(function (programs) {

                for (var i = 0; i < $scope.WorkingFiles.length; i++) {

                    if ($scope.WorkingFiles[i].NeedsSaving)
                        $scope.SaveSpecificFileDialog($scope.WorkingFiles[i]);

                }

            });

        }

        // Dialog to save as
        $scope.SaveAsDialog = function (ev) {

            $scope.SelectedFile.saveAs();

        }

        // Dialog to delete file
        $scope.DeleteDialog = function (ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this file?')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {

                editorFactory.DeleteProgram($scope.SelectedFile.Name).then(function (response) {

                    $scope.ForceCloseFile($scope.SelectedFile);

                }, function (error) {

                });

            }, function () {
                //Action Canceled
            });

        }

        // Adds .py to filenames
        $scope.fixFileName = function (fileName) {

            var lastThree = fileName.substr(fileName.length - 3);

            if (lastThree != '.py')
                return fileName + '.py';
            else
                return fileName;

        }

        // Shows Print Dialog
        $scope.PrintDialog = function () {

            var mywindow = $window.open('', 'PRINT', 'height=400,width=600');

            mywindow.document.write('<html><head><title>' + $scope.SelectedFile.Name + '</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write('<h1>' + $scope.SelectedFile.Name + '</h1>');
            mywindow.document.write('<pre>' + $scope.SelectedFile.Code + '</pre>');
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/

            mywindow.print();
            //mywindow.close();

        }

        // Open File Upload Dialog
        $scope.UploadFilesDialog = function () {

            $mdDialog.show({
                contentElement: '#editorUploadFileDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });

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
                            url: '/api/programs/import',
                            method: 'POST',
                            file: file
                        }).then(function (resp) {

                            $scope.log = 'file: ' +
                                resp.config.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;

                        }, function (err) {

                            $scope.log = 'file: ' +
                                err.config.file.name +
                                ', Response: ' + JSON.stringify(err.data) +
                                '\n' + $scope.log;

                        });
                    }
                }
            }
        }

        // Open the download file dialog
        $scope.DownloadFilesDialog = function () {

            editorFactory.GetPrograms().then(function (data) {

                $scope.FilesForDownload = [];

                for (var i = 0; i < data.length; i++) {

                    $scope.FilesForDownload.push({
                        Name: data[i],
                        Selected: false
                    });

                }

                $mdDialog.show({
                    contentElement: '#editorDownloadFileDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

            });

        }

        // Downloads the selected files
        $scope.DownloadEditorFiles = function () {

            for (var i = 0; i < $scope.FilesForDownload.length; i++) {

                if ($scope.FilesForDownload[i].Selected)
                    $scope.DownloadSingleEditorFile($scope.FilesForDownload[i].Name);

            }

            $mdDialog.hide();

        }

        // Downloades a single file
        $scope.DownloadSingleEditorFile = function (filename) {

            editorFactory.GetProgram(filename).then(function (data) {

                var hiddenElement = document.createElement('a');
                hiddenElement.style.display = 'none';
                hiddenElement.style.backgroundColor = 'red';
                hiddenElement.href = 'data:attachment/text,' + encodeURI(data.code);
                hiddenElement.target = '_blank';
                hiddenElement.download = filename;
                hiddenElement.click();

            });

        }

        // Closes md dialogs
        $scope.hideDialog = function () {
            $mdDialog.hide();
        }

        // Stop Editor File
        $scope.StopRunningEditorFile = function () {

            editorFactory.StopProgram();

        }

        // Run Editor File
        $scope.RunExistingEditorFile = function () {

            $scope.outputConsole = "";

            if ($scope.SelectedFile.FileType != 'example') {

                if ($scope.SelectedFile.NeedsSaving) {
                    
                    $scope.SelectedFile.save().then(function(){
                        
                        editorFactory.StartProgram($scope.SelectedFile.Name);
                        
                    });


                } else {

                    editorFactory.StartProgram($scope.SelectedFile.Name);

                }


            } else {

                if ($scope.SelectedFile.NeedsSaving) {

                    $scope.SelectedFile.NeedsSaving = false;
                    $scope.SelectedFile.save();

                } else {

                    editorFactory.RunExample($scope.SelectedFile.Filepath);

                }

            }


        }

        // Function to run on page leave
        $scope.confirmExit = function () {

            var needsSaving = false;

            for (var i = 0; i < $scope.WorkingFiles.length; i++) {

                if ($scope.WorkingFiles[i].NeedsSaving && $scope.WorkingFiles[i].PreventUnsavedExit) {
                    needsSaving = true;
                    break;
                }

            }

            if (needsSaving)
                return "You have attempted to leave this app with unsaved changes. Are you sure you want to exit this page?";
            else
                return;

        }

        // Opens blockly documentation
        $scope.takeToEditorDocs = function () {

            $window.open('assets/docs/fusion/Editor_Topic/', '_blank');

        }

        // Open Example Programs
        $scope.openExampleProgram = function (name, filepath) {

            var data = {
                'filepath': filepath
            }

            editorFactory.GetExampleCode(data).then(function (data) {

                var file = new EditorFile(name, data.code, false, filepath, true, 'example', false);

                $scope.UnselectFiles();

                $scope.WorkingFiles.push(file);

                $scope.LoadLastSelectedFile();

            });

        }


        // Ace Methods ==============================================

        // Editor loaded
        $scope.aceLoaded = function (_editor) {

            var _session = _editor.getSession();
            var _renderer = _editor.renderer;

            _editor.setHighlightActiveLine(true);
            _editor.setShowPrintMargin(false);

            _session.setUndoManager(new ace.UndoManager());

            _editor.$blockScrolling = Infinity

        }

        // Editor value changed
        $scope.aceChanged = function () {


        }

        // Watches for changes to the code in working files - marks as needs saving
        $scope.$watch('WorkingFiles', function (newVal, oldVal) {

            if (newVal.length != oldVal.length)
                return;
            else {
                for (var i = 0; i < newVal.length; i++) {

                    if (newVal[i].Code != oldVal[i].Code) {
                        newVal[i].NeedsSaving = true;

                        if (newVal[i].PreventUnsavedExit == false)
                            newVal[i].PreventUnsavedExit = true;

                        break;
                    }

                }
            }

        }, true);


        //Socket Communication for console =========================
        var outputconsole = document.getElementById("output-console");
        socketFactory.Socket.on('console-output', function (msg) {

            var incomingText = msg.output;
            if (!incomingText.includes("> Program Finished!")) {

                var incomingText = msg.output;

                //Only keeps the last 500 characters displayed to avoid lag over time
                $scope.outputConsole = $scope.outputConsole.slice(-(500 - incomingText.length)) + incomingText;
                $scope.$apply();

                //Scrolls output textbox down automattically
                outputconsole.scrollTop = outputconsole.scrollHeight;

            } else {

                var incomingText = msg.output;

                $scope.outputConsole += incomingText;
                $scope.$apply();

            }

        });


        // Page Setup ==============================================

        // Change Page Title
        appFactory.ChangePageTitle('- Editor -');

        // Load existing program
        $scope.LoadWorkSpace();

        // Listen for page leave
        //$window.onbeforeunload = $scope.confirmExit;


    }]);
