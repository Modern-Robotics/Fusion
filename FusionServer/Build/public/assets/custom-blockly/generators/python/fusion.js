/**
 * Fusion Blocks Generator for Blockly 
 * Author: Zac Zegarelli
 */
'use strict';

goog.provide('Blockly.Python.fusion');

goog.require('Blockly.Python');

var fusionLibraryReference = 'import Fusion\nf = Fusion.driver()\n';
var fusionImport = fusionLibraryReference;
var pythonTimeLibraryReference = 'import time\n';
var helpURL = 'http://modernroboticsinc.com/fusion';

//Pre-Set Speeds
var speed1 = 20;
var speed2 = 60;
var speed3 = 80;
var speedT = 60;

var timeT45 = .42;
var timeT90 = .82;
var timeT180 = 1.7;

var gyro_drive = 0;
var virtualGamepad = 0;
var virtual_camera = 0;
var res_w = 0;
var res_h = 0;
var fps = 0;
var drop_cam_mode;
var coreControl = 0;

Blockly.Python['fusion_motor'] = function (block) {
    var motor = block.getFieldValue('Motor');
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.' + motor + ', ' + value_power + ')\n';
    return code;
};

Blockly.Python['fusion_drive'] = function (block) {
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.M0+f.M1, ' + value_power + ')\n';
    return code;
};

Blockly.Python['fusion_drive_time'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var value_power = Blockly.Python.valueToCode(block, 'Power', Blockly.Python.ORDER_NONE) || '0';
    var value_time = Blockly.Python.valueToCode(block, 'Time', Blockly.Python.ORDER_NONE) || '0';

    var code = 'f.motorSpeed(f.M0+f.M1, ' + value_power + ')\n';

    if (value_time != 0) {
        code = code + 'time.sleep(' + value_time + ')\n';
    }
    if (!isNaN(value_time) && value_time == 0) {
        return '# Stop motors\nf.motorSpeed(f.M0+f.M1, 0);\n';
    } else {
        if (value_power > 0) {
            return '# Drive forwards with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (value_power < 0) {
            return '# Drive backwards with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+f.M1, 0)\n';
        } else if (isNaN(value_power)) {
            return '# Drive with ' + value_power + '% power for ' + value_time + ' seconds\n' + code + 'f.motorSpeed(f.M0+fS.M1, 0)\n';
        } else {
            return '# Stop motors and wait ' + value_time + ' seconds\n' + code;
        }
    }
};

Blockly.Python['fusion_rotate'] = function (block) {
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

Blockly.Python['fusion_servo_target'] = function (block) {
    var servo = block.getFieldValue('servo');
    Blockly.Python.definitions_['fusion_servo_' + servo] = 'f.servoEnable(f.' + servo + ', 1)';
    var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_NONE);

    var code = 'f.servoTarget(f.' + servo + ', ' + target + ')\n';

    return code;
};

Blockly.Python['fusion_led'] = function (block) {
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

Blockly.Python['fusion_end'] = function (block) {
    var code = 'exit()\n';
    return code;
};

Blockly.Python['fusion_start'] = function (block) {
    Blockly.Python.definitions_['fusion_setup'] = fusionLibraryReference;
    if(virtualGamepad == 1) {
		if(virtual_camera == 0){
			fusionImport = fusionImport + 'import VirtualGamepad\nv = VirtualGamepad.service()\n';
		}
		else if(virtual_camera == 1){
			fusionImport = fusionImport + 'import VirtualGamepad\nv = VirtualGamepad.service(True, ('+ res_w +','+ res_h +'), '+ fps +', '+ drop_cam_mode +')\n';
			virtual_camera = 0;
		}
		Blockly.Python.definitions_['fusion_setup'] = fusionImport;
		virtualGamepad=0;
	}
	if(coreControl == 1){
		fusionImport = fusionImport + 'import CoreControl\nc = CoreControl.driver()';
		Blockly.Python.definitions_['fusion_setup'] = fusionImport;
		coreControl = 0;
	}
	fusionImport = fusionLibraryReference;
	gyro_drive=0;
    var code = '';
    return code;
};

Blockly.Python['fusion_comment'] = function (block) {
    var statement = block.getFieldValue('Statement');
    var code = '# ' + statement + '\n';
    return code;
};

Blockly.Python['drive_with_gyro'] = function (block) {
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)\nint_gyro.setZero()';
    Blockly.Python.definitions_['fusion_gyro_current_' + "0x20"] = 'current_gyro = 0';
	gyro_drive = 1;
    return '';
};

