var _0x550c=['No\x20Program\x20Running','KillProgram','StartBlocklyProgram','Blockly\x20Program\x20is\x20now\x20running','Program\x20already\x20running','sendInput','write','python','pipe','sockets','emit','stdout','data','stderr','console-output','program-running','gamepad-available','>\x20Program\x20Finished!','>\x20Program\x20Finished!\x0a','blockly-console-output','close','platform','win32','fusion_gamepad_available','child_process','spawn','shelljs','stream','exports','StartProgram','SocketVariables','fusion_program_running','Program\x20is\x20now\x20running','User','kill','SIGINT','log','StopProgram','Program\x20is\x20now\x20stopped','Program\x20Successfully\x20Stopped','Cannot\x20stop\x20another\x20user\x27s\x20program.','No\x20program\x20running'];(function(_0x5794d2,_0x2f2c5d){var _0x40d469=function(_0x1c0903){while(--_0x1c0903){_0x5794d2['push'](_0x5794d2['shift']());}};_0x40d469(++_0x2f2c5d);}(_0x550c,0x1e6));var _0x56ae=function(_0x1f6cd7,_0x5c9c48){_0x1f6cd7=_0x1f6cd7-0x0;var _0x1c0f30=_0x550c[_0x1f6cd7];return _0x1c0f30;};var spawn=require(_0x56ae('0x0'))[_0x56ae('0x1')];var shell=require(_0x56ae('0x2'));var os=require('os');var stream=require(_0x56ae('0x3'));var python_process;module[_0x56ae('0x4')]=function(_0x5c685e,_0x3e3156){var _0x1e9e81=function(){};_0x1e9e81[_0x56ae('0x5')]=function(_0x151bd2,_0x558098,_0xd7aec1){if(!_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]){_0x3e3156[_0x56ae('0x6')]['fusion_program_running']={'Code':null,'Program':_0x558098,'SocketId':_0xd7aec1,'User':_0x151bd2};_0x2fb0e4(_0x558098);console['log'](_0x56ae('0x8'));return{'status':0xc8,'message':'Program\x20is\x20now\x20running'};}else{if(_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')][_0x56ae('0x9')]==_0x151bd2){try{python_process[_0x56ae('0xa')](_0x56ae('0xb'));}catch(_0x57b080){}_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]={'Code':null,'Program':_0x558098,'SocketId':_0xd7aec1,'User':_0x151bd2};_0x2fb0e4(_0x558098);console[_0x56ae('0xc')]('Program\x20is\x20now\x20running');return{'status':0xc8,'message':'Program\x20is\x20now\x20running'};}else{console[_0x56ae('0xc')]('Program\x20already\x20running');return{'status':0x1f4,'message':'Program\x20already\x20running'};}}};_0x1e9e81[_0x56ae('0xd')]=function(_0xf81284){if(_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]){if(_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]['User']==_0xf81284){_0x3e3156['SocketVariables']['fusion_program_running']=null;try{python_process['kill'](_0x56ae('0xb'));}catch(_0x36471c){}console[_0x56ae('0xc')](_0x56ae('0xe'));return{'status':0xc8,'message':_0x56ae('0xf')};}else{console[_0x56ae('0xc')]('Cannot\x20stop\x20another\x20user\x20program');return{'status':0x1f4,'message':_0x56ae('0x10')};}}else{console[_0x56ae('0xc')](_0x56ae('0x11'));return{'status':0x1f4,'message':_0x56ae('0x12')};}};_0x1e9e81[_0x56ae('0x13')]=function(){_0x3e3156[_0x56ae('0x6')]['fusion_program_running']=null;try{python_process[_0x56ae('0xa')]('SIGINT');}catch(_0x1985b6){}console['log'](_0x56ae('0xe'));};_0x1e9e81[_0x56ae('0x14')]=function(_0x48f32d,_0x225616,_0x5a0a06){if(!_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]){_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]={'Code':_0x48f32d,'Program':null,'SocketId':_0x5a0a06,'User':_0x225616};_0x1122db(_0x48f32d);console[_0x56ae('0xc')](_0x56ae('0x15'));return{'status':0xc8,'message':_0x56ae('0x15')};}else{if(_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')][_0x56ae('0x9')]==_0x225616){try{python_process[_0x56ae('0xa')](_0x56ae('0xb'));}catch(_0x4bb1e3){}_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]={'Code':_0x48f32d,'Program':null,'SocketId':_0x5a0a06,'User':_0x225616};_0x1122db(_0x48f32d);console['log'](_0x56ae('0x15'));return{'status':0xc8,'message':'Blockly\x20Program\x20is\x20now\x20running'};}else{console['log'](_0x56ae('0x16'));return{'status':0x1f4,'message':_0x56ae('0x16')};}}};_0x1e9e81[_0x56ae('0x17')]=function(_0x30bae6){python_process['stdin'][_0x56ae('0x18')](_0x30bae6+'\x0a');};function _0x2fb0e4(_0x3b45bc){python_process=spawn(_0x56ae('0x19'),['-u',_0x3b45bc],{'stdio':_0x56ae('0x1a')});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')]('program-running',_0x3e3156['SocketVariables'][_0x56ae('0x7')]);_0x2b814e();python_process[_0x56ae('0x1d')]['on'](_0x56ae('0x1e'),function(_0x33161b){console['log'](String(_0x33161b));_0x5c685e[_0x56ae('0x1c')]('console-output',{'output':String(_0x33161b)});});python_process[_0x56ae('0x1f')]['on']('data',function(_0x1dc186){console[_0x56ae('0xc')](String(_0x1dc186));_0x5c685e[_0x56ae('0x1c')](_0x56ae('0x20'),{'output':String(_0x1dc186)});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x21'),_0x3e3156[_0x56ae('0x6')]['fusion_program_running']);_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x22'),![]);});python_process[_0x56ae('0x1d')]['on']('close',function(_0x15b200){console[_0x56ae('0xc')](String(_0x56ae('0x23')));_0x5c685e[_0x56ae('0x1c')](_0x56ae('0x20'),{'output':String(_0x56ae('0x24'))});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x21'),_0x3e3156['SocketVariables'][_0x56ae('0x7')]);_0x5c685e['sockets'][_0x56ae('0x1c')](_0x56ae('0x22'),![]);});}function _0x1122db(_0x33bdb7){python_process=spawn(_0x56ae('0x19'),['-u','-c',_0x33bdb7],{'stdio':'pipe'});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x21'),_0x3e3156[_0x56ae('0x6')][_0x56ae('0x7')]);_0x2b814e();python_process[_0x56ae('0x1d')]['on'](_0x56ae('0x1e'),function(_0x39e565){console['log'](String(_0x39e565));_0x5c685e[_0x56ae('0x1c')]('blockly-console-output',{'output':String(_0x39e565)});});python_process[_0x56ae('0x1f')]['on'](_0x56ae('0x1e'),function(_0x2b7e7f){console[_0x56ae('0xc')](String(_0x2b7e7f));_0x5c685e['emit'](_0x56ae('0x25'),{'output':String(_0x2b7e7f)});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x21'),_0x3e3156['SocketVariables']['fusion_program_running']);_0x5c685e[_0x56ae('0x1b')]['emit'](_0x56ae('0x22'),![]);});python_process[_0x56ae('0x1d')]['on'](_0x56ae('0x26'),function(_0x1ef87a){console['log'](String(_0x56ae('0x23')));_0x5c685e[_0x56ae('0x1c')](_0x56ae('0x25'),{'output':String('>\x20Program\x20Finished!\x0a')});_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')](_0x56ae('0x21'),_0x3e3156['SocketVariables']['fusion_program_running']);_0x5c685e[_0x56ae('0x1b')][_0x56ae('0x1c')]('gamepad-available',![]);});}function _0x2b814e(){if(os[_0x56ae('0x27')]()!=_0x56ae('0x28')){setTimeout(function(){var _0x148f55=shell['exec']('sudo\x20netstat\x20-panp\x20|\x20grep\x205000\x20|\x20grep\x20LISTEN',{'silent':!![]})[_0x56ae('0x1d')];if(!_0x148f55)_0x3e3156[_0x56ae('0x6')]['fusion_gamepad_available']=![];else _0x3e3156[_0x56ae('0x6')][_0x56ae('0x29')]=!![];_0x5c685e[_0x56ae('0x1b')]['emit'](_0x56ae('0x22'),_0x3e3156[_0x56ae('0x6')][_0x56ae('0x29')]);},0x3e8);}}return _0x1e9e81;};