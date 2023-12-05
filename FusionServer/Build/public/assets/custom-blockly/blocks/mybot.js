/**
 * Fusion Blocks Creator for Blockly 
 * Author: Modern Robotics
 */
'use strict';

goog.provide('Blockly.Blocks.fusion');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

// Configuration variables

let origin = String(document.location.origin)
let doc_path = '/assets/docs/fusion'
let documentationPath = origin + doc_path;

let imageW = 35;
let imageH = 35;

let startBlockColor = 135;
let gyroBlockColor = 30;
let ledBlockColor = 30
let waitBlockColor = 60;
let displayEmojiBlockColor = 180;
let displayFaceBlockColor = 10;
let moveBlockColor = 180;
let speedBlockColor = 90;
let rotateBlockColor = 285;

const blockColors = {};

const assetPaths = {};

const analogPorts = [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
];

const digitalPorts = [
    ["D0", "D0"],
    ["D1", "D1"],
];

const motorPorts = [];

const servoPorts = [
    ["S0", "S0"],
    ["S1", "S1"],
    ["S2", "S2"],
    ["S3", "S3"]
];

const defaultPorts = {
    magnetic: "A4",
};

function arrangePorts(defaultPort, ports) {
    // Find the index of the default port
    const index = ports.findIndex(port => port[0] === defaultPort);

    // If not found, just return the ports as is
    if (index === -1) {
        return ports;
    }

    // Remove the default port from the array
    const defaultPortArray = ports.splice(index, 1);

    // Add it to the beginning of the array
    ports.unshift(defaultPortArray[0]);

    return ports;
}

///////////////////////////////////
// Define basic blocks
///////////////////////////////////

Blockly.Blocks['mybot_start'] = {
    init: function() {
        Blockly.BlockSvg.START_HAT = true;
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/RecruitStart.png", imageW * 3, imageH * 1.5, { alt: "*", flipRtl: "FALSE" }));
        this.setNextStatement(true, null);
        this.setColour(startBlockColor);
        this.setTooltip("Initialize the MyBot Robot.");
        this.setHelpUrl(documentationPath + "/Int_MyBot-Control/#start-block");
    }
};

Blockly.Blocks['mybot_drive_with_gyro'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/gyro.png", imageW * 2.5, imageH * 2, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(gyroBlockColor);
        this.setTooltip("Drive with the Integrating Gyro. This block modifies the Move Robot and Rotate Robot blocks in Basic Blockly for more accurate turning. Refer to the documentation for a further instruction with this block.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#drive-with-gyro");
    }
};
  
Blockly.Blocks['mybot_basic_ledb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightB.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ledBlockColor);
        this.setTooltip("Turn on Blue LED. Turn off Yellow LED.");
        this.setHelpUrl(documentationPath + "/Basic_MyBot-Control/#blue-led-on");
    }
};
  
Blockly.Blocks['mybot_basic_ledy'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightY.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ledBlockColor);
        this.setTooltip("Turn on Yellow LED. Turn off Blue LED.");
        this.setHelpUrl(documentationPath + "/Basic_MyBot-Control/#yellow-led-on");
    }
};
  
Blockly.Blocks['mybot_basic_ledby'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/lightBY.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ledBlockColor);
        this.setTooltip("Turn on Blue and Yellow LED.");
        this.setHelpUrl(documentationPath + "/Basic_MyBot-Control/#both-leds-on");
    }
};
  
Blockly.Blocks['mybot_basic_ledoff'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/light.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ledBlockColor);
        this.setTooltip("Turn off Blue and Yellow LED.");
        this.setHelpUrl(documentationPath + "/Basic_MyBot-Control/#both-leds-off");
    }
};
  
Blockly.Blocks['mybot_basic_wait'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(new Blockly.FieldImage("assets/img/fusion/wait.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(waitBlockColor);
        this.setTooltip("Wait 1 second.");
        this.setHelpUrl(documentationPath + "/Basic_MyBot-Control/#wait");
    }
};

Blockly.Blocks['mybot_display_straight_ahead'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/StraightAhead.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display eyes straight emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-straight-ahead-emoji");
    }
};
  
Blockly.Blocks['mybot_display_snooze'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/Snooze.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display snooze emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-snooze-emoji");
    }
};
  
Blockly.Blocks['mybot_display_eyes_closed'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/EyesClosed.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display eyes closed emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-closed-emoji");
    }
};
  
Blockly.Blocks['mybot_display_eyes_left'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/EyesLeft.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display eyes left emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-left-emoji");
    }
};
  
Blockly.Blocks['mybot_display_eyes_right'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/EyesRight.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display eyes right emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-right-emoji");
    }
};
  
Blockly.Blocks['mybot_display_eyes_crashed'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/Crash.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display crash emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-crashed-emoji");
    }
};

Blockly.Blocks['mybot_display_emoji_glasses'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/Glasses.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display glasses emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-glasses-emoji");
    }
};

Blockly.Blocks['mybot_display_emoji_oh_no'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/OhNo.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display on no emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-oh-no-emoji");
    }
};

Blockly.Blocks['mybot_display_emoji_sunglasses'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/Sunglasses.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display sunglasses emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-sunglasses-emoji");
    }
};

Blockly.Blocks['mybot_display_emoji_thumbs_down'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/ThumbsDown.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display thumbs down emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-thumbs-down-emoji");
    }
};

Blockly.Blocks['mybot_display_emoji_thumbs_up'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/emojis/ThumbsUp.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Display thumbs up emoji.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-thumbs-up-emoji");
    }
};

