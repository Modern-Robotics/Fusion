/**
 * Fusion Blocks Creator for Blockly 
 * Author: Zac Zegarelli
 */
'use strict';

goog.provide('Blockly.Blocks.fusion');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

var origin = String(document.location.origin)
var doc_path = '/assets/docs/fusion'

//SPARTAN IMAGO
var imageW = 35;
var imageH = 35;

Blockly.Blocks.fusion.HUE = 240;

Blockly.Blocks['fusion_motor'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Int_Motors/#motor-speed');
        this.setColour(0);
        this.appendValueInput('Power')
            .appendField(new Blockly.FieldDropdown([["M0 (Right)", "M0"], ["M1 (Left)", "M1"]]), "Motor")
            .appendField("Motor Speed")
            .setCheck("Number");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Set speed of a motor between -100 and 100.');
    },
    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "Power", Blockly.Python.ORDER_NONE)
        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
    }
};

Blockly.Blocks['fusion_drive'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Int_Motors/#drive-at-speed');
        this.setColour(0);
        this.appendValueInput("Power")
            .setCheck("Number")
            .appendField("Drive at speed");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Drives both motors at a set speed. Speed ranges from -100 - 100.');
    },

    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "Power", Blockly.Python.ORDER_NONE)
        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
    }
};

Blockly.Blocks['fusion_drive_time'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Int_Motors/#drive-at-speed-for-time');
        this.setColour(0);
        this.appendValueInput("Power")
            .setCheck("Number")
            .appendField("Drive at speed");
        this.appendValueInput("Time")
            .setCheck("Number")
            .appendField("for");
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Drives both motors at a set speed for a set time(sec) then stops. Speed ranges from -100 - 100.');
    },

    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "Power", Blockly.Python.ORDER_NONE);
        var time = Blockly.Python.valueToCode(this, "Time", Blockly.Python.ORDER_NONE);

        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
        if (time < 0) {
            this.childBlocks_[1].setFieldValue(0, 'NUM');
        } else if (!isNaN(time)) {
            time = parseFloat(time).toFixed(3);
            this.childBlocks_[1].setFieldValue(time.toString(), 'NUM');
        }
    }
};

Blockly.Blocks['fusion_rotate'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Int_Motors/#rotate-at-speed-for-time');
        this.setColour(0);
        this.appendValueInput("Power")
            .setCheck("Number")
            .appendField("Rotate")
            .appendField(new Blockly.FieldDropdown([["Left", "Left"], ["Right", "Right"]]), "direction")
            .appendField("at speed");
        this.appendValueInput("Time")
            .setCheck("Number")
            .appendField("for");
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Rotate about the center of the robot by setting the speed from -100 - 100.');
    },

    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "Power", Blockly.Python.ORDER_NONE)
        var time = Blockly.Python.valueToCode(this, "Time", Blockly.Python.ORDER_NONE)

        if (power < 0) {
            this.childBlocks_[0].setFieldValue(0, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
        if (time < 0) {
            this.childBlocks_[1].setFieldValue(0, 'NUM');
        } else if (!isNaN(time)) {
            time = parseFloat(time).toFixed(3);
            this.childBlocks_[1].setFieldValue(time.toString(), 'NUM');
        }
    }
};

Blockly.Blocks['fusion_servo_target'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Servo")
            .appendField(new Blockly.FieldDropdown([["S0", "S0"], ["S1", "S1"], ["S2", "S2"], ["S3", "S3"]]), "servo");
        this.appendValueInput("target")
            .setCheck("Number")
            .appendField("to Target");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = 1;
		Blockly.HSV_VALUE = .61;
		this.setColour(330);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Send slected servo to a target position 0 - 255. BE CAREFUL as MRI is not responsible for damaged servos due to exceeding mechanical limits.');
        this.setHelpUrl(origin + doc_path +'/Int_Servos/#servo-target');
    },
    onchange: function () {
        var target = Blockly.Python.valueToCode(this, "target", Blockly.Python.ORDER_NONE)
        if (target < 0) {
            this.childBlocks_[0].setFieldValue(0, 'NUM');
        } else if (target > 255) {
            this.childBlocks_[0].setFieldValue(255, 'NUM');
        }
    }
};

