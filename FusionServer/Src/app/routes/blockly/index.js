var dirTree = require('directory-tree');
var SCP = require('scp2');
var SSH = require('ssh2').Client;
var path = require('path');
const classroomConnection   = require('../../classroom/connection');


const logger    = require('../../utils/logger');
const app       = require('../../express');
const fs        = require('fs');
const mkdirp    = require('mkdirp');
const fusionProgram     = require('../../fusionProgram');

var examplesHtml = '';
var examplesFilePath = "public/app/components/blockly/Examples";

var tree = dirTree(examplesFilePath, {
    extensions: /\.blk$/
});


module.exports = function () {

    // api routes for user blockly programs ====================================
    // Get Blockly Programs
    app.get('/api/blockly', authenticationMiddleware(), function (req, res) {

        var path = req.user.filepath + '/Blockly';

        mkdirp(path, function (err) {
            if (err)
                return res.status(500).send(err);

            fs.readdir(path, function (err2, items) {

                if (err2)
                    return res.status(500).send(err2);

                return res.status(200).send(items);
            });

        });

    });
    // Create Blockly Program
    app.post('/api/blockly', authenticationMiddleware(), function (req, res) {

        fs.stat(req.user.filepath + '/Blockly/' + req.body.filename, function (err, stat) {

            if (err == null) {
                return res.status(500).json({
                    serverMessage: 'A file with that name already exists'
                });
            } else if (err.code == 'ENOENT') {

                fs.writeFile(req.user.filepath + '/Blockly/' + req.body.filename, req.body.code, function (err2) {
                    if (err2)
                        return res.status(500).json({
                            serverMessage: err2
                        });

                    if (classroomConnection.connected) {

                        createClassroomProgram(req.user.filepath + '/Blockly/' + req.body.filename, req.user.username + '/Blockly/' + req.body.filename);

                    }

                    return res.status(200).json({
                        serverMessage: 'Program Created Successfully'
                    });
                });

            } else {
                return res.status(500).json({
                    serverMessage: 'An error occurred'
                });
            }

        });

    });
    // Get Blockly Program
    app.get('/api/blockly/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                res.status(500).send(err);

            res.status(200).send(data);
        });

    });
    // Update Blockly Program
    app.put('/api/blockly/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).send(err);

            fs.writeFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, req.body.code, 'utf-8', function (err2) {
                if (err2)
                    return res.status(500).send(err2);

                if (classroomConnection.connected) {

                    updateClassroomProgram(req.user.filepath + '/Blockly/' + req.params.Program_Name, req.user.username + '/Blockly/' + req.params.Program_Name);

                }

                return res.status(200).json({
                    serverMessage: 'Program Updated Successfully'
                });
            });

        });

    });
    // DeleteBlockly  Program
    app.delete('/api/blockly/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).json({
                    serverMessage: 'File Does Not Exist.'
                });

            fs.unlinkSync(req.user.filepath + '/Blockly/' + req.params.Program_Name);

            if (classroomConnection.connected) {

                deleteClassroomProgram(req.user.username + '/Blockly/' + req.params.Program_Name);

            }

            return res.status(200).json({
                serverMessage: 'Program Deleted Successfully'
            });
        });

    });
    // StartBlockly  Program
    app.post('/api/blockly/start', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StartBlocklyProgram(req.body.code, req.user.username, req.body.socketId);

        return res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Stop Blockly Program
    app.post('/api/blockly/stop', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StopProgram(req.user.username);

        return res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Get Specific Sample Program
    app.post('/api/blocklySamplePrograms', function (req, res) {

        fs.readFile(req.body.filepath, 'utf8', function (err, contents) {

            if (err)
                return res.status(500).send('Error loading example');

            return res.status(200).send(contents);

        });

    });
    // Get Blockly Toolbar
    app.get('/api/blocklyToolbar', function (req, res) {

        var html = 
        '<div class="fusion-toolbar-container">' +
        '<md-toolbar class="md-menu-toolbar" ng-cloak>' +
            '<div layout="row">' +
                '<div class="fusion-toolbar">' +
                    '<h2 class="md-toolbar-tools" ng-class="isExampleFile(SelectedFile)">{{displaySaveSymbol(SelectedFile.NeedsSaving)}} {{SelectedFile.Name}}</h2>' +
                    '<div>' +
                        '<md-menu-bar>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="BLOCKLY.MENUBAR_FILE"></button>' +
                                '<md-menu-content>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="NewBlocklyFile()" translate="BLOCKLY.MENUBAR_FILE_NEW" aria-label="New File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="OpenFileDialog(ev)" translate="BLOCKLY.MENUBAR_FILE_OPEN" aria-label="Open File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="NewBlocklyFile()" translate="BLOCKLY.MENUBAR_FILE_CLOSE" aria-label="Close File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="SaveBlocklyFile()" translate="BLOCKLY.MENUBAR_FILE_SAVE" aria-label="Save File"></md-button>' +
                                   ' </md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="SaveAsDialog(ev)" translate="BLOCKLY.MENUBAR_FILE_SAVE_AS" aria-label="Save File As"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="DeleteDialog(ev)" translate="BLOCKLY.MENUBAR_FILE_DELETE" aria-label="Delete File"></md-button>' +
                                    '</md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="BLOCKLY.MENUBAR_VIEW"></button>' +
                                '<md-menu-content>' +
                                    '<md-menu-item class="md-indent">' +
                                        '<md-menu>' +
                                            '<md-button ng-click="$mdMenu.open()" translate="BLOCKLY.MENUBAR_VIEW_MODE" aria-label="Blockly Mode"></md-button>' +
                                            '<md-menu-content width="3">' +
                                                '<md-menu-item type="radio" ng-model="Settings.Mode" value="basic" ng-click="setToolbox()"><div>{{"BLOCKLY.MENUBAR_VIEW_MODE_BASIC" | translate}}</div></md-menu-item>' +
                                                '<md-menu-item type="radio" ng-model="Settings.Mode" value="intermediate" ng-click="setToolbox()"><div>{{"BLOCKLY.MENUBAR_VIEW_MODE_INTERMEDIATE" | translate}}</div></md-menu-item>' +
                                            '</md-menu-content>' +
                                        '</md-menu>' +
                                   ' </md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item type="checkbox" ng-model="Settings.ShowConsole" ng-click="resizeBlockly()"><div>{{"BLOCKLY.MENUBAR_VIEW_PROGRAM_OUTPUT" | translate}}</div></md-menu-item>' +
                                    '<md-menu-item type="checkbox" ng-model="Settings.ShowCode" ng-click="resizeBlockly()"><div>{{"BLOCKLY.MENUBAR_VIEW_CODE_WINDOW" | translate}}</div><div translate=""></div></md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="BLOCKLY.MENUBAR_MANAGE"></button>' +
                                '<md-menu-content>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="UploadFilesDialog()" translate="BLOCKLY.MENUBAR_MANAGE_IMPORT" aria-label="Upload Files"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="DownloadFilesDialog()" translate="BLOCKLY.MENUBAR_MANAGE_EXPORT" aria-label="Download Files"></md-button>' +
                                    '</md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="BLOCKLY.MENUBAR_HELP"></button>' +
                                '<md-menu-content>' +
                                    examplesHtml +
                                    '<md-menu-item>' +
                                            '<md-button ng-click="takeToBlocklyDocs()" translate="BLOCKLY.MENUBAR_HELP_DOCUMENTATION" aria-label="Take to Blockly Documentation"></md-button>' +
                                        '</md-menu-item>' +
                                    '</md-menu-content>' +
                                '</md-menu>' +
                            '</md-menu-bar>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="fusion-ribbon">' +
                    '<md-button class="fusion-ribbon-button tooltip" ng-click="NewBlocklyFile()" aria-label="New File">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_NEW_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-file-alt fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="OpenFileDialog(ev)" aria-label="Open File">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_OPEN_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-folder-open fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="SaveBlocklyFile()" aria-label="Save File">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_SAVE_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-save fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="md-primary fusion-ribbon-button" ng-click="runExistingBlocklyProgram()" aria-label="Run Program">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_RUN_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-play fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="md-warn fusion-ribbon-button" ng-click="stopRunningBlocklyProgram()" aria-label="Stop Program">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_STOP_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-stop fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="toggleProgramOutput()" aria-label="Toggle Debug Console">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_TOGGLE_OUTPUT"></div></md-tooltip>' +
                        '<i class="fas fa-terminal fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="toggleCodeWindow()" aria-label="Toggle Code Window">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_SHOW_CODE"></div></md-tooltip>' +
                        '<i class="fas fa-code fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="OpenVirtualGamepad()" ng-disabled="DisableVirtualGamepad()" aria-label="Open Virtual Gamepad">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_GAMEPAD_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-gamepad fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="openInEditor()" aria-label="Open Program In Editor">' +
                        '<md-tooltip><div translate="BLOCKLY.TOOLBAR_OPEN_IN_EDITOR"></div></md-tooltip>' +
                        '<i class="fas fa-external-link-square-alt fa-lg fa-fw"></i>' +
                    '</md-button>' +
                '</div>' +
            '</md-toolbar>' +    
        '</div>';

        return res.status(200).send(html);

    });


    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.status(401).send("User Unauthenticated");
            }
        };
    }


    function createClassroomProgram(fromFilePath, toFilePath) {

        SCP.scp(fromFilePath, 'c3:root@172.16.0.1:/home/c3/FusionFilesystem/' + toFilePath, function (err) {
            if (err)
                logger.error(err);
            else
                logger.debug(`Created: '${toFilePath}' in classroom server`);
        });

    }

    function updateClassroomProgram(fromFilePath, toFilePath) {

        SCP.scp(fromFilePath, 'c3:root@172.16.0.1:/home/c3/FusionFilesystem/' + toFilePath, function (err) {
            if (err)
                logger.error(err);
            else
                logger.debug(`Updated: '${toFilePath}' in classroom server`);
        });

    }

    function deleteClassroomProgram(delFilePath) {

        var conn = new SSH();
        conn.on('ready', function () {
            conn.exec('rm /home/c3/FusionFilesystem/' + delFilePath, function (err, stream) {
                if (err) throw err;
                stream.on('close', function (code, signal) {
                    logger.debug('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function (data) {
                    logger.verbose('STDOUT: ' + data);
                }).stderr.on('data', function (data) {
                    logger.error('STDERR: ' + data);
                });
            });
        }).connect({
            host: '172.16.0.1',
            port: 22,
            username: 'c3',
            password: 'root'
        });

    }

    function eachRecursive(obj) {

        if (obj.type == 'directory') {

            if (obj.name == 'Examples') {
                examplesHtml += '<md-menu>';
                examplesHtml += '<md-button ng-click="$mdMenu.open()" translate="BLOCKLY.MENUBAR_HELP_EXAMPLES" aria-label="Blockly Examples"></md-button>';
                examplesHtml += '<md-menu-content>';
                eachRecursive(obj['children']);
                examplesHtml += '</md-menu-content>';
                examplesHtml += '</md-menu>';
            } else {
                examplesHtml += '<md-menu-item>';
                examplesHtml += '<md-menu>';
                examplesHtml += '<md-button ng-click="$mdMenu.open()">' + obj.name + '</md-button>';
                examplesHtml += '<md-menu-content>';
                eachRecursive(obj['children']);
                examplesHtml += '</md-menu-content>';
                examplesHtml += '</md-menu>';
                examplesHtml += '</md-menu-item>';
            }

        } else if (obj.constructor === Array) {
            for (var i = 0; i < obj.length; i++) {
                eachRecursive(obj[i]);
            }
        } else if (obj.type == 'file') {
            examplesHtml += '<md-menu-item>';
            examplesHtml += '<md-button ng-click="openExampleProgram(\'' + obj.name + '\',\'' + obj.path.split("\\").join("/") + '\')">' + obj.name + '</md-button>';
            examplesHtml += '</md-menu-item>';
        }

    }

    eachRecursive(tree);

}();