Blockly.Blocks['mybot_display_face_straight'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/faces/straight.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayFaceBlockColor);
        this.setTooltip("Display eyes straight face.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-straight-face");
    }
};

Blockly.Blocks['mybot_display_face_left'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/faces/left.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayFaceBlockColor);
        this.setTooltip("Display eyes left face.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-left-face");
    }
};

Blockly.Blocks['mybot_display_face_right'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/faces/right.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayFaceBlockColor);
        this.setTooltip("Display eyes right face.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-eyes-right-face");
    }
};

Blockly.Blocks['mybot_display_face_snooze'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/faces/snooze.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayFaceBlockColor);
        this.setTooltip("Display snooze face.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-snooze-face");
    }
};

Blockly.Blocks['mybot_display_face_crash'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/faces/crash.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayFaceBlockColor);
        this.setTooltip("Display crash face.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#display-crash-face");
    }
};

Blockly.Blocks['mybot_display_clear'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/screen-icon.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(displayEmojiBlockColor);
        this.setTooltip("Clears the display.");
        this.setHelpUrl(documentationPath + "/Basic_Display-Robot/#clear-display");
    }
};
  
Blockly.Blocks['mybot_basic_forward'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(new Blockly.FieldImage("assets/img/fusion/fwd.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(moveBlockColor);
        this.setTooltip("Drive forward for 1 second then stop.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#forward");
    }
};
  
Blockly.Blocks['mybot_basic_backward'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(new Blockly.FieldImage("assets/img/fusion/back.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(moveBlockColor);
        this.setTooltip("Drive reverse for 1 second then stop.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#backward");
    }
};
  
Blockly.Blocks['mybot_basic_fast'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/hare.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(speedBlockColor);
        this.setTooltip("Drive Fast Speed.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#fast");
    }
};
  
Blockly.Blocks['mybot_basic_medium'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/turtle.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(speedBlockColor);
        this.setTooltip("Drive Medium Speed.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#medium");
    }
};
  
Blockly.Blocks['mybot_basic_slow'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/snail.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(speedBlockColor);
        this.setTooltip("Drive Slow Speed.");
        this.setHelpUrl(documentationPath + "/Basic_Move-Robot/#slow");
    }
};
  
Blockly.Blocks['mybot_basic_right45'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TSR.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn right 45 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-right-45");
    }
};
  
Blockly.Blocks['mybot_basic_right90'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TR.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn right 90 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-right-90");
    }
};
  
Blockly.Blocks['mybot_basic_right180'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TUR.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn right 180 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-right-180");
    }
};
  
Blockly.Blocks['mybot_basic_left45'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TSL.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn left 45 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-left-45");
    }
};
  
Blockly.Blocks['mybot_basic_left90'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TL.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn left 90 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-left-90");
    }
};
  
Blockly.Blocks['mybot_basic_left180'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/fusion/TUL.png", imageW, imageH, { alt: "*", flipRtl: "FALSE" }));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(rotateBlockColor);
        this.setTooltip("Turn left 180 degrees.");
        this.setHelpUrl(documentationPath + "/Basic_Rotate-Robot/#rotate-left-180");
    }
};

//////////////////////////////////////////////////////


///////////////////////////////////
// Define intermediate blocks
///////////////////////////////////

Blockly.Blocks.fusion.HUE = 240;

Blockly.Blocks['mybot_motor'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Int_Motors/#motor-speed');
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

Blockly.Blocks['mybot_drive'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Int_Motors/#drive-at-speed');
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

Blockly.Blocks['mybot_drive_time'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Int_Motors/#drive-at-speed-for-time');
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

Blockly.Blocks['mybot_rotate'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Int_Motors/#rotate-at-speed-for-time');
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

Blockly.Blocks['mybot_servo_target'] = {
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
        this.setTooltip('Send selected servo to a target position 0 - 255. BE CAREFUL as MRI is not responsible for damaged servos due to exceeding mechanical limits.');
        this.setHelpUrl(documentationPath +'/Int_Servos/#servo-target');
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

Blockly.Blocks['mybot_led'] = {
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
        this.setHelpUrl(documentationPath +'/Int_MyBot-Control/#led');
    }
};

Blockly.Blocks['mybot_end'] = {
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
        this.setHelpUrl(documentationPath +'/Int_MyBot-Control/#end-program');
    }
};

Blockly.Blocks['mybot_comment'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Int_MyBot-Control/#comment');
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
        this.setHelpUrl(documentationPath +'/time/#wait-in-seconds');
    },
    onchange: function () {
        var delay = Blockly.Python.valueToCode(this, "delay", Blockly.Python.ORDER_NONE)
        if (delay < 0) {
            this.childBlocks_[0].setFieldValue(0, 'NUM');
        }
    }
};

Blockly.Blocks['time_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get time");
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("Returns the current timestamp from the system clock");
        this.setHelpUrl(documentationPath +'/time/#get-time');
    }
};

Blockly.Blocks['mybot_analog_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read from Analog Port")
            .appendField(new Blockly.FieldDropdown(analogPorts), "Port");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Read the value of an analog port 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Analog_Digital/#analog-read');
        this.setOutput(true, "Number");
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_digital_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read from Digital Port")
            .appendField(new Blockly.FieldDropdown(digitalPorts), 'Port')
        this.setOutput(true, "Boolean");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Read the value of a digital port 0 or 1.');
        this.setHelpUrl(documentationPath +'/Blk_Analog_Digital/#digital-read');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['mybot_digital_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Write to Digital Port")
            .appendField(new Blockly.FieldDropdown(digitalPorts), "Port")
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
        this.setHelpUrl(documentationPath +'/Blk_Analog_Digital/#digital-write');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['mybot_touch_read'] = {
    init: function () {
        this.setHelpUrl(documentationPath +'/Blk_Touch_Sensor/#pressed');
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.appendDummyInput()
            .appendField("Touch Sensor on Port")
            .appendField(new Blockly.FieldDropdown(digitalPorts), 'Port')
            .appendField("is")
            .appendField(new Blockly.FieldDropdown([["Pressed", "Pressed"], ["Not Pressed", "Not Pressed"]]), "condition");
        this.setOutput(true, "Boolean");
        this.setTooltip("Returns true or false depending on the button's state the user wants to check for.");
    },
    /** @return {!string} The type of return value for the block, an integer. */
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['mybot_compass_heading'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#get-heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_compass_hardIronCalibration'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#hard-iron-calibration');
    }
};

Blockly.Blocks['mybot_compass_tiltUp'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#tilt-up-calibration');
    }
};

Blockly.Blocks['mybot_compass_tiltDown'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#tilt-down-calibration');
    }
};

Blockly.Blocks['mybot_compass_nullAccelerometer'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#accelerometer-calibration');
    }
};

