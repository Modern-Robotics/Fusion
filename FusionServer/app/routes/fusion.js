module.exports = function (app, io) {

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
                console.log(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stderr.on('data', function (data) {
                console.log(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stdout.on('close', function (data) {
                console.log(String("Update Finished!"));
            });


        } catch (err) {
            console.log(err);
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
                console.log(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stderr.on('data', function (data) {
                console.log(String(data));
                io.emit('update-output', {
                    output: String(data)
                });
            });

            update_script.stdout.on('close', function (data) {
                console.log(String("Restore Finished!"));
            });


        } catch (err) {
            console.log(err);
        }

        res.status(200).send("Restore starting");

    });

    // Restores Fusion
    app.get('/api/fusion/releaseNotes', function (req, res) {

        try {
            var spawn = require('child_process').spawn;

            var changeLog = '';

            var success = true;

            var changelogScript = spawn("git", ['log', '--pretty=format:"[%cd] (%h) : %s"', '--date=short', '--no-merges'], {
                stdio: 'pipe'
            });

            changelogScript.stdout.on('data', function (data) {
                changeLog += data + "\n";
            });

            changelogScript.stderr.on('data', function (data) {
                console.log(String(data));
                success = false;
            });

            changelogScript.stdout.on('close', function (data) {

                var changeLogArray = changeLog.split("\n\n");

                for (var i = 0; i < changeLogArray.length; i++) {

                    // var test = changeLogArray[i];
                    // test = test.replace(/"/g, '');
                    //test = test.replace(/"/g, '');
                    changeLogArray[i] = changeLogArray[i].replace(/"/g, '');

                }

                changeLog = changeLogArray.join('\n');

                if (success)
                    res.status(200).json({
                        data: changeLog
                    });
                else
                    res.status(500).send('Error Reading changelog');

            });


        } catch (err) {
            console.log(err);
        }

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

};