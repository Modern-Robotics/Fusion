/**
 * Fusion Blocks Generator for Blockly 
 * Author: Modern Robotics
 */
'use strict';

goog.provide('Blockly.Python.fusion');
goog.require('Blockly.Python');

// Configuration variables
let fusionLibraryReference = 'import Fusion\nf = Fusion.driver()';
let fusionImport = fusionLibraryReference;
let pythonTimeLibraryReference = 'import time';
let displayLibraryReference = 'from Display import RecruitLCD\nlcd = RecruitLCD()';
let helpURL = 'http://modernroboticsinc.com/fusion';

var gyro_drive = 0;
var virtualGamepad = 0;
var virtual_camera = 0;
var res_w = 0;
var res_h = 0;
var fps = 0;
var drop_cam_mode;
var coreControl = 0;

// Pre Set navigation speeds and times
let navigation = {
    m1: {
        speed: {
            slow: 20,
            medium: 60,
            fast: 80,
            turn: 60
        },
        time: {
            45: .42,
            90: .82,
            180: 1.7
        }        
    },
    m2: {
        speed: {
            slow: 20,
            medium: 35,
            fast: 50,
            turn: 22
        },
        time: {
            45: .42,
            90: .82,
            180: 1.7
        }        
    },
}

// Default motor selection
let selectedMotor = 'm1';


///////////////////////////////////
// Define basic blocks
///////////////////////////////////

Blockly.Python['mybot_start'] = function (block) {
    Blockly.Python.definitions_['fusion_setup'] = fusionLibraryReference;
    if(virtualGamepad == 1) {
		if(virtual_camera == 0){
			fusionImport = fusionImport + '\nimport VirtualGamepad\nv = VirtualGamepad.service()\n';
		}
		else if(virtual_camera == 1){
			fusionImport = fusionImport + '\nimport VirtualGamepad\nv = VirtualGamepad.service(True, ('+ res_w +','+ res_h +'), '+ fps +', '+ drop_cam_mode +')\n';
			virtual_camera = 0;
		}
		Blockly.Python.definitions_['fusion_setup'] = fusionImport;
		virtualGamepad=0;
	}
	if(coreControl == 1){
		fusionImport = fusionImport + '\nimport CoreControl\nc = CoreControl.driver()';
		Blockly.Python.definitions_['fusion_setup'] = fusionImport;
		coreControl = 0;
	}
	fusionImport = fusionLibraryReference;
	gyro_drive=0;
    var code = '';
    return code;
};

Blockly.Python['mybot_drive_with_gyro'] = function (block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    return '';
};
  
Blockly.Python['mybot_basic_ledb'] = function(block) {
    var code = 'f.setLED(f.YELLOW, 0)\nf.setLED(f.BLUE, 1)\n';
    return code;
};
  
Blockly.Python['mybot_basic_ledy'] = function(block) {
    var code = 'f.setLED(f.YELLOW, 1)\nf.setLED(f.BLUE, 0)\n';
    return code;
};
  
Blockly.Python['mybot_basic_ledby'] = function(block) {
    var code = 'f.setLED(f.YELLOW, 1)\nf.setLED(f.BLUE, 1)\n';
    return code;
};
  
Blockly.Python['mybot_basic_ledoff'] = function(block) {
    var code = 'f.setLED(f.YELLOW, 0)\nf.setLED(f.BLUE, 0)\n';
    return code;
};
  
Blockly.Python['mybot_basic_wait'] = function(block) {
    var time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = `time.sleep(${time})\n`;
    return code;
};
  
Blockly.Python['mybot_display_straight_ahead'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("eyes-straight")\n`;
	return code;

};
  
Blockly.Python['mybot_display_snooze'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("snooze")\n`;
	return code;

};
  
Blockly.Python['mybot_display_eyes_closed'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("eyes-closed")\n`;
	return code;

};
  
Blockly.Python['mybot_display_eyes_left'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("eyes-left")\n`;
	return code;

};
  
Blockly.Python['mybot_display_eyes_right'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("eyes-right")\n`;
	return code;

};

Blockly.Python['mybot_display_eyes_crashed'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("crash")\n`;
	return code;

};

Blockly.Python['mybot_display_emoji_glasses'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("glasses")\n`;
	return code;

};

Blockly.Python['mybot_display_emoji_oh_no'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("oh-no")\n`;
	return code;

};

Blockly.Python['mybot_display_emoji_sunglasses'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("sunglasses")\n`;
	return code;

};

Blockly.Python['mybot_display_emoji_thumbs_up'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("thumbs-up")\n`;
	return code;

};

Blockly.Python['mybot_display_emoji_thumbs_down'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("thumbs-down")\n`;
	return code;

};

Blockly.Python['mybot_display_clear'] = function(block) {

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_color("white")\n`;
	return code;

};

Blockly.Python['mybot_display_face_straight'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("straight")\n`;
	return code;

};

Blockly.Python['mybot_display_face_left'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("left")\n`;
	return code;

};

Blockly.Python['mybot_display_face_right'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("right")\n`;
	return code;

};

Blockly.Python['mybot_display_face_snooze'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("snooze")\n`;
	return code;

};

Blockly.Python['mybot_display_face_crash'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("crash")\n`;
	return code;

};
  
Blockly.Python['mybot_basic_forward'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    var code = '';
    var time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + calculateSpeed('medium');    
    	
	if(gyro_drive == 0) {

        code += `f.motorSpeed(f.M0+f.M1, speed)\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;
    } 
	else if(gyro_drive == 1) {

        let sleep = .01;
        let gyroTime = time / sleep;

        code += `for i in range(0, ${gyroTime}):\n`;
        code += `    gyro_val = int_gyro.getAbsolute()\n`;
        code += `    M0_speed = speed-gyro_val\n`;
        code += `    M1_speed = speed+gyro_val\n`;
        code += `    if (M0_speed > 100): M0_speed = 100\n`;
        code += `    if (M0_speed < -100): M0_speed = -100\n`;
        code += `    if (M1_speed > 100): M1_speed = 100\n`;
        code += `    if (M1_speed < -100): M1_speed = -100\n`;
        code += `    if (gyro_val > current_gyro):\n`;
        code += `        f.motorSpeed(f.M0, M0_speed)\n`;
        code += `        f.motorSpeed(f.M1, M1_speed)\n`;
        code += `    elif (gyro_val < current_gyro):\n`;
        code += `        f.motorSpeed(f.M0, M0_speed)\n`;
        code += `        f.motorSpeed(f.M1, M1_speed)\n`;
        code += `    else:\n`;
        code += `        f.motorSpeed(f.M0+f.M1, speed)\n`;
        code += `    time.sleep(${sleep})\n`;
    }    

	return code;
};
  
