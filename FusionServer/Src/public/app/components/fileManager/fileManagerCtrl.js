angular
    .module('fusionApp')
    .controller('fileManagerCtrl', ['$scope', 'appFactory', '$http', 'userFactory', 'fileManagerFactory', '$window', function ($scope, appFactory, $http, userFactory, fileManagerFactory, $window) {


        // Variables ==========================================

        // The selected path in the tree view
        $scope.SelectedPath = ' ';

        // Set the default sort type
        $scope.sortType = 'Name';

        // Set the default sort order
        $scope.sortReverse = false;

        // Maintains the list of visible files 
        $scope.fileList = [];

        // File Context Menu Options
        $scope.fileContextMenu = [
            {
                label: 'Move',
                onClick: contextMove
            },
            {
                label: 'Rename',
                onClick: contextRename
            },
            {
                label: 'Copy',
                onClick: contextCopy
            },
            {
                divider: true // will render a divider
            },
            {
                label: 'Download',
                onClick: contextDownload
            },
            {
                divider: true // will render a divider
            },
            {
                label: 'Remove',
                onClick: contextDelete
            }
        ]

        // File Area Context Menu Options
        $scope.fileAreaContextMenu = [
            {
                label: 'Create File',
                onClick: createFile
            },
            {
                label: 'Create Folder',
                onClick: createFolder
            },
            {
                divider: true // will render a divider
            },
            {
                label: 'Upload Files',
                onClick: uploadFiles
            }
        ]


        // Toolbar Functions ==================================

        $scope.refreshFileManager = function () {

            $scope.refreshTree();

            $scope.fetchDirectoryInfo($scope.SelectedPath);

        }


        // File Tree Functions ================================

        $scope.fileTreeReady = function () {

            $scope.SelectedPath = $(this).jstree().get_path($(this).jstree("get_selected", true)[0], '/');

            $scope.$digest();

        }

        $scope.nodeSelected = function (e, data) {

            var path = data.instance.get_path(data.node, '/');

            if (data.node.icon == 'jstree-file') {
                path = path.substring(0, path.lastIndexOf("/"));
            }

            if (path != $scope.SelectedPath) {

                $scope.SelectedPath = path;
                $scope.fetchDirectoryInfo(path);

            }

        }

        $scope.toggleFileSelection = function (event, file) {

            if (file || event.ctrlKey) {

                // Check for right click
                if (event.which == 3) {

                    // If file not selected, do normal selection
                    if (!file.selected) {

                        for (var i = 0; i < $scope.fileList.length; i++) {
                            if ($scope.fileList[i] != file)
                                $scope.fileList[i].selected = false;
                        }

                        file.selected = true;

                    }

                }
                // It's a normal click
                else {

                    // User Held Down Ctrl
                    if (event.ctrlKey) {

                        file.selected = !file.selected;

                    }
                    // User Held Down Shift
                    else if (event.shiftKey) {

                        var firstIndex = -1;
                        var currentIndex = $scope.fileList.indexOf(file);

                        for (var i = 0; i < $scope.fileList.length; i++) {
                            if ($scope.fileList[i].selected) {
                                firstIndex = i;
                                break
                            }
                        }

                        // Select all files in between
                        if (firstIndex > -1) {

                            // First determine which value is greater
                            var upperLimit;
                            var lowerLimit;

                            if (firstIndex > currentIndex) {
                                upperLimit = firstIndex;
                                lowerLimit = currentIndex;
                            } else {
                                upperLimit = currentIndex;
                                lowerLimit = firstIndex;
                            }

                            for (var i = 0; i < $scope.fileList.length; i++) {
                                if (i <= upperLimit && i >= lowerLimit)
                                    $scope.fileList[i].selected = true;
                            }

                        }
                        // Nothing previously selected, do simple selection
                        else {

                            for (var i = 0; i < $scope.fileList.length; i++) {
                                if ($scope.fileList[i] != file)
                                    $scope.fileList[i].selected = false;
                            }

                            file.selected = true;

                        }

                    }
                    // User used simple select
                    else {

                        for (var i = 0; i < $scope.fileList.length; i++) {
                            if ($scope.fileList[i] != file)
                                $scope.fileList[i].selected = false;
                        }

                        file.selected = true;

                    }

                }

            } else {

                for (var i = 0; i < $scope.fileList.length; i++) {
                    if ($scope.fileList[i] != file)
                        $scope.fileList[i].selected = false;
                }

            }

        }
        
        // Future development - detect key presses for shortcuts
        $scope.toggleFileKeyPress = function(event, file){
            
            
            
        }

        $scope.openSelection = function (file) {

            if (file.type == 'directory') {

                var tree = $('#jsTree');
                tree.jstree('deselect_all');
                tree.jstree('select_node', file.id);

            }

        }

        $scope.refreshTree = function () {

            $('#jsTree').jstree(true).refresh();

        }


        // File Area Functions ================================

        $scope.setSortType = function (Type) {

            $scope.sortType = Type;
            $scope.sortReverse = !$scope.sortReverse;

        }


        // Styling Functions ==================================

        $scope.isFile = function (file) {
            if (file.type == 'directory')
                return true;
        }

        $scope.selectedFile = function (file) {

            if (file.selected)
                return 'fusion-file-manager-selected-file';
            else
                return 'fusion-file-manager-unSelected-file';
        }

        $scope.showDownCaret = function (Type) {

            if ($scope.sortType == Type && !$scope.sortReverse) {
                return false;
            } else
                return true;

        }

        $scope.showUpCaret = function (Type) {

            if ($scope.sortType == Type && $scope.sortReverse) {
                return false;
            } else
                return true;

        }


        // Helper Functions

        $scope.fetchDirectoryInfo = function (filepath) {

            fileManagerFactory.Get({
                directory: filepath
            }).then(function (data) {
                $scope.fileList = data;
            });

        }

        function getSelectedFiles() {

            var files = [];

            for (var i = 0; i < $scope.fileList.length; i++) {
                if ($scope.fileList[i].selected)
                    files.push($scope.fileList[i]);
            }

            return files;

        }

        // Creates desired file
        function createFile($event) {

            return new Promise(function (resolve, reject) {

                appFactory.showOkCancel({
                    title: 'What would you like to name your file?',
                    userInput: true,
                    placeholder: ''
                }).then(function (result) {

                    if (result.indexOf('.') == -1) {

                        appFactory.showToast("Please specify a file extension", 'error')

                    } else {

                        var data = {
                            filename: $scope.SelectedPath + '/' + result,
                        }

                        // Check if already exists
                        var exists = false;
                        for (var i = 0; i < $scope.fileList.length; i++) {
                            if ($scope.fileList[i].name == result && $scope.fileList[i].type == 'file') {
                                exists = true;
                                break;
                            }
                        }

                        if (exists) {

                            appFactory.showOkCancel({
                                title: 'File already exists. Would you like to overwrite?',
                                warning: true
                            }).then(function (answer) {

                                fileManagerFactory.CreateFile(data).then(function (response) {

                                    $scope.frefreshFileManager();
                                    resolve();

                                }, function (err) {
                                    reject();
                                });


                            }, function () {

                                // Action canceled
                                reject();

                            });

                        }
                        // Doesn't exist, do default behaviour
                        else {

                            fileManagerFactory.CreateFile(data).then(function (response) {

                                $scope.refreshFileManager();
                                resolve();

                            }, function (err) {
                                reject();
                            });

                        }

                    }

                }, function () {

                    // Action canceled
                    //reject();

                });

            });

        }

        // Creates desired folder
        function createFolder(event) {

            return new Promise(function (resolve, reject) {

                appFactory.showOkCancel({
                    title: 'What would you like to name your folder?',
                    userInput: true,
                    placeholder: ''
                }).then(function (result) {

                    var data = {
                        filename: $scope.SelectedPath + '/' + result,
                    }

                    // Check if already exists
                    var exists = false;
                    for (var i = 0; i < $scope.fileList.length; i++) {
                        if ($scope.fileList[i].name == result && $scope.fileList[i].type == 'directory') {
                            exists = true;
                            break;
                        }
                    }

                    if (exists) {

                        appFactory.showAlert(null, "Folder Already Exists", "Please delete before continuing.");

                    }
                    // Doesn't exist, do default behaviour
                    else {

                        fileManagerFactory.CreateFolder(data).then(function (response) {

                            $scope.refreshFileManager();
                            resolve();

                        }, function (err) {
                            reject();
                        });

                    }

                }, function () {

                    // Action canceled
                    reject();

                });

            });

        }

        // Upload a file
        function uploadFiles(event) {

            appFactory.showImportDialog({
                filetype: 'python',
                fileExtension: '.py',
                uploadDirectory: 'programs',
                workingDirectory: $scope.SelectedPath
            });

        }

        // Move desired files
        function contextMove(event) {

            if (event.dataContext.type == 'file') {

                appFactory.showOkCancel({
                    title: 'Specify new directory.',
                    userInput: true,
                    placeholder: $scope.SelectedPath + '/'
                }).then(function (result) {

                    var data = {
                        oldFilename: event.dataContext.path,
                        newFilename: result + '/' + event.dataContext.name
                    }

                    fileManagerFactory.MoveFile(data).then(function (response) {
                        $scope.refreshFileManager();
                    }, function (err) {
                        $scope.refreshFileManager();
                    });

                });

            } else {

                appFactory.showOkCancel({
                    title: 'Specify new directory.',
                    userInput: true,
                    placeholder: $scope.SelectedPath + '/'
                }).then(function (result) {

                    var data = {
                        oldFilename: event.dataContext.path,
                        newFilename: result + '/' + event.dataContext.name
                    }

                    fileManagerFactory.MoveFolder(data).then(function (response) {
                        $scope.refreshFileManager();
                    }, function (err) {
                        $scope.refreshFileManager();
                    });

                });

            }

        }

        // Remove desired files
        function contextDelete(contextMenuData) {

            var selectedFiles = getSelectedFiles();

            if (selectedFiles.length > 1) {

                appFactory.showOkCancel({
                    title: 'Delete all selected files?',
                    warning: true
                }).then(function (answer) {

                    var data = {
                        files: selectedFiles
                    }

                    fileManagerFactory.DeleteMulti(data).then(function (response) {
                        $scope.refreshFileManager();
                        resolve();
                    }, function (err) {
                        reject();
                    });

                }, function () {

                    // Action canceled

                });

            } else if (contextMenuData.dataContext.type == 'file') {

                return new Promise(function (resolve, reject) {

                    appFactory.showOkCancel({
                        title: 'Delete this file?',
                        warning: true
                    }).then(function (answer) {

                        var data = {
                            filename: $scope.SelectedPath + '/' + contextMenuData.dataContext.name,
                        }

                        fileManagerFactory.DeleteFile(data).then(function (response) {
                            $scope.refreshFileManager();
                            resolve();
                        }, function (err) {
                            reject();
                        });

                    }, function () {

                        // Action canceled
                        reject();

                    });

                });

            } else {

                return new Promise(function (resolve, reject) {

                    appFactory.showOkCancel({
                        title: "Delete this folder and all of it's contents?",
                        warning: true
                    }).then(function (answer) {

                        var data = {
                            filename: $scope.SelectedPath + '/' + contextMenuData.dataContext.name,
                        }

                        fileManagerFactory.DeleteFolder(data).then(function (response) {
                            $scope.refreshFileManager();
                            resolve();
                        }, function (err) {
                            reject();
                        });

                    }, function () {

                        // Action canceled

                    });

                });

            }

        }

        // Rename desired files
        function contextRename(contextMenuData) {

            if (contextMenuData.dataContext.type == 'file') {

                return new Promise(function (resolve, reject) {

                    appFactory.showOkCancel({
                        title: 'What would you like to rename your file?',
                        userInput: true,
                        placeholder: ''
                    }).then(function (result) {

                        if (result.indexOf('.') == -1) {

                            appFactory.showToast("Please specify a file extension", 'error')

                        } else {

                            var data = {
                                oldFilename: $scope.SelectedPath + '/' + contextMenuData.dataContext.name,
                                newFilename: $scope.SelectedPath + '/' + result
                            }

                            // Check if already exists
                            var exists = false;
                            for (var i = 0; i < $scope.fileList.length; i++) {
                                if ($scope.fileList[i].name == result && $scope.fileList[i].type == 'file') {
                                    exists = true;
                                    break;
                                }
                            }

                            if (exists) {

                                appFactory.showToast('A file with that name already exists.', 'error');

                            }
                            // Doesn't exist, do default behaviour
                            else {

                                fileManagerFactory.RenameFile(data).then(function (response) {

                                    $scope.refreshFileManager();
                                    resolve();

                                }, function (err) {
                                    reject();
                                });

                            }

                        }

                    }, function () {

                        // Action canceled
                        //reject();

                    });

                });

            } else {

                return new Promise(function (resolve, reject) {

                    appFactory.showOkCancel({
                        title: 'What would you like to rename your folder?',
                        userInput: true,
                        placeholder: ''
                    }).then(function (result) {

                        if (result.indexOf('.') == -1) {

                            var data = {
                                oldFilename: $scope.SelectedPath + '/' + contextMenuData.dataContext.name,
                                newFilename: $scope.SelectedPath + '/' + result
                            }

                            // Check if already exists
                            var exists = false;
                            for (var i = 0; i < $scope.fileList.length; i++) {
                                if ($scope.fileList[i].name == result && $scope.fileList[i].type == 'file') {
                                    exists = true;
                                    break;
                                }
                            }

                            if (exists) {

                                appFactory.showToast('A file with that name already exists.', 'error');

                            }
                            // Doesn't exist, do default behaviour
                            else {

                                fileManagerFactory.RenameFolder(data).then(function (response) {

                                    $scope.refreshFileManager();
                                    resolve();

                                }, function (err) {
                                    reject();
                                });

                            }

                        } else {

                            appFactory.showToast("No file extensions allowed", 'error');

                        }

                    }, function () {

                        // Action canceled
                        //reject();

                    });

                });

            }

        }

        // Copy desired files
        function contextCopy(contextMenuData) {

            var data = {
                filepath: $scope.SelectedPath + '/' + contextMenuData.dataContext.name
            }

            if (contextMenuData.dataContext.type == 'file') {

                fileManagerFactory.CopyFile(data).then(function (response) {

                    $scope.refreshFileManager();

                }, function (err) {

                    $scope.refreshFileManager();

                });

            } else {

                fileManagerFactory.CopyFolder(data).then(function (response) {

                    $scope.refreshFileManager();

                }, function (err) {

                    $scope.refreshFileManager();

                });

            }

        }

        // Download desired files
        function contextDownload(event) {

            var selectedFiles = getSelectedFiles();

            for (var i = 0; i < selectedFiles.length; i++) {

                var data = {
                    filepath: $scope.SelectedPath + '/' + selectedFiles[i].name,
                    username: userFactory.User.username,
                    userFilepath: userFactory.User.filepath,
                    type: event.dataContext.type
                }

                $window.open('/api/files/download?d=' + window.btoa(JSON.stringify(data)));

            }

        }


        // Page Setup ==========================================

        appFactory.ChangePageTitle('File Manager');

        $scope.fetchDirectoryInfo();


    }]);
