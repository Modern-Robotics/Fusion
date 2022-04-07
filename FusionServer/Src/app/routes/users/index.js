

var SCP = require('scp2');
var SSH = require('ssh2').Client;
var fs = require('fs-extra');
var path = require('path');
var rp = require('request-promise');
const classroomConnection   = require('../../classroom/connection');
const logger = require('../../utils/logger');

const app               = require('../../express');
const User              = require('../../models/user');
const passport          = require('passport');
const FusionSettings    = require('../../global/fusionSettings');
const fusionProgram     = require('../../fusionProgram');


module.exports = function () {

    // api route for users =====================================================
    // Get Users
    app.get('/api/users', authenticationMiddleware(), function (req, res) {
        User.find({
            usergroup: {
                $ne: 'Guest'
            }
        }, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
    // Create User
    app.post('/api/users', async function(req, res, next){

        await standardAccountCreation(req, res, next);

    });

    async function standardAccountCreation(req, res, next) {

        passport.authenticate('local-signup', async function(err, user, info){

            if (err)
                return res.status(500).send(err);

            if (info && info.message)
                return res.status(500).send(req.__(info.message));

            if (FusionSettings.MultiUserAccess){

                if ( classroomConnection.connected){
                    
                    try {

                        await downloadClassroomFiles(user);
    
                    } catch (syncFileError) {
    
                        logger.error(syncFileError);
    
                    }

                }

                req.logIn(user, function(err) {

                    if (err) { 
                        return next(err); 
                    }

                    mapUserToSocket(req.body.socketId, user);
        
                    return res.status(200).json({
                        serverMessage: req.__('REGISTER.CREATED'),
                        user: user
                    });

                });
    
            }
            else{
    
                if (usersLoggedIn() == 0){
    
                    if ( classroomConnection.connected){
                        
                        try {

                            await downloadClassroomFiles(user);
        
                        } catch (syncFileError) {
        
                            logger.error(syncFileError);
        
                        }

                    }
            
                    req.logIn(user, function(err) {

                        if (err) { 
                            return next(err); 
                        }
    
                        mapUserToSocket(req.body.socketId, user);
            
                        return res.status(200).json({
                            serverMessage: req.__('REGISTER.CREATED'),
                            user: user
                        });
    
                    });
    
                }
                else{
    
                    return res.status(500).send(req.__('REGISTER.CREATED_BUT_MAX_LOGIN_EXCEEDED'));
    
                }
    
            }

        })(req, res, next);

    };


    app.post('/api/users', passport.authenticate('local-signup', {
        session: true
    }), function (req, res) {

        if (req.user.Error) {

            return res.status(500).send(req.user.Error);

        } else {

            
        }

    });
    // Get User
    app.get('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {
        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
    // Update User
    app.put('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {
        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                res.send(err);

            if (req.body.password) {
                user.password = user.generateHash(req.body.password);
            }
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            if (req.body.language) {
                user.language = req.body.language;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.defaultprogramminglanguage) {
                user.defaultprogramminglanguage = req.body.defaultprogramminglanguage;
            }
            if (req.body.securityquestion) {
                user.securityquestion = req.body.securityquestion;
            }
            if (req.body.securityanswer) {
                user.securityanswer = req.body.securityanswer;
            }
            if (req.body.usergroup) {
                user.usergroup = req.body.usergroup;
            }

            user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                res.status(200).json({
                    serverMessage: 'User updated!'
                });
            });
        });
    });
    // Delete User
    app.delete('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {

        // Check if deleted user is logged in user
        if (req.params.User_Id.toLowerCase().trim() == req.user.username){

            // Log out protocol
            if (FusionSettings.SocketVariables.fusion_program_running)
                if (FusionSettings.SocketVariables.fusion_program_running.User == req.user.username)
                    fusionProgram.KillProgram();

            UnMapSocketByUser(req.user.username);

            req.logout();

        }

        User.remove({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                return res.send(err);

            User.removeFileSystem(req.params.User_Id.toLowerCase().trim());

            return res.status(200).json({
                serverMessage: 'Successfully deleted'
            });
        });

    });


    // Login User
    app.post('/api/users/login', async (req, res, next) => {

        // Check if login attempt meets configuration requirements
        if (!FusionSettings.MultiUserAccess && usersLoggedIn() > 0 )
            return res.status(500).send(req.__('LOGIN.MULTIUSER_DENIED'));

        // Standard login
        if (!classroomConnection.connected) {

            logger.debug('Attempting standard login');

            await standardAuthentication(req, res, next);

        } 
        // Classroom login
        else {

            logger.debug('Attempting classroom login');

            if (req.body.username == 'mriguest' && req.body.password == 'mriguest') {
                return res.status(500).send('Guest login unavailable in classroom mode');
            }

            let options = {
                method: 'POST',
                uri: 'https://172.16.0.1/backend/auth/ldap',
                body: {
                    username: req.body.username,
                    password: req.body.password
                },
                json: true,
                rejectUnauthorized: false,
                timeout: 5000
            };

            try {

                // Send authentication request to classroom API
                await rp(options);
    
                // Check if user exists locally
                let user = await User.findOne({'username' : req.body.username}).exec();
    
                if (user) {

                    await standardAuthentication(req, res, next);

                }
                else {

                    // Set default account values
                    req.body.securityquestion = 'Who is your favorite actor, musician, or artist?';
                    req.body.securityanswer = req.body.username;
                    req.body.usergroup = 'User';

                    await standardAccountCreation(req, res, next);

                }
    
            }
            catch (requestPromiseErr) {

                logger.info('Error with request promise. ' + requestPromiseErr);

                if (requestPromiseErr.name == 'StatusCodeError') {
                    return res.status(401).send(req.__('LOGIN.INVALID'));
                } else if (requestPromiseErr.name == 'RequestError') {
                    return res.status(500).send('Error reaching classroom server');
                } else {
                    return res.status(500).send(requestPromiseErr.message);
                }
    
            }

        }

    });

    async function standardAuthentication(req, res, next) {

        // Authenticate credentials locally
        passport.authenticate('local-login', async function(err, user, info) {

            // Check if an error was returned
            if (err)
                return res.status(500).send(req.__(err.message));

            // Check if a user was returned
            if (!user)
                return res.status(401).send(req.__(info.message));                

            // Set login session
            req.logIn(user, async function(err) {

                if (err) { 
                    return next(err); 
                }

                // Maps user to socket id session
                mapUserToSocket(req.body.socketId, user);

                try {

                    if (classroomConnection.connected)
                        await downloadClassroomFiles(user);

                } catch (syncFileError) {

                    logger.error(syncFileError);

                }
    
                return res.status(200).json({
                    serverMessage: req.__('LOGIN.SUCCESS'),
                    user: user
                });

            });          

        })(req, res, next);

    };

    // Logout User
    app.post('/api/users/logout', authenticationMiddleware(), function (req, res) {

        if (FusionSettings.SocketVariables.fusion_program_running)
            if (FusionSettings.SocketVariables.fusion_program_running.User == req.user.username)
                fusionProgram.KillProgram();

        UnMapUserToSocket(req.body.socketId);

        req.logout();

        res.status(200).json({
            serverMessage: 'Logged out successfully'
        });

    });
    // Get User Security Question
    app.get('/api/recovery/:User_Id', function (req, res) {

        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(500).send("User does not exist");
            else
                return res.status(200).json(user.securityquestion);
        });

    });
    // Logs user in using correct security answer
    app.post('/api/recovery', passport.authenticate('local-recovery', {
        session: true
    }), async function (req, res) {

        if (FusionSettings.MultiUserAccess){

            if ( classroomConnection.connected){
                
                try {

                    await downloadClassroomFiles(user);

                } catch (syncFileError) {

                    logger.error(syncFileError);

                }

            }        

            mapUserToSocket(req.body.socketId, req.user);
    
            return res.status(200).json({
                serverMessage: "Login Successful",
                user: req.user
            });

        }
        else{

            if (usersLoggedIn() == 0){

                mapUserToSocket(req.body.socketId, req.user);

                if ( classroomConnection.connected){
                    
                    try {

                        await downloadClassroomFiles(user);
    
                    } catch (syncFileError) {
    
                        logger.error(syncFileError);
    
                    }

                }
        
                return res.status(200).json({
                    serverMessage: "Login Successful",
                    user: req.user
                });

            }
            else{

                req.logout();

                return res.status(500).send('Another user is already logged in.');

            }

        }

    });
    // Gets allowed user groups
    app.get('/api/allowedUserGroups', function (req, res) {

        var usergroups = ['User'];

        User.findOne({
            'usergroup': 'Admin'
        }, function (err, user) {
            if (err)
                return res.status(200).send(usergroups);

            if (!user)
                usergroups.unshift('Admin');

            return res.status(200).send(usergroups);

        });

    });

    // Catches passed classroom user before forwarding to normal login
    app.get('/User/Login', async (req, res, next) => {

        //let queryStringData = req.query.d;

        // Checks if query parameter was found
        // if (queryStringData) {

        //     let userData = JSON.parse(Buffer.from(queryStringData, 'base64'));

        //     console.log('Data found for username: ' + userData.username);

        //     // Try to locate user
        //     let user = await User.findOne({username: userData.username});

        //     // User exists
        //     if (user) {

        //         // Attempt auto login
        //         console.log('Try to auto login');

        //     }

        // }        

        next();

    });

    function usersLoggedIn(){

        var count = 0;

        for (var i = 0; i < FusionSettings.connectedClients.length; i++){
            if (FusionSettings.connectedClients[i].User){
                count++;
            }
        }

        return count;

    }

    function mapUserToSocket(socket, user){

        for (var i = 0; i < FusionSettings.connectedClients.length; i++){
            if (FusionSettings.connectedClients[i].id == socket){
                FusionSettings.connectedClients[i].User = user;
                break;
            }
        }

    }

    function UnMapUserToSocket(socket){

        for (var i = 0; i < FusionSettings.connectedClients.length; i++){
            if (FusionSettings.connectedClients[i].id == socket){
                FusionSettings.connectedClients[i].User = undefined;
                break;
            }
        }

    }

    function UnMapSocketByUser(user){

        for (var i = 0; i < FusionSettings.connectedClients.length; i++){
            if (FusionSettings.connectedClients[i].User.username == user){
                FusionSettings.connectedClients[i].User = undefined;
                break;
            }
        }

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

    async function downloadClassroomFiles(user) {

        try {

            await checkForClassroomFileSystem(user);

        }
        catch (downloadClassroomFilesErr) {

            logger.error('Error downloading classroom files for ' + user.username);

        }

    };

    function checkForClassroomFileSystem(user) {
        return new Promise(function(resolve, reject){
            var conn = new SSH();
            conn.on('ready', function() {

                conn.sftp(async function(sshErr, sftp) {

                    if (sshErr) {
                        logger.error('Error communicating with c3: ' + sshErr);
                        conn.end();
                        return reject(sshErr);
                    }

                    try {
                        // Verify file system
                        await verifyFileSystem(sftp);
                        await verifyUserFileSystem(sftp, user.username);
                        await verifyUserEditor(sftp, user.username);
                        await verifyUserBlockly(sftp, user.username);

                        let remoteFiles = await getRemoteFiles(sftp, user.username);
                        logger.debug(JSON.stringify(remoteFiles));

                        let localFiles = await getLocalFiles(user.filepath);
                        logger.debug(JSON.stringify(localFiles));
                        
                        await mergeFiles(sftp, user, remoteFiles, localFiles);

                        conn.end();
                        return resolve();

                    }
                    catch(verifyError)  {

                        logger.info(verifyError);
                        conn.end();
                        return reject(verifyError);

                    }

                });

            }).connect({
                host: '172.16.0.1',
                port: 22,
                username: 'c3',
                password: 'root'
            });

        });
    };

    function verifyFileSystem(sftp) {
        return new Promise(function(resolve, reject){
            // Try reading directory
            sftp.readdir('/home/c3/FusionFilesystem/', function(errorReadingFusionFileSystem){
                // File system not found
                if (errorReadingFusionFileSystem) {
                    // Try to create
                    sftp.mkdir('/home/c3/FusionFilesystem/', function(errorCreatingFusionFileSystem){
                        // Check for creation error
                        if ( errorCreatingFusionFileSystem ) {
                            return reject('Error creating classroom file system: ' + errorCreatingFusionFileSystem);
                        }
                        // File system created
                        else {
                            logger.verbose('Classroom file system created');
                            return resolve();
                        }
                    });
                }
                // File system found
                else {
                    logger.verbose('Classroom file system found');
                    return resolve();
                }
            });
        });
    };

    function verifyUserFileSystem(sftp, username) {
        return new Promise(function(resolve, reject){
            // Try reading directory
            sftp.readdir('/home/c3/FusionFilesystem/' + username, function(errorReadingUserFileSystem){
                // User file system not found
                if (errorReadingUserFileSystem) {
                    // Try to create
                    sftp.mkdir('/home/c3/FusionFilesystem/' + username, function(errorCreatingUserFileSystem){
                        // Check for creation error
                        if ( errorCreatingUserFileSystem ) {
                            return reject('Error creating user\'s classroom file system: ' + errorCreatingUserFileSystem);
                        }
                        // File system created
                        else {
                            logger.verbose('User\'s classroom file system created');
                            return resolve();
                        }
                    });
                }
                // File system found
                else {
                    logger.verbose('User\'s classroom file system found');
                    return resolve();
                }
            });
        });
    };

    function verifyUserEditor(sftp, username) {
        return new Promise(function(resolve, reject){
            // Try reading directory
            sftp.readdir('/home/c3/FusionFilesystem/' + username + '/Editor/', function(errorReadingUserEditorDirectory){
                // User editor directory not found
                if (errorReadingUserEditorDirectory) {
                    // Try to create
                    sftp.mkdir('/home/c3/FusionFilesystem/' + username + '/Editor/', function(errorCreatingUserEditorDirectory){
                        // Check for creation error
                        if ( errorCreatingUserEditorDirectory ) {
                            return reject('Error creating user\'s editor directory: ' + errorCreatingUserEditorDirectory);
                        }
                        // Editor Directory created
                        else {
                            logger.verbose('User\'s editor directory created');
                            return resolve();
                        }
                    });
                }
                // Editor directory found
                else {
                    logger.verbose('User\'s editor directory found');
                    return resolve();
                }
            });
        });
    };

    function verifyUserBlockly(sftp, username) {
        return new Promise(function(resolve, reject){
            // Try reading directory
            sftp.readdir('/home/c3/FusionFilesystem/' + username + '/Blockly/', function(errorReadingUserBlocklyDirectory){
                // User blockly directory not found
                if (errorReadingUserBlocklyDirectory) {
                    // Try to create
                    sftp.mkdir('/home/c3/FusionFilesystem/' + username + '/Blockly/', function(errorCreatingUserBlocklyDirectory){
                        // Check for creation error
                        if ( errorCreatingUserBlocklyDirectory ) {
                            return reject('Error creating user\'s blockly directory: ' + errorCreatingUserBlocklyDirectory);
                        }
                        // Blockly directory created
                        else {
                            logger.verbose('User\'s blockly directory created');
                            return resolve();
                        }
                    });
                }
                // Blockly directory found
                else {
                    logger.verbose('User\'s blockly directory found');
                    return resolve();
                }
            });
        });
    };

    function getRemoteFiles(sftp, username) {
        return new Promise(async function(resolve, reject){
            try {
                let files = {};
                files.Editor = await getRemoteEditorFiles(sftp, username);
                files.Blockly = await getRemoteBlocklyFiles(sftp, username);
                return resolve(files);
            }
            catch(getRemoteFilesError) {
                return reject(getRemoteFilesError);
            }
        });
    };

    function getRemoteEditorFiles(sftp, username) {
        return new Promise(function(resolve, reject){

            sftp.readdir('/home/c3/FusionFilesystem/' + username + '/Editor/', function(errorReadingEditorFiles, fileList) {

                // Check for error
                if (errorReadingEditorFiles)
                    return reject(errorReadingEditorFiles);


                let editorFiles = [];

                // Loop through list getting stats
                for ( let i = 0; i < fileList.length; i++) {

                    logger.debug('Getting data for ' + fileList[i].filename);
                    editorFiles.push(fileList[i]);

                }

                return resolve(editorFiles);

            });
        });
    };

    function getRemoteBlocklyFiles(sftp, username) {
        
        return new Promise(function(resolve, reject){

            sftp.readdir('/home/c3/FusionFilesystem/' + username + '/Blockly/', function(errorReadingBlocklyFiles, fileList) {

                // Check for error
                if (errorReadingBlocklyFiles)
                    return reject(errorReadingBlocklyFiles);


                let blocklyFiles = [];

                // Loop through list getting stats
                for ( let i = 0; i < fileList.length; i++) {

                    logger.debug('Getting data for ' + fileList[i].filename);
                    blocklyFiles.push(fileList[i]);

                }

                return resolve(blocklyFiles);

            });
        });

    };

    function getLocalFiles(userFilePath) {
        return new Promise(async function(resolve, reject){
            try {
                let files = {};
                files.Editor = await getLocalEditorFiles(userFilePath);
                files.Blockly = await getLocalBlocklyFiles(userFilePath);
                return resolve(files);
            }
            catch(getRemoteFilesError) {
                return reject(getRemoteFilesError);
            }
        });
    };

    function getLocalEditorFiles(userFilePath) {
        return new Promise(async function(resolve, reject){
            try {
                let editorFiles = [];
                let fileList = await fs.readdir(userFilePath + '/Editor');
                for ( let i = 0; i < fileList.length; i++){
                    logger.debug('Getting data for ' + fileList[i]);
                    let fileData = await fs.stat(userFilePath + '/Editor/' + fileList[i]);
                    fileData.name = fileList[i];
                    editorFiles.push(fileData);
                }
                return resolve(editorFiles);
            }
            catch(getEditorFilesError) {
                return reject(getEditorFilesError);
            }
        });
    };

    function getLocalBlocklyFiles(userFilePath) {
        return new Promise(async function(resolve, reject){
            try {
                let blocklyFiles = [];
                let fileList = await fs.readdir(userFilePath + '/Blockly');
                for ( let i = 0; i < fileList.length; i++){
                    logger.debug('Getting data for ' + fileList[i]);
                    let fileData = await fs.stat(userFilePath + '/Blockly/' + fileList[i]);
                    fileData.name = fileList[i];
                    blocklyFiles.push(fileData);
                }
                return resolve(blocklyFiles);
            }
            catch(getBlocklyFilesError) {
                return reject(getBlocklyFilesError);
            }
        });
    };

    function mergeFiles(sftp, user, remoteFiles, localFiles) {
        return new Promise(async function(resolve, reject){

            try {

                // Merge Editor Files
                for ( let i = 0; i < remoteFiles.Editor.length; i++ ) {

                    let common = false;

                    for ( let j = 0; j < localFiles.Editor.length; j++) {

                        if ( localFiles.Editor[j].name == remoteFiles.Editor[i].filename ) {

                            logger.debug(`Local mtime: ${Math.floor(localFiles.Editor[j].mtimeMs/1000)}`);
                            logger.debug(`Remote mtime: ${remoteFiles.Editor[i].attrs.mtime}`);
                           
                            if ( Math.floor(localFiles.Editor[j].mtimeMs/1000) > remoteFiles.Editor[i].attrs.mtime ) {

                                common = true;
                                logger.debug(`Local "${localFiles.Editor[j].name}" newer, updating classroom version`);

                                try {
                                    await updateRemote(sftp, user, remoteFiles.Editor[i].filename, 'Editor');
                                }
                                catch(mergeErr) {
                                    return reject(mergeErr);
                                }
                                break;

                            }
                            else {

                                common = true;
                                logger.debug(`Remote "${localFiles.Editor[j].name}" newer, updating local version`);
                                try {
                                    await updateLocal(sftp, user, remoteFiles.Editor[i].filename, 'Editor');
                                }
                                catch(mergeErr) {
                                    logger.error(`Error: ` + mergeErr);
                                    return reject(mergeErr);
                                }
                                break;

                            }

                        }

                    }

                    if (!common) {

                        logger.debug(`${remoteFiles.Editor[i].filename} not a common file!`);
                        try {
                            await updateLocal(sftp, user, remoteFiles.Editor[i].filename, 'Editor');
                        }
                        catch(mergeErr) {
                            return reject(mergeErr);
                        }

                    }

                }

                // Merge Blockly Files
                for ( let i = 0; i < remoteFiles.Blockly.length; i++ ) {

                    let common = false;

                    for ( let j = 0; j < localFiles.Blockly.length; j++) {

                        if ( localFiles.Blockly[j].name == remoteFiles.Blockly[i].filename ) {

                            logger.debug(`Local mtime: ${Math.floor(localFiles.Blockly[j].mtimeMs/1000)}`);
                            logger.debug(`Remote mtime: ${remoteFiles.Blockly[i].attrs.mtime}`);
                           
                            if ( Math.floor(localFiles.Blockly[j].mtimeMs/1000) > remoteFiles.Blockly[i].attrs.mtime ) {

                                common = true;
                                logger.debug(`Local "${localFiles.Blockly[j].name}" newer, updating classroom version`);

                                try {
                                    await updateRemote(sftp, user, remoteFiles.Blockly[i].filename, 'Blockly');
                                }
                                catch(mergeErr) {
                                    return reject(mergeErr);
                                }
                                break;

                            }
                            else {

                                common = true;                                
                                logger.debug(`Remote "${localFiles.Blockly[j].name}" newer, updating local version`);
                                try {
                                    await updateLocal(sftp, user, remoteFiles.Blockly[i].filename, 'Blockly');
                                }
                                catch(mergeErr) {
                                    logger.error(`Error: ` + mergeErr);
                                    return reject(mergeErr);
                                }
                                break;

                            }

                        }

                    }

                    if (!common) {

                        logger.debug(`${remoteFiles.Blockly[i].filename} not a common file!`);
                        try {
                            await updateLocal(sftp, user, remoteFiles.Blockly[i].filename, 'Blockly');
                        }
                        catch(mergeErr) {
                            return reject(mergeErr);
                        }

                    }

                }                

                return resolve();

            }
            catch (mergeFileError) {

                return reject(mergeFileError);

            }

        });
    };

    function updateRemote(sftp, user, filename, type) {
        return new Promise((resolve, reject) => {
            try {
                let remotePath = `/home/c3/FusionFilesystem/${user.username}/${type}/${filename}`;
                let localPath = `${user.filepath}/${type}/${filename}`;
                logger.debug(`Remote path: ${remotePath}`);
                logger.debug(`Local Path: ${localPath}`);
                sftp.fastPut(localPath, remotePath, {}, function(fastGetError) {
                    if (fastGetError){
                        logger.error('Error uploading file: ' + filename);
                        return reject(fastGetError);
                    }
                    logger.debug(`Uploaded ${filename}`);
                    return resolve();
                });
            }
            catch (error) {
                return reject(error);
            }
        });
    };

    function updateLocal(sftp, user, filename, type) {
        return new Promise((resolve, reject) => {
            try {
                let remotePath = `/home/c3/FusionFilesystem/${user.username}/${type}/${filename}`;
                let localPath = `${user.filepath}/${type}/${filename}`;
                logger.debug(`Remote path: ${remotePath}`);
                logger.debug(`Local Path: ${localPath}`);
                sftp.fastGet(remotePath, localPath, {}, function(fastGetError) {
                    if (fastGetError){
                        logger.error('Error downloading file: ' + filename);
                        return reject(fastGetError);
                    }
                    logger.debug(`Retrieved ${filename}`);
                    return resolve();
                });
            }
            catch (error) {
                return reject(error);
            }
        });
    };

    function createUserDirectory(sftp, user, conn, cb) {

        // Check if user directory exists
        sftp.readdir('/home/c3/FusionFilesystem/' + user.username , function(errorReadingUserFileSystem){

            if ( errorReadingUserFileSystem ) {

                logger.info('Error reading user file system: ' + errorReadingUserFileSystem);

                // Create user directory
                sftp.mkdir('/home/c3/FusionFilesystem/' + user.username, function(errorCreatingUserFileSystem){

                    if ( errorCreatingUserFileSystem) {

                        logger.info('Error creating user file system: ' + errorCreatingUserFileSystem);

                        throw errorCreatingUserFileSystem;

                    }

                    logger.info('User c3 directory created');

                    // Create user editor directory
                    sftp.mkdir('/home/c3/FusionFilesystem/' + user.username + '/Editor/', function(errorCreatingEditorDir){

                        if ( errorCreatingEditorDir) {

                            logger.info('Error creating editor directory: '  + errorCreatingEditorDir);

                            throw errorCreatingEditorDir;

                        }

                        logger.info('Editor directory created');

                        // Create user blockly directory
                        sftp.mkdir('/home/c3/FusionFilesystem/' + user.username + '/Blockly/', function(errorCreatingBlocklyDir){

                            if ( errorCreatingBlocklyDir) {

                                logger.info('Error creating blockly directory: '  + errorCreatingBlocklyDir);

                                throw errorCreatingBlocklyDir;

                            }

                            logger.info('Blockly directory created');

                            cb(sftp, user, conn);

                        });

                    });

                });

            }

            cb(sftp, user, conn);

        });

    };

    function pullClassroomFiles(sftp, user, conn) {

        sftp.readdir('/home/c3/FusionFilesystem/' + user.username + '/Editor/', function(err2, list) {
            if (err2) {

                logger.info('Error reading classroom editor files: ' + err2);
                throw err2;

            }
            retrieveFiles(user, 'Editor', list, conn);
            });

            sftp.readdir('/home/c3/FusionFilesystem/' + user.username + '/Blockly/', function(err2, list) {
            if (err2) {

                logger.info('Error reading classroom blockly files: ' + err2);
                throw err2;

            }
            retrieveFiles(user, 'Blockly', list, conn);                
        });

    };

    function retrieveFiles(user, type, list, conn){

        logger.info('Retrieving files');

        if ((type == 'Blockly') && (list.length == 0)){
            conn.end();
        }

        for ( var i = 0; i < list.length; i++){

            let c3FilePath = '/home/c3/FusionFilesystem/' + user.username + '/' + type + '/' + list[i].filename;
            let fusionFilePath = 'app/filesystem/' + user.username +'/' + type + '/';

            logger.info('Moving: ' + c3FilePath + ' to ' + fusionFilePath);

            SCP.scp('c3:root@172.16.0.1:' + c3FilePath, fusionFilePath, function(err) {

                if (err){

                    logger.info('Error downloading: ' + c3FilePath + ', error: ' + err);

                }
                
                if ((type == 'Blockly') && (i = list.length - 1)){
                    conn.end();
                }

            });

        }

    };

}();