Blockly.Python['mybot_basic_backward'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    var code = '';
    var time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + calculateSpeed('medium');

    if(gyro_drive == 0){

        code += `f.motorSpeed(f.M0+f.M1, -speed)\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    }

    else if(gyro_drive == 1) {

        let sleep = .01;
        let gyroTime = time / sleep;

        code += `for i in range(0, ${gyroTime}):\n`;
        code += `    gyro_val = int_gyro.getAbsolute()\n`;
        code += `    M0_speed = -(speed+gyro_val)\n`;
        code += `    M1_speed = -(speed-gyro_val)\n`;
        code += `    if (M0_speed > 100): M0_speed = 100\n`;
        code += `    if (M0_speed < -100): M0_speed = -100\n`;
        code += `    if (M1_speed > 100): M1_speed = 100\n`;
        code += `    if (M1_speed < -100): M1_speed = -100\n`;
        code += `    if (gyro_val > current_gyro):\n`;
        code += `        f.motorSpeed(f.M0, M0_speed)\n`;
        code += `        f.motorSpeed(f.M1, M1_speed)\n`;
        code += `    elif (gyro_val < current_gyro):\n`;
        code += `        f.motorSpeed(f.M0, M0_speed)\n`;
        code += `        f.motorSpeed(f.M1, M1_speed)\n`;
        code += `    else:\n`;
        code += `        f.motorSpeed(f.M0+f.M1, -speed)\n`;
        code += `    time.sleep(.01)\n`;

    }

    return code;
};

Blockly.Python['mybot_basic_select_motor_1'] = function (block) {
    selectedMotor = 'm1';
    let code = '# Select motor 1\n';
	return code;
};

Blockly.Python['mybot_basic_select_motor_2'] = function (block) {
    selectedMotor = 'm2';
    let code = '# Select motor 2\n';
	return code;
};
  
Blockly.Python['mybot_basic_fast'] = function(block) {
    var code = `speed = ${calculateSpeed('fast')}\n`;
    return code;
};
  
Blockly.Python['mybot_basic_medium'] = function(block) {
    var code = `speed = ${calculateSpeed('medium')}\n`;
    return code;
};
  
Blockly.Python['mybot_basic_slow'] = function(block) {
    var code = `speed = ${calculateSpeed('slow')}\n`;
    return code;
};
  
Blockly.Python['mybot_basic_right45'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(45);

    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, -${speed})\n`;
        code += `f.motorSpeed(f.M1, ${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro + 38)\n`
        code += `while ((int_gyro.getAbsolute() < current_gyro)):\n`
        code += `    turn_speed = (current_gyro - int_gyro.getAbsolute())\n`
        code += `    if (turn_speed < 20): turn_speed = 20\n`
        code += `    if (turn_speed > 50): turn_speed = 50\n`
        code += `    f.motorSpeed(f.M0, turn_speed)\n`
        code += `    f.motorSpeed(f.M1, -turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`

    }

    return code;
};
  
Blockly.Python['mybot_basic_right90'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(90);

    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, -${speed})\n`;
        code += `f.motorSpeed(f.M1, ${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro + 75)\n`
        code += `while ((int_gyro.getAbsolute() < current_gyro)):\n`
        code += `    turn_speed = (current_gyro - int_gyro.getAbsolute())\n`
        code += `    if (turn_speed < 40): turn_speed = 40\n`
        code += `    if (turn_speed > 75): turn_speed = 75\n`
        code += `    f.motorSpeed(f.M0, turn_speed)\n`
        code += `    f.motorSpeed(f.M1, -turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`

    }

    return code;
};
  
Blockly.Python['mybot_basic_right180'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(180);

    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, -${speed})\n`;
        code += `f.motorSpeed(f.M1, ${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro + 162)\n`
        code += `while ((int_gyro.getAbsolute() < current_gyro)):\n`
        code += `    turn_speed = (current_gyro - int_gyro.getAbsolute())\n`
        code += `    if (turn_speed < 35): turn_speed = 35\n`
        code += `    if (turn_speed > 75): turn_speed = 75\n`
        code += `    f.motorSpeed(f.M0, turn_speed)\n`
        code += `    f.motorSpeed(f.M1, -turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`

    }

    return code;
};

Blockly.Python['mybot_basic_left45'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(45);
    
    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, ${speed})\n`;
        code += `f.motorSpeed(f.M1, -${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro - 38)\n`
        code += `while ((int_gyro.getAbsolute() > current_gyro)):\n`
        code += `    turn_speed = (int_gyro.getAbsolute() - current_gyro)\n`
        code += `    if (turn_speed < 20): turn_speed = 20\n`
        code += `    if (turn_speed > 50): turn_speed = 50\n`
        code += `    f.motorSpeed(f.M0, -turn_speed)\n`
        code += `    f.motorSpeed(f.M1, turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`

    }
    
    return code;
};

Blockly.Python['mybot_basic_left90'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(90);
    
    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, ${speed})\n`;
        code += `f.motorSpeed(f.M1, -${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro - 75)\n`
        code += `while ((int_gyro.getAbsolute() > current_gyro)):\n`
        code += `    turn_speed = (int_gyro.getAbsolute() - current_gyro)\n`
        code += `    if (turn_speed < 40): turn_speed = 40\n`
        code += `    if (turn_speed > 75): turn_speed = 75\n`
        code += `    f.motorSpeed(f.M0, -turn_speed)\n`
        code += `    f.motorSpeed(f.M1, turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`

    }
    
    return code;
};

