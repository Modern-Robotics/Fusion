// app/fusionProgram.js

var spawn = require('child_process').spawn;

var python_process;

module.exports = function (io) {

    var fusionProgram = function () {};

    fusionProgram.runningProgram = null;

    fusionProgram.StartProgram = function (user, filePath, socketId) {

        if (!fusionProgram.runningProgram) {

            fusionProgram.runningProgram = {
                Code: null,
                Program: filePath,
                SocketId: socketId,
                User: user
            }

            start(filePath);

            console.log('Program is now running');

            return {
                status: 200,
                message: 'Program is now running'
            }

        } else {

            if (fusionProgram.runningProgram.User == user) {

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                fusionProgram.runningProgram = {
                    Code: null,
                    Program: filePath,
                    SocketId: socketId,
                    User: user
                }

                start(filePath);

                console.log('Program is now running');

                return {
                    status: 200,
                    message: 'Program is now running'
                }

            } else {

                console.log('Program already running');

                return {
                    status: 500,
                    message: 'Program already running'
                }

            }

        }

    }

    fusionProgram.StopProgram = function (user) {

        if (fusionProgram.runningProgram) {

            if (fusionProgram.runningProgram.User == user) {

                runningProgram = null;

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                console.log('Program is now stopped');

                return {
                    status: 200,
                    message: 'Program Successfully Stopped'
                }

            } else {

                console.log('Cannot stop another user program');

                return {
                    status: 500,
                    message: "Cannot stop another user's program."
                }

            }

        } else {

            console.log('No program running');

            return {
                status: 500,
                message: 'No Program Running'
            }
        }

    }

    fusionProgram.KillProgram = function () {

        fusionProgram.runningProgram = null;

        try {
            python_process.kill('SIGINT');
        } catch (err) {

        }

        console.log('Program is now stopped');

    }

    fusionProgram.StartBlocklyProgram = function (code, user, socketId) {

        if (!fusionProgram.runningProgram) {

            fusionProgram.runningProgram = {
                Code: code,
                Program: null,
                SocketId: socketId,
                User: user
            }

            blocklyStart(code);

            console.log('Blockly Program is now running');

            return {
                status: 200,
                message: 'Blockly Program is now running'
            }

        } else {

            if (fusionProgram.runningProgram.User == user) {

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                fusionProgram.runningProgram = {
                    Code: code,
                    Program: null,
                    SocketId: socketId,
                    User: user
                }

                blocklyStart(code);

                console.log('Blockly Program is now running');

                return {
                    status: 200,
                    message: 'Blockly Program is now running'
                }

            } else {

                console.log('Program already running');

                return {
                    status: 500,
                    message: 'Program already running'
                }

            }

        }

    }

    // Helper methods =============================================================
    function start(filePath) {

        python_process = spawn("python", ['-u', filePath], {
            stdio: 'pipe'
        });

        io.sockets.emit('program-running', {
            running: true,
            user: fusionProgram.runningProgram.User
        });

        python_process.stdout.on('data', function (data) {
            console.log(String(data));
            io.emit('console-output', {
                output: String(data)
            });
        });

        python_process.stderr.on('data', function (data) {
            console.log(String(data));
            io.emit('console-output', {
                output: String(data)
            });
            io.sockets.emit('program-running', {
                running: false,
                user: 'None'
            });
        });

        python_process.stdout.on('close', function (data) {
            console.log(String("> Program Finished!"));
            io.emit('console-output', {
                output: String("> Program Finished!\n")
            });
            io.sockets.emit('program-running', {
                running: false,
                user: 'None'
            });
        });

    }

    function blocklyStart(code) {

        python_process = spawn("python", ['-u', '-c', code], {
            stdio: 'pipe'
        });

        io.sockets.emit('program-running', {
            running: true,
            user: fusionProgram.runningProgram.User
        });

        python_process.stdout.on('data', function (data) {
            console.log(String(data));
            io.emit('blockly-console-output', {
                output: String(data)
            });
        });

        python_process.stderr.on('data', function (data) {
            console.log(String(data));
            io.emit('blockly-console-output', {
                output: String(data)
            });
            io.sockets.emit('program-running', {
                running: false,
                user: 'None'
            });
        });

        python_process.stdout.on('close', function (data) {
            console.log(String("> Program Finished!"));
            io.emit('blockly-console-output', {
                output: String("> Program Finished!\n")
            });
            io.sockets.emit('program-running', {
                running: false,
                user: 'None'
            });
        });

    }

    return fusionProgram;

}