Blockly.Blocks['fusion_led'] = {
    init: function () {
        var colour = new Blockly.FieldColour('#ffff00');
        colour.setColours(['#ffff00', '#0000ff']).setColumns(2);
        this.appendDummyInput()
            .appendField(colour, 'COLOUR')
            .appendField("LED")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "Mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.fusion.HUE);
        this.setTooltip('Turn an on-board user LED on or off.');
        this.setHelpUrl(origin + doc_path +'/Int_Fusion-Control/#led');
    }
};

Blockly.Blocks['fusion_end'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('End Program');
        this.setPreviousStatement(true, null);
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(0);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Stop the program.');
        this.setHelpUrl(origin + doc_path +'/Int_Fusion-Control/#end-program');
    }
};

Blockly.Blocks['fusion_start'] = {
    init: function () {
        Blockly.BlockSvg.START_HAT = true;
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/FusionStart.png", imageW * 3, imageH * 1.5, "START"));
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = 1;
		Blockly.HSV_VALUE = .71;
		this.setColour(135);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Initialize the Fusion Robot.');
        this.setHelpUrl(origin + doc_path +'/Int_Fusion-Control/#start-block');
    }
};

Blockly.Blocks['fusion_comment'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Int_Fusion-Control/#comment');
        this.setColour(160);
        this.appendDummyInput()
            .appendField('Comment #')
            .appendField(new Blockly.FieldTextInput(''), 'Statement');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Insert comment into program.');
    }
};

Blockly.Blocks['drive_with_gyro'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/gyro.png", imageW*2.5, imageH*2, "Gyro"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(30);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Drive with the Inegrating Gyro. This block modifies the Move Robot and Rotate Robot blocks in Basic Blockly for more accurate turning. Refer to the documentation for a further instruction with this block.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#drive-with-gyro');
    }
};

Blockly.Blocks['fusion_basic_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/fwd.png", imageW, imageH, "Forward"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('Drive forward for 1 second then stop.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#forward');
    }
};

Blockly.Blocks['fusion_basic_backward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/back.png", imageW, imageH, "Backwards"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('Drive reverse for 1 second then stop.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#backwards');
    }
};

Blockly.Blocks['fusion_basic_fast'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/hare.png", imageW, imageH, "Fast"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(90);
        this.setTooltip('Drive Fast Speed.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#fast');
    }
};

Blockly.Blocks['fusion_basic_medium'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/turtle.png", imageW, imageH, "Medium"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(90);
        this.setTooltip('Drive Medium Speed.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#medium');
    }
};

Blockly.Blocks['fusion_basic_slow'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/snail.png", imageW, imageH, "Slow"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(90);
        this.setTooltip('Drive Slow Speed.');
        this.setHelpUrl(origin + doc_path +'/Basic_Move-Robot/#slow');
    }
};

Blockly.Blocks['fusion_basic_right45'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TSR.png", imageW, imageH, "Right 45"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn right 45 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-right-45');
    }
};

Blockly.Blocks['fusion_basic_right90'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TR.png", imageW, imageH, "Right 90"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn right 90 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-right-90');
    }
};

Blockly.Blocks['fusion_basic_right180'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TUR.png", imageW, imageH, "Right 180"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn right 180 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-right-180');
    }
};

Blockly.Blocks['fusion_basic_left45'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TSL.png", imageW, imageH, "Left 45"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn left 45 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-left-45');
    }
};

Blockly.Blocks['fusion_basic_left90'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TL.png", imageW, imageH, "Left 90"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn left 90 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-left-90');
    }
};

Blockly.Blocks['fusion_basic_left180'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TUL.png", imageW, imageH, "Left 180"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip('Turn left 180 degrees.');
        this.setHelpUrl(origin + doc_path +'/Basic_Rotate-Robot/#rotate-left-180');
    }
};

Blockly.Blocks['fusion_basic_wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/wait.png", imageW, imageH, "Wait"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip('Wait 1 second.');
        this.setHelpUrl(origin + doc_path +'/Basic_Fusion-Control/#wait');
    }
};

