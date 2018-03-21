var dirTree = require('directory-tree');
var os = require('os');


var examplesHtml = '';
var examplesFilePath;

if (os.platform() == 'win32')
    examplesFilePath = 'C:/Users/Hector/Desktop/examples';
else
    examplesFilePath = '/usr/local/lib/python2.7/dist-packages/Fusion/examples';

var tree = dirTree(examplesFilePath, {extensions:/\.py$/});

module.exports = function (app, fs, passport, mkdirp, fusionProgram, multipartyMiddleware, FileUploadController) {

    // api routes for user programs ============================================
    // Get Programs
    app.get('/api/programs', authenticationMiddleware(), function (req, res) {

        var path = req.user.filepath + '/Editor';

        mkdirp(path, function (err) {
            if (err)
                res.status(500).send(err);

            fs.readdir(path, function (err2, items) {
                if (err2)
                    res.status(500).send(err2);

                res.status(200).send(items);
            });

        });

    });
    // Create Program
    app.post('/api/programs', authenticationMiddleware(), function (req, res) {

        fs.stat(req.user.filepath + '/Editor/' + req.body.filename, function (err, stat) {

            if (err == null) {
                res.status(500).json({
                    serverMessage: 'A file with that name already exists'
                });
            } else if (err.code == 'ENOENT') {

                fs.writeFile(req.user.filepath + '/Editor/' + req.body.filename, req.body.code, function (err2) {
                    if (err2)
                        res.status(500).json({
                            serverMessage: err2
                        });

                    res.status(200).json({
                        serverMessage: 'Program Created Successfully'
                    });
                });

            } else {
                res.status(500).json({
                    serverMessage: 'An error occurred'
                });
            }
        });

    });
    // Get Program
    app.get('/api/programs/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Editor/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                res.status(500).send(err);

            res.status(200).json({
                filename: req.params.Program_Name,
                code: data
            });
        });

    });
    // Update Program
    app.put('/api/programs/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Editor/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                res.status(500).send(err);

            fs.writeFile(req.user.filepath + '/Editor/' + req.params.Program_Name, req.body.code, 'utf-8', function (err2) {
                if (err2)
                    res.status(500).send(err2);

                res.status(200).json({
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

            res.status(200).json({
                serverMessage: 'Program Deleted Successfully'
            });
        });

    });
    // Start Program
    app.post('/api/programs/start/:Program_Name', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StartProgram(req.user.username, req.user.filepath + '/Editor/' + req.params.Program_Name, req.body.socketId);

        res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Stop Program
    app.post('/api/programs/stop', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StopProgram(req.user.username);

        res.status(execute.status).json({
            serverMessage: execute.message
        });

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

        res.status(200).json(tree);

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

        var html = `<md-toolbar class="md-menu-toolbar">
                    <div layout="row">
                        <div class="f-toolbar">
                            <h2 class="md-toolbar-tools">{{displaySaveSymbol(SelectedFile.NeedsSaving)}} {{SelectedFile.Name}}</h2>
                            <md-menu-bar>
                                <md-menu>
                                    <button ng-click="$mdMenu.open()" class="f-toolbar-item">File</button>
                                    <md-menu-content>
                                        <md-menu-item>
                                            <md-button ng-click="CreateNewWorkspaceFile()">New</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-button ng-click="OpenFileDialog(ev)">Open</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-button ng-click="CloseFile(SelectedFile)">Close</md-button>
                                        </md-menu-item>
                                        <md-menu-divider></md-menu-divider>
                                        <md-menu-item>
                                            <md-button ng-click="SaveFileDialog()">Save</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-button ng-click="SaveAsDialog(ev)">Save As..</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-button ng-click="SaveAllDialog()">Save All</md-button>
                                        </md-menu-item>
                                        <md-menu-divider></md-menu-divider>
                                        <md-menu-item>
                                            <md-button ng-click="DeleteDialog(ev)">Delete</md-button>
                                        </md-menu-item>
                                        <md-menu-divider></md-menu-divider>
                                        <md-menu-item>
                                            <md-button ng-click="PrintDialog()">Print</md-button>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
                                <md-menu>
                                    <button ng-click="$mdMenu.open()" class="f-toolbar-item">Manage</button>
                                    <md-menu-content>
                                        <md-menu-item>
                                            <md-button ng-click="UploadFilesDialog()">Import</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-button ng-click="DownloadFilesDialog()">Export</md-button>
                                        </md-menu-item>
                                        <md-menu-item>
                                            <md-menu>
                                                <md-button ng-click="$mdMenu.open()">Language</md-button>
                                                <md-menu-content>
                                                    <md-menu-item type="radio" ng-model="SelectedProgrammingLanguage" value="python">Python</md-menu-item>
                                                </md-menu-content>
                                            </md-menu>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
                                <button ng-click="RunExistingEditorFile()" class="f-toolbar-item f-toolbar-play-button"><i class="fa fa-play-circle fa-lg" aria-hidden="true"></i></button>
                                <button ng-click="StopRunningEditorFile()" class="f-toolbar-item f-toolbar-stop-button"><i class="fa fa-stop-circle fa-lg" aria-hidden="true"></i></button>
                                <md-menu>
                                    <button ng-click="$mdMenu.open()" class="f-toolbar-item">Help</button>
                                    <md-menu-content>`
                                        + examplesHtml +
                                        `<md-menu-item>
                                            <md-button ng-click="takeToEditorDocs()">Documentation</md-button>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
                            </md-menu-bar>
                        </div>
                    </div>
                </md-toolbar>`;

        res.status(200).send(html);

    });

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.status(401).send("User Unauthenticated");
            }
        };
    }

    function eachRecursive(obj) {

        if (obj.type == 'directory') {

            if (obj.name == 'examples') {
                examplesHtml += '<md-menu>';
                examplesHtml += '<md-button ng-click="$mdMenu.open()">' + "Examples" + '</md-button>';
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

};