Blockly.Blocks['mybot_compass_getAccelerometer'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#get-accelerometer-reading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_compass_getMagnetometer'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#get-magnetometer-reading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_compass_scaleAccelerometer'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Compass/#scale-accelerometer');
    }
};

Blockly.Blocks['mybot_intGyro_heading'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Integrating_Gyro/#get-heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_intGyro_calibrate'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Integrating_Gyro/#calibrate');
    }
};

Blockly.Blocks['mybot_intGyro_zero'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Integrating_Gyro/#zero');
    }
};

Blockly.Blocks['mybot_rate_gyro_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Rate Gyro on Port")
            .appendField(new Blockly.FieldDropdown(analogPorts), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect the rate of rotation on a horizontal plane. Returns a value 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Rate_Gyro/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_seeker_heading'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_IR_Seeker_V3/#heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_seeker_intensity'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_IR_Seeker_V3/#intensity');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_locator_heading'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_IR_Locator_360/#heading');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_locator_intensity'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_IR_Locator_360/#intensity');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_color_beacon_set_color'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Color_Beacon/#set-color');
    }
};

Blockly.Blocks['mybot_color_beacon_set_custom_color'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Color_Beacon/#set-custom-color');
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

Blockly.Blocks['mybot_color_sensor_setup_init'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Color_Sensor/#set-mode');
    }
};

Blockly.Blocks['mybot_color_sensor_color_number'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Color_Sensor/#get-color-number');
    }
};

Blockly.Blocks['mybot_color_sensor_color_rgb'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Color_Sensor/#get-rgb');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_color_sensor_calibrate_black_balance'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Calibrate Black Balance");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
        this.setColour(50);
        Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Some tool tip');
        this.setHelpUrl(documentationPath + '/helpUrl');
    },
};

Blockly.Blocks['mybot_color_sensor_calibrate_white_balance'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Calibrate White Balance");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
        this.setColour(50);
        Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Some tool tip');
        this.setHelpUrl(documentationPath + '/helpUrl');
    },
};

Blockly.Blocks['mybot_light_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Light Sensor on Port")
            .appendField(new Blockly.FieldDropdown(analogPorts), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Measures the amount of ambient light. Returns a value 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Light_Sensor/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_range_sensor_us'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Range_Sensor/#ultrasonic');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_range_sensor_ods'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Range_Sensor/#optical');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_ods_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Optical Distance Sensor on Port")
            .appendField(new Blockly.FieldDropdown(analogPorts), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect proximity using infrared light. Returns a value 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Optical_Distance_Sensor/#read');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['recruit_eopd_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Optical Distance Sensor Facing")
            .appendField(new Blockly.FieldDropdown([["Forward", "Forward"], ["Downward", "Downward"]]), "Facing");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Detect proximity using infrared light. Returns a value 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Optical_Distance_Sensor/#read');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_magnetic_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read Magnetic Sensor on Port")
            .appendField(new Blockly.FieldDropdown(arrangePorts(defaultPorts.magnetic, analogPorts)), "Port");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Measures the inensity of a magnetic field. Returns a value 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Magnetic_Sensor/#read');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_sound_generator'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_Sound_Generator/#set-sound-blocking');
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

Blockly.Blocks['mybot_usbGamepad_readAxis'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_usbGamepad/#read-axis');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_usbGamepad_readAxisFloat'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_usbGamepad/#read-axis-float');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_usbGamepad_mixer'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_usbGamepad/#axis-mixer');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_usbGamepad_readButton'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_usbGamepad/#read-button');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_usbGamepad_readHat'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_usbGamepad/#read-hat');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_VirtualGamepad_Joystick'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_VirtualGamepad/#read-joystick');
     },
 
     getBlockType: function () {
         return Blockly.Types.NUMBER;
     }
 };

Blockly.Blocks['mybot_VirtualGamepad_readButton'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_VirtualGamepad/#read-button');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['mybot_VirtualGamepad_telemetry'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('Telemetry -');
		this.appendDummyInput()
            .appendField("Line:")
            .appendField(new Blockly.FieldDropdown([["1", "0"], ["2", "1"], ["3", "2"], ["4", "3"], ["5", "4"], ["6", "5"], ["7", "6"], ["8", "7"], ]), "line");
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
        this.setHelpUrl(documentationPath +'/Blk_VirtualGamepad/#telemetry');
    }
};

