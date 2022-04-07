// app/components/blockly/blocklyCtrl.js

angular
    .module('fusionApp')
    .controller('blocklyCtrl', ['$scope', 'appFactory', 'blocklyFactory', 'editorFactory', '$mdDialog', 'userFactory', 'socketFactory', '$state', '$window', 'Upload', '$sce', '$state', '$location', function ($scope, appFactory, blocklyFactory, editorFactory, $mdDialog, userFactory, socketFactory, $state, $window, Upload, $sce, $state, $location) {

        // Blockly file class ========================================
        function BlocklyFile(name, code, needsSaving, filepath, fileType, preventUnsavedExit) {
            this.Name = name;
            this.Code = code;
            this.Filepath = filepath;
            this.NeedsSaving = needsSaving;
            this.FileType = fileType;
            this.PreventUnsavedExit = preventUnsavedExit;
        }

        BlocklyFile.prototype.save = function () {

            var file = this;
            var fileName = this.Name;
            var fileType = this.FileType;
            var data = {
                code: this.Code
            }

            return new Promise(function (resolve, reject) {

                if (fileType == 'example') {

                    file.saveAs().then(function () {

                        resolve();

                    });

                } else if (fileType == 'new') {

                    file.saveAs().then(function () {

                        resolve();

                    });

                } else if (fileType == 'existing') {

                    blocklyFactory.UpdateProgram(fileName, data).then(function (data) {

                        $scope.SelectedFile.NeedsSaving = false;

                        resolve();

                    });

                }

            });

        }

        BlocklyFile.prototype.saveAs = function () {

            var file = this;

            var fil

            var fileName = this.Name;
            var fileType = this.FileType;
            var fileCode = this.Code;

            return new Promise(function (resolve, reject) {

                appFactory.showOkCancel({
                    title: 'What would you like to name your file?',
                    userInput: true,
                    placeholder: fileName
                }).then(function (result) {

                    var data = {
                        filename: $scope.fixFileName(result),
                        code: $scope.SelectedFile.Code
                    }

                    blocklyFactory.CreateProgram(data).then(function (response) {

                        if (response.status != 500) {

                            if (fileName == data.filename) {

                                $scope.SelectedFile.FileType = 'existing';
                                $scope.SelectedFile.NeedsSaving = false;

                                resolve();

                            } else {

                                $scope.OpenBlocklyFile(data.filename, 'existing');

                                resolve();

                            }

                            resolve(response);

                        } else {

                            reject();

                        }

                    });

                }, function () {

                    // Action canceled
                    reject();

                });

            });

        }


        // Controller Variables ======================================
        $scope.Settings = userFactory.User.blocklySettings;
        $scope.CurrentFileName = null;
        $scope.BlocklyFile = userFactory.User.blocklyProgram;
        $scope.SelectedFile;
        $scope.DefaultProgramCode = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="fusion_start" id="rm},Hg5r!R|1VJsO3d0;" x="50" y="50"></block></xml>';

        // Helper Functions ==========================================

        $scope.isExampleFile = function (file) {
            if (file)
                if (file.FileType == 'example')
                    return 'fusion-editor-example-file';
                else return '';
            else
                return '';
        }

        // Loads the workspace
        $scope.LoadBlocklyWorkSpace = function () {

            if (!$scope.BlocklyFile.Name)
                $scope.CreateNewBlocklyFile();
            else {
                $scope.LoadBlockyFile();
            }

        }

        // Creates a new blockly file
        $scope.CreateNewBlocklyFile = function () {

            blocklyFactory.GetPrograms().then(function (programs) {

                var name = $scope.GenerateNewFileName(programs);
                var defaultCode = $scope.DefaultProgramCode;

                var newFile = new BlocklyFile(name, defaultCode, true, userFactory.User.filepath + '/Blockly/' + name, 'new', false);

                userFactory.User.blocklyProgram = newFile;

                $scope.LoadBlockyFile();

            });

        }

        // Loads blockly files
        $scope.LoadBlockyFile = function () {

            workspacePlayground.clear();

            var xml = Blockly.Xml.textToDom(userFactory.User.blocklyProgram.Code);
            Blockly.Xml.domToWorkspace(xml, workspacePlayground);

            $scope.SelectedFile = userFactory.User.blocklyProgram;

        }

        // Displays * when file has changed
        $scope.displaySaveSymbol = function (NeedsSaving) {

            if (NeedsSaving)
                return "*";
            else
                return "";

        }

        // Generates a file name for a new file
        $scope.GenerateNewFileName = function (programs) {

            var name = 'Untitled' + blocklyFactory.newFileCounter + '.blk';
            blocklyFactory.newFileCounter++;
            var contains = false;

            for (var i = 0; i < programs.length; i++) {

                if (programs[i] == name) {
                    contains = true;
                    break;
                }

            }

            if (contains)
                name = $scope.GenerateNewFileName(programs);

            return name;

        }

        // Generates the toolbox xml
        $scope.generateToolboxXml = function (mode) {

            var xml;

            if (mode == 'basic') {

                xml = '<xml id="toolbox" style="display: none">' +
                    '<category name="Fusion Control" colour="120">' +
                    '<block type="fusion_start"></block>' +
                    '<block type="fusion_basic_select_motor_1"></block>' +
                    '<block type="fusion_basic_select_motor_2"></block>' +
                    '<block type="drive_with_gyro"></block>' +
                    '<block type="fusion_basic_ledB"></block>' +
                    '<block type="fusion_basic_ledY"></block>' +
                    '<block type="fusion_basic_ledBY"></block>' +
                    '<block type="fusion_basic_ledoff"></block>' +
                    '<block type="fusion_basic_wait"></block>' +
                    '</category>' +
                    '<category name="Move Robot" colour="120">' +
                    '<block type="fusion_basic_forward"></block>' +
                    '<block type="fusion_basic_backward"></block>' +
                    '<block type="fusion_basic_fast"></block>' +
                    '<block type="fusion_basic_medium"></block>' +
                    '<block type="fusion_basic_slow"></block>' +
                    '</category>' +
                    '<category name="Rotate Robot" colour="120">' +
                    '<block type="fusion_basic_right45"></block>' +
                    '<block type="fusion_basic_right90"></block>' +
                    '<block type="fusion_basic_right180"></block>' +
                    '<block type="fusion_basic_left45"></block>' +
                    '<block type="fusion_basic_left90"></block>' +
                    '<block type="fusion_basic_left180"></block>' +
                    '</category>' +
                    '</xml>';

            } else if (mode == 'intermediate') {

                xml = '<xml id="toolbox" style="display: none">' +
                    /* Fusion Category */
                    '<category id="fusionCategory" colour="120" name="Fusion Control">' +
                    '<block type="fusion_start"></block>' +
                    '<block type="fusion_led"><field name="COLOUR">#ffff00</field></block>' +
                    '<block type="fusion_led"><field name="COLOUR">#0000ff</field></block>' +
                    '<block type="fusion_comment"></block>' +
                    '<block type="fusion_end"></block>' +
                    '</category>' +
                    /* Motor Category */
                    '<category id="fusionMotorsCategory" colour="0" name="Motors">' +
                    '<block type="fusion_motor"><field name="Motor">M0</field><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_motor"><field name="Motor">M1</field><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_drive"><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_drive_time"><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Time"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_rotate"><value name="Power"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="Time"><shadow type="math_number"><field name="NUM">1.5</field></shadow></value></block>' +
                    '</category>' +
                    /* Servo Catergory */
                    '<category id="fusionServosCategory" colour="120" name="Servos">' +
                    '<block type="fusion_servo_target"><value name="target"><shadow type="math_number"><field name="NUM">128</field></shadow></value></block>' +
                    '</category>' +
                    /* USB Gamepad Category */
                    '<category id="fusionUsbGamepadCategory" colour="0" name="USB Gamepad">' +
                    '<block type="fusion_usbGamepad_readAxis"><field name="axis">0</field></block>' +
                    '<block type="fusion_usbGamepad_readAxisFloat"><field name="axis">0</field></block>' +
                    '<block type="fusion_usbGamepad_mixer"><field name="x_axis">0</field><field name="y_axis">1</field><field name="x_inv">False</field><field name="y_inv">False</field></block>' +
                    '<block type="fusion_usbGamepad_readButton"><field name="button">0</field></block>' +
                    '<block type="fusion_usbGamepad_readHat"></block>' +
                    '</category>' +
                    /* Virtual Gamepad Category */
                    '<category id="fusionVirtualGamepadCategory" colour="240" name="Virtual Gamepad">' +
                    '<block type="fusion_VirtualGamepad_Joystick"><field name="mixer">False</field><field name="x_inv">False</field><field name="y_inv">False</field></block>' +
                    '<block type="fusion_VirtualGamepad_readButton"></block>' +
                    '<block type="fusion_VirtualGamepad_telemetry"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>' +
                    '<block type="fusion_VirtualGamepad_camera"><value name="Res_w"><shadow type="math_number"><field name="NUM">320</field></shadow></value><value name="Res_h"><shadow type="math_number"><field name="NUM">240</field></shadow></value><value name="fps"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>' +
                    '</category>' +
                    /* Sensors Category */
                    '<category id="fusionSensorsCategory" colour="200" name="Sensors">' +
                    '<category name="Analog/Digital">' +
                    '<block type="fusion_analog_read"><field name="Port">A0</field></block>' +
                    '<block type="fusion_digital_read"><field name="Port">D0</field></block>' +
                    '<block type="fusion_digital_write"><field name="Port">D0</field></block>' +
                    '</category>' +
                    /* Compass Header */
                    '<category name="Compass Sensor">' +
                    '<block type="fusion_compass_heading"></block>' +
                    '<block type="fusion_compass_hardIronCalibration"></block>' +
                    '<block type="fusion_compass_tiltUp"></block>' +
                    '<block type="fusion_compass_tiltDown"></block>' +
                    '<block type="fusion_compass_nullAccelerometer"><field name="axis">\'X\'</field></block>' +
                    '<block type="fusion_compass_getAccelerometer"><field name="axis">0</field></block>' +
                    '<block type="fusion_compass_getMagnetometer"><field name="axis">0</field></block>' +
                    '<block type="fusion_compass_scaleAccelerometer"></block>' +
                    '</category>' +
                    /* Compass Footer */
                    /* Rate Gyro Header */
                    '<category name="Rate Gyro">' +
                    '<block type="fusion_rate_gyro_read"><field name="Port">A0</field></block></category>' +
                    /* Rate Gyro Footer */
                    /* Integrating Gyro Header */
                    '<category name="Integrating Gyro">' +
                    '<block type="fusion_intGyro_calibrate"></block>' +
                    '<block type="fusion_intGyro_zero"></block>' +
                    '<block type="fusion_intGyro_heading"></block></category>' +
                    /* Integrating Gyro Footer */
                    /* Optical Distance Sensor Header */
                    '<category name="Optical Distance Sensor">' +
                    '<block type="fusion_ods_read"><field name="Port">A0</field></block>' +
                    '</category>' +
                    /* Optical Distance Sensor Footer */
                    /* Touch Sensor Header */
                    '<category name="Touch Sensor">' +
                    '<block type="fusion_touch_read"><field name="Port">D0</field></block>' +
                    '</category>' +
                    /* Touch Sensor Footer */
                    /* Ranger Sensor Header */
                    '<category name="Range Sensor">' +
                    '<block type="fusion_range_sensor_us"></block>' +
                    '<block type="fusion_range_sensor_ods"></block>' +
                    '</category>' +
                    /* Range Sensor Footer */
                    /* IR Locator Header */
                    '<category name="IR Locator 360°">' +
                    '<block type="fusion_locator_heading"></block>' +
                    '<block type="fusion_locator_intensity"></block>' +
                    '</category>' +
                    /* IR Locator Footer */
                    /* Light Sensor Header */
                    '<category name="Light Sensor">' +
                    '<block type="fusion_light_read"><field name="Port">A0</field></block>' +
                    '</category>' +
                    /* Light Sensor Footer */
                    /* Sound Generator Header */
                    '<category name="Sound Generator">' +
                    '<block type="fusion_sound_generator"><field name="volume">MEDIUM</field><field name="blocking">TRUE</field><value name="pitch"><shadow type="math_number"><field name="NUM">440</field></shadow></value><value name="duration"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="post_pause"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value></block>' +
                    '</category>' +
                    /* Sound Generator Footer */
                    /* IR Seeker Header */
                    '<category name="IR Seeker V3">' +
                    '<block type="fusion_seeker_heading"></block>' +
                    '<block type="fusion_seeker_intensity"></block>' +
                    '</category>' +
                    /* IR Seeker Footer */
                    /* Color Sensor Header */
                    '<category name="Color Sensor">' +
                    '<block type="fusion_color_sensor_setup_init"></block>' +
                    '<block type="fusion_color_sensor_color_number"></block>' +
                    '<block type="fusion_color_sensor_color_rgb"></block>' +
                    '</category>' +
                    /* Color Sensor Footer */
                    /* Color Beacon Header */
                    '<category name="Color Beacon">' +
                    '<block type="fusion_color_beacon_set_color"></block>' +
                    '<block type="fusion_color_beacon_set_custom_color"><value name="Red"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Green"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Blue"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '</category>' +
                    /* Color Beacon Footer */
                    /* Magenetic Sensor Header */
                    '<category name="Magnetic Sensor"><block type="fusion_magnetic_read"><field name="Port">A0</field></block>' +
                    '</category>' +
                    /* Magnetic Sensor Footer */
                    '</category>' +
                    '<category id="catTime" name="Time" colour="140">' +
                    '<block type="time_delay"><value name="delay"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>' +
                    '<block type="time_get"></block>' +
                    '</category>' +
                    '<category id="catLogic" colour="210" name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category>' +
                    '<category id="catLoops" colour="120" name="Loops"><block type="controls_whileUntil"><value name="BOOL"><shadow type="logic_boolean"><field name="Boolean">true</field></shadow></value></block><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category>' +
                    '<category id="catMath" colour="230" name="Math"><block type="math_number"></block><block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block><block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block><block type="math_constant"></block><block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block><block type="math_on_list"></block><block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_float"></block></category>' +
                    '<category id="catText" colour="160" name="Text"><block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text"></block><block type="text_join"></block><block type="text_append"><value name="TEXT"><shadow type="text"></shadow></value></block><block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_changeCase"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block></category>' +
                    '<category id="catLists" colour="260" name="Lists"><block type="lists_create_with"><mutation items="0"></mutation></block><block type="lists_create_with"><mutation items="3"></mutation></block><block type="lists_repeat"><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><field name="END">FIRST</field><value name="VALUE"></value></block><block type="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"></value></block><block type="lists_setIndex"><mutation at="true"></mutation><field name="MODE">SET</field><field name="WHERE">FROM_START</field><value name="LIST"></value></block><block type="lists_getSublist"><mutation at1="true" at2="true"></mutation><field name="WHERE1">FROM_START</field><field name="WHERE2">FROM_START</field><value name="LIST"></value></block><block type="lists_split"><mutation mode="SPLIT"></mutation><field name="MODE">SPLIT</field><value name="DELIM"><shadow type="text"><field name="TEXT">,</field></shadow></value></block><block type="lists_sort"><field name="TYPE">NUMERIC</field><field name="DIRECTION">1</field></block></category>' +
                    '<category id="catVariables" colour="330" custom="VARIABLE" name="Variables"></category>' +
                    '<category id="catFunctions" colour="290" custom="PROCEDURE" name="Functions"></category>' +
					/* Core Control Category */
                    '<category id="fusionCoreControl" colour="100" name="Core Control Modules">' +
					'<block type="CoreControl_printDevices"></block>' +
					/* Core Motor Controller */
					'<category id="fusionCoreMotorController" colour="0" name="Core Motor Control">' +
					'<block type="CoreControl_CoreMotorController"><field name="name">cmc1</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>' +
                    '<block type="CoreControl_constantSpeed"><field name="name">cmc1</field><field name="motor">M1</field><value name="power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="CoreControl_constantPower"><field name="name">cmc1</field><field name="motor">M1</field><value name="power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="CoreControl_runToPosition"><field name="name">cmc1</field><field name="motor">M1</field><value name="power"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="target"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="CoreControl_readEncoder"><field name="name">cmc1</field><field name="motor">M1</field></block>' +
                    '<block type="CoreControl_readBattVoltage"><field name="name">cmc1</field></block>' +
					'</category>' +
					/* Core Servo Controller */
					'<category id="fusionCoreServoController" colour="120" name="Core Servo Control">' +
					'<block type="CoreControl_CoreServoController"><field name="name">csc1</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>' +
					'<block type="CoreControl_servoTarget"><field name="name">csc1</field><value name="target"><shadow type="math_number"><field name="NUM">128</field></shadow></value></block>' +
					'</category>' +
					/* Core Device Interface */
					'<category id="fusionCoreDeviceInterface" colour="200" name="Core Device Interface">' +
					'<block type="CoreControl_CoreDeviceInterface"><field name="name">cdi1</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>' +
					'<block type="CoreControl_cdi_led"><field name="name">cdi1</field><field name="COLOUR">#ff0000</field></block>' +
                    '<block type="CoreControl_cdi_led"><field name="name">cdi1</field><field name="COLOUR">#0000ff</field></block>' +
					'<block type="CoreControl_analogRead"><field name="name">cdi1</field><field name="Port">A0</field></block>' +
					'<block type="CoreControl_analogOutputWrite"><field name="name">cdi1</field><field name="port">AO-0</field><value name="voltage"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="frequency"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
					'<block type="CoreControl_digitalRead"><field name="name">cdi1</field><field name="Port">D0</field></block>' +
                    '<block type="CoreControl_digitalWrite"><field name="name">cdi1</field><field name="Port">D0</field></block>' +
                    '<block type="CoreControl_setPWM"><field name="name">cdi1</field><field name="Port">P0</field><value name="onTime"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="period"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
					'<block type="CoreControl_i2cRead"><field name="name">cdi1</field><field name="addr">00</field><value name="reg"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="len"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +					
					'<block type="CoreControl_i2cWrite"><field name="name">cdi1</field><field name="addr">00</field><value name="reg"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="data"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +					
					'</category>' +
					/* Core Legacy Module */
					'<category id="fusionCoreLegacyModule" colour="220" name="Core Legacy Module">' +
					'<block type="CoreControl_CoreLegacyModule"><field name="name">clm1</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>' +
					'<block type="CoreControl_clm_led"><field name="name">clm1</field></block>' +
					'<block type="CoreControl_clm_analogRead"><field name="name">clm1</field><field name="Port">S0</field></block>' +
					'<block type="CoreControl_clm_i2cRead"><field name="name">clm1</field><field name="addr">00</field><value name="reg"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="len"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +					
					'<block type="CoreControl_clm_i2cWrite"><field name="name">clm1</field><field name="addr">00</field><value name="reg"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="data"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +					
                    '</category>' +
                    '</category>' +
                    /* File Manipulation */
                    '<category id="fusionFileControl" colour="65" name="Files">' +
                    '<block type="Open_File"></block>' +
                    '<block type="Write_To_File"></block>' +
                    '<block type="Close_File"></block>' +
                    '</category>' +
                    '</xml>';

            }

            return xml;

        }

        // Adds .blocks to filenames
        $scope.fixFileName = function (fileName) {

            var lastThree = fileName.substr(fileName.length - 4);

            if (lastThree != '.blk')
                return fileName + '.blk';
            else
                return fileName;

        }


        // Menu Item Clicks ==========================================

        // New Blockly File
        $scope.NewBlocklyFile = function () {

            if ($scope.SelectedFile.NeedsSaving && $scope.SelectedFile.PreventUnsavedExit) {

                appFactory.showYesNoCancel({
                    title: 'Save changes before opening new file?',
                    buttons: {
                        yes: true,
                        no: true,
                        cancel: true
                    }
                }).then(function (answer) {

                    // Action accepted
                    if (answer == 'yes') {

                        $scope.SelectedFile.save().then(function () {
                            $scope.CreateNewBlocklyFile();
                        });

                    } else if (answer == 'no') {

                        $scope.CreateNewBlocklyFile();

                    }

                }, function () {

                    // Action canceled                    

                });

            } else {

                $scope.CreateNewBlocklyFile();
            }

        }

        // Open File Dialog
        $scope.OpenFileDialog = function (ev) {

            if ($scope.SelectedFile.NeedsSaving && $scope.SelectedFile.PreventUnsavedExit) {

                appFactory.showYesNoCancel({
                    title: 'Save changes before opening new file?',
                    buttons: {
                        yes: true,
                        no: true,
                        cancel: true
                    }
                }).then(function (answer) {

                    // Action accepted
                    if (answer == 'yes') {

                        $scope.SelectedFile.save().then(function () {

                            blocklyFactory.GetPrograms().then(function (data) {

                                appFactory.showOpenFileDialog({
                                        files: data
                                    })
                                    .then(function (file) {

                                        // File selected                    
                                        $scope.OpenBlocklyFile(file, 'existing');

                                    }, function () {

                                        // Dialog canceled                    


                                    });

                            });

                        });


                    } else if (answer == 'no') {

                        blocklyFactory.GetPrograms().then(function (data) {

                            appFactory.showOpenFileDialog({
                                    files: data
                                })
                                .then(function (file) {

                                    // File selected                    
                                    $scope.OpenBlocklyFile(file, 'existing');

                                }, function () {

                                    // Dialog canceled                    


                                });

                        });

                    }

                }, function () {

                    // Action canceled                    

                });

            } else {

                blocklyFactory.GetPrograms().then(function (data) {

                    appFactory.showOpenFileDialog({
                            files: data
                        })
                        .then(function (file) {

                            // File selected                    
                            $scope.OpenBlocklyFile(file, 'existing');

                        }, function () {

                            // Dialog canceled                    


                        });

                });

            }

        }

        // Opens a selected blockly file
        $scope.OpenBlocklyFile = function (name, type) {

            $mdDialog.hide();

            if ($scope.SelectedFile.Name != name || $scope.SelectedFile.FileType != type) {

                blocklyFactory.GetProgram(name).then(function (data) {

                    var file = new BlocklyFile(name, data, false, userFactory.User.filepath + '/Blockly/' + name, 'existing', true);

                    userFactory.User.blocklyProgram = file;

                    $scope.LoadBlockyFile();

                });

            } else {

                appFactory.showToast('File Already Open.', 'error');

            }

        }

        // Saves the selected blockly file
        $scope.SaveBlocklyFile = function () {

            $scope.SelectedFile.save();

        }

        // Opens Save as dialog
        $scope.SaveAsDialog = function (ev) {

            $scope.SelectedFile.saveAs();

        }

        // Dialog to delete file
        $scope.DeleteDialog = function (ev) {

            appFactory.showOkCancel({
                title: 'Are you sure you want to delete this file?',
                warning: true
            }).then(function (answer) {

                // Action accepted
                blocklyFactory.DeleteProgram($scope.SelectedFile.Name).then(function (response) {

                    $scope.CreateNewBlocklyFile();

                });

            }, function () {

                // Action canceled

            });

        }

        // Shows Print Dialog
        $scope.PrintDialog = function () {

            var mywindow = $window.open('', 'PRINT', 'height=600,width=800');

            mywindow.document.write('<html><head><title>' + $scope.SelectedFile.Name + '</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write('<h1>' + $scope.SelectedFile.Name + '</h1>');
            mywindow.document.write(document.getElementById('blocklyDiv').innerHTML);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/

            mywindow.print();
            //mywindow.close();

        }

        // Runs the selected program
        $scope.runExistingBlocklyProgram = function () {

            $scope.blocklyOutputConsole = '';

            if ($scope.SelectedFile.NeedsSaving) {

                $scope.SelectedFile.save().then(function () {

                    var runData = {
                        code: document.createTextNode(Blockly['Python'].workspaceToCode(workspacePlayground)).data
                    }

                    // Run blockly program
                    blocklyFactory.StartProgram(runData);

                });


            } else {

                var runData = {
                    code: document.createTextNode(Blockly['Python'].workspaceToCode(workspacePlayground)).data
                }

                // Run blockly program
                blocklyFactory.StartProgram(runData);

            }

        }

        // Stops the current program
        $scope.stopRunningBlocklyProgram = function () {

            blocklyFactory.StopProgram();

        }

        // Open File Upload Dialog
        $scope.UploadFilesDialog = function () {

            appFactory.showImportDialog({
                filetype: 'blockly',
                fileExtension: '.blk',
                uploadDirectory: 'programs'
            });
        }

        // Opens Blockly File in Editor
        $scope.openInEditor = function () {

            var data = {
                name: $scope.SelectedFile.Name,
                code: document.createTextNode(Blockly['Python'].workspaceToCode(workspacePlayground)).data
            }

            editorFactory.blocklyToWorkingFiles(data);

            $state.go('editor');

        }

        // Open the download file dialog
        $scope.DownloadFilesDialog = function () {

            blocklyFactory.GetPrograms().then(function (data) {

                var FilesForDownload = [];

                for (var i = 0; i < data.length; i++) {
                    FilesForDownload.push({
                        Name: data[i],
                        Selected: false
                    });
                }

                appFactory.showExportDialog({
                        filetype: 'Blockly',
                        files: FilesForDownload
                    })
                    .then(function (files) {

                        // Files selected for download
                        for (var i = 0; i < files.length; i++) {

                            if (files[i].Selected)
                                $scope.DownloadSingleBlocklyFile(files[i].Name);

                        }

                    }, function () {

                        // Action canceled

                    });

            });

        }

        // Downloades a single file
        $scope.DownloadSingleBlocklyFile = function (filename) {

            blocklyFactory.GetProgram(filename).then(function (data) {

                var hiddenElement = document.createElement('a');
                hiddenElement.style.display = 'none';
                hiddenElement.style.backgroundColor = 'red';
                hiddenElement.href = 'data:attachment/text,' + encodeURIComponent(data);
                hiddenElement.target = '_blank';
                hiddenElement.download = filename;
                hiddenElement.click();

            });

        }

        // Opens example program
        $scope.openExampleProgram = function (filename, filepath) {

            if ($scope.SelectedFile.NeedsSaving && $scope.SelectedFile.PreventUnsavedExit) {

                appFactory.showYesNoCancel({
                    title: 'Save changes before opening new file?',
                    buttons: {
                        yes: true,
                        no: true,
                        cancel: true
                    }
                }).then(function (answer) {

                    // Action accepted
                    if (answer == 'yes') {

                        $scope.SelectedFile.save().then(function () {

                            var data = {
                                'filepath': filepath
                            }

                            blocklyFactory.GetExampleCode(data).then(function (response) {

                                var file = new BlocklyFile(filename, response, false, filepath, 'example', true);

                                userFactory.User.blocklyProgram = file;

                                $scope.LoadBlockyFile();

                            });

                        });


                    } else if (answer == 'no') {

                        var data = {
                            'filepath': filepath
                        }

                        blocklyFactory.GetExampleCode(data).then(function (response) {

                            var file = new BlocklyFile(filename, response, false, filepath, 'example', true);

                            userFactory.User.blocklyProgram = file;

                            $scope.LoadBlockyFile();

                        });

                    }

                }, function () {

                    // Action canceled                    

                });

            } else {

                var data = {
                    'filepath': filepath
                }

                blocklyFactory.GetExampleCode(data).then(function (response) {

                    var file = new BlocklyFile(filename, response, false, filepath, 'example', true);

                    userFactory.User.blocklyProgram = file;

                    $scope.LoadBlockyFile();

                });

            }

        }

        // Opens blockly documentation
        $scope.takeToBlocklyDocs = function () {

            $window.open('assets/docs/fusion/Blockly_Topic/', '_blank');

        }

        // Disables the virtual gamepad 
        $scope.DisableVirtualGamepad = function () {

            if (!(socketFactory.data.ProgramRunning.running && socketFactory.data.Reachable.Gamepad))
                return true;
            else
                return false;

        }

        // Opens Virtual Gamepad
        $scope.OpenVirtualGamepad = function () {

            var url = 'http://' + $location.host() + ':5000/';

            $window.open(url, '_blank');

        }

        // Closes md dialogs
        $scope.hideDialog = function () {
            $mdDialog.hide();
        }


        // Blockly setup =============================================

        // Injects blockly workspace        
        var workspacePlayground = Blockly.inject('blocklyDiv', {
            toolbox: $scope.generateToolboxXml($scope.Settings.Mode),
            grid: {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            media: '/assets/libs/google-blockly/media/',
            trashcan: true,
            scrollbars: true
        });

        // Function to properly resize blockly
        $scope.resizeBlockly = function () {

            if ($state.current.name == 'blockly') {

                Blockly.svgResize(workspacePlayground);

            }
        }

        // Sets listener on window
        $(window).resize($scope.resizeBlockly);

        // Sets blockly toolbox
        $scope.setToolbox = function () {

            var test = workspacePlayground;

            workspacePlayground.updateToolbox($scope.generateToolboxXml($scope.Settings.Mode));

        }

        // Updates Generated code when blocks change
        $scope.myUpdateFunction = function (event) {

            var codeBlock = $('.fusion-blockly-code')[0].childNodes[0];
            codeBlock.innerText = Blockly['Python'].workspaceToCode(workspacePlayground);

            var xml = Blockly.Xml.workspaceToDom(workspacePlayground);
            var xml_text = Blockly.Xml.domToText(xml);

            if ($scope.SelectedFile.FileType == 'new') {

                $scope.SelectedFile.Code = xml_text;

                if ($scope.SelectedFile.Code == $scope.DefaultProgramCode && !$scope.SelectedFile.PreventUnsavedExit) {

                } else {
                    $scope.SelectedFile.PreventUnsavedExit = true;
                    $scope.SelectedFile.NeedsSaving = true;
                }

            } else {

                if ($scope.SelectedFile.Code == xml_text && !$scope.SelectedFile.NeedsSaving) {

                } else {
                    $scope.SelectedFile.Code = xml_text;
                    $scope.SelectedFile.NeedsSaving = true;
                }

            }

            $scope.$apply();

            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });

        }

        // Adds listener for blockly changes
        workspacePlayground.addChangeListener($scope.myUpdateFunction);

        // Force tab indentation for python
        Blockly.Generator.prototype.INDENT = '\t';


        // Display Functions =========================================

        $scope.toggleCodeWindow = function () {

            $scope.Settings.ShowCode = !$scope.Settings.ShowCode;

            $scope.resizeBlockly();

        }

        $scope.toggleProgramOutput = function () {

            $scope.Settings.ShowConsole = !$scope.Settings.ShowConsole;

            $scope.resizeBlockly();

        }

        // Shows the code bar
        $scope.showBlocklyCode = function () {

            var display;

            if ($scope.Settings.ShowCode)
                display = '';
            else
                display = 'none';

            var style = {
                'display': display
            }

            $scope.resizeBlockly();

            return style;

        }

        // Shows the console
        $scope.showBlocklyConsole = function () {

            var display;

            if ($scope.Settings.ShowConsole)
                display = '';
            else
                display = 'none';

            var style = {
                'display': display
            }

            $scope.resizeBlockly();

            return style;

        }


        // Socket Communication for console =========================

        var outputConsole = document.getElementById("blockly-output-console");
        socketFactory.Socket.on('blockly-console-output', function (msg) {

            var incomingText = msg.output;
            if (!incomingText.includes("> Program Finished!")) {

                var incomingText = msg.output;

                //Only keeps the last 500 characters displayed to avoid lag over time
                $scope.blocklyOutputConsole = $scope.blocklyOutputConsole.slice(-(500 - incomingText.length)) + incomingText;
                $scope.$apply();

                //Scrolls output textbox down automattically
                outputConsole.scrollTop = outputConsole.scrollHeight;

            } else {

                var incomingText = msg.output;

                $scope.blocklyOutputConsole += incomingText;
                $scope.$apply();

            }

        });

        $scope.transmitInput = function(keyEvent){
            
             if (keyEvent.which === 13){
                 
                 var data = {
                     input : $scope.consoleInput
                 }
                 
                editorFactory.SendInput(data).then(function(){
                    $scope.consoleInput = '';
                });                
                 
             }
            
        }        
        
        // Page Setup ================================================

        // Set Page Title
        appFactory.ChangePageTitle('BLOCKLY.TITLE');
        
        $scope.initialBlocklyHeight = function(){
            var editorWorkspace = angular.element(document.querySelector('#blockly-workspace'));
            return editorWorkspace[0].offsetHeight * .3;
        }
        
        $scope.$on("angular-resizable.resizing", function (event, args) {
			$scope.resizeBlockly();
        });

        // Load Workspace
        $scope.LoadBlocklyWorkSpace();

        // Blockly dialog overrides

        /** Override Blockly.prompt() with custom implementation. */
        Blockly.prompt = function (message, defaultValue, callback) {
            
            appFactory.showOkCancel({
                    title: message,
                    userInput: true,
                    placeholder: defaultValue
                }).then(function (result) {

                    if (result) {
                        
                        callback(result);            

                    } else {
                        
                        callback(defaultValue);

                    }

                }, function () {

                    callback(null);
                
                });
            
        };


        function svgFix() {

            //Hard change svg urls - eventually make dynamic

            //Fix blockly background
            var background = $('rect.blocklyMainBackground')[0];
            background.style.fill = getAnchorText(background.style.fill);

            var trashcanIcons = $('g.blocklyTrash > image');

            var trashCanBody = trashcanIcons[0];
            trashCanBody.attributes[4].nodeValue = getAnchorText(trashCanBody.attributes[4].nodeValue);

            var trashCanLid = trashcanIcons[1];
            trashCanLid.attributes[4].nodeValue = getAnchorText(trashCanLid.attributes[4].nodeValue);

            var zoomIcons = $('g.blocklyZoom > image');

            var zoomOut = zoomIcons[0];
            zoomOut.attributes[4].nodeValue = getAnchorText(zoomOut.attributes[4].nodeValue);

            var zoomIn = zoomIcons[1];
            zoomIn.attributes[4].nodeValue = getAnchorText(zoomIn.attributes[4].nodeValue);

            var zoomReset = zoomIcons[2];
            zoomReset.attributes[3].nodeValue = getAnchorText(zoomReset.attributes[3].nodeValue);

            $scope.$apply();

        }

        function getAnchorText(url) {

            url = url.replace(/"/g, '');

            var host = $location.absUrl();

            var start_pos = url.indexOf('(') + 1;
            var end_pos = url.indexOf(')', start_pos);
            var text_to_get = url.substring(start_pos, end_pos)
            text_to_get = text_to_get.replace(/"/g, '');

            return 'url("' + host + text_to_get + '")';

        }

        // Resize blockly on load
        $scope.resizeBlockly();

        // svgFix();

    }]);