Blockly.Blocks['fusion_basic_ledB'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightB.png", imageW, imageH, "Blue LED"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Turn on Blue LED. Turn off Yellow LED.');
        this.setHelpUrl(origin + doc_path +'/Basic_Fusion-Control/#blue-led-on');
    }
};

Blockly.Blocks['fusion_basic_ledY'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightY.png", imageW, imageH, "Yellow LED"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Turn on Yellow LED. Turn off Blue LED.');
        this.setHelpUrl(origin + doc_path +'/Basic_Fusion-Control/#yellow-led-on');
    }
};

Blockly.Blocks['fusion_basic_ledBY'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightBY.png", imageW, imageH, "Blue & Yellow LED"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Turn on Blue and Yellow LED.');
        this.setHelpUrl(origin + doc_path +'/Basic_Fusion-Control/#both-leds-on');
    }
};

Blockly.Blocks['fusion_basic_ledoff'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/light.png", imageW, imageH, "LED Off"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Turn off Blue and Yellow LED.');
        this.setHelpUrl(origin + doc_path +'/Basic_Fusion-Control/#both-leds-off');
    }
};

Blockly.Blocks['time_delay'] = {
    init: function () {
        this.appendValueInput("delay")
            .setCheck("Number")
            .appendField("Wait");
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(140);
        this.setTooltip('Wait a set number of seconds.');
        this.setHelpUrl(origin + doc_path +'/time/#wait-in-seconds');
    },
    onchange: function () {
        var delay = Blockly.Python.valueToCode(this, "delay", Blockly.Python.ORDER_NONE)
        if (delay < 0) {
            this.childBlocks_[0].setFieldValue(0, 'NUM');
        }
    }
};