Blockly.Blocks['mybot_VirtualGamepad_camera'] = {
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
        this.setHelpUrl(documentationPath +'/Blk_VirtualGamepad/#camera');
    }
};

/* THIS SECTION IS FOR CORE CONTROL BLOCKS ONLY. KEEP FUSION SPECIFIC BLOCKS ABOVE THIS SECTION */

Blockly.Blocks['CoreControl_printDevices'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('Print Connected Core Control Modules');
        Blockly.HSV_SATURATION = 1;
		Blockly.HSV_VALUE = .71;
		this.setColour(135);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Read a list of connected Core Control Modules. This will return a list contatin USB ports, Module name and Module FTDI serial number. The module serial number is needed to communicate with the module.');
        this.setHelpUrl(documentationPath +'/CoreControlDriver/#print-devices');
    } 
};

Blockly.Blocks['CoreControl_CoreMotorController'] = {
    init: function () {
        this.setColour(0);
        this.appendDummyInput()
            .appendField('Set Core Motor Controller')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendValueInput('TEXT')
			.appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Setup a Core Motor Controller by setting a name that corresponds to the FTDI serial number.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#setup');
    }
};

Blockly.Blocks['CoreControl_constantSpeed'] = {
    init: function () {
        this.setColour(0);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendValueInput('power')
			.appendField('Motor')
            .appendField(new Blockly.FieldDropdown([["M1", "M1"], ["M2", "M2"]]), "motor")
            .appendField("to Speed")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Set speed of a motor between -100 and 100.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#motor-speed');
    },
    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "power", Blockly.Python.ORDER_NONE)
        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
    }
};

Blockly.Blocks['CoreControl_constantPower'] = {
    init: function () {
        this.setColour(0);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendValueInput('power')
			.appendField('Motor')
            .appendField(new Blockly.FieldDropdown([["M1", "M1"], ["M2", "M2"]]), "motor")
            .appendField("to Power")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Set power of a motor between -100 and 100.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#motor-power');
    },
    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "power", Blockly.Python.ORDER_NONE)
        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
    }
};

Blockly.Blocks['CoreControl_runToPosition'] = {
    init: function () {
        this.setColour(0);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendValueInput('power')
			.appendField('Run motor')
            .appendField(new Blockly.FieldDropdown([["M1", "M1"], ["M2", "M2"]]), "motor")
            .appendField("at a power of")
            .setCheck("Number");
		this.appendValueInput('target')
            .appendField("to encoder target")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Run to an encoder position at a set speed.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#run-to-position');
    },
    onchange: function () {
        var power = Blockly.Python.valueToCode(this, "power", Blockly.Python.ORDER_NONE)
        if (power < -100) {
            this.childBlocks_[0].setFieldValue(-100, 'NUM');
        } else if (power > 100) {
            this.childBlocks_[0].setFieldValue(100, 'NUM');
        }
    }
};

Blockly.Blocks['CoreControl_readEncoder'] = {
    init: function () {
        this.setColour(0);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
			.appendField('Read encoder on motor port')
            .appendField(new Blockly.FieldDropdown([["M1", "M1"], ["M2", "M2"]]), "motor");
        this.setInputsInline(true);
		this.setOutput(true, "Number");
        this.setTooltip('Read the current encoder position of the motor.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#read-encoder');
    },
        getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_readBattVoltage'] = {
    init: function () {
        this.setColour(0);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name')
			.appendField('Read 12V Battery Voltage');
        this.setInputsInline(true);
		this.setOutput(true, "Number");
        this.setTooltip('Read the 12V battery voltage.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Motor_Controller/#read-battery-voltage');
    },
        getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_CoreServoController'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Set Core Servo Controller')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendValueInput('TEXT')
			.appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		Blockly.HSV_SATURATION = 1;
		Blockly.HSV_VALUE = .61;
		this.setColour(330);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Setup a Core Servo Controller by setting a name that corresponds to the FTDI serial number.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Servo_Controller/#setup');
    }
};

Blockly.Blocks['CoreControl_servoTarget'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Set Servo")
            .appendField(new Blockly.FieldDropdown([["S1", "S1"], ["S2", "S2"], ["S3", "S3"], ["S4", "S4"], ["S5", "S5"], ["S6", "S6"]]), "servo");
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
        this.setTooltip('Send selected servo to a target position 0 - 255. BE CAREFUL as MRI is not responsible for damaged servos due to exceeding mechanical limits.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Servo_Controller/#servo-target');
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

Blockly.Blocks['CoreControl_CoreDeviceInterface'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Set Core Device Interface')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendValueInput('TEXT')
			.appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Setup a Core Device Interface by setting a name that corresponds to the FTDI serial number.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#setup');
    }
};

Blockly.Blocks['CoreControl_cdi_led'] = {
    init: function () {
        var colour = new Blockly.FieldColour('#ff0000');
        colour.setColours(['#ff0000', '#0000ff']).setColumns(2);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name')
			.appendField(' ');
        this.appendDummyInput()
            .appendField(colour, 'COLOUR')
            .appendField("LED")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "Mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		this.setInputsInline(true);
        this.setColour(Blockly.Blocks.fusion.HUE);
        this.setTooltip('Turn an on-board user LED on or off.');
        this.setHelpUrl(documentationPath +'/Core_Device_Interface/#set-led');
    }
};

