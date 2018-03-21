/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Python code for the Math blocks.
 *
 * TODO: Math on list needs lists to be implemented.
 *       math_constant and math_change needs to be tested in compiler.
 */
'use strict';

goog.provide('Blockly.Python.fusion');

goog.require('Blockly.Python');

var fusionLibraryReference = 'import Fusion\nf = Fusion.driver()';
var pythonTimeLibraryReference = 'import time';
var helpURL = 'http://modernroboticsinc.com/fusion';

//Pre-Set Speeds
var speed1 = 20;
var speed2 = 60;
var speed3 = 80;
var speedT = 60;

var timeT45 = .42;
var timeT90 = .82;
var timeT180 = 1.7;

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
    var code = '...;\n';

    if (color == '#0000ff') {
        if (dropdown == 'OFF') {
            code = 'f.setLED(f.BLUE, 0)\n';
        } else {
            code = 'f.setLED(f.BLUE, 1)\n';
        }
    } else {
        if (dropdown == 'OFF') {
            code = 'f.setLED(f.YELLOW, 0)\n';
        } else {
            code = 'f.setLED(f.YELLOW, 1)\n';
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
    var code = '';
    return code;
};

Blockly.Python['fusion_comment'] = function (block) {
    var statement = block.getFieldValue('Statement');
    var code = '# ' + statement + '\n';
    return code;
};

Blockly.Python['fusion_basic_forward'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + speed2;
    var code = 'f.motorSpeed(f.M0+f.M1, speed)\ntime.sleep(1)\nf.motorSpeed(f.M0+f.M1, 0)\n'
    return code;
};

Blockly.Python['fusion_basic_backward'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    Blockly.Python.definitions_['fusion_speed'] = 'speed = ' + speed2;
    var code = 'f.motorSpeed(f.M0+f.M1, -speed)\ntime.sleep(1)\nf.motorSpeed(f.M0+f.M1, 0)\n'
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
    var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT45 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_right90'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT90 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_right180'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'f.motorSpeed(f.M0, -' + speedT + ')\nf.motorSpeed(f.M1, ' + speedT + ')\ntime.sleep(' + timeT180 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_left45'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT45 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_left90'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT90 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
    return code;
};

Blockly.Python['fusion_basic_left180'] = function (block) {
    Blockly.Python.definitions_['fusion_time_setup'] = pythonTimeLibraryReference;
    var code = 'f.motorSpeed(f.M0, ' + speedT + ')\nf.motorSpeed(f.M1, -' + speedT + ')\ntime.sleep(' + timeT180 + ')\nf.motorSpeed(f.M0+f.M1, 0)\n';
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
