var dirTree = require('directory-tree');

var examplesHtml = '';
var examplesFilePath = "public/dist/app/components/blockly/Examples";

var tree = dirTree(examplesFilePath, {extensions:/\.blk$/});


module.exports = function(app, fs, passport, mkdirp, fusionProgram){

    // api routes for user blockly programs ====================================
    // Get Blockly Programs
    app.get('/api/blockly', authenticationMiddleware(), function (req, res) {

        var path = req.user.filepath + '/Blockly';

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
    // Create Blockly Program
    app.post('/api/blockly', authenticationMiddleware(), function (req, res) {

        fs.writeFile(req.user.filepath + '/Blockly/' + req.body.filename, req.body.code, function (err) {
            if (err)
                res.status(500).send(err);

            res.status(200).json({
                serverMessage: 'Program Created Successfully'
            });
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
                res.status(500).send(err);

            fs.writeFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, req.body.code, 'utf-8', function (err2) {
                if (err2)
                    res.status(500).send(err2);

                res.status(200).json({
                    serverMessage: 'Program Updated Successfully'
                });
            });

        });

    });
    // DeleteBlockly  Program
    app.delete('/api/blockly/:Program_Name', authenticationMiddleware(), function (req, res) {

        fs.readFile(req.user.filepath + '/Blockly/' + req.params.Program_Name, 'utf8', function (err, data) {
            if (err)
                return res.status(500).json({serverMessage: 'File Does Not Exist.'});

            fs.unlinkSync(req.user.filepath + '/Blockly/' + req.params.Program_Name);

            res.status(200).json({
                serverMessage: 'Program Deleted Successfully'
            });
        });

    });
    // StartBlockly  Program
    app.post('/api/blockly/start', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StartBlocklyProgram(req.body.code, req.user.username, req.body.socketId);

        res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Stop Blockly Program
    app.post('/api/blockly/stop', authenticationMiddleware(), function (req, res) {

        var execute = fusionProgram.StopProgram(req.user.username);

        res.status(execute.status).json({
            serverMessage: execute.message
        });

    });
    // Get Specific Sample Program
    app.post('/api/blocklySamplePrograms', function(req, res){
        
        fs.readFile(req.body.filepath, 'utf8', function(err, contents) {
            
            if (err)
                return res.status(500).send('Error loading example');
            
            return res.status(200).send(contents);

        });

    });
    // Get Blockly Toolbar
    app.get('/api/blocklyToolbar', function (req, res) {
        
        var html = `<md-toolbar class="md-menu-toolbar" ng-cloak>
                        <div layout="row">
                            <div class="f-toolbar">
                                <h2 class="md-toolbar-tools">{{displaySaveSymbol(SelectedFile.NeedsSaving)}} {{SelectedFile.Name}}</h2>
                                <div>
                                    <md-menu-bar>
                                        <md-menu>
                                            <button ng-click="$mdMenu.open()" class="f-toolbar-item">File</button>
                                            <md-menu-content>
                                                <md-menu-item>
                                                    <md-button ng-click="NewBlocklyFile()">New</md-button>
                                                </md-menu-item>
                                                <md-menu-item>
                                                    <md-button ng-click="OpenFileDialog(ev)">Open</md-button>
                                                </md-menu-item>
                                                <md-menu-item>
                                                    <md-button ng-click="NewBlocklyFile()">Close</md-button>
                                                </md-menu-item>
                                                <md-menu-divider></md-menu-divider>
                                                <md-menu-item>
                                                    <md-button ng-click="SaveBlocklyFile()">Save</md-button>
                                                </md-menu-item>
                                                <md-menu-item>
                                                    <md-button ng-click="SaveAsDialog(ev)">Save As..</md-button>
                                                </md-menu-item>
                                                <md-menu-divider></md-menu-divider>
                                                <md-menu-item>
                                                    <md-button ng-click="DeleteDialog(ev)">Delete</md-button>
                                                </md-menu-item>
        <!--
                                                <md-menu-divider></md-menu-divider>
                                                <md-menu-item>
                                                    <md-button ng-click="PrintDialog()">Print</md-button>
                                                </md-menu-item>
        -->
                                            </md-menu-content>
                                        </md-menu>
                                        <md-menu>
                                            <button ng-click="$mdMenu.open()" class="f-toolbar-item">View</button>
                                            <md-menu-content>
                                                <md-menu-item class="md-indent">
                                                    <md-menu>
                                                        <md-button ng-click="$mdMenu.open()">Mode</md-button>
                                                        <md-menu-content width="3">
                                                            <md-menu-item type="radio" ng-model="Settings.Mode" value="beginner" ng-click="setToolbox()">Basic</md-menu-item>
                                                            <md-menu-item type="radio" ng-model="Settings.Mode" value="intermediate" ng-click="setToolbox()">Intermediate</md-menu-item>
                                                        </md-menu-content>
                                                    </md-menu>
                                                </md-menu-item>
                                                <md-menu-divider></md-menu-divider>
                                                <md-menu-item type="checkbox" ng-model="Settings.ShowConsole" ng-click="resizeBlockly()">Show Program Output</md-menu-item>
                                                <md-menu-item type="checkbox" ng-model="Settings.ShowCode" ng-click="resizeBlockly()">Show Code Window</md-menu-item>
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
                                            </md-menu-content>
                                        </md-menu>
                                        <button ng-click="runExistingBlocklyProgram()" class="f-toolbar-play-button f-toolbar-item"><i class="fa fa-play-circle fa-lg" aria-hidden="true"></i></button>
                                        <button ng-click="stopRunningBlocklyProgram()" class="f-toolbar-stop-button f-toolbar-item"><i class="fa fa-stop-circle fa-lg" aria-hidden="true"></i></button>
                                        <md-menu>
                                            <button ng-click="$mdMenu.open()" class="f-toolbar-item">Help</button>
                                            <md-menu-content>`
                                                + examplesHtml +
                                                `<md-menu-item>
                                                    <md-button ng-click="takeToBlocklyDocs()">Documentation</md-button>
                                                </md-menu-item>
                                            </md-menu-content>
                                        </md-menu>
                                    </md-menu-bar>
                                </div>
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