Blockly.Blocks['CoreControl_analogRead'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Read from Analog Port")
            .appendField(new Blockly.FieldDropdown(analogPorts), "Port");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setTooltip('Read the value of an analog port 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#analog-read');
        this.setOutput(true, "Number");
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_analogOutputWrite'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name')
            .appendField("Write to Analog Output Port")
            .appendField(new Blockly.FieldDropdown([["AO-0", "AO0"], ["AO-1", "AO1"]]), "Port");
		this.appendValueInput('voltage')
            .appendField("Voltage :")
			.setAlign(Blockly.ALIGN_RIGHT)
            .setCheck("Number");
		this.appendValueInput('frequency')
            .appendField("Frequency :")
			.setAlign(Blockly.ALIGN_RIGHT)
            .setCheck("Number");
		this.appendDummyInput()
			.appendField('Mode :')
			.setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["DC", "0"], ["Sine", "1"], ["Square", "2"], ["Triangle", "3"]]), "mode");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Output a voltage from the specified port at a set frequency and waveform.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#analog-output-write');
    },

    onchange: function () {
        var voltage = Blockly.Python.valueToCode(this, "voltage", Blockly.Python.ORDER_NONE)
        var frequency = Blockly.Python.valueToCode(this, "frequency", Blockly.Python.ORDER_NONE)
        var mode = this.getFieldValue('mode')

		if (mode == 0){
			if (voltage < -1024) {
				this.childBlocks_[0].setFieldValue(-1024, 'NUM');
			} else if (voltage > 1023) {
				this.childBlocks_[0].setFieldValue(1023, 'NUM');
			}
		} else {
			if (voltage < 0) {
				this.childBlocks_[0].setFieldValue(0, 'NUM');
			} else if (voltage > 1023) {
				this.childBlocks_[0].setFieldValue(1023, 'NUM');
			}
		}
		
		if (mode != 0){
			if (frequency < 1) {
				this.childBlocks_[1].setFieldValue(1, 'NUM');
			} else if (frequency > 5000) {
				this.childBlocks_[1].setFieldValue(5000, 'NUM');
			}
		} else this.childBlocks_[1].setFieldValue(0, 'NUM');
    }
};

Blockly.Blocks['CoreControl_digitalRead'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Read from Digital Port")
            .appendField(new Blockly.FieldDropdown(digitalPorts), 'Port')
        this.setOutput(true, "Boolean");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setTooltip('Read the value of a digital port 0 or 1.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#digital-read');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['CoreControl_digitalWrite'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Write to Digital Port")
            .appendField(new Blockly.FieldDropdown(digitalPorts), "Port")
            .appendField("a value of")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "Value")
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write the value of 0 or 1 to a digital port.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#digital-write');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['CoreControl_setPWM'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Set PWM")
            .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"]]), "Port");
		this.appendValueInput('onTime')
            .appendField("for a cycle time")
            .setCheck("Number");
		this.appendDummyInput()
            .appendField("uS");
		this.appendValueInput('period')
            .appendField("with period")
            .setCheck("Number");
		this.appendDummyInput()
            .appendField("uS");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write the value of 0 or 1 to a digital port.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#set-pwm');
    }
};

Blockly.Blocks['CoreControl_i2cRead'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput('addr')
            .appendField("Read from I2C Address 0x")
            .appendField(new Blockly.FieldTextInput(''), 'addr');
		this.appendValueInput('reg')
            .appendField("from Register 0x")
			.setCheck("Number");
		this.appendValueInput('len')
            .appendField("with Length")
			.setCheck("Number");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setTooltip('Read a value(s) from a connected I2C device.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#i2c-read');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_i2cWrite'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput('addr')
            .appendField("Write to I2C Address 0x")
            .appendField(new Blockly.FieldTextInput(''), 'addr');
		this.appendValueInput('reg')
            .appendField("to Register 0x")
			.setCheck("Number");
		this.appendValueInput('data')
            .appendField("with a value of")
			.setCheck("Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write a value to a connected I2C device.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Device_Interface/#i2c-write');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_CoreLegacyModule'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Set Core Legacy Module')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendValueInput('TEXT')
			.appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
        this.setTooltip('Setup a Core Legacy Module by setting a name that corresponds to the FTDI serial number.');
		this.setHelpUrl(documentationPath +'/Blk_Core_Legacy_Module/#setup');
    }
};

Blockly.Blocks['CoreControl_clm_led'] = {
    init: function () {
        var colour = new Blockly.FieldColour('#00ff00');
        colour.setColours(['#00ff00']).setColumns(1);
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name')
			.appendField(' ');
        this.appendDummyInput()
		    .appendField(colour, 'COLOUR')
            .appendField(new Blockly.FieldDropdown([["LED 1", "0"], ["LED 2", "1"], ["LED 3", "2"], ["LED 4", "3"]]), "led")
			.appendField(' ');
		this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "state");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		this.setInputsInline(true);
        this.setColour(Blockly.Blocks.fusion.HUE);
        this.setTooltip('Turn an on-board user LED on or off.');
        this.setHelpUrl(documentationPath +'/Core_Legacy_Module/#set-led');
    }
};

