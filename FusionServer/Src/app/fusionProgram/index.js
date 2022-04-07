const logger            = require('../utils/logger');
const io                = require('../socket');
const FusionSettings    = require('../global/fusionSettings');
const spawn             = require('child_process').spawn;
const shell             = require('shelljs');
const os                = require('os');
const path              = require('path');
let python_process      = null;


module.exports = function () {

    var fusionProgram = function () {};

    fusionProgram.StartProgram = function (user, filePath, socketId) {

        if (!FusionSettings.SocketVariables.fusion_program_running) {            

            FusionSettings.SocketVariables.fusion_program_running = {
                Code: null,
                Program: filePath,
                SocketId: socketId,
                User: user
            }

            start(filePath, user);

            logger.verbose('Program is now running');

            return {
                status: 200,
                message: 'Program is now running'
            }

        } else {

            if (FusionSettings.SocketVariables.fusion_program_running.User == user || FusionSettings.SocketVariables.fusion_program_running.SocketId == 'autonomous') {

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                FusionSettings.SocketVariables.fusion_program_running = {
                    Code: null,
                    Program: filePath,
                    SocketId: socketId,
                    User: user
                }

                start(filePath, user);

                logger.verbose('Program is now running');

                return {
                    status: 200,
                    message: 'Program is now running'
                }

            } else {

                logger.verbose('Program already running');

                return {
                    status: 500,
                    message: 'Program already running'
                }

            }

        }

    }

    fusionProgram.StopProgram = function (user) {

        if (FusionSettings.SocketVariables.fusion_program_running) {

            if (FusionSettings.SocketVariables.fusion_program_running.User == user || FusionSettings.SocketVariables.fusion_program_running.SocketId == 'autonomous') {

                FusionSettings.SocketVariables.fusion_program_running = null;                

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                logger.verbose('Program is now stopped');

                return {
                    status: 200,
                    message: 'Program Successfully Stopped'
                }

            } else {

                logger.verbose('Cannot stop another user program');

                return {
                    status: 500,
                    message: "Cannot stop another user's program."
                }

            }

        } else {

            logger.verbose('No program running');

            return {
                status: 500,
                message: 'No Program Running'
            }
        }

    }

    fusionProgram.KillProgram = function () {

        FusionSettings.SocketVariables.fusion_program_running = null;

        try {
            python_process.kill('SIGINT');
        } catch (err) {

        }

        logger.verbose('Program is now stopped');

    }

    fusionProgram.StartBlocklyProgram = function (code, user, socketId) {

        if (!FusionSettings.SocketVariables.fusion_program_running) {

            FusionSettings.SocketVariables.fusion_program_running = {
                Code: code,
                Program: null,
                SocketId: socketId,
                User: user
            }

            blocklyStart(code, user);

            logger.verbose('Blockly Program is now running');

            return {
                status: 200,
                message: 'Blockly Program is now running'
            }

        } else {

            if (FusionSettings.SocketVariables.fusion_program_running.User == user || FusionSettings.SocketVariables.fusion_program_running.SocketId == 'autonomous') {

                try {
                    python_process.kill('SIGINT');
                } catch (err) {

                }

                FusionSettings.SocketVariables.fusion_program_running = {
                    Code: code,
                    Program: null,
                    SocketId: socketId,
                    User: user
                }

                blocklyStart(code, user);

                logger.verbose('Blockly Program is now running');

                return {
                    status: 200,
                    message: 'Blockly Program is now running'
                }

            } else {

                logger.verbose('Program already running');

                return {
                    status: 500,
                    message: 'Program already running'
                }

            }

        }

    }

    fusionProgram.sendInput = function(input){

        python_process.stdin.write( input + "\n");

    }

    // Helper methods =============================================================
    function start(filePath, user) {

        let code = "import os\n" +
        `os.chdir('./app/filesystem/${user}/Editor')\n` +
        "import imp\n"+
        `imp.load_source('util', r'${path.resolve(filePath)}')`;

        python_process = spawn("python", [ '-u', '-B', '-c', code], {
            stdio: 'pipe'
        });

        io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);

        checkForGamepad();

        python_process.stdout.on('data', function (data) {
            logger.verbose(String(data).substring(0,data.lastIndexOf('\n')));
            io.emit('console-output', {
                output: String(data)
            });
        });

        python_process.stderr.on('data', function (data) {
            logger.verbose(String(data).substring(0,data.lastIndexOf('\n')));
            io.emit('console-output', {
                output: String(data)
            });
            io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);
            io.sockets.emit('gamepad-available', false);
        });

        python_process.stdout.on('close', function (data) {
            FusionSettings.SocketVariables.fusion_program_running = null;
            logger.verbose(String("> Program Finished!"));
            io.emit('console-output', {
                output: String("> Program Finished!\n")
            });
            io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);
            io.sockets.emit('gamepad-available', false);            
        });

    }

    function blocklyStart(code, user) {        

        let finalCode = "import os\n" +
        `os.chdir('./app/filesystem/${user}/Blockly')\n` +
        "import imp\n"+
        `${code}`;

        if (os.platform() != "win32") { 

            python_process = spawn("python", [ '-u', '-B', '-c', finalCode], {
                stdio: 'pipe'
            });
            
        } else {

            python_process = spawn("python", [ '-u', '-B', '-c', finalCode], {
                stdio: 'pipe'
            });

        }

        io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);

        checkForGamepad();

        python_process.stdout.on('data', function (data) {
            logger.verbose(String(data).substring(0,data.lastIndexOf('\n')));
            io.emit('blockly-console-output', {
                output: String(data)
            });
        });

        python_process.stderr.on('data', function (data) {
            logger.verbose(String(data).substring(0,data.lastIndexOf('\n')));
            io.emit('blockly-console-output', {
                output: String(data)
            });
            io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);
            io.sockets.emit('gamepad-available', false);
        });

        python_process.stdout.on('close', function (data) {
            FusionSettings.SocketVariables.fusion_program_running = null;
            logger.verbose(String("> Program Finished!"));
            io.emit('blockly-console-output', {
                output: String("> Program Finished!\n")
            });
            io.sockets.emit('program-running', FusionSettings.SocketVariables.fusion_program_running);
            io.sockets.emit('gamepad-available', false);            
        });

    }

    function checkForGamepad(){
        if (os.platform() != "win32") {

            setTimeout(function(){
								
				var gamepadStatus = shell.exec('sudo netstat -panp | grep 5000 | grep LISTEN', {silent:true}).stdout;
				
				if (!gamepadStatus)
					FusionSettings.SocketVariables.fusion_gamepad_available = false;
				else
					FusionSettings.SocketVariables.fusion_gamepad_available = true;
                
                io.sockets.emit('gamepad-available', FusionSettings.SocketVariables.fusion_gamepad_available);

            }, 1000);

        }

    }

    return fusionProgram;

}();