Blockly.Python['fusion_basic_forward'] = function (block) {
	Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + speed2;
	if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0+f.M1, speed)\ntime.sleep(1)\nf.motorSpeed(f.M0+f.M1, 0)\n';
	else if(gyro_drive ==1) var code = 'for i in range(0, 100):\n    gyro_val = int_gyro.getAbsolute()\n    M0_speed = speed-gyro_val\n    M1_speed = speed+gyro_val\n    if (M0_speed > 100): M0_speed = 100\n    if (M0_speed < -100): M0_speed = -100\n    if (M1_speed > 100): M1_speed = 100\n    if (M1_speed < -100): M1_speed = -100\n    if (gyro_val > current_gyro):\n        f.motorSpeed(f.M0, M0_speed)\n        f.motorSpeed(f.M1, M1_speed)\n    elif (gyro_val < current_gyro):\n        f.motorSpeed(f.M0, M0_speed)\n        f.motorSpeed(f.M1, M1_speed)\n    else:\n        f.motorSpeed(f.M0+f.M1, speed)\n    time.sleep(.01)\n';
	return code;
};

Blockly.Python['fusion_basic_backward'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + speed2;
	if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0+f.M1, -speed)\ntime.sleep(1)\nf.motorSpeed(f.M0+f.M1, 0)\n';
	else if(gyro_drive ==1) var code = 'for i in range(0, 100):\n    gyro_val = int_gyro.getAbsolute()\n    M0_speed = -(speed+gyro_val)\n    M1_speed = -(speed-gyro_val)\n    if (M0_speed > 100): M0_speed = 100\n    if (M0_speed < -100): M0_speed = -100\n    if (M1_speed > 100): M1_speed = 100\n    if (M1_speed < -100): M1_speed = -100\n    if (gyro_val > current_gyro):\n        f.motorSpeed(f.M0, M0_speed)\n        f.motorSpeed(f.M1, M1_speed)\n    elif (gyro_val < current_gyro):\n        f.motorSpeed(f.M0, M0_speed)\n        f.motorSpeed(f.M1, M1_speed)\n    else:\n        f.motorSpeed(f.M0+f.M1, -speed)\n    time.sleep(.01)\n';
    return code;
};

Blockly.Python['fusion_basic_fast'] = function (block) {
    var code = 'speed = ' + speed3 + '\n';
    return code;
};

Blockly.Python['fusion_basic_medium'] = function (block) {
    var code = 'speed = ' + speed2 + '\n';
    return code;
};

Blockly.Python['fusion_basic_slow'] = function (block) {
    var code = 'speed = ' + speed1 + '\n';
    return code;
};

Blockly.Python['fusion_basic_right45'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT45 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro - 45)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = int_gyro.getAbsolute() - current_gyro\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, -turn_speed)\n    f.motorSpeed(f.M1, turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
	return code;
};

Blockly.Python['fusion_basic_right90'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT90 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro - 90)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = int_gyro.getAbsolute() - current_gyro\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, -turn_speed)\n    f.motorSpeed(f.M1, turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
	return code;
};

Blockly.Python['fusion_basic_right180'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT180 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
	else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro - 180)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = int_gyro.getAbsolute() - current_gyro\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, -turn_speed)\n    f.motorSpeed(f.M1, turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_left45'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT45 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro + 45)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = current_gyro - int_gyro.getAbsolute()\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, turn_speed)\n    f.motorSpeed(f.M1, -turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
	return code;
};

Blockly.Python['fusion_basic_left90'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT90 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
	else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro + 90)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = current_gyro - int_gyro.getAbsolute()\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, turn_speed)\n    f.motorSpeed(f.M1, -turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_left180'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    if(gyro_drive == 0) var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT180 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
	else if(gyro_drive ==1) var code = 'current_gyro = (current_gyro + 180)\nwhile ((int_gyro.getAbsolute() != current_gyro)):\n    turn_speed = current_gyro - int_gyro.getAbsolute()\n    if (turn_speed < 15): turn_speed = 15\n    if (turn_speed > 100): turn_speed = 100\n    f.motorSpeed(f.M0, turn_speed)\n    f.motorSpeed(f.M1, -turn_speed)\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_wait'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'time.sleep(1)\n'
    return code;
};

