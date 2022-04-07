module.exports = function () {

    var dirTree = require('directory-tree');
    var fs = require('fs');
    var fse = require('fs-extra');
    var rimraf = require('rimraf');
    var crypto = require('crypto');
    var Archiver = require('archiver');
    var moment = require('moment');
    var path = require('path');
    const logger = require('../../utils/logger');
    const app = require('../../express');

    // File management routes
    app.route('/api/files', authenticationMiddleware())

        // Gets User Files
        .get(function (req, res) {

            // Creates tree from user's directory
            var tree = dirTree(req.user.filepath, {});

            // Iterates through tree adding info needed for jstree
            eachRecursive(tree, req);

            // Return tree
            return res.status(200).json([tree]);

        })

        // Handles all other file operations
        .post(function (req, res) {

            var operation = req.body.operation;

            // Get specific directory details
            if (operation == 'GET') {

                var list = [];
                var tree = dirTree(req.user.filepath + ((req.body.directory) ? '/' + req.body.directory.substr(req.user.username.length) : ''), {});

                // Chop children
                if (tree)
                    if (tree.type == 'directory') {
                        for (var i = 0; i < tree.children.length; i++) {
                            if (tree.children[i].children)
                                if (tree.children[i].children.length > 0)
                                    tree.children[i].children = [];
                            tree.children[i].size = tree.children[i].size + ' kb';
                            tree.children[i].id = crypto.createHash('md5').update(tree.children[i].path).digest('hex');
                            var pathIndex = tree.children[i].path.indexOf(req.user.username);
                            tree.children[i].path = tree.children[i].path.substring(pathIndex);
                            list.push(tree.children[i]);
                        }
                    }

                // Items found, loop and add stat data
                if (list.length > 0) {

                    for (let i = 0, p = Promise.resolve(); i < list.length; i++) {
                        p = p.then(function () {
                            return new Promise(
                                function (resolve) {

                                    // Read file stats
                                    fs.stat('app/filesystem/' + list[i].path, function (fileStatErr, stats) {
                                        if (fileStatErr) {
                                            logger.error('Error reading ' + list[i].name);
                                        } else {
                                            list[i].date = moment(stats.mtime).format('MM/DD/YY  h:mm:ss A');
                                        }

                                        // Check if last file
                                        if (i == list.length - 1) {

                                            return res.status(200).json(list);

                                        }

                                        resolve();

                                    });

                                }
                            );
                        });
                    }

                }
                // Return Empty list
                else {

                    return res.status(200).json(list);

                }

            } else if (operation == 'CREATE_FILE') {

                fs.writeFile(req.user.filepath + '/' + req.body.filename.replace(req.user.username, ""), '', function (err) {
                    if (err) {
                        return res.status(500).json({
                            serverMessage: err
                        });
                    } else {
                        return res.status(200).json({
                            serverMessage: req.body.filename.replace(/^.*[\\\/]/, '') + ' created'
                        });
                    }
                });

            } else if (operation == 'CREATE_FOLDER') {

                fs.mkdir(req.user.filepath + '/' + req.body.filename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/', function (err) {
                    if (err) {
                        return res.status(500).json({
                            serverMessage: err
                        });
                    } else {
                        return res.status(200).json({
                            serverMessage: req.body.filename.replace(/^.*[\\\/]/, '') + ' created'
                        });
                    }
                });

            } else if (operation == 'DELETE_FILE') {

                fs.unlink(req.user.filepath + '/' + req.body.filename.replace(req.user.username + '/', "").replace(req.user.username, ""), function (fileDeleteErr) {

                    if (fileDeleteErr) {
                        return res.status(500).json({
                            serverMessage: 'Error deleting file'
                        });
                    } else {
                        return res.status(200).json({
                            serverMessage: 'File deleted'
                        });
                    }

                });

            } else if (operation == 'DELETE_FOLDER') {

                rimraf(req.user.filepath + '/' + req.body.filename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/', function (deleteErr) {

                    if (deleteErr) {
                        return res.status(500).json({
                            serverMessage: 'Error deleting folder'
                        });
                    } else {
                        return res.status(200).json({
                            serverMessage: 'Folder deleted'
                        });
                    }

                });

            } else if (operation == 'DELETE_MULTI'){

                var files = req.body.files;
                
                for (let i = 0, p = Promise.resolve(); i < files.length; i++) {

                    p = p.then( function (){

                        return new Promise( function (resolve){

                            if (files[i].type == 'file'){

                                var filePath = req.user.filepath + '/' + files[i].path.replace(req.user.username + '/', "").replace(req.user.username, "");

                                fs.unlink( filePath, function (fileDeleteErr) {
        
                                    if (fileDeleteErr) {
                                        return res.status(500).json({
                                            serverMessage: 'Error deleting file ' + files[i].name
                                        });
                                    }
                                    else{

                                        if (i + 1 >= files.length){
                                            return res.status(200).json({serverMessage: 'All files deleted'});
                                        }

                                        resolve();
                                    }
                
                                });
        
                            } else{

                                var filePath = req.user.filepath + '/' + files[i].path.replace(req.user.username + '/', "").replace(req.user.username, "");
        
                                rimraf( filePath + '/', function (deleteErr) {
        
                                    if (deleteErr) {
                                        return res.status(500).json({
                                            serverMessage: 'Error deleting folder ' + files[i].name
                                        });
                                    }
                                    else{

                                        if (i + 1 >= files.length){
                                            return res.status(200).json({serverMessage: 'All files deleted'});
                                        }

                                        resolve();
                                    }
                
                                });
        
                            }

                        });

                    });

                }

            } else if (operation == 'COPY_FILE') {

                var filepath = req.body.filepath.replace(req.user.username + '/', "").replace(req.user.username, "");
                var workingDirectory = req.user.filepath + '/' + filepath.substring(0, Math.max(filepath.lastIndexOf("/"), filepath.lastIndexOf("\\")));
                var filename = filepath.replace(/^.*[\\\/]/, '');
                var newName = '';

                generateFileName(filename, workingDirectory).then(function (name) {

                    newName = name;

                    fse.copy(workingDirectory + '/' + filename, workingDirectory + '/' + newName, function (copyError) {

                        if (copyError) {
                            return res.status(500).json({
                                serverMessage: 'Error copying file'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'File copied'
                            });
                        }

                    });

                }, function (generateFileNameErr) {

                    return res.status(500).json({
                        serverMessage: 'Error generating filename'
                    });

                });

            } else if (operation == 'COPY_FOLDER') {

                var filepath = req.body.filepath.replace(req.user.username + '/', "").replace(req.user.username, "");
                var workingDirectory = req.user.filepath + '/' + filepath.substring(0, Math.max(filepath.lastIndexOf("/"), filepath.lastIndexOf("\\")));
                var filename = filepath.replace(/^.*[\\\/]/, '');
                var newName = '';

                generateDirName(filename, workingDirectory).then(function (name) {

                    newName = name;

                    fse.copy(workingDirectory + '/' + filename, workingDirectory + '/' + newName, function (copyError) {

                        if (copyError) {
                            return res.status(500).json({
                                serverMessage: 'Error copying file'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'File copied'
                            });
                        }

                    });

                }, function (generateFileNameErr) {

                    return res.status(500).json({
                        serverMessage: 'Error generating filename'
                    });

                });

            } else if (operation == 'MOVE_FILE') {

                var oldFile = req.user.filepath + '/' + req.body.oldFilename.replace(req.user.username + '/', "").replace(req.user.username, "");
                var newFile = req.user.filepath + '/' + req.body.newFilename.replace(req.user.username + '/', "").replace(req.user.username, "");
                var userDirectory = path.resolve( req.user.filepath);

                oldFile = path.normalize(oldFile);
                newFile = path.resolve( path.normalize(newFile));

                // Allowed to access this directory
                if ( newFile.indexOf(userDirectory) == 0){

                    fs.rename(oldFile, newFile, function (renameErr) {
                        if (renameErr) {
                            return res.status(500).json({
                                serverMessage: 'Error moving file'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'File moved'
                            });
                        }
                    });

                }
                // Outside of user scope
                else{

                    return res.status(500).json({serverMessage: 'Access to location denied'});

                }                

            } else if (operation == 'MOVE_FOLDER') {

                var oldFile = req.user.filepath + '/' + req.body.oldFilename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/';
                var newFile = req.user.filepath + '/' + req.body.newFilename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/';
                var userDirectory = path.resolve( req.user.filepath);

                oldFile = path.normalize(oldFile);
                newFile = path.resolve( path.normalize(newFile));

                // Allowed to access this directory
                if ( newFile.indexOf(userDirectory) == 0){

                    fs.rename(oldFile, newFile, function (renameErr) {
                        if (renameErr) {
                            return res.status(500).json({
                                serverMessage: 'Error moving folder'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'Folder moved'
                            });
                        }
                    });

                }
                // Outside of user scope
                else{

                    return res.status(500).json({serverMessage: 'Access to location denied'});

                }

            } else if (operation == 'RENAME_FILE') {

                var oldFile = req.user.filepath + '/' + req.body.oldFilename.replace(req.user.username + '/', "").replace(req.user.username, "");
                var newFile = req.user.filepath + '/' + req.body.newFilename.replace(req.user.username + '/', "").replace(req.user.username, "");
                var userDirectory = path.resolve( req.user.filepath);

                oldFile = path.normalize(oldFile);
                newFile = path.resolve( path.normalize(newFile));

                // Allowed to access this directory
                if ( newFile.indexOf(userDirectory) == 0){

                    fs.rename(oldFile, newFile, function (renameErr) {
                        if (renameErr) {
                            return res.status(500).json({
                                serverMessage: 'Error renaming file'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'File renamed'
                            });
                        }
                    });

                }
                // Outside of user scope
                else{

                    return res.status(500).json({serverMessage: 'Access to location denied'});

                }                

            } else if (operation == 'RENAME_FOLDER') {

                var oldFile = req.user.filepath + '/' + req.body.oldFilename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/';
                var newFile = req.user.filepath + '/' + req.body.newFilename.replace(req.user.username + '/', "").replace(req.user.username, "") + '/';
                var userDirectory = path.resolve( req.user.filepath);

                oldFile = path.normalize(oldFile);
                newFile = path.resolve( path.normalize(newFile));

                // Allowed to access this directory
                if ( newFile.indexOf(userDirectory) == 0){

                    fs.rename(oldFile, newFile, function (renameErr) {
                        if (renameErr) {
                            return res.status(500).json({
                                serverMessage: 'Error renaming folder'
                            });
                        } else {
                            return res.status(200).json({
                                serverMessage: 'Folder renamed'
                            });
                        }
                    });

                }
                // Outside of user scope
                else{

                    return res.status(500).json({serverMessage: 'Access to location denied'});

                }

            } else {

                return res.status(200).json({
                    serverMessage: 'in here else...'
                });

            }

        });

    app.route('/api/files/download')

        // Triggers file download
        .get(function (req, res) {

            var encodedData = req.param('d');
            var decodedData = JSON.parse(Buffer.from(encodedData, 'base64').toString("ascii"));

            var username = decodedData.username;
            var userfilepath = decodedData.userFilepath;
            var filepath = decodedData.filepath;
            var type = decodedData.type;

            if (type == 'file') {

                var file = userfilepath + '/' + filepath.replace(username + '/', "").replace(username, "");
                res.download(file);

            } else {

                var directoryPath = userfilepath + '/' + filepath.replace(username + '/', "").replace(username, "");

                // Get directory tree from desired folder
                var tree = dirTree(directoryPath, {});

                // Begin Zip archiver
                var zip = Archiver('zip');                

                // Listen for errors
                zip.on('error', function (err) {
                    res.status(500).send({
                        error: err.message
                    });
                });

                //set the archive name
                res.attachment(directoryPath.replace(/^.*[\\\/]/, '') + '.zip');

                // Pipes the zip stream
                zip.pipe(res);

                // Fetches directory
                zip.directory(directoryPath, directoryPath.replace(/^.*[\\\/]/, ''));

                // Finalizes zip
                zip.finalize();

            }

        });
    
    // Generates filename
    function generateFileName(name, workingDirectory) {

        return new Promise(function (resolve, reject) {

            fs.readdir(workingDirectory, function (readDirErr, items) {

                if (readDirErr) {
                    logger.error(readDirErr);
                    reject();
                } else {

                    var nameArray = name.split('.');
                    var filename = nameArray[0];
                    var counter = 1;
                    var extension = nameArray[1];

                    var newName = filename + counter + '.' + extension;

                    while (items.indexOf(newName) != -1) {
                        newName = filename + (++counter) + '.' + extension;
                    }

                    resolve(newName);

                }

            });

        });

    }

    // Generate directory name
    function generateDirName(name, workingDirectory) {

        return new Promise(function (resolve, reject) {

            fs.readdir(workingDirectory, function (readDirErr, items) {

                if (readDirErr) {
                    logger.error(readDirErr);
                    reject();
                } else {

                    var nameArray = name.split('.');
                    var filename = nameArray[0];
                    var counter = 1;

                    var newName = filename + counter;

                    while (items.indexOf(newName) != -1) {
                        newName = filename + (++counter);
                    }

                    resolve(newName);

                }

            });

        });

    }


    // Recursively creates directory tree
    function eachRecursive(obj, req) {
        if (obj.type == 'directory') {
            obj.id = crypto.createHash('md5').update(obj.path).digest('hex');
            obj.text = obj.name;
            if (obj.name == req.user.username)
                obj.state = {
                    selected: true,
                    opened: true
                };
            eachRecursive(obj.children, req);
        } else if (obj.constructor === Array) {
            for (var i = 0; i < obj.length; i++) {
                eachRecursive(obj[i], req);
            }
        } else if (obj.type == 'file') {
            obj.id = crypto.createHash('md5').update(obj.path).digest('hex');
            obj.text = obj.name;
            obj.icon = "jstree-file";
        }
    }


    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.status(401).send("User Unauthenticated");
            }
        };
    }

}();