Blockly.Python['mybot_basic_left180'] = function(block) {

    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;

    let code = '';
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;

    let speed = calculateSpeed('turn');
    let time = calculateTurnTime(180);
    
    if (gyro_drive == 0) {

        code += `f.motorSpeed(f.M0, ${speed})\n`;
        code += `f.motorSpeed(f.M1, -${speed})\n`;
        code += `time.sleep(${time})\n`;
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`;

    } else if (gyro_drive == 1) {

        code += `int_gyro.setZero()\n`
        code += `current_gyro = 0\n`
        code += `current_gyro = (current_gyro - 162)\n`
        code += `while ((int_gyro.getAbsolute() > current_gyro)):\n`
        code += `    turn_speed = (int_gyro.getAbsolute() - current_gyro)\n`
        code += `    if (turn_speed < 35): turn_speed = 35\n`
        code += `    if (turn_speed > 75): turn_speed = 75\n`
        code += `    f.motorSpeed(f.M0, -turn_speed)\n`
        code += `    f.motorSpeed(f.M1, turn_speed)\n`
        code += `f.motorSpeed(f.M0+f.M1, 0)\n`
        
    }
    
    return code;
};

 ///////////////////////////////////
// Define intermediate blocks
///////////////////////////////////


function calculateSpeed(mode) {
    return navigation[selectedMotor].speed[mode];
};

function calculateTurnTime(mode) {
    return navigation[selectedMotor].time[mode];
}

Blockly.Python['mybot_motor'] = function (block) {
    var motor = block.getFieldValue('Motor');
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.' + motor + ', ' + value_power + ')\n';
    return code;
};

Blockly.Python['mybot_drive'] = function (block) {
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.M0+f.M1, ' + value_power + ')\n';
    return code;
};

Blockly.Python['mybot_drive_time'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';
    var value_time = Blockly.Python.valueToCode(block, 'Time', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.M0+f.M1, ' + value_power + ')\n';

    if (value_time != 0) {
        code = code + 'time.sleep(' + value_time + ')\n';
    }
    if (!isNaN(value_time) && value_time == 0) {
        return '# Stop motors\nf.motorSpeed(f.M0+f.M1, 0)\n';
    } else {
        if (value_power > 0) {
            return '# Drive forwards with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (value_power < 0) {
            return '# Drive backwards with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (isNaN(value_power)) {
            return '# Drive with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else {
            return '# Stop motors and wait ' + value_time + ' seconds\n' + code;
        }
    }
};

Blockly.Python['mybot_rotate'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';
    var value_time = Blockly.Python.valueToCode(block, 'Time', Blockly.Python.ORDER_NONE) || '0';
    var dropdown_direction = block.getFieldValue('direction');

    var code = '';
    if (dropdown_direction == "Right") {
        code += 'f.motorSpeed(f.M1, ' + value_power + ');\n';
        code += 'f.motorSpeed(f.M0, -' + value_power + ');\n';
    } else {
        code += 'f.motorSpeed(f.M1, -' + value_power + ')\n';
        code += 'f.motorSpeed(f.M0, ' + value_power + ')\n';
    }

    if (value_time != 0) {
        code = code + 'time.sleep(' + value_time + ')\n';
    }

    if (!isNaN(value_time) && value_time == 0) {
        return '# Stop motors\nf.motorSpeed(f.M0+f.M1, 0)\n';
    } else {
        if (value_power > 0) {
            return '# Turn ' + dropdown_direction + ' with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (value_power < 0) {
            return '# Turn ' + dropdown_direction + ' with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (isNaN(value_power)) {
            return '# Turn ' + dropdown_direction + ' with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0);\n';
        } else {
            return '# Stop motors and wait ' + value_time + ' seconds\nf.motorSpeed(f.M0+f.M1, 0)\ntime.sleep(' + value_time + ')\n';
        }
    }
};

Blockly.Python['mybot_servo_target'] = function (block) {
    var servo = block.getFieldValue('servo');
    Blockly.Python.definitions_['fusion_servo_' + servo] = 'f.servoEnable(f.' + servo + ', 1)';
    var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_NONE);

    var code = 'f.servoTarget(f.' + servo + ', ' + target + ')\n';

    return code;
};

Blockly.Python['mybot_led'] = function (block) {
    var color = block.getFieldValue('COLOUR');
    var dropdown = block.getFieldValue('Mode');

    if (color == '#0000ff') {
        if (dropdown == 'OFF') {
            var code = 'f.setLED(f.BLUE, 0)\n';
        } else {
            var code = 'f.setLED(f.BLUE, 1)\n';
        }
    } else {
        if (dropdown == 'OFF') {
            var code = 'f.setLED(f.YELLOW, 0)\n';
        } else {
            var code = 'f.setLED(f.YELLOW, 1)\n';
        }
    }
    return code;
};

Blockly.Python['mybot_end'] = function (block) {
    var code = 'exit()\n';
    return code;
};

Blockly.Python['mybot_comment'] = function (block) {
    var statement = block.getFieldValue('Statement');
    var code = '# ' + statement + '\n';
    return code;
};

Blockly.Python['time_delay'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_NONE);
    var code = 'time.sleep(' + delay + ')\n';
    return code;
};

Blockly.Python['time_get'] = function(block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_analog_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'analog_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'analog_' + port + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['mybot_digital_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_digital_init_' + port] = 'digital_' + port + ' = Fusion.digital(f, f.' + port + ')';
    var dropdown_condition = block.getFieldValue('condition');
    var code = 'digital_' + port + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['mybot_digital_write'] = function (block) {
    var port = block.getFieldValue('Port');
    var value = block.getFieldValue('Value');
    Blockly.Python.definitions_['fusion_digital_init_' + port] = 'digital_' + port + ' = Fusion.digital(f, f.' + port + ')';
    var code = 'digital_' + port + '.write(' + value + ')\n';
    return code;
};

Blockly.Python['mybot_touch_read'] = function (block) {
    var dropdown_condition = block.getFieldValue('condition');
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_digital_init_' + port] = 'touch_' + port + ' = Fusion.digital(f, f.' + port + ')';
    var code = 'touch_' + port + '.read()';
    if (dropdown_condition == "Not Pressed") {
        code = code + '==0';
    } else {
        code = code + '==1';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_compass_heading'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.getHeading()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['mybot_compass_hardIronCalibration'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.hardIronCalibration()\n';
    return code;
};

Blockly.Python['mybot_compass_tiltUp'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.tiltUp()\n';
    return code;
};

Blockly.Python['mybot_compass_tiltDown'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.tiltDown()\n';
    return code;
};

Blockly.Python['mybot_compass_nullAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');

    var code = 'compass.nullAccelerometer(' + drop_axis + ')\n';
    return code;
};

Blockly.Python['mybot_compass_getAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');

    var code = 'compass.getAccelerometer()[' + drop_axis + ']';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_compass_getMagnetometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');
    var code = 'compass.getMagnetometer()[' + drop_axis + ']';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_compass_scaleAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.scaleAccelerometer()\n';
    return code;
};

Blockly.Python['mybot_intGyro_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    if (dropdown_mode == "Absolute") {
        var code = 'int_gyro.getAbsolute()\n';
    } else {
        var code = 'int_gyro.getDegrees()\n';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_intGyro_calibrate'] = function (block) {
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    Blockly.Python.definitions_['fusion_gyro_null_' + "0x20"] = 'int_gyro.setNull()';
    return '';
};

Blockly.Python['mybot_intGyro_zero'] = function (block) {
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    return 'int_gyro.setZero()\n';
};

Blockly.Python['mybot_rate_gyro_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'rate_gyro_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'rate_gyro_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_seeker_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_seeker_init_' + "0x38"] = 'seeker = Fusion.seekerV3(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'seeker.getHeading(1200)';
    } else {
        var code = 'seeker.getHeading(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_seeker_intensity'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_seeker_init_' + "0x38"] = 'seeker = Fusion.seekerV3(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'seeker.getIntensity(1200)';
    } else {
        var code = 'seeker.getIntensity(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_locator_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_locator_init_' + "0x1C"] = 'locator = Fusion.locator360(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'locator.getHeading(1200)';
    } else {
        var code = 'locator.getHeading(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_locator_intensity'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_locator_init_' + "0x1C"] = 'locator = Fusion.locator360(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'locator.getIntensity(1200)';
    } else {
        var code = 'locator.getIntensity(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_color_beacon_set_color'] = function (block) {
    Blockly.Python.definitions_['fusion_color_beacon_init_' + "0x4C"] = 'beacon = Fusion.colorBeacon(f)';
    var colour_color = block.getFieldValue('COLOUR');
    var color_number = 0;
    if (colour_color == '#000000') {
        color_number = 0;
    } // Off
    if (colour_color == '#ff0000') {
        color_number = 1;
    } // Red
    if (colour_color == '#00ff00') {
        color_number = 2;
    } // Green
    if (colour_color == '#ffff00') {
        color_number = 3;
    } // Yellow
    if (colour_color == '#0000ff') {
        color_number = 4;
    } // Blue
    if (colour_color == '#ff00ff') {
        color_number = 5;
    } // Purple
    if (colour_color == '#00ffff') {
        color_number = 6;
    } // Teal
    if (colour_color == '#ffffff') {
        color_number = 7;
    } // White
    var code = 'beacon.setColor(' + color_number + ')\n';
    return code;
};

Blockly.Python['mybot_color_beacon_set_custom_color'] = function (block) {
    Blockly.Python.definitions_['fusion_color_beacon_init_' + "0x4C"] = 'beacon = Fusion.colorBeacon(f)';
    var red = Blockly.Python.valueToCode(block, 'Red', Blockly.Python.ORDER_NONE);
    var green = Blockly.Python.valueToCode(block, 'Green', Blockly.Python.ORDER_NONE);
    var blue = Blockly.Python.valueToCode(block, 'Blue', Blockly.Python.ORDER_NONE);
    var code = 'beacon.setCustomColor(' + red + ',' + green + ',' + blue + ')\n';
    return code;
};

Blockly.Python['mybot_color_sensor_color_number'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    var code = 'colour.getColorNumber()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_color_sensor_color_rgb'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    var dropdown_mode = block.getFieldValue('color');
    if (dropdown_mode == "Red") {
        var code = 'colour.getRGBIndex()[0]';
    } else if (dropdown_mode == "Green") {
        var code = 'colour.getRGBIndex()[1]';
    } else if (dropdown_mode == "Blue") {
        var code = 'colour.getRGBIndex()[2]';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['mybot_color_sensor_setup_init'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    var dropdown_mode = block.getFieldValue('Mode');
    var dropdown_frequency = block.getFieldValue('frequency');
    if (dropdown_mode == 'Passive') {
        dropdown_mode = 'PASSIVE';
    } else if (dropdown_mode == 'Active') {
        dropdown_mode = 'ACTIVE';
    }

    if (dropdown_frequency == '60 Hz') {
        dropdown_frequency = 'SIXTY_HZ';
    } else if (dropdown_frequency == '50 Hz') {
        dropdown_frequency = 'FIFTY_HZ';
    }
    var code = 'colour.colorSetup(colour.' + dropdown_mode + ', colour.' + dropdown_frequency + ')\n';
    return code;
};

Blockly.Python['mybot_color_sensor_calibrate_black_balance'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    let code = 'colour.blackBalance()\n';
    return code;
};

Blockly.Python['mybot_color_sensor_calibrate_white_balance'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    let code = 'colour.whiteBalance()\n';
    return code;
};

Blockly.Python['mybot_light_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'light_' + port + ' = Fusion.analog(f, f.' + port + ')';

    var code = 'light_' + port + '.read()';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_range_sensor_us'] = function (block) {
    Blockly.Python.definitions_['fusion_range_sensor_init_' + "0x28"] = 'range = Fusion.range(f)';
    var code = 'range.ultrasonic()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_range_sensor_ods'] = function (block) {
    Blockly.Python.definitions_['fusion_range_sensor_init_' + "0x28"] = 'range = Fusion.range(f)';
    var code = 'range.optical()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_ods_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'ods_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'ods_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['recruit_eopd_read'] = function(block) {

    let facing = block.getFieldValue('Facing');
    let port = ((facing == 'Forward') ? "A2" : "A3");

    Blockly.Python.definitions_['fusion_analog_init_' + facing] = 'ods_' + facing + ' = Fusion.analog(f, f.' + port + ')';

    let code = '';    

    if (facing == 'Forward') {

        code = 'ods_' + facing + '.read()';

    } else {

        let gpio_import = 'import RPi.GPIO as GPIO\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(16, GPIO.OUT)';
        
        let gpio_function = `def read_with_led(ods_sensor):\n` +
                            `    GPIO.output(16, True)\n` +
                            `    time.sleep(0.25)\n` +
                            `    sensor_value = ods_sensor.read()\n` +
                            `    GPIO.output(16, False)\n` +
                            `    return sensor_value`;

        
        Blockly.Python.definitions_['gpio_init'] = gpio_import;
        Blockly.Python.definitions_['read_with_led'] = gpio_function;
        Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
        
        code = 'read_with_led(ods_' + facing + ')';
    }

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_magnetic_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'magnetic_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'magnetic_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_sound_generator'] = function (block) {
    Blockly.Python.definitions_['fusion_sound_init_' + "0x34"] = 'sound = Fusion.sound(f)';
    var dropdown_level = block.getFieldValue('volume');
    var value_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_NONE);
    var value_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_NONE);
    var checkbox_blocking = block.getFieldValue('blocking') == 'TRUE';
    value_duration = value_duration * 1000;
    var code = 'sound';
    if (dropdown_level == 'LOW') dropdown_level = 0;
    else if (dropdown_level == 'MEDIUM') dropdown_level = 1;
    else if (dropdown_level == 'HIGH') dropdown_level = 2;
    else if (dropdown_level == 'MAX') dropdown_level = 3;
    if (!checkbox_blocking) {
        code += '.setSound(' + dropdown_level + ', ' + value_pitch + ', ' + value_duration + ')';
    } else {
        var value_post_pause = Blockly.Python.valueToCode(block, 'post_pause', Blockly.Python.ORDER_NONE);
        value_post_pause = value_post_pause * 1000;
        if (value_post_pause == '') {
            value_post_pause = '0';
        }
        code += '.setSoundBlocking(' + dropdown_level + ', ' + value_pitch + ', ' + value_duration + ', ' + value_post_pause + ')';
    }
    code = code + '\n';
    return code;
};

Blockly.Python['mybot_usbGamepad_readAxis'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_axis = block.getFieldValue('axis');
	var drop_inv = block.getFieldValue('inv');

    var code = 'usbg.readAxis('+ drop_axis +', '+ drop_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_usbGamepad_readAxisFloat'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_axis = block.getFieldValue('axis');
	var drop_inv = block.getFieldValue('inv');

    var code = 'usbg.readAxisFloat('+ drop_axis +', '+ drop_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_usbGamepad_mixer'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var x_axis = block.getFieldValue('x_axis');
    var y_axis = block.getFieldValue('y_axis');
    var x_inv = block.getFieldValue('x_inv');
    var y_inv = block.getFieldValue('y_inv');

    var code = 'usbg.mixer('+ x_axis +', '+ y_axis +', '+ x_inv +', '+ y_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_usbGamepad_readButton'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_button = block.getFieldValue('button');

    var code = 'usbg.readButton('+ drop_button +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_usbGamepad_readHat'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';

    var code = 'usbg.readHat()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_VirtualGamepad_service'] = function (block) {
	virtual_camera = 1;
	virtualGamepad = 1;
	res_w = Blockly.Python.valueToCode(block, 'Res_w', Blockly.Python.ORDER_NONE);
    res_h = Blockly.Python.valueToCode(block, 'Res_h', Blockly.Python.ORDER_NONE);
    fps = Blockly.Python.valueToCode(block, 'fps', Blockly.Python.ORDER_NONE);
	drop_cam_mode = block.getFieldValue('mode');
	//var checkbox_camera = block.getFieldValue('camera') == 'FALSE';
    //if(!checkbox_camera)Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'v = VirtualGamepad.service(True, ('+ res_w +','+ res_h +'), '+ fps +', '+ drop_cam_mode +')';
	//else Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'v = VirtualGamepad.service()';
    var code = '';
    return code;
};

Blockly.Python['mybot_VirtualGamepad_Joystick'] = function (block) {
 	virtualGamepad = 1;
    var drop_joystick = block.getFieldValue('joystick');
    var drop_mixer = block.getFieldValue('mixer');
    var drop_x_inv = block.getFieldValue('x_inv');
    var drop_y_inv = block.getFieldValue('y_inv');

	if(drop_joystick == "Left")
		var code = 'v.leftJoystick('+ drop_mixer +', '+ drop_x_inv +', '+ drop_y_inv +')';
	else if(drop_joystick == "Right")
		var code = 'v.rightJoystick('+ drop_mixer +', '+ drop_x_inv +', '+ drop_y_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_VirtualGamepad_readButton'] = function (block) {
	virtualGamepad = 1;
    var drop_button = block.getFieldValue('button');

    var code = 'v.readButton('+ drop_button +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['mybot_VirtualGamepad_telemetry'] = function (block) {
	virtualGamepad = 1;
    var line_number = block.getFieldValue('line');
    var value = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);

    var code = 'v.telemetry('+ line_number +', str('+ value +'))\n';
    return code;
};

Blockly.Python['mybot_VirtualGamepad_camera'] = function (block) {
	virtual_camera = 1;
	virtualGamepad = 1;
	res_w = Blockly.Python.valueToCode(block, 'Res_w', Blockly.Python.ORDER_NONE);
    res_h = Blockly.Python.valueToCode(block, 'Res_h', Blockly.Python.ORDER_NONE);
    fps = Blockly.Python.valueToCode(block, 'fps', Blockly.Python.ORDER_NONE);
	drop_cam_mode = block.getFieldValue('mode');
    var code = '';
    return code;
};

/************************************************************************************************/
/* THIS SECTION IS FOR CORE CONTROL BLOCKS ONLY. KEEP FUSION SPECIFIC BLOCKS ABOVE THIS SECTION */
/************************************************************************************************/

Blockly.Python['CoreControl_printDevices'] = function (block) {
	coreControl = 1;
    var code = 'c.printDevices()\n';
    return code;
};

Blockly.Python['CoreControl_CoreMotorController'] = function (block) {
	coreControl = 1;
    var name = block.getFieldValue('name');
	var serial = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);
	Blockly.Python.definitions_['CoreControl_CoreMotorController_' + name] = name + ' = CoreControl.coreMotorController(c, ' + serial + ')';
	return '';
};

Blockly.Python['CoreControl_constantSpeed'] = function (block) {
	var name = block.getFieldValue('name');
    var motor = block.getFieldValue('motor');
    var value_power = Blockly.Python.valueToCode(block, 'power', Blockly.Python.ORDER_NONE) || '0';

    var code = name + '.constantSpeed('+ name + '.' + motor + ', ' + value_power + ')\n';
    return code;
};

Blockly.Python['CoreControl_constantPower'] = function (block) {
	var name = block.getFieldValue('name');
    var motor = block.getFieldValue('motor');
    var value_power = Blockly.Python.valueToCode(block, 'power', Blockly.Python.ORDER_NONE) || '0';

    var code = name + '.constantPower('+ name + '.' + motor + ', ' + value_power + ')\n';
    return code;
};

Blockly.Python['CoreControl_runToPosition'] = function (block) {
	var name = block.getFieldValue('name');
    var motor = block.getFieldValue('motor');
    var value_power = Blockly.Python.valueToCode(block, 'power', Blockly.Python.ORDER_NONE) || '0';
    var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_NONE) || '0';

    var code = name + '.runToPosition('+ name + '.' + motor + ', ' + value_power + ', ' + target + ')\n';
    return code;
};

Blockly.Python['CoreControl_readEncoder'] = function (block) {
	var name = block.getFieldValue('name');
    var motor = block.getFieldValue('motor');

    var code = name + '.readEncoder('+ name + '.' + motor + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['CoreControl_readBattVoltage'] = function (block) {
	var name = block.getFieldValue('name');

    var code = name + '.readBattVoltage()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['CoreControl_CoreServoController'] = function (block) {
	coreControl = 1;
    var name = block.getFieldValue('name');
	var serial = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);
	Blockly.Python.definitions_['CoreControl_CoreServoController_' + name] = name + ' = CoreControl.coreServoController(c, ' + serial + ')';
	return '';
};

Blockly.Python['CoreControl_servoTarget'] = function (block) {
	var name = block.getFieldValue('name');
    Blockly.Python.definitions_['CoreControl_servo_' + name] = name +'.pwmEnable(True)';
	var servo = block.getFieldValue('servo');
    var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_NONE);

    var code = name + '.servoTarget('+ name +'.' + servo + ', ' + target + ')\n';

    return code;
};

Blockly.Python['CoreControl_CoreDeviceInterface'] = function (block) {
	coreControl = 1;
    var name = block.getFieldValue('name');
	var serial = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);
	Blockly.Python.definitions_['CoreControl_CoreDeviceInterface_' + name] = name + ' = CoreControl.coreDeviceInterface(c, ' + serial + ')';
	return '';
};

Blockly.Python['CoreControl_cdi_led'] = function (block) {
    var color = block.getFieldValue('COLOUR');
    var dropdown = block.getFieldValue('Mode');
	var name = block.getFieldValue('name');

    if (color == '#0000ff') {
        if (dropdown == 'OFF') {
            var code = name +'.setLED('+ name +'.BLUE, 0)\n';
        } else {
            var code = name +'.setLED('+ name +'.BLUE, 1)\n';
        }
    } else {
        if (dropdown == 'OFF') {
            var code = name +'.setLED('+ name +'.RED, 0)\n';
        } else {
            var code = name +'.setLED('+ name +'.RED, 1)\n';
        }
    }
    return code;
};

Blockly.Python['CoreControl_analogRead'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['CoreControl_analog_init_'+ name + port] = 'cdi_analog_' + port + ' = Fusion.analog('+ name +', '+ name +'.' + port + ')';
    var code = 'cdi_analog_' + port + '.read()';
    var code = name + '.analogRead('+ name +'.'+ port +')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['CoreControl_analogOutputWrite'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
	var voltage = Blockly.Python.valueToCode(block, 'voltage', Blockly.Python.ORDER_NONE);
	var frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_NONE);
    var mode = block.getFieldValue('mode');
    var code = name + '.analogOutputWrite('+ name +'.'+ port +', ' + voltage + ', ' + frequency + ', ' + mode + ')\n';
    return code;
};

Blockly.Python['CoreControl_digitalRead'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['CoreControl_digital_init_'+ name + port] = name +'.digitalState('+ name +'.'+ port +', '+ name +'.INPUT)';
    var code = name +'.digitalRead('+ name +'.'+ port +')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['CoreControl_digitalWrite'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
    var value = block.getFieldValue('Value');
    Blockly.Python.definitions_['CoreControl_digital_init_'+ name + port] = name +'.digitalState('+ name +'.'+ port +', '+ name +'.OUTPUT)';
    var code = name +'.digitalRead('+ name +'.'+ port +', '+ value +')\n';
    return code;
};

Blockly.Python['CoreControl_setPWM'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
    var onTime = Blockly.Python.valueToCode(block, 'onTime', Blockly.Python.ORDER_NONE);
	var period = Blockly.Python.valueToCode(block, 'period', Blockly.Python.ORDER_NONE);
    var code = name + '.setPWM('+ name +'.' + port + ', ' + onTime + ', ' + period + ')\n';
    return code;
};

Blockly.Python['CoreControl_i2cRead'] = function (block) {
	var name = block.getFieldValue('name');
    var addr = block.getFieldValue('addr');
	var reg = Blockly.Python.valueToCode(block, 'reg', Blockly.Python.ORDER_NONE);
	var len = Blockly.Python.valueToCode(block, 'len', Blockly.Python.ORDER_NONE);
    var code = name +'.i2cRead(0x'+ addr +', 0x'+ reg +', '+ len +')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['CoreControl_i2cWrite'] = function (block) {
	var name = block.getFieldValue('name');
    var addr = block.getFieldValue('addr');
	var reg = Blockly.Python.valueToCode(block, 'reg', Blockly.Python.ORDER_NONE);
	var data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_NONE);
    var code = name +'.i2cWrite(0x'+ addr +', 0x'+ reg +', ['+ data +'])\n';
    return code;
};

Blockly.Python['CoreControl_CoreLegacyModule'] = function (block) {
	coreControl = 1;
    var name = block.getFieldValue('name');
	var serial = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);
	Blockly.Python.definitions_['CoreControl_CoreLegacyModule_' + name] = name + ' = CoreControl.coreLegacyModule(c, ' + serial + ')';
	return '';
};

Blockly.Python['CoreControl_clm_led'] = function (block) {
    var led = block.getFieldValue('led');
    var state = block.getFieldValue('state');
	var name = block.getFieldValue('name');

    var code = name +'.setLED('+ led +', '+ name +'.'+ state +')\n';

    return code;
};

Blockly.Python['CoreControl_clm_analogRead'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
	var nineV = block.getFieldValue('nineV') == 'TRUE';
	
	if (!nineV) {
		Blockly.Python.definitions_['CoreControl_CoreLegacyModule_9V_' + name + port] = name + '.enable_9v('+ name +'.' + port + ', False)';
        var code = name + '.analogRead('+ name +'.' + port + ')';
    } else {
        Blockly.Python.definitions_['CoreControl_CoreLegacyModule_9V_' + name + port] = name + '.enable_9v('+ name +'.' + port + ', True)';
        var code = name + '.analogRead('+ name +'.' + port + ')';
    }
	
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['CoreControl_clm_i2cRead'] = function (block) {
	var name = block.getFieldValue('name');
    var port = block.getFieldValue('Port');
    var addr = block.getFieldValue('addr');
	var reg = Blockly.Python.valueToCode(block, 'reg', Blockly.Python.ORDER_NONE);
	var len = Blockly.Python.valueToCode(block, 'len', Blockly.Python.ORDER_NONE);
    var code = name +'.i2cRead('+ name +'.'+ port +', 0x'+ addr +', 0x'+ reg +', '+ len +')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['CoreControl_clm_i2cWrite'] = function (block) {
	var name = block.getFieldValue('name');
	var port = block.getFieldValue('Port');
    var addr = block.getFieldValue('addr');
	var reg = Blockly.Python.valueToCode(block, 'reg', Blockly.Python.ORDER_NONE);
	var data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_NONE);
    var code = name +'.i2cWrite('+ name +'.'+ port +', 0x'+ addr +', 0x'+ reg +', ['+ data +'])\n';
    return code;
};

Blockly.Python['Open_File'] = function(block) {
    var text_file_name = block.getFieldValue('file_name');
    var dropdown_open_type = block.getFieldValue('open_type');
    var code = `open("${text_file_name}", "${dropdown_open_type}")`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['Write_To_File'] = function(block) {
    var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
    var value_write_value = Blockly.Python.valueToCode(block, 'write_value', Blockly.Python.ORDER_ATOMIC) || "''";
    if (value_write_value)
        value_write_value = value_write_value += " + '\\n'";
    var code = `${value_file}.write(${value_write_value})\n`;
    return code;
};

Blockly.Python['Close_File'] = function(block) {
    var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
    var code = `${value_file}.close()\n`;
    return code;
};

Blockly.Python['mybot_display_color'] = function (block) {

    let color = null;
	let colorValue = block.getFieldValue('COLOUR');

    switch(colorValue) {
		
		case '#000000':
			color = 'black';
			break;
			
		case '#ff0000':
			color = 'red';
			break;
		
		case '#00ff00':
			color = 'green';
			break;
			
		case '#ffff00':
			color = 'yellow';
			break;
			
		case '#0000ff':
			color = 'blue';
			break;
		
		case '#ff00ff':
			color = 'purple';
			break;
			
		case '#00ffff':
			color = 'teal';
			break;
		
		case '#ffffff':
			color = 'WHITE';
			break;
		
		default:
			color = 'black';
	}

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_color("${color}")\n`;
	return code;
	
};

Blockly.Python['mybot_display_emoji'] = function (block) {

    let emoji = block.getFieldValue('Emoji');

    // Change "_" to '-' for old emoji values
    emoji = emoji.replace('_', '-');

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_emoji("${emoji}")\n`;
	return code;

};

Blockly.Python['mybot_display_face'] = function (block) {

    let face = block.getFieldValue('Face');

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_face("${face}")\n`;
	return code;

};

Blockly.Python['mybot_display_clear'] = function (block) {

	Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
	let code = `lcd.show_color("white")\n`;
	return code;

};

Blockly.Python['mybot_display_text'] = function (block) {

    var text = Blockly.Python.valueToCode(block, 'Text', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_['mybot_display_libraries'] = displayLibraryReference;
    let code = 'lcd.show_text(' + text + ')\n';
    return code;

};

// Block Aliases for deprecated blocks
Blockly.Python['fusion_start'] = Blockly.Python['mybot_start'];
Blockly.Python['drive_with_gyro'] = Blockly.Python['mybot_drive_with_gyro'];
Blockly.Python['fusion_basic_select_motor_1'] = Blockly.Python['mybot_basic_select_motor_1'];
Blockly.Python['fusion_basic_select_motor_2'] = Blockly.Python['mybot_basic_select_motor_2'];
Blockly.Python['fusion_basic_ledB'] = Blockly.Python['mybot_basic_ledb'];
Blockly.Python['fusion_basic_ledY'] = Blockly.Python['mybot_basic_ledy'];
Blockly.Python['fusion_basic_ledBY'] = Blockly.Python['mybot_basic_ledby'];
Blockly.Python['fusion_basic_ledoff'] = Blockly.Python['mybot_basic_ledoff'];
Blockly.Python['fusion_basic_wait'] = Blockly.Python['mybot_basic_wait'];
Blockly.Python['fusion_basic_forward'] = Blockly.Python['mybot_basic_forward'];
Blockly.Python['fusion_basic_backward'] = Blockly.Python['mybot_basic_backward'];
Blockly.Python['fusion_basic_fast'] = Blockly.Python['mybot_basic_fast'];
Blockly.Python['fusion_basic_medium'] = Blockly.Python['mybot_basic_medium'];
Blockly.Python['fusion_basic_slow'] = Blockly.Python['mybot_basic_slow'];
Blockly.Python['fusion_basic_right45'] = Blockly.Python['mybot_basic_right45'];
Blockly.Python['fusion_basic_right90'] = Blockly.Python['mybot_basic_right90'];
Blockly.Python['fusion_basic_right180'] = Blockly.Python['mybot_basic_right180'];
Blockly.Python['fusion_basic_left45'] = Blockly.Python['mybot_basic_left45'];
Blockly.Python['fusion_basic_left90'] = Blockly.Python['mybot_basic_left90'];
Blockly.Python['fusion_basic_left180'] = Blockly.Python['mybot_basic_left180'];
Blockly.Python['fusion_motor'] = Blockly.Python['mybot_motor'];
Blockly.Python['fusion_drive'] = Blockly.Python['mybot_drive'];
Blockly.Python['fusion_drive_time'] = Blockly.Python['mybot_drive_time'];
Blockly.Python['fusion_rotate'] = Blockly.Python['mybot_rotate'];
Blockly.Python['fusion_servo_target'] = Blockly.Python['mybot_servo_target'];
Blockly.Python['fusion_led'] = Blockly.Python['mybot_led'];
Blockly.Python['fusion_end'] = Blockly.Python['mybot_end'];
Blockly.Python['fusion_comment'] = Blockly.Python['mybot_comment'];
Blockly.Python['fusion_analog_read'] = Blockly.Python['mybot_analog_read'];
Blockly.Python['fusion_digital_read'] = Blockly.Python['mybot_digital_read'];
Blockly.Python['fusion_digital_write'] = Blockly.Python['mybot_digital_write'];
Blockly.Python['fusion_touch_read'] = Blockly.Python['mybot_touch_read'];
Blockly.Python['fusion_compass_heading'] = Blockly.Python['mybot_compass_heading'];
Blockly.Python['fusion_compass_hardIronCalibration'] = Blockly.Python['mybot_compass_hardIronCalibration'];
Blockly.Python['fusion_compass_tiltUp'] = Blockly.Python['mybot_compass_tiltUp'];
Blockly.Python['fusion_compass_tiltDown'] = Blockly.Python['mybot_compass_tiltDown'];
Blockly.Python['fusion_compass_nullAccelerometer'] = Blockly.Python['mybot_compass_nullAccelerometer'];
Blockly.Python['fusion_compass_getAccelerometer'] = Blockly.Python['mybot_compass_getAccelerometer'];
Blockly.Python['fusion_compass_getMagnetometer'] = Blockly.Python['mybot_compass_getMagnetometer'];
Blockly.Python['fusion_compass_scaleAccelerometer'] = Blockly.Python['mybot_compass_scaleAccelerometer'];
Blockly.Python['fusion_intGyro_heading'] = Blockly.Python['mybot_intGyro_heading'];
Blockly.Python['fusion_intGyro_calibrate'] = Blockly.Python['mybot_intGyro_calibrate'];
Blockly.Python['fusion_intGyro_zero'] = Blockly.Python['mybot_intGyro_zero'];
Blockly.Python['fusion_rate_gyro_read'] = Blockly.Python['mybot_rate_gyro_read'];
Blockly.Python['fusion_seeker_heading'] = Blockly.Python['mybot_seeker_heading'];
Blockly.Python['fusion_seeker_intensity'] = Blockly.Python['mybot_seeker_intensity'];
Blockly.Python['fusion_locator_heading'] = Blockly.Python['mybot_locator_heading'];
Blockly.Python['fusion_locator_intensity'] = Blockly.Python['mybot_locator_intensity'];
Blockly.Python['fusion_color_beacon_set_color'] = Blockly.Python['mybot_color_beacon_set_color'];
Blockly.Python['fusion_color_beacon_set_custom_color'] = Blockly.Python['mybot_color_beacon_set_custom_color'];
Blockly.Python['fusion_color_sensor_setup_init'] = Blockly.Python['mybot_color_sensor_setup_init'];
Blockly.Python['fusion_color_sensor_color_number'] = Blockly.Python['mybot_color_sensor_color_number'];
Blockly.Python['fusion_color_sensor_color_rgb'] = Blockly.Python['mybot_color_sensor_color_rgb'];
Blockly.Python['fusion_light_read'] = Blockly.Python['mybot_light_read'];
Blockly.Python['fusion_range_sensor_us'] = Blockly.Python['mybot_range_sensor_us'];
Blockly.Python['fusion_range_sensor_ods'] = Blockly.Python['mybot_range_sensor_ods'];
Blockly.Python['fusion_ods_read'] = Blockly.Python['mybot_ods_read'];
Blockly.Python['fusion_magnetic_read'] = Blockly.Python['mybot_magnetic_read'];
Blockly.Python['fusion_sound_generator'] = Blockly.Python['mybot_sound_generator'];
Blockly.Python['fusion_usbGamepad_readAxis'] = Blockly.Python['mybot_usbGamepad_readAxis'];
Blockly.Python['usion_usbGamepad_readAxisFloat'] = Blockly.Python['mybot_usbGamepad_readAxisFloat'];
Blockly.Python['fusion_usbGamepad_mixer'] = Blockly.Python['mybot_usbGamepad_mixer'];
Blockly.Python['fusion_usbGamepad_readButton'] = Blockly.Python['mybot_usbGamepad_readButton'];
Blockly.Python['fusion_usbGamepad_readHat'] = Blockly.Python['mybot_usbGamepad_readHat'];
Blockly.Python['fusion_VirtualGamepad_Joystick'] = Blockly.Python['mybot_VirtualGamepad_Joystick'];
Blockly.Python['fusion_VirtualGamepad_readButton'] = Blockly.Python['mybot_VirtualGamepad_readButton'];
Blockly.Python['fusion_VirtualGamepad_telemetry'] = Blockly.Python['mybot_VirtualGamepad_telemetry'];
Blockly.Python['fusion_VirtualGamepad_camera'] = Blockly.Python['mybot_VirtualGamepad_camera'];
Blockly.Python['fusion_display_color'] = Blockly.Python['mybot_display_color'];
Blockly.Python['fusion_display_text'] = Blockly.Python['mybot_display_text'];