Blockly.Python['fusion_basic_ledB'] = function (block) {
    var code = 'f.setLED(f.YELLOW, 0)\nf.setLED(f.BLUE, 1)\n';
    return code;
};

Blockly.Python['fusion_basic_ledY'] = function (block) {
    var code = 'f.setLED(f.YELLOW, 1)\nf.setLED(f.BLUE, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_ledBY'] = function (block) {
    var code = 'f.setLED(f.YELLOW, 1)\nf.setLED(f.BLUE, 1)\n';
    return code;
};

Blockly.Python['fusion_basic_ledoff'] = function (block) {
    var code = 'f.setLED(f.YELLOW, 0)\nf.setLED(f.BLUE, 0)\n';
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

Blockly.Python['fusion_analog_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'analog_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'analog_' + port + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fusion_digital_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_digital_init_' + port] = 'digital_' + port + ' = Fusion.digital(f, f.' + port + ')';
    var dropdown_condition = block.getFieldValue('condition');
    var code = 'digital_' + port + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fusion_digital_write'] = function (block) {
    var port = block.getFieldValue('Port');
    var value = block.getFieldValue('Value');
    Blockly.Python.definitions_['fusion_digital_init_' + port] = 'digital_' + port + ' = Fusion.digital(f, f.' + port + ')';
    var code = 'digital_' + port + '.write(' + value + ')\n';
    return code;
};

Blockly.Python['fusion_touch_read'] = function (block) {
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

Blockly.Python['fusion_compass_heading'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.getHeading()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fusion_compass_hardIronCalibration'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.hardIronCalibration()\n';
    return code;
};

Blockly.Python['fusion_compass_tiltUp'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.tiltUp()\n';
    return code;
};

Blockly.Python['fusion_compass_tiltDown'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.tiltDown()\n';
    return code;
};

Blockly.Python['fusion_compass_nullAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');

    var code = 'compass.nullAccelerometer(' + drop_axis + ')\n';
    return code;
};

Blockly.Python['fusion_compass_getAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');

    var code = 'compass.getAccelerometer()[' + drop_axis + ']';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_compass_getMagnetometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var drop_axis = block.getFieldValue('axis');
    var code = 'compass.getMagnetometer()[' + drop_axis + ']';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_compass_scaleAccelerometer'] = function (block) {
    Blockly.Python.definitions_['fusion_compass_init_' + "0x24"] = 'compass = Fusion.compass(f)';
    var code = 'compass.scaleAccelerometer()\n';
    return code;
};

Blockly.Python['fusion_intGyro_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    if (dropdown_mode == "Absolute") {
        var code = 'int_gyro.getAbsolute()\n';
    } else {
        var code = 'int_gyro.getDegrees()\n';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_intGyro_calibrate'] = function (block) {
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    Blockly.Python.definitions_['fusion_gyro_null_' + "0x20"] = 'int_gyro.setNull()';
    return '';
};

Blockly.Python['fusion_intGyro_zero'] = function (block) {
    Blockly.Python.definitions_['fusion_gyro_init_' + "0x20"] = 'int_gyro = Fusion.intGyro(f)';
    return 'int_gyro.setZero()\n';
};