Blockly.Blocks['fusion_analog_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read from Analog Port")
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Port");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Read the value of an analog port 0 - 1023.');
        this.setHelpUrl(origin + doc_path +'/Blk_Analog_Digital/#analog-read');
        this.setOutput(true, "Number");
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_digital_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read from Digital Port")
            .appendField(new Blockly.FieldDropdown([["D0", "D0"], ["D1", "D1"], ["D2", "D2"], ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"], ["D7", "D7"]]), 'Port')
        this.setOutput(true, "Boolean");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Read the value of a digital port 0 or 1.');
        this.setHelpUrl(origin + doc_path +'/Blk_Analog_Digital/#digital-read');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['fusion_digital_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Write to Digital Port")
            .appendField(new Blockly.FieldDropdown([["D0", "D0"], ["D1", "D1"], ["D2", "D2"], ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"], ["D7", "D7"]]), "Port")
            .appendField("a value of")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "Value")
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write the value of 0 or 1 to a digital port.');
        this.setHelpUrl(origin + doc_path +'/Blk_Analog_Digital/#digital-write');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['fusion_touch_read'] = {
    init: function () {
        this.setHelpUrl(origin + doc_path +'/Blk_Touch_Sensor/#pressed');
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.appendDummyInput()
            .appendField("Touch Sensor on Port")
            .appendField(new Blockly.FieldDropdown([["D0", "D0"], ["D1", "D1"], ["D2", "D2"], ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"], ["D7", "D7"]]), 'Port')
            .appendField("is")
            .appendField(new Blockly.FieldDropdown([["Pressed", "Pressed"], ["Not Pressed", "Not Pressed"]]), "condition");
        this.setOutput(true, "Boolean");
        this.setTooltip("Returns a 1 if it is pressed and a 0 if it is not pressed.");
    },
    /** @return {!string} The type of return value for the block, an integer. */
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['fusion_compass_heading'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Compass Heading");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Returns the cardinal heading in degrees 0 - 359.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#get-heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_compass_hardIronCalibration'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compass Hard Iron Calibration");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Point the robot North, then rotate the robot 360° over the course of 5 seconds to calibrate the Compass.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#hard-iron-calibration');
    }
};

Blockly.Blocks['fusion_compass_tiltUp'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compass Tilt Up Calibration");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Tile the robot up 20° above the horizon. Refer to documentation for more help.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#tilt-up-calibration');
    }
};

Blockly.Blocks['fusion_compass_tiltDown'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compass Tilt Down Calibration");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Tile the robot down 20° below the horizon. Refer to documentation for more help.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#tilt-down-calibration');
    }
};

Blockly.Blocks['fusion_compass_nullAccelerometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compass Accelerometer Calibration on axis: ")
            .appendField(new Blockly.FieldDropdown([["X", "'X'"], ["Y", "'Y'"], ["Z", "'Z'"]]), "axis");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Set the accelerometer value of a particular axis to 0. The X and Y axis the sensor must be kept flat on the surface. The Z axis must be held vertical with the wire pointing up.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#accelerometer-calibration');
    }
};

Blockly.Blocks['fusion_compass_getAccelerometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Compass Accelerometer on axis: ")
            .appendField(new Blockly.FieldDropdown([["X", "0"], ["Y", "1"], ["Z", "2"]]), "axis");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Returns the acclerometer value of a particular axis between 0 and 255.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#get-accelerometer-reading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_compass_getMagnetometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Compass Magnetometer on axis: ")
            .appendField(new Blockly.FieldDropdown([["X", "0"], ["Y", "1"], ["Z", "2"]]), "axis");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Returns the strength of the magnetic field on the X, Y and Z axis.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#get-magnetometer-reading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_compass_scaleAccelerometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compass Scale Accelerometer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Hold the sensor vertical with the wire point up before using this block.');
        this.setHelpUrl(origin + doc_path +'/Blk_Compass/#scale-accelerometer');
    }
};

Blockly.Blocks['fusion_intGyro_heading'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Integrating Gyro Heading")
            .appendField(new Blockly.FieldDropdown([["Degrees", "Degrees"], ["Absolute", "Absolute"]]), "mode");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('getDegrees: Heading from 0 - 359. getAbsolute: Heading from -32,767 - 32,767.');
        this.setHelpUrl(origin + doc_path +'/Blk_Integrating_Gyro/#get-heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_intGyro_calibrate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Calibrate Integrating Gyro");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Calibrate the gyro at the beginning of the program (3 Seconds). Use "Zero Integrating Gyro" block to zero the gyro reading within code. Does not need to be run in every program as calibration values are saved in the sensor.');
        this.setHelpUrl(origin + doc_path +'/Blk_Integrating_Gyro/#calibrate');
    }
};

Blockly.Blocks['fusion_intGyro_zero'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Zero Integrating Gyro");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Sets the current gyro position to 0.');
        this.setHelpUrl(origin + doc_path +'/Blk_Integrating_Gyro/#zero');
    }
};

Blockly.Blocks['fusion_rate_gyro_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Rate Gyro on Port")
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect the rate of rotation on a horizontal plane. Returns a value 0 - 1023.');
        this.setHelpUrl(origin + doc_path +'/Blk_Rate_Gyro/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_seeker_heading'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get IR Seeker Heading @")
            .appendField(new Blockly.FieldDropdown([["1200 Hz", "1200 Hz"], ["600 Hz", "600 Hz"]]), "mode");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('The value is 0 if the source is directly in front with a +/- change if the source moves.');
        this.setHelpUrl(origin + doc_path +'/Blk_IR_Seeker_V3/#heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_seeker_intensity'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get IR Seeker Intensity @")
            .appendField(new Blockly.FieldDropdown([["1200 Hz", "1200 Hz"], ["600 Hz", "600 Hz"]]), "mode");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('The value is 0 if no IR source is detected. Value increases as an IR source gets closer.');
        this.setHelpUrl(origin + doc_path +'/Blk_IR_Seeker_V3/#intensity');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_locator_heading'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get IR Locator Heading @")
            .appendField(new Blockly.FieldDropdown([["1200 Hz", "1200 Hz"], ["600 Hz", "600 Hz"]]), "mode");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('The value is 0 if the source is directly in front with increasing values in the CW direction (0 - 359).');
        this.setHelpUrl(origin + doc_path +'/Blk_IR_Locator_360/#heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_locator_intensity'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get IR Locator Intensity @")
            .appendField(new Blockly.FieldDropdown([["1200 Hz", "1200 Hz"], ["600 Hz", "600 Hz"]]), "mode");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('The value is 0 if no IR source is detected. Value increases as an IR source gets closer.');
        this.setHelpUrl(origin + doc_path +'/Blk_IR_Locator_360/#intensity');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_color_beacon_set_color'] = {
    init: function () {
        var colour = new Blockly.FieldColour('#ff0000');
        colour.setColours(['#000000', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff']).setColumns(4);
        this.appendDummyInput()
            .appendField("Set Color Beacon to:")
            .appendField(colour, 'COLOUR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Select a color to illuminate.');
        this.setHelpUrl(origin + doc_path +'/Blk_Color_Beacon/#set-color');
    }
};

Blockly.Blocks['fusion_color_beacon_set_custom_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Color Beacon to:")
        this.appendValueInput('Red')
            .appendField("Red:")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck("Number");
        this.appendValueInput('Green')
            .appendField("Green:")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck("Number");
        this.appendValueInput('Blue')
            .appendField("Blue:")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck("Number");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Select a color to illuminate based on RGB value. Each value has a range of 0 - 255.');
        this.setHelpUrl(origin + doc_path +'/Blk_Color_Beacon/#set-custom-color');
    },
    onchange: function () {
        var red = Blockly.Python.valueToCode(this, "Red", Blockly.Python.ORDER_NONE);
        var green = Blockly.Python.valueToCode(this, "Green", Blockly.Python.ORDER_NONE);
        var blue = Blockly.Python.valueToCode(this, "Blue", Blockly.Python.ORDER_NONE);

        if (red < 0) {
            this.childBlocks_[0].setFieldValue(0, 'NUM');
        } else if (red > 255) {
            this.childBlocks_[0].setFieldValue(255, 'NUM');
        }
        if (green < 0) {
            this.childBlocks_[1].setFieldValue(0, 'NUM');
        } else if (green > 255) {
            this.childBlocks_[1].setFieldValue(255, 'NUM');
        }
        if (blue < 0) {
            this.childBlocks_[2].setFieldValue(0, 'NUM');
        } else if (blue > 255) {
            this.childBlocks_[2].setFieldValue(255, 'NUM');
        }

    }
};

Blockly.Blocks['fusion_color_sensor_setup_init'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Color Sensor Mode:")
            .appendField(new Blockly.FieldDropdown([["Active", "Active"], ["Passive", "Passive"]]), "Mode")
            .appendField(new Blockly.FieldDropdown([["60 Hz", "60 Hz"], ["50 Hz", "50 Hz"]]), "frequency");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Set the mode and frequency of the Color Sensor. Mode and frequency are save on the sensor for future programs untill changed by the user.');
        this.setHelpUrl(origin + doc_path +'/Blk_Color_Sensor/#set-mode');
    }
};

Blockly.Blocks['fusion_color_sensor_color_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Color Number");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Gets the color as a number between 0 and 16.');
        this.setHelpUrl(origin + doc_path +'/Blk_Color_Sensor/#get-color-number');
    }
};

Blockly.Blocks['fusion_color_sensor_color_rgb'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get RGB Value:")
            .appendField(new Blockly.FieldDropdown([["Red", "Red"], ["Green", "Green"], ["Blue", "Blue"]]), "color");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Returns the Red, Green or Blue reading ranging from 0 to 255.');
        this.setHelpUrl(origin + doc_path +'/Blk_Color_Sensor/#get-rgb');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_light_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Light Sensor on Port")
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Measures the amount of ambient light. Returns a value 0 - 1023.');
        this.setHelpUrl(origin + doc_path +'/Blk_Light_Sensor/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_range_sensor_us'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Range Sensor Ultrasonic (cm)");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Measure Distance in centimeters (cm) using sound waves.');
        this.setHelpUrl(origin + doc_path +'/Blk_Range_Sensor/#ultrasonic');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_range_sensor_ods'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Range Sensor Optical");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect proximity to of objects using light.');
        this.setHelpUrl(origin + doc_path +'/Blk_Range_Sensor/#optical');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_ods_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Optical Distance Sensor on Port")
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect proximity using infrared light. Returns a value 0 - 1023.');
        this.setHelpUrl(origin + doc_path +'/Blk_Optical_Distance_Sensor/#read');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_magnetic_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Magnetic Sensor on Port")
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Measures the inensity of a magnetic field. Returns a value 0 - 1023.');
        this.setHelpUrl(origin + doc_path +'/Blk_Magnetic_Sensor/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_sound_generator'] = {
    init: function () {
        this.waitBoolRemoved = false;
        this.appendDummyInput()
            .appendField("Set Sound")
            .setAlign(Blockly.ALIGN_CENTRE);
        this.appendDummyInput()
            .appendField("Blocking")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldCheckbox("TRUE"), "blocking");
        this.appendDummyInput("volume")
            .appendField("Volume")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["LOW", "LOW"], ["MEDIUM", "MEDIUM"], ["HIGH", "HIGH"], ["MAX", "MAX"]]), "volume")
        this.appendValueInput("pitch")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Pitch (Hz) :");
        this.appendValueInput("duration")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Duration (sec) :");
        this.appendValueInput("post_pause")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Pause (sec) :");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Play a note. If the check box is not selected, the program will continue while playing the note. If the box is selected, the program will pause until the note is completed and waits the additional time.');
        this.setHelpUrl(origin + doc_path +'/Blk_Sound_Generator/#set-sound-blocking');
    },
    onchange: function () {
        var pitch = Blockly.Python.valueToCode(this, "pitch", Blockly.Python.ORDER_NONE)
        var duration = Blockly.Python.valueToCode(this, "duration", Blockly.Python.ORDER_NONE)
        var post = Blockly.Python.valueToCode(this, "post_pause", Blockly.Python.ORDER_NONE)
        var waitBool = this.getFieldValue('blocking') == 'TRUE'

        if (pitch < 1) {
            this.childBlocks_[0].setFieldValue(1, 'NUM');
        } else if (pitch > 5000) {
            this.childBlocks_[0].setFieldValue(5000, 'NUM');
        }
        if (duration < 0) {
            this.childBlocks_[1].setFieldValue(0, 'NUM');
        }
        if (post < 0) {
            this.childBlocks_[2].setFieldValue(0, 'NUM');
        }
        if (!waitBool && !this.waitBoolRemoved) {
            this.removeInput('post_pause', true);
            this.waitBoolRemoved = true;
            if (duration > 2.55){
                this.childBlocks_[1].setFieldValue(2.55, 'NUM');
            }
        }
        if (waitBool && this.waitBoolRemoved) {
            this.appendValueInput("post_pause")
                .setCheck("Number")
                .appendField("And then wait (sec)");
            this.waitBoolRemoved = false;
        }
    }
};

Blockly.Blocks['fusion_usbGamepad_readAxis'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Read Axis: ')
			.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "axis");
		this.appendDummyInput()
            .appendField('Invert: ')
			.appendField(new Blockly.FieldDropdown([["False", "False"], ["True", "True"]]), "inv");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 0;
        this.setColour(0);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Read the selected axis of the connected gamepad from -100 to 100.');
        this.setHelpUrl(origin + doc_path +'/Blk_usbGamepad/#read-axis');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_usbGamepad_readAxisFloat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Read Axis Float: ')
			.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "axis");
		this.appendDummyInput()
            .appendField('Invert: ')
			.appendField(new Blockly.FieldDropdown([["False", "False"], ["True", "True"]]), "inv");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 0;
        this.setColour(0);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Read the selected axis of the connected gamepad from -1.00 to 1.00.');
        this.setHelpUrl(origin + doc_path +'/Blk_usbGamepad/#read-axis-float');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_usbGamepad_mixer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Axis Mixer');
		this.appendDummyInput()
			.appendField('X-Axis:')
			.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "x_axis");
		this.appendDummyInput()
			.appendField('Y-Axis:')
			.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "y_axis");
		this.appendDummyInput()
			.appendField('X-Invert:')
			.appendField(new Blockly.FieldDropdown([["False", "False"], ["True", "True"]]), "x_inv");
		this.appendDummyInput()	
			.appendField('Y-Invert:')
			.appendField(new Blockly.FieldDropdown([["False", "0"], ["True", "1"]]), "y_inv");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 0;
        this.setColour(0);
		this.setInputsInline(false);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Combine the values of two sleceted axes. Returns a tuple from -100 to 100 that can be directly set to M0 and M1. This allows for a proportional tank drive. Refer to examples and documentation for a more detailed explanation.');
        this.setHelpUrl(origin + doc_path +'/Blk_usbGamepad/#axis-mixer');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_usbGamepad_readButton'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Read Button: ')
			.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"]]), "button");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 0;
        this.setColour(0);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Read the selected button of the connected gamepad. A value of 0 is returned if the button is not pressed and a value of 1 is reeturned if the button is pressed.');
        this.setHelpUrl(origin + doc_path +'/Blk_usbGamepad/#read-button');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_usbGamepad_readHat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Read Hat');
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 0;
        this.setColour(0);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Read the hat (D-Pad) of the connected gamepad. The value is returned in a tuple (X,Y) where X and Y are either -1, 0 or 1.');
        this.setHelpUrl(origin + doc_path +'/Blk_usbGamepad/#read-hat');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_VirtualGamepad_Joystick'] = {
     init: function () {
         this.appendDummyInput()
			.appendField('Read ')
			.appendField(new Blockly.FieldDropdown([["Left", "Left"], ["Right", "Right"]]), "joystick")
			.appendField(' Joystick');
 		this.appendDummyInput()
            .appendField('Mixer: ')
 			.appendField(new Blockly.FieldDropdown([["True", "True"], ["False", "False"]]), "mixer");
 		this.appendDummyInput()
            .appendField('X-Invert: ')
 			.appendField(new Blockly.FieldDropdown([["True", "True"], ["False", "False"]]), "x_inv");
 		this.appendDummyInput()
            .appendField('Y-Invert: ')
 			.appendField(new Blockly.FieldDropdown([["True", "True"], ["False", "False"]]), "y_inv");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(240);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
 		this.setInputsInline(false);
 		this.setOutput(true, "Number");
        this.setTooltip('Read the X-axis and Y-axis of the left or right joystick. Choose to mix or invert the values.');
        this.setHelpUrl(origin + doc_path +'/Blk_VirtualGamepad/#read-joystick');
     },
 
     getBlockType: function () {
         return Blockly.Types.NUMBER;
     }
 };

