var dirTree = require('directory-tree');
var os = require('os');
var SCP = require('scp2');
var SSH = require('ssh2').Client;
var path = require('path');

const classroomConnection   = require('../../classroom/connection');
const logger                = require('../../utils/logger');
const app                   = require('../../express');
const fs                    = require('fs');
const mkdirp                = require('mkdirp');
const FusionSettings        = require('../../global/fusionSettings');
const fusionProgram         = require('../../fusionProgram');
const multiParty            = require('connect-multiparty');
const multipartyMiddleware  = multiParty();
const FileUploadController  = require('../../controllers/FileUploadController');


var examplesHtml = '';
var examplesFilePath;

// List of approved directories to draw examples from
var approvedExamples = ['Fusion', 'VirtualGamepad', 'CoreControl'];

// Set the path to examples depending on platform
if (os.platform() == 'win32')
    examplesFilePath = 'C:/Users/Hector/Desktop/dist-packages';
else
    examplesFilePath = '/usr/local/lib/python2.7/dist-packages';

// Build a directory tree
var tree = dirTree(examplesFilePath, {extensions:/\.py$/});

// Specify the name of the directory tree
tree.name = 'Examples';

// Loop through directory tree filtering out unapproved example sources
for (var i = tree.children.length - 1; i >= 0; i--){

    // Remove unapproved source
    if ( approvedExamples.indexOf(tree.children[i].name) == -1){
        tree.children.splice(i, 1);
    }
    // Found approved source
    else if (approvedExamples.indexOf(tree.children[i].name) > -1 && tree.children[i].type == 'directory'){

        // Loop through approved source directories searching for examples
        for ( var j = 0; j < tree.children[i].children.length; j++){

            // Examples found, bring to approved directory root level to ignore other folders
            if (tree.children[i].children[j].name == 'examples'  && tree.children[i].children[j].type == 'directory'){
                tree.children[i].children[j].name = tree.children[i].name;                
                tree.children[i] = tree.children[i].children[j];
                break;
            }

        }

    }    
}