Blockly.Python['fusion_rate_gyro_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'rate_gyro_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'rate_gyro_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_seeker_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_seeker_init_' + "0x38"] = 'seeker = Fusion.seekerV3(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'seeker.getHeading(1200)';
    } else {
        var code = 'seeker.getHeading(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_seeker_intensity'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_seeker_init_' + "0x38"] = 'seeker = Fusion.seekerV3(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'seeker.getIntensity(1200)';
    } else {
        var code = 'seeker.getIntensity(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_locator_heading'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_locator_init_' + "0x1C"] = 'locator = Fusion.locator360(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'locator.getHeading(1200)';
    } else {
        var code = 'locator.getHeading(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_locator_intensity'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    Blockly.Python.definitions_['fusion_locator_init_' + "0x1C"] = 'locator = Fusion.locator360(f)';
    if (dropdown_mode == "1200 Hz") {
        var code = 'locator.getIntensity(1200)';
    } else {
        var code = 'locator.getIntensity(600)';
    }
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_color_beacon_set_color'] = function (block) {
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

Blockly.Python['fusion_color_beacon_set_custom_color'] = function (block) {
    Blockly.Python.definitions_['fusion_color_beacon_init_' + "0x4C"] = 'beacon = Fusion.colorBeacon(f)';
    var red = Blockly.Python.valueToCode(block, 'Red', Blockly.Python.ORDER_NONE);
    var green = Blockly.Python.valueToCode(block, 'Green', Blockly.Python.ORDER_NONE);
    var blue = Blockly.Python.valueToCode(block, 'Blue', Blockly.Python.ORDER_NONE);
    var code = 'beacon.setCustomColor(' + red + ',' + green + ',' + blue + ')\n';
    return code;
};

Blockly.Python['fusion_color_sensor_color_number'] = function (block) {
    Blockly.Python.definitions_['fusion_color_sensor_init_' + "0x3C"] = 'colour = Fusion.color(f)';
    var code = 'colour.getColorNumber()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_color_sensor_color_rgb'] = function (block) {
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

Blockly.Python['fusion_color_sensor_setup_init'] = function (block) {
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

Blockly.Python['fusion_light_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'light_' + port + ' = Fusion.analog(f, f.' + port + ')';

    var code = 'light_' + port + '.read()';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_range_sensor_us'] = function (block) {
    Blockly.Python.definitions_['fusion_range_sensor_init_' + "0x28"] = 'range = Fusion.range(f)';
    var code = 'range.ultrasonic()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_range_sensor_ods'] = function (block) {
    Blockly.Python.definitions_['fusion_range_sensor_init_' + "0x28"] = 'range = Fusion.range(f)';
    var code = 'range.optical()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_ods_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'ods_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'ods_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_magnetic_read'] = function (block) {
    var port = block.getFieldValue('Port');
    Blockly.Python.definitions_['fusion_analog_init_' + port] = 'magnetic_' + port + ' = Fusion.analog(f, f.' + port + ')';
    var code = 'magnetic_' + port + '.read()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_sound_generator'] = function (block) {
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

Blockly.Python['fusion_usbGamepad_readAxis'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_axis = block.getFieldValue('axis');
	var drop_inv = block.getFieldValue('inv');

    var code = 'usbg.readAxis('+ drop_axis +', '+ drop_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_usbGamepad_readAxisFloat'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_axis = block.getFieldValue('axis');
	var drop_inv = block.getFieldValue('inv');

    var code = 'usbg.readAxisFloat('+ drop_axis +', '+ drop_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_usbGamepad_mixer'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var x_axis = block.getFieldValue('x_axis');
    var y_axis = block.getFieldValue('y_axis');
    var x_inv = block.getFieldValue('x_inv');
    var y_inv = block.getFieldValue('y_inv');

    var code = 'usbg.mixer('+ x_axis +', '+ y_axis +', '+ x_inv +', '+ y_inv +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_usbGamepad_readButton'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';
    var drop_button = block.getFieldValue('button');

    var code = 'usbg.readButton('+ drop_button +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_usbGamepad_readHat'] = function (block) {
    Blockly.Python.definitions_['fusion_usbGamepad_init_' + "0"] = 'usbg = Fusion.usbGamepad()';

    var code = 'usbg.readHat()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_VirtualGamepad_service'] = function (block) {
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

Blockly.Python['fusion_VirtualGamepad_Joystick'] = function (block) {
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

Blockly.Python['fusion_VirtualGamepad_readButton'] = function (block) {
	virtualGamepad = 1;
    var drop_button = block.getFieldValue('button');

    var code = 'v.readButton('+ drop_button +')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fusion_VirtualGamepad_telemetry'] = function (block) {
	virtualGamepad = 1;
    var line_number = block.getFieldValue('line');
    var value = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);

    var code = 'v.telemetry('+ line_number +', str('+ value +'))\n';
    return code;
};

Blockly.Python['fusion_VirtualGamepad_camera'] = function (block) {
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
	Blockly.Python.definitions_['CoreControl_CoreMotorController_' + name] = name + '= CoreControl.coreMotorController(c, ' + serial + ')';
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
