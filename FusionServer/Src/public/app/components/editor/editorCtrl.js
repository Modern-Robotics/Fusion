angular
    .module('fusionApp')
    .controller('editorCtrl', ['$scope', '$mdDialog', 'userFactory', 'editorFactory', 'appFactory', 'socketFactory', '$window', 'Upload', '$sce', '$location', '$translate', function ($scope, $mdDialog, userFactory, editorFactory, appFactory, socketFactory, $window, Upload, $sce, $location, $translate) {


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

                    file.saveAs().then(function () {
                        resolve();
                    }, function () {
                        reject();
                    });

                } else if (fileType == 'new') {

                    file.saveAs().then(function () {
                        resolve();
                    }, function () {
                        reject();
                    });

                } else if (fileType == 'existing') {

                    editorFactory.UpdateProgram(fileName, data).then(function (data) {

                        file.NeedsSaving = false;

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

                appFactory.showOkCancel({
                    title: $translate.instant('EDITOR.SAVE_AS_DIALOG.TITLE'),
                    userInput: true,
                    placeholder: fileName
                }).then(function (result) {

                    if (result) {

                        var data = {
                            filename: $scope.fixFileName(result),
                            code: file.Code
                        }

                        editorFactory.CreateProgram(data).then(function (response) {

                            if (response.status != 500) {

                                if (file.FileType == 'new') {

                                    file.Name = data.filename;
                                    file.Code = data.code;
                                    file.NeedsSaving = false;
                                    file.FileType = 'existing';

                                    resolve(response);

                                } else if (file.FileType == 'example') {

                                    file.Name = data.filename;
                                    file.Code = data.code;
                                    file.NeedsSaving = false;
                                    file.FileType = 'existing';

                                    resolve(response);

                                } else {

                                    $scope.OpenEditorFile(data.filename).then(function () {

                                        resolve(response);

                                    });

                                }

                            } else {
                                reject();
                            }

                        });

                    } else {

                        appFactory.showToast($translate.instant('EDITOR.SAVE_AS_DIALOG.MISING_FILE_NAME'), 'error');

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

            var name = $translate.instant('EDITOR.UNTITLED_FILE') + editorFactory.newFileCounter + '.py';
            editorFactory.newFileCounter++;
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

                    // Before loading, check if transfered from blockly
                    if ($scope.WorkingFiles[i].BlocklyTransfer)
                        $scope.WorkingFiles[i] = new EditorFile(
                            $scope.WorkingFiles[i].Name,
                            $scope.WorkingFiles[i].Code,
                            $scope.WorkingFiles[i].NeedsSaving,
                            $scope.WorkingFiles[i].Filepath,
                            $scope.WorkingFiles[i].Selected,
                            $scope.WorkingFiles[i].FileType,
                            $scope.WorkingFiles[i].PreventUnsavedExit
                        )

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
                return 'fusion-editor-selected-file';
            else
                return 'fusion-editor-nonSelected-file';
        }

        $scope.isExampleFile = function (file) {
            if (file)
                if (file.FileType == 'example')
                    return 'fusion-editor-example-file';
                else return '';
            else
                return '';
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

                appFactory.showOpenFileDialog({
                        filetype: 'Editor',
                        files: data
                    })
                    .then(function (file) {

                        // File selected                    
                        $scope.OpenEditorFile(file);

                    }, function () {

                        // Dialog canceled                    


                    });

            });

        }

        // Opens the file with matching name
        $scope.OpenEditorFile = function (name) {

            $mdDialog.hide();

            return new Promise(function (resolve, reject) {

                if (!$scope.FileInWorkSpace(name, 'existing')) {

                    editorFactory.GetProgram(name).then(function (data) {

                        $scope.UnselectFiles();

                        var file = new EditorFile(data.filename, data.code, false, userFactory.User.filepath + '/Editor/' + data.filename, true, 'existing', true);

                        $scope.WorkingFiles.push(file);

                        $scope.LoadLastSelectedFile();

                        resolve();

                    });

                } else {

                    appFactory.showToast($translate.instant('EDITOR.FILE_ALREADY_OPEN'), 'error');

                    reject();

                }

            });

        }

        // Checks if file is in workspace
        $scope.FileInWorkSpace = function (name, type) {

            var exists = false;

            for (var i = 0; i < $scope.WorkingFiles.length; i++) {

                if ($scope.WorkingFiles[i].Name == name && $scope.WorkingFiles[i].FileType == type) {
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

                appFactory.showYesNoCancel({
                    title: $translate.instant('EDITOR.SAVE_BEFORE_CLOSING_TITLE'),
                    buttons: {
                        yes: true,
                        no: true,
                        cancel: true
                    }
                }).then(function (answer) {

                    // Action accepted
                    if (answer == 'yes') {

                        $scope.SaveSpecificFileDialog(file).then(function () {
                            $scope.ForceCloseFile(file);
                        });


                    } else if (answer == 'no') {

                        $scope.ForceCloseFile(file);

                    }

                }, function () {

                    // Action canceled

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

            return file.save();

        }

        // Dialog to save all editor files
        $scope.SaveAllDialog = function () {

//            for (let i = 0, p = Promise.resolve(); i < $scope.WorkingFiles.length; i++) {
//                p = p.then(_ => $scope.SaveSpecificFileDialog($scope.WorkingFiles[i]));
//            }

            var _loop = function _loop(i, _p) {
                _p = _p.then(function (_) {
                    return $scope.SaveSpecificFileDialog($scope.WorkingFiles[i]);
                });
                p = _p;
            };

            for (var i = 0, p = Promise.resolve(); i < $scope.WorkingFiles.length; i++) {
                _loop(i, p);
            }

        }

        // Dialog to save as
        $scope.SaveAsDialog = function (ev) {

            $scope.SelectedFile.saveAs();

        }

        // Dialog to delete file
        $scope.DeleteDialog = function (ev) {

            appFactory.showOkCancel({
                title: $translate.instant('EDITOR.DELETE_FILE_TITLE'),
                warning: true
            }).then(function (answer) {

                // Action accepted
                editorFactory.DeleteProgram($scope.SelectedFile.Name).then(function (response) {

                    $scope.ForceCloseFile($scope.SelectedFile);

                }, function (error) {

                });

            }, function () {

                // Action canceled

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

            appFactory.showImportDialog({
                filetype: 'python',
                fileExtension: '.py',
                uploadDirectory: 'programs'
            });

        }

        // Open the download file dialog
        $scope.DownloadFilesDialog = function () {

            editorFactory.GetPrograms().then(function (data) {

                var FilesForDownload = [];

                for (var i = 0; i < data.length; i++) {
                    FilesForDownload.push({
                        Name: data[i],
                        Selected: false
                    });
                }

                appFactory.showExportDialog({
                        filetype: 'Editor',
                        files: FilesForDownload
                    })
                    .then(function (files) {

                        // Files selected for download
                        for (var i = 0; i < files.length; i++) {

                            if (files[i].Selected)
                                $scope.DownloadSingleEditorFile(files[i].Name);

                        }

                    }, function () {

                        // Action canceled

                    });

            });

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

                    $scope.SelectedFile.save().then(function () {

                        editorFactory.StartProgram($scope.SelectedFile.Name);

                    }, function () {

                        // Save canceled

                    });


                } else {

                    editorFactory.StartProgram($scope.SelectedFile.Name);

                }

            } else {

                if ($scope.SelectedFile.NeedsSaving) {

                    $scope.SelectedFile.save().then(function () {
                        editorFactory.StartProgram($scope.SelectedFile.Name);
                    }, function () {

                    });

                } else {

                    editorFactory.RunExample($scope.SelectedFile.Filepath);

                }

            }


        }
        
        $scope.ClearOutputConsole = function(){
            
            $scope.outputConsole = "";
            7
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

            if (!$scope.FileInWorkSpace(name, 'example')) {

                editorFactory.GetExampleCode(data).then(function (data) {

                    var file = new EditorFile(name, data.code, false, filepath, true, 'example', false);

                    $scope.UnselectFiles();

                    $scope.WorkingFiles.push(file);

                    $scope.LoadLastSelectedFile();

                });

            } else {

                appFactory.showToast('Example Already Open.', 'error');

            }

        }


        // Disables the virtual gamepad 
        $scope.DisableVirtualGamepad = function () {

            if (!(socketFactory.data.ProgramRunning.running && socketFactory.data.Reachable.Gamepad))
                return true;
            else
                return false;

        }

        // Opens Virtual Gamepad
        $scope.OpenVirtualGamepad = function () {

            var url = 'http://' + $location.host() + ':5000/';

            $window.open(url, '_blank');

        }


        // Ace Methods ==============================================

        // Editor loaded
        $scope.aceLoaded = function (_editor) {

            var _session = _editor.getSession();
            var _renderer = _editor.renderer;

            _editor.setHighlightActiveLine(true);
            _editor.setShowPrintMargin(false);
            _editor.setBehavioursEnabled(true);
            _editor.setDisplayIndentGuides(true);
            _editor.setHighlightSelectedWord(true);

            _session.setUndoManager(new ace.UndoManager());

            _editor.$blockScrolling = Infinity

            // Add new file shortcut
            _editor.commands.addCommand({
                name: "New File",
                bindKey: {
                    win: "Ctrl-U",
                    mac: "Command-U"
                },
                exec: function () {
                    $scope.CreateNewWorkspaceFile();
                }
            });

            // Add save shortcut
            _editor.commands.addCommand({
                name: "Save File",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S"
                },
                exec: function () {
                    $scope.SaveFileDialog();
                }
            });

            // Add open shortcut
            _editor.commands.addCommand({
                name: "Open File",
                bindKey: {
                    win: "Ctrl-O",
                    mac: "Command-O"
                },
                exec: function () {
                    $scope.OpenFileDialog();
                }
            });

            // Add Run file shortcut
            _editor.commands.addCommand({
                name: "Run File",
                bindKey: {
                    win: "Ctrl-R",
                    mac: "Command-R"
                },
                exec: function () {
                    $scope.RunExistingEditorFile();
                }
            });

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
        
        $scope.selectInputField = function(){
            
            $(".fusion-editor-input:first").focus();
            
        }
        
        $scope.transmitInput = function(keyEvent){
            
             if (keyEvent.which === 13){
                 
                 var data = {
                     input : $scope.consoleInput
                 }
                 
                editorFactory.SendInput(data).then(function(){
                    $scope.consoleInput = '';
                });                
                 
             }
            
        }


        // Page Setup ==============================================
        
        
        $scope.initialEditorHeight = function(){
            var editorWorkspace = angular.element(document.querySelector('#editor-workspace'));
            return editorWorkspace[0].offsetHeight * .7;
        }

        // Change Page Title
        appFactory.ChangePageTitle('EDITOR.TITLE');

        // Load existing program
        $scope.LoadWorkSpace();

        // Listen for page leave
        //$window.onbeforeunload = $scope.confirmExit;


    }]);
