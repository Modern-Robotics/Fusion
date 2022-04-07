// Dependencies
const logger = require('../../utils/logger');
const app = require('../../express');
const io    = require('../../socket');
const fs    = require('fs-extra');
const path  = require('path');
const marked    = require('marked');
const os        = require('os');
const shell     = require('shelljs');


module.exports = function () {

    // api routes for settings =================================================
    // Update Fusion
    app.get('/api/fusion/update', authenticationMiddleware(), function (req, res) {

        try {
            var spawn = require('child_process').spawn;

            var linux_update_path = "scripts/updateFusion.sh";

            var update_script = spawn("sudo", ['bash', linux_update_path], {
                stdio: 'pipe'
            });

            update_script.stdout.on('data', function (data) {
                logger.info(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stderr.on('data', function (data) {
                logger.info(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stdout.on('close', function (data) {
                logger.info(String("Update Finished!"));
            });


        } catch (err) {
            logger.info(err);
        }

        res.status(200).send("Update starting");

    });

    // Update Fusion
    app.get('/api/fusion/restore', authenticationMiddleware(), function (req, res) {

        try {
            var spawn = require('child_process').spawn;

            var linux_update_path = "scripts/restoreFusion.sh";

            var update_script = spawn("sudo", ['bash', linux_update_path], {
                stdio: 'pipe'
            });

            update_script.stdout.on('data', function (data) {
                logger.info(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stderr.on('data', function (data) {
                logger.info(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stdout.on('close', function (data) {
                logger.info(String("Restore Finished!"));
            });


        } catch (err) {
            logger.info(err);
        }

        res.status(200).send("Restore starting");

    });

    // Restores Fusion
    app.get('/api/fusion/releaseNotes', async function (req, res) {

        try {

            let version = shell.exec('git log --pretty=format:"[%cd] (%h) : %s" --date=short --no-merges -1');
            let versionDiv = `<div style="border:1px solid gray">${version}</div>`;
            let changeLog = await fs.readFile(path.join(__dirname, './../../../../../README.md'), 'utf-8');

            return res.status(200).json({version: version, changeLog: marked(changeLog)});

            
        } catch(error) {

            logger.error('Error reading release notes: ' + error);
            return res.status(500).send('Error getting release notes');            

        }

        
        // var spawn = require('child_process').spawn;

        // var changeLog = '';

        // var success = true;

        // var changelogScript = spawn("git", ['log', '--pretty=format:"[%cd] (%h) : %s"', '--date=short', '--no-merges', '-1'], {
        //     stdio: 'pipe'
        // });

        // changelogScript.stdout.on('data', function (data) {
        //     changeLog += data + "\n";
        // });

        // changelogScript.stderr.on('data', function (data) {
        //     logger.info(String(data));
        //     success = false;
        // });

        // changelogScript.stdout.on('close', function (data) {

        //     var changeLogArray = changeLog.split("\n\n");

        //     for (var i = 0; i < changeLogArray.length; i++) {

        //         changeLogArray[i] = changeLogArray[i].replace(/"/g, '');

        //     }

        //     changeLog = changeLogArray.join('\n');

        //     if (success)
        //         res.status(200).json({
        //             data: changeLog
        //         });
        //     else
        //         res.status(500).send('Error Reading changelog');

        // });

    });

    // api route for cookie authentication ====================================
    app.get('/api/cookie', authenticationMiddleware(), function (req, res) {

        res.status(200).send(req.user);

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

}();