Blockly.Blocks['CoreControl_clm_analogRead'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
        this.appendDummyInput()
            .appendField("Read from Port")
            .appendField(new Blockly.FieldDropdown([["S0", "S0"], ["S1", "S1"], ["S2", "S2"], ["S3", "S3"], ["S4", "S4"], ["S5", "S5"]]), "Port");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setTooltip('Read the value of a port 0 - 1023.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Legacy_Module/#analog-read');
        this.setOutput(true, "Number");
    },
	
	onchange: function () {
        var port = this.getFieldValue('Port')
		
        if ((port == "S4" || port == "S5")&& this.nineVRemoved) {
			this.appendDummyInput("nineV")
				.appendField("Enable 9V")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "nineV");
			this.nineVRemoved = false;
        } else if ((port != "S4" && port != "S5") && !this.nineVRemoved){
            this.removeInput("nineV", true);
			this.nineVRemoved = true;
        }
	},

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_clm_i2cRead'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendDummyInput()
            .appendField("Read on Port")
            .appendField(new Blockly.FieldDropdown([["S0", "S0"], ["S1", "S1"], ["S2", "S2"], ["S3", "S3"], ["S4", "S4"], ["S5", "S5"]]), "Port");
        this.appendDummyInput('addr')
            .appendField("from I2C Address 0x")
            .appendField(new Blockly.FieldTextInput(''), 'addr');
		this.appendValueInput('reg')
            .appendField("from Register 0x")
			.setCheck("Number");
		this.appendValueInput('len')
            .appendField("with Length")
			.setCheck("Number");
        this.setOutput(true, "Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
        this.setTooltip('Read a value(s) from a connected I2C device.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Legacy_Module/#i2c-read');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['CoreControl_clm_i2cWrite'] = {
    init: function () {
		this.appendDummyInput()
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'name');
		this.appendDummyInput()
            .appendField("Write to Port")
            .appendField(new Blockly.FieldDropdown([["S0", "S0"], ["S1", "S1"], ["S2", "S2"], ["S3", "S3"], ["S4", "S4"], ["S5", "S5"]]), "Port");
        this.appendDummyInput('addr')
            .appendField("to I2C Address 0x")
            .appendField(new Blockly.FieldTextInput(''), 'addr');
		this.appendValueInput('reg')
            .appendField("to Register 0x")
			.setCheck("Number");
		this.appendValueInput('data')
            .appendField("with a value of")
			.setCheck("Number");
        Blockly.HSV_SATURATION = .10;
		Blockly.HSV_VALUE = .70;
		this.setColour(50);
		Blockly.HSV_SATURATION = 0.45;
		Blockly.HSV_VALUE = 0.65;
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write a value to a connected I2C device.');
        this.setHelpUrl(documentationPath +'/Blk_Core_Legacy_Module/#i2c-write');
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['Open_File'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("open file")
          .appendField(new Blockly.FieldTextInput("filename.txt"), "file_name")
          .appendField("with option")
          .appendField(new Blockly.FieldDropdown([["Append","a"], ["Overwrite","w"], ["Read", "r"]]), "open_type");
      this.setOutput(true, "File");
      this.setColour(65);
   this.setTooltip("Returns a file object and sets to append or overwrite mode");
   this.setHelpUrl(documentationPath +'/Blk_File_Handling/#open-file');
    }
};

Blockly.Blocks['Write_To_File'] = {
    init: function() {
        this.appendValueInput("file")
          .setCheck("File")
          .appendField("In file");
      this.appendValueInput("write_value")
          .setCheck("String")
          .appendField("write");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
        this.setTooltip("Writes string to file object");
        this.setHelpUrl(documentationPath +'/Blk_File_Handling/#write-to-file');
    }
};

Blockly.Blocks['Close_File'] = {
    init: function() {
      this.appendValueInput("file")
          .setCheck("File")
          .appendField("Close");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
    this.setTooltip("Closes the file object");
    this.setHelpUrl(documentationPath +'/Blk_File_Handling/#close-file');
    }
};

Blockly.Blocks['mybot_display_color'] = {
    init: function () {
        var colour = new Blockly.FieldColour('#ff0000');
        colour.setColours(['#000000', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff']).setColumns(4);
        this.appendDummyInput()
            .appendField("Set Display Color to:")
            .appendField(colour, 'COLOUR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
		this.setColour(240);
        this.setTooltip('Select a color to illuminate.');
        this.setHelpUrl(documentationPath +  '/Int_Display-Robot/#display-color');
    }
};

Blockly.Blocks['mybot_display_emoji'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display emoji:")
            .appendField(new Blockly.FieldDropdown([
                [{"src": "assets/img/fusion/display/emojis/eyes-straight.png", "width": 40, "height": 40}, "eyes-straight"],
                [{"src": "assets/img/fusion/display/emojis/eyes-left.png", "width": 40, "height": 40}, "eyes-left"],
                [{"src": "assets/img/fusion/display/emojis/eyes-right.png", "width": 40, "height": 40}, "eyes-right"],
                [{"src": "assets/img/fusion/display/emojis/eyes-closed.png", "width": 40, "height": 40}, "eyes-closed"],        
                [{"src": "assets/img/fusion/display/emojis/crash.png", "width": 40, "height": 40}, "crash"],
                [{"src": "assets/img/fusion/display/emojis/snooze.png", "width": 40, "height": 40}, "snooze"],
                [{"src": "assets/img/fusion/display/emojis/glasses.png", "width": 40, "height": 40}, "glasses"],
                [{"src": "assets/img/fusion/display/emojis/oh-no.png", "width": 40, "height": 40}, "oh-no"],
                [{"src": "assets/img/fusion/display/emojis/sunglasses.png", "width": 40, "height": 40}, "sunglasses"],                
                [{"src": "assets/img/fusion/display/emojis/thumbs-up.png", "width": 40, "height": 40}, "thumbs-up"],
                [{"src": "assets/img/fusion/display/emojis/thumbs-up.png", "width": 40, "height": 40}, "thumbs-down"],
            ]), "Emoji");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip('Displays selected emoji.');
        this.setHelpUrl(documentationPath +  '/Int_Display-Robot/#display-emoji');
    }
};

Blockly.Blocks['mybot_display_face'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display face:")
            .appendField(new Blockly.FieldDropdown([
                [{"src": "assets/img/fusion/display/faces/straight.jpg", "width": 48, "height": 32}, "straight"],                
                [{"src": "assets/img/fusion/display/faces/left.jpg", "width": 48, "height": 32}, "left"],
                [{"src": "assets/img/fusion/display/faces/right.jpg", "width": 48, "height": 32}, "right"],
                [{"src": "assets/img/fusion/display/faces/crash.jpg", "width": 48, "height": 32}, "crash"],
                [{"src": "assets/img/fusion/display/faces/snooze.jpg", "width": 48, "height": 32}, "snooze"],
                [{"src": "assets/img/fusion/display/faces/blushing.jpg", "width": 48, "height": 32}, "blushing"],
                [{"src": "assets/img/fusion/display/faces/excited.jpg", "width": 48, "height": 32}, "excited"],
                [{"src": "assets/img/fusion/display/faces/sad.jpg", "width": 48, "height": 32}, "sad"],
                [{"src": "assets/img/fusion/display/faces/scared.jpg", "width": 48, "height": 32}, "scared"],
                [{"src": "assets/img/fusion/display/faces/silly.jpg", "width": 48, "height": 32}, "silly"],
            ]), "Face");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip('Displays selected face.');
        this.setHelpUrl(documentationPath + '/Int_Display-Robot/#display-face');
    }
};

Blockly.Blocks['mybot_display_clear'] = {
    init: function() {
		this.appendDummyInput()
        	.appendField("Clear display");
    	this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(240);
		this.setTooltip("Clears display.");
        this.setHelpUrl(documentationPath +  '/Int_Display-Robot/#clear-display');
 	}
};

Blockly.Blocks['mybot_display_text'] = {
  init: function() {
		this.appendValueInput("Text")
        	.setCheck(["String", "Number"])
        	.appendField("Display text:");
    	this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(240);
		this.setTooltip("Display text.");
		this.setHelpUrl(documentationPath +  '/Int_Display-Robot/#display-text');
 	}
};

// Block Aliases for deprecated blocks
Blockly.Blocks['fusion_start'] = Blockly.Blocks['mybot_start'];
Blockly.Blocks['drive_with_gyro'] = Blockly.Blocks['mybot_drive_with_gyro'];
Blockly.Blocks['fusion_basic_select_motor_1'] = Blockly.Blocks['mybot_basic_select_motor_1'];
Blockly.Blocks['fusion_basic_select_motor_2'] = Blockly.Blocks['mybot_basic_select_motor_2'];
Blockly.Blocks['fusion_basic_ledB'] = Blockly.Blocks['mybot_basic_ledb'];
Blockly.Blocks['fusion_basic_ledY'] = Blockly.Blocks['mybot_basic_ledy'];
Blockly.Blocks['fusion_basic_ledBY'] = Blockly.Blocks['mybot_basic_ledby'];
Blockly.Blocks['fusion_basic_ledoff'] = Blockly.Blocks['mybot_basic_ledoff'];
Blockly.Blocks['fusion_basic_wait'] = Blockly.Blocks['mybot_basic_wait'];
Blockly.Blocks['fusion_basic_forward'] = Blockly.Blocks['mybot_basic_forward'];
Blockly.Blocks['fusion_basic_backward'] = Blockly.Blocks['mybot_basic_backward'];
Blockly.Blocks['fusion_basic_fast'] = Blockly.Blocks['mybot_basic_fast'];
Blockly.Blocks['fusion_basic_medium'] = Blockly.Blocks['mybot_basic_medium'];
Blockly.Blocks['fusion_basic_slow'] = Blockly.Blocks['mybot_basic_slow'];
Blockly.Blocks['fusion_basic_right45'] = Blockly.Blocks['mybot_basic_right45'];
Blockly.Blocks['fusion_basic_right90'] = Blockly.Blocks['mybot_basic_right90'];
Blockly.Blocks['fusion_basic_right180'] = Blockly.Blocks['mybot_basic_right180'];
Blockly.Blocks['fusion_basic_left45'] = Blockly.Blocks['mybot_basic_left45'];
Blockly.Blocks['fusion_basic_left90'] = Blockly.Blocks['mybot_basic_left90'];
Blockly.Blocks['fusion_basic_left180'] = Blockly.Blocks['mybot_basic_left180'];
Blockly.Blocks['fusion_motor'] = Blockly.Blocks['mybot_motor'];
Blockly.Blocks['fusion_drive'] = Blockly.Blocks['mybot_drive'];
Blockly.Blocks['fusion_drive_time'] = Blockly.Blocks['mybot_drive_time'];
Blockly.Blocks['fusion_rotate'] = Blockly.Blocks['mybot_rotate'];
Blockly.Blocks['fusion_servo_target'] = Blockly.Blocks['mybot_servo_target'];
Blockly.Blocks['fusion_led'] = Blockly.Blocks['mybot_led'];
Blockly.Blocks['fusion_end'] = Blockly.Blocks['mybot_end'];
Blockly.Blocks['fusion_comment'] = Blockly.Blocks['mybot_comment'];
Blockly.Blocks['fusion_analog_read'] = Blockly.Blocks['mybot_analog_read'];
Blockly.Blocks['fusion_digital_read'] = Blockly.Blocks['mybot_digital_read'];
Blockly.Blocks['fusion_digital_write'] = Blockly.Blocks['mybot_digital_write'];
Blockly.Blocks['fusion_touch_read'] = Blockly.Blocks['mybot_touch_read'];
Blockly.Blocks['fusion_compass_heading'] = Blockly.Blocks['mybot_compass_heading'];
Blockly.Blocks['fusion_compass_hardIronCalibration'] = Blockly.Blocks['mybot_compass_hardIronCalibration'];
Blockly.Blocks['fusion_compass_tiltUp'] = Blockly.Blocks['mybot_compass_tiltUp'];
Blockly.Blocks['fusion_compass_tiltDown'] = Blockly.Blocks['mybot_compass_tiltDown'];
Blockly.Blocks['fusion_compass_nullAccelerometer'] = Blockly.Blocks['mybot_compass_nullAccelerometer'];
Blockly.Blocks['fusion_compass_getAccelerometer'] = Blockly.Blocks['mybot_compass_getAccelerometer'];
Blockly.Blocks['fusion_compass_getMagnetometer'] = Blockly.Blocks['mybot_compass_getMagnetometer'];
Blockly.Blocks['fusion_compass_scaleAccelerometer'] = Blockly.Blocks['mybot_compass_scaleAccelerometer'];
Blockly.Blocks['fusion_intGyro_heading'] = Blockly.Blocks['mybot_intGyro_heading'];
Blockly.Blocks['fusion_intGyro_calibrate'] = Blockly.Blocks['mybot_intGyro_calibrate'];
Blockly.Blocks['fusion_intGyro_zero'] = Blockly.Blocks['mybot_intGyro_zero'];
Blockly.Blocks['fusion_rate_gyro_read'] = Blockly.Blocks['mybot_rate_gyro_read'];
Blockly.Blocks['fusion_seeker_heading'] = Blockly.Blocks['mybot_seeker_heading'];
Blockly.Blocks['fusion_seeker_intensity'] = Blockly.Blocks['mybot_seeker_intensity'];
Blockly.Blocks['fusion_locator_heading'] = Blockly.Blocks['mybot_locator_heading'];
Blockly.Blocks['fusion_locator_intensity'] = Blockly.Blocks['mybot_locator_intensity'];
Blockly.Blocks['fusion_color_beacon_set_color'] = Blockly.Blocks['mybot_color_beacon_set_color'];
Blockly.Blocks['fusion_color_beacon_set_custom_color'] = Blockly.Blocks['mybot_color_beacon_set_custom_color'];
Blockly.Blocks['fusion_color_sensor_setup_init'] = Blockly.Blocks['mybot_color_sensor_setup_init'];
Blockly.Blocks['fusion_color_sensor_color_number'] = Blockly.Blocks['mybot_color_sensor_color_number'];
Blockly.Blocks['fusion_color_sensor_color_rgb'] = Blockly.Blocks['mybot_color_sensor_color_rgb'];
Blockly.Blocks['fusion_light_read'] = Blockly.Blocks['mybot_light_read'];
Blockly.Blocks['fusion_range_sensor_us'] = Blockly.Blocks['mybot_range_sensor_us'];
Blockly.Blocks['fusion_range_sensor_ods'] = Blockly.Blocks['mybot_range_sensor_ods'];
Blockly.Blocks['fusion_ods_read'] = Blockly.Blocks['mybot_ods_read'];
Blockly.Blocks['fusion_magnetic_read'] = Blockly.Blocks['mybot_magnetic_read'];
Blockly.Blocks['fusion_sound_generator'] = Blockly.Blocks['mybot_sound_generator'];
Blockly.Blocks['fusion_usbGamepad_readAxis'] = Blockly.Blocks['mybot_usbGamepad_readAxis'];
Blockly.Blocks['usion_usbGamepad_readAxisFloat'] = Blockly.Blocks['mybot_usbGamepad_readAxisFloat'];
Blockly.Blocks['fusion_usbGamepad_mixer'] = Blockly.Blocks['mybot_usbGamepad_mixer'];
Blockly.Blocks['fusion_usbGamepad_readButton'] = Blockly.Blocks['mybot_usbGamepad_readButton'];
Blockly.Blocks['fusion_usbGamepad_readHat'] = Blockly.Blocks['mybot_usbGamepad_readHat'];
Blockly.Blocks['fusion_VirtualGamepad_Joystick'] = Blockly.Blocks['mybot_VirtualGamepad_Joystick'];
Blockly.Blocks['fusion_VirtualGamepad_readButton'] = Blockly.Blocks['mybot_VirtualGamepad_readButton'];
Blockly.Blocks['fusion_VirtualGamepad_telemetry'] = Blockly.Blocks['mybot_VirtualGamepad_telemetry'];
Blockly.Blocks['fusion_VirtualGamepad_camera'] = Blockly.Blocks['mybot_VirtualGamepad_camera'];
Blockly.Blocks['fusion_display_color'] = Blockly.Blocks['mybot_display_color'];
Blockly.Blocks['fusion_display_text'] = Blockly.Blocks['mybot_display_text'];