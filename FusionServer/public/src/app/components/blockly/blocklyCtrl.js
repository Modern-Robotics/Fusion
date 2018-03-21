// app/components/blockly/blocklyCtrl.js

angular
    .module('fusionApp')
    .controller('blocklyCtrl', ['$scope', 'appFactory', 'blocklyFactory', '$mdDialog', 'userFactory', 'socketFactory', '$state', '$window', 'Upload', '$sce', function ($scope, appFactory, blocklyFactory, $mdDialog, userFactory, socketFactory, $state, $window, Upload, $sce) {

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

                if (fileType == 'example'){
                    
                    file.saveAs().then(function () {

                        resolve();

                    });
                    
                }else if (fileType == 'new') {

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

                var confirm = $mdDialog.prompt()
                    .title('What would you like to name your file?')
                    .ariaLabel('File Name')
                    .initialValue(fileName)
                    .ok('Okay!')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function (result) {

                    if (result) {

                        var data = {
                            filename: $scope.fixFileName(result),
                            code: $scope.SelectedFile.Code
                        }

                        blocklyFactory.CreateProgram(data).then(function (response) {

                            if (fileName == data.filename) {

                                $scope.SelectedFile.FileType = 'existing';
                                $scope.SelectedFile.NeedsSaving = false;

                            } else {

                                $scope.OpenBlocklyFile(data.filename);

                            }

                            resolve(response);

                        });

                    } else {

                        appFactory.showToast('Must specify file name', 'error');

                    }



                }, function () {
                    //Action Canceled
                    reject();

                });

            });

        }


        // Controller Variables ======================================
        $scope.Settings = userFactory.User.blocklySettings;
        $scope.CurrentFileName = null;
        $scope.BlocklyFile = userFactory.User.blocklyProgram;
        $scope.SelectedFile;
        $scope.NewFileCounter = 1;


        // Helper Functions ==========================================

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
                var defaultCode = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="fusion_start" id="rm},Hg5r!R|1VJsO3d0;" x="50" y="50"></block></xml>';

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

            var name = 'Untitled' + $scope.NewFileCounter + '.blk';
            $scope.NewFileCounter++;
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

            if (mode == 'beginner') {

                xml = '<xml id="toolbox" style="display: none">' +
                    '<category name="Fusion Control" colour="120">' +
                    '<block type="fusion_start"></block>' +
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
                    '<category id="fusionCategory" colour="0" name="Fusion Control">' +
                    '<block type="fusion_start"></block>' +
                    '<block type="fusion_led"><field name="COLOUR">#ffff00</field></block>' +
                    '<block type="fusion_led"><field name="COLOUR">#0000ff</field></block>' +
                    '<block type="fusion_comment"></block>' +
                    '<block type="fusion_end"></block>' +
                    '</category>' +
                    '<category id="fusionMotorsCategory" colour="0" name="Motors">' +
                    '<block type="fusion_motor"><field name="Motor">M0</field><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_motor"><field name="Motor">M1</field><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block' +
                    '><block type="fusion_drive"><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_drive_time"><value name="Power"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Time"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>' +
                    '<block type="fusion_rotate"><value name="Power"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="Time"><shadow type="math_number"><field name="NUM">1.5</field></shadow></value></block>' +
                    '</category>' +
                    '<category id="fusionServosCategory" colour="0" name="Servos">' +
                    '<block type="fusion_servo_target"><value name="target"><shadow type="math_number"><field name="NUM">128</field></shadow></value></block>' +
                    '</category>' +
                    '<category id="fusionSensorsCategory" colour="0" name="Sensors">' +
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
                    /* Coloe Sensor Footer */
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
                    '<category id="catTime" name="Time" colour="0"><block type="time_delay"><value name="delay"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block></category><category id="catLogic" colour="0" name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category id="catLoops" colour="0" name="Loops"><block type="controls_whileUntil"><value name="BOOL"><shadow type="logic_boolean"><field name="Boolean">true</field></shadow></value></block><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category id="catMath" colour="0" name="Math"><block type="math_number"></block><block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block><block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block><block type="math_constant"></block><block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block><block type="math_on_list"></block><block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_float"></block></category><category id="catText" colour="0" name="Text"><block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text"></block><block type="text_join"></block><block type="text_append"><value name="TEXT"><shadow type="text"></shadow></value></block><block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_changeCase"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block></category><category id="catVariables" colour="0" custom="VARIABLE" name="Variables"></category><category id="catFunctions" colour="0" custom="PROCEDURE" name="Functions"></category></xml>';

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

                var confirm = $mdDialog.confirm()
                    .title('Save changes before opening new file?')
                    .ok('Okay!')
                    .cancel('No');

                $mdDialog.show(confirm).then(function (result) {

                    $scope.SelectedFile.save().then(function () {
                        $scope.CreateNewBlocklyFile();
                    });

                }, function () {
                    //Action Canceled
                    $scope.CreateNewBlocklyFile();
                });

            } else {

                $scope.CreateNewBlocklyFile();
            }

        }

        // Open File Dialog
        $scope.OpenFileDialog = function (ev) {

            if ($scope.SelectedFile.NeedsSaving) {

                var confirm = $mdDialog.confirm()
                    .title('Save changes before opening new file?')
                    .ok('Okay!')
                    .cancel('No');

                $mdDialog.show(confirm).then(function (result) {


                    $scope.SelectedFile.save().then(function () {

                        blocklyFactory.GetPrograms().then(function (data) {

                            $scope.FilesAvailableForOpen = data;

                            $mdDialog.show({
                                contentElement: '#blocklyOpenFileDialog',
                                parent: angular.element(document.body),
                                clickOutsideToClose: true
                            });

                        });

                    });

                }, function () {
                    //Action Canceled

                    blocklyFactory.GetPrograms().then(function (data) {

                        $scope.FilesAvailableForOpen = data;

                        $mdDialog.show({
                            contentElement: '#blocklyOpenFileDialog',
                            parent: angular.element(document.body),
                            clickOutsideToClose: true
                        });

                    });

                });

            } else {

                blocklyFactory.GetPrograms().then(function (data) {

                    $scope.FilesAvailableForOpen = data;

                    $mdDialog.show({
                        contentElement: '#blocklyOpenFileDialog',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true
                    });

                });

            }

        }

        // Opens a selected blockly file
        $scope.OpenBlocklyFile = function (name) {

            $mdDialog.hide();

            if ($scope.SelectedFile.Name != name) {

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

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this file?')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {

                blocklyFactory.DeleteProgram($scope.SelectedFile.Name).then(function (response) {

                    $scope.CreateNewBlocklyFile();

                });

            }, function () {
                //Action Canceled
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

                $scope.SelectedFile.save().then(function(){

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

            $mdDialog.show({
                contentElement: '#blocklyUploadFileDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });

        }

        // Upload files
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: '/api/programs/import',
                            method: 'POST',
                            file: file
                        }).then(function (resp) {

                            $scope.log = 'file: ' +
                                resp.config.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;

                        }, function (err) {

                            $scope.log = 'file: ' +
                                err.config.file.name +
                                ', Response: ' + JSON.stringify(err.data) +
                                '\n' + $scope.log;

                        });
                    }
                }
            }
        }

        // Open the download file dialog
        $scope.DownloadFilesDialog = function () {

            blocklyFactory.GetPrograms().then(function (data) {

                $scope.FilesForDownload = [];

                for (var i = 0; i < data.length; i++) {

                    $scope.FilesForDownload.push({
                        Name: data[i],
                        Selected: false
                    });

                }

                $mdDialog.show({
                    contentElement: '#blocklyDownloadFileDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });

            });

        }

        // Downloads the selected files
        $scope.DownloadEditorFiles = function () {

            for (var i = 0; i < $scope.FilesForDownload.length; i++) {

                if ($scope.FilesForDownload[i].Selected)
                    $scope.DownloadSingleEditorFile($scope.FilesForDownload[i].Name);

            }

            $mdDialog.hide();

        }

        // Downloades a single file
        $scope.DownloadSingleEditorFile = function (filename) {

            blocklyFactory.GetProgram(filename).then(function (data) {

                var hiddenElement = document.createElement('a');
                hiddenElement.style.display = 'none';
                hiddenElement.style.backgroundColor = 'red';
                hiddenElement.href = 'data:attachment/text,' + encodeURI(data);
                hiddenElement.target = '_blank';
                hiddenElement.download = filename;
                hiddenElement.click();

            });

        }
        
        // Opens example program
        $scope.openExampleProgram = function(filename, filepath){
            
            var data = {
                'filepath': filepath
            }
            
            blocklyFactory.GetExampleCode(data).then(function(response){
               
               var file = new BlocklyFile(filename, response, false, filepath, 'example', true);

                    userFactory.User.blocklyProgram = file;

                    $scope.LoadBlockyFile();
                
            });
            
        }

        // Opens blockly documentation
        $scope.takeToBlocklyDocs = function () {

            $window.open('assets/docs/fusion/Blockly_Topic/', '_blank');

        }

        // Closes md dialogs
        $scope.hideDialog = function () {
            $mdDialog.hide();
        }


        // Blockly setup =============================================

        // Injects blockly workspace
        var workspacePlayground = Blockly.inject(blocklyDiv, {
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
            trashcan: true
        });

        // Function to properly resize blockly
        $scope.resizeBlockly = function () {

            if ($state.current.name == 'blockly') {

                var toolbar = document.getElementsByClassName('f-blockly-toolbar');
                var element = document.getElementById('blocklyArea');
                var blocklyDiv = document.getElementById('blocklyDiv');

                var toolbarHeight = toolbar[0].offsetHeight;

                blocklyDiv.style.left = element.offsetLeft + 'px';
                blocklyDiv.style.top = element.offsetTop + 'px';
                blocklyDiv.style.width = element.offsetWidth + 'px';
                blocklyDiv.style.height = element.offsetHeight + 'px';

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

            var codeBlock = $('.f-blockly-code')[0].childNodes[0];
            codeBlock.innerText = Blockly['Python'].workspaceToCode(workspacePlayground);

            var xml = Blockly.Xml.workspaceToDom(workspacePlayground);
            var xml_text = Blockly.Xml.domToText(xml);

            if ($scope.SelectedFile.Code != xml_text) {
                $scope.SelectedFile.Code = xml_text;
                $scope.SelectedFile.NeedsSaving = true;
                $scope.SelectedFile.PreventUnsavedExit = true;
                $scope.$apply();
            }

            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });

        }

        // Adds listener for blockly changes
        workspacePlayground.addChangeListener($scope.myUpdateFunction);


        // Display Functions =========================================

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


        // Page Setup ================================================

        // Set Page Title
        appFactory.ChangePageTitle('- Blockly -');

        // Load Workspace
        $scope.LoadBlocklyWorkSpace();

        // Resize blockly on load
        $scope.resizeBlockly();

    }]);