Blockly.Blocks['fusion_VirtualGamepad_readButton'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('Read Button: ')
			.appendField(new Blockly.FieldDropdown([["A", "'A'"], ["B", "'B'"], ["X", "'X'"], ["Y", "'Y'"]]), "button");
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(240);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
		this.setOutput(true, "Number");
        this.setTooltip('Read one of the 4 on screen buttons. Returns either a 0 or 1.');
        this.setHelpUrl(origin + doc_path +'/Blk_VirtualGamepad/#read-button');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['fusion_VirtualGamepad_telemetry'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('Telemetry -');
		this.appendValueInput('line')
            .appendField("Line:")
            .setCheck("Number");
		this.appendValueInput('TEXT')
			.appendField('Value:');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(240);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Print data to the Virtual Gamepad screen.');
        this.setHelpUrl(origin + doc_path +'/Blk_VirtualGamepad/#telemetry');
    }
};

Blockly.Blocks['fusion_VirtualGamepad_camera'] = {
    init: function () {
		this.waitBoolRemoved = false;
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
            .appendField('Camera');
		this.appendValueInput('Res_w')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Resolution Width:")
			.setCheck("Number");
		this.appendValueInput('Res_h')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Resolution Height:")
			.setCheck("Number");
		this.appendValueInput('fps')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Frames Per Second:")
			.setCheck("Number");
		this.appendDummyInput('mode')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('Mode:')
			.appendField(new Blockly.FieldDropdown([["YUV", "'YUV'"], ["MJPG", "'MJPG'"], ["PICAM", "'PICAM'"]]), "mode");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = 1;
        Blockly.HSV_VALUE = 1;
        this.setColour(240);
        Blockly.HSV_SATURATION = 0.45;
        Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Display the output of a connected USB camera to the Virtual Gamepad screen.');
        this.setHelpUrl(origin + doc_path +'/Blk_VirtualGamepad/#camera');
    }
};