module.exports = function () {

    // api routes for user programs ============================================
    // Get Programs
    app.get('/api/programs', authenticationMiddleware(), function (req, res) {

        var path = req.user.filepath + '/Editor';

        mkdirp(path, function (err) {
            if (err)
                res.status(500).send(err);

            fs.readdir(path, function (err2, items) {
                if (err2)
                    return res.status(500).send(err2);

                return res.status(200).send(items);
            });

        });

    });
    // Create Program
    app.post('/api/programs', authenticationMiddleware(), function (req, res) {

        fs.stat(req.user.filepath + '/Editor/' + req.body.filename, function (err, stat) {

            if (err == null) {
                return res.status(500).json({
                    serverMessage: 'A file with that name already exists'
                });
            } else if (err.code == 'ENOENT') {

                fs.writeFile(req.user.filepath + '/Editor/' + req.body.filename, req.body.code, function (err2) {
                    if (err2)
                        return res.status(500).json({
                            serverMessage: err2
                        });

                    if ( classroomConnection.connected ){

                        createClassroomProgram(req.user.filepath + '/Editor/' + req.body.filename, req.user.username + '/Editor/' + req.body.filename);

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
    // Get Program
    app.get('/api/programs/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Editor/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).send(err);

            return res.status(200).json({
                filename: req.params.Program_Name,
                code: data
            });
        });

    });
    // Update Program
    app.put('/api/programs/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Editor/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).send(err);

            fs.writeFile(req.user.filepath + '/Editor/' + req.params.Program_Name, req.body.code, 'utf-8', function (err2) {
                if (err2)
                    return res.status(500).send(err2);

                if ( classroomConnection.connected){

                    updateClassroomProgram(req.user.filepath + '/Editor/' + req.params.Program_Name, req.user.username + '/Editor/' + req.params.Program_Name);

                }

                return res.status(200).json({
                    serverMessage: 'Program Updated Successfully'
                });
            });

        });

    });
    // Delete Program
    app.delete('/api/programs/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Editor/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).send('File Does Not Exist.');

            fs.unlinkSync(req.user.filepath + '/Editor/' + req.params.Program_Name);

            if ( classroomConnection.connected){

                deleteClassroomProgram(req.user.username + '/Editor/' + req.params.Program_Name);

            }

            return res.status(200).json({
                serverMessage: 'Program Deleted Successfully'
            });
        });

    });
    // Start Program
    app.post('/api/programs/start/:Program_Name', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StartProgram(req.user.username, req.user.filepath + '/Editor/' + req.params.Program_Name, req.body.socketId);

        return res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Stop Program
    app.post('/api/programs/stop', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StopProgram(req.user.username);

        return res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Send User Input
    app.post('/api/programs/sendInput', authenticationMiddleware(), function(req, res){

        if (FusionSettings.SocketVariables.fusion_program_running)
            fusionProgram.sendInput(req.body.input);

        return res.status(200).send();

    });  

    // Import Programs
    app.post('/api/programs/import', multipartyMiddleware, FileUploadController.uploadFile, function (req, res) {


    });

    // Get Sample Programs
    app.get('/api/samplePrograms', function (req, res) {

        var filepath;

        if (os.platform() == 'win32')
            filepath = 'C:/Users/Hector/Desktop/examples';
        else
            filepath = '/usr/local/lib/python2.7/dist-packages/Fusion/examples';

        var tree = dirTree(filepath);

        return res.status(200).json(tree);

    });

    // Get Specific Sample Program
    app.post('/api/samplePrograms', function(req, res){

        fs.readFile(req.body.filepath, 'utf8', function(err, contents) {
            
            if (err)
                return res.status(500).send('Error loading example');
            
            return res.status(200).json({code: contents});

        });

    });

    // Run Sample Program
    app.post('/api/samplePrograms/run', function(req, res){         

        var execute = fusionProgram.StartProgram(req.user.username, req.body.filepath, req.body.socketId);
        
        return res.status(execute.status).json({
            serverMessage: execute.message
        });

    });

    // Get Editor Toolbar
    app.get('/api/editor/toolbar', function (req, res) {

        var html = 
        '<div class="fusion-toolbar-container">' +
            '<md-toolbar class="md-menu-toolbar">' +
                '<div layout="row">' +
                    '<div class="fusion-toolbar">' +
                        '<h2 class="md-toolbar-tools" ng-class="isExampleFile(SelectedFile)">{{displaySaveSymbol(SelectedFile.NeedsSaving)}} {{SelectedFile.Name}}</h2>' +
                        '<md-menu-bar>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_FILE"></button>' +
                                '<md-menu-content>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="CreateNewWorkspaceFile()" translate="EDITOR.MENUBAR_FILE_NEW" aria-label="New File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="OpenFileDialog(ev)" translate="EDITOR.MENUBAR_FILE_OPEN" aria-label="Open File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="CloseFile(SelectedFile)" translate="EDITOR.MENUBAR_FILE_CLOSE" aria-label="Close File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="SaveFileDialog()" translate="EDITOR.MENUBAR_FILE_SAVE" aria-label="Save File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="SaveAsDialog(ev)" translate="EDITOR.MENUBAR_FILE_SAVE_AS" aria-label="Save File As"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="SaveAllDialog()" translate="EDITOR.MENUBAR_FILE_SAVE_ALL" aria-label="Save All Files"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="DeleteDialog(ev)" translate="EDITOR.MENUBAR_FILE_DELETE" aria-label="Delete File"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="PrintDialog()" translate="EDITOR.MENUBAR_FILE_PRINT" aria-label="Print File"></md-button>' +
                                    '</md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_MANAGE">Manage</button>' +
                                '<md-menu-content>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="UploadFilesDialog()" translate="EDITOR.MENUBAR_MANAGE_IMPORT" aria-label="Import Files"></md-button>' +
                                    '</md-menu-item>' +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="DownloadFilesDialog()" translate="EDITOR.MENUBAR_MANAGE_EXPORT" aria-label="Download Files"></md-button>' +
                                    '</md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_HELP"></button>' +
                                '<md-menu-content>' +
                                    examplesHtml +
                                    '<md-menu-item>' +
                                        '<md-button ng-click="takeToEditorDocs()" translate="EDITOR.MENUBAR_HELP_DOCUMENTATION" aria-label="Editor Documentation"></md-button>' +
                                    '</md-menu-item>' +
                                '</md-menu-content>' +
                            '</md-menu>' +
                        '</md-menu-bar>' +
                    '</div>' +
                '</div>' +

                '<div class="fusion-ribbon">' +
                    '<md-button class="fusion-ribbon-button tooltip" ng-click="CreateNewWorkspaceFile()" aria-label="New File">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_NEW_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-file-alt fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="OpenFileDialog(ev)" aria-label="Open File">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_OPEN_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-folder-open fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="SaveFileDialog()" aria-label="Save File As">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_SAVE_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="far fa-save fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="SaveAllDialog()" aria-label="Save All Files">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_SAVE_FILES_TOOLTIP"></div></md-tooltip>' +
                        '<span class="fa-layers fa-fw  fa-lg fa-fw">' +
                            '<i class="far fa-save" data-fa-transform="shrink-3 down-8 left-4"></i>' +
                            '<i class="far fa-save" data-fa-transform="shrink-3 up-2 right-4"></i>' +
                        '</span>' +
                    '</md-button>' +
                    '<md-button class="md-primary fusion-ribbon-button" ng-click="RunExistingEditorFile()" aria-label="Run Program">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_RUN_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-play fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="md-warn fusion-ribbon-button" ng-click="StopRunningEditorFile()" aria-label="Stop Program">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_STOP_FILE_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-stop fa-lg fa-fw"></i>' +
                    '</md-button>' +
                    '<md-button class="fusion-ribbon-button" ng-click="OpenVirtualGamepad()" ng-disabled="DisableVirtualGamepad()" aria-label="Open Virtual Gamepad">' +
                        '<md-tooltip><div translate="EDITOR.TOOLBAR_GAMEPAD_TOOLTIP"></div></md-tooltip>' +
                        '<i class="fas fa-gamepad fa-lg fa-fw"></i>' +
                    '</md-button>' +
                '</div>' +
            '</md-toolbar>' +
        '</div>';

        return res.status(200).send(html);

    });


    function createClassroomProgram(fromFilePath, toFilePath){

        SCP.scp(fromFilePath, 'c3:root@172.16.0.1:/home/c3/FusionFilesystem/' + toFilePath, function(err) {
            if (err)
                logger.error(err);
            else
                logger.debug(`Created: '${toFilePath}' in classroom server`);
        });

    }

    function updateClassroomProgram(fromFilePath, toFilePath){

        SCP.scp(fromFilePath, 'c3:root@172.16.0.1:/home/c3/FusionFilesystem/' + toFilePath, function(err) {
            if (err)
                logger.error(err);
            else
                logger.debug(`Updated: '${toFilePath}' in classroom server`);
        });

    }

    function deleteClassroomProgram(delFilePath){

        var conn = new SSH();
        conn.on('ready', function() {
        conn.exec('rm /home/c3/FusionFilesystem/' + delFilePath, function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
            logger.info('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
            }).on('data', function(data) {
            logger.info('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
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

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.status(401).send("User Unauthenticated");
            }
        };
    }

    function eachRecursive(obj) {

        if (obj.type == 'directory') {

            if (obj.name == 'Examples') {
                examplesHtml += '<md-menu>';
                examplesHtml += '<md-button ng-click="$mdMenu.open()" translate="EDITOR.MENUBAR_HELP_EXAMPLES" aria-label="Editor Examples"></md-button>';
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