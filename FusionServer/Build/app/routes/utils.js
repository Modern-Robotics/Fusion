var _0x2cf9=['dataLogger_running','SocketVariables','status','json','Data\x20logger\x20started\x20successfully','process\x20not\x20found','send','Error\x20starting\x20data\x20logger','Data\x20Logger\x20does\x20not\x20run\x20on\x20windows','route','/api/util/dataLogger/stop','get','sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../logging/dataLogger.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)','exec','ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../logging/dataLogger.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27','trim','Unable\x20to\x20stop\x20data\x20logger','/api/util/dataLogger/start','platform','win32','../../logging/runRemi.sh','../../logging/dataLogger.py','username','stdout','data','log','fusion_dataLogger_running','body','socketId','sockets','emit'];(function(_0xf86952,_0x32a362){var _0x29ae09=function(_0x1db562){while(--_0x1db562){_0xf86952['push'](_0xf86952['shift']());}};_0x29ae09(++_0x32a362);}(_0x2cf9,0x6e));var _0x5108=function(_0x18825d,_0x27e29b){_0x18825d=_0x18825d-0x0;var _0x550856=_0x2cf9[_0x18825d];return _0x550856;};var os=require('os');var spawn=require('child_process')['spawn'];var shell=require('shelljs');module['exports']=function(_0x4ef491,_0x11657b,_0x26c666){var _0x2ad2ff=null;_0x4ef491['route'](_0x5108('0x0'))['post'](function(_0x4e130a,_0x327155){if(os[_0x5108('0x1')]()!=_0x5108('0x2')){_0x2ad2ff=spawn('sudo',['sh',_0x5108('0x3'),_0x5108('0x4'),_0x4e130a['user'][_0x5108('0x5')]]);_0x2ad2ff[_0x5108('0x6')]['on'](_0x5108('0x7'),function(_0x3717e1){console[_0x5108('0x8')](String(_0x3717e1));});_0x2ad2ff['stderr']['on'](_0x5108('0x7'),function(_0x59199c){console[_0x5108('0x8')](String(_0x59199c));});var _0x30e405=0x1;var _0x506eda=0x3;var _0x194fb0=setInterval(function(){if(_0x30e405<=_0x506eda){var _0x5077f3=shell['exec']('ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../logging/dataLogger.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27',{'silent':!![]})[_0x5108('0x6')];console[_0x5108('0x8')]('process\x20number\x20'+_0x5077f3);if(_0x5077f3){console[_0x5108('0x8')]('process\x20found');clearInterval(_0x194fb0);_0x26c666['SocketVariables'][_0x5108('0x9')]={'process':_0x5077f3,'socket':_0x4e130a[_0x5108('0xa')][_0x5108('0xb')]};_0x11657b[_0x5108('0xc')][_0x5108('0xd')](_0x5108('0xe'),_0x26c666[_0x5108('0xf')]['fusion_dataLogger_running']);return _0x327155[_0x5108('0x10')](0xc8)[_0x5108('0x11')]({'serverMessage':_0x5108('0x12')});}else{console[_0x5108('0x8')](_0x5108('0x13'));_0x30e405++;}}else{clearInterval(_0x194fb0);return _0x327155[_0x5108('0x10')](0x1f4)[_0x5108('0x14')](_0x5108('0x15'));}},0x12c);}else{return _0x327155['status'](0x1f4)[_0x5108('0x11')]({'serverMessage':_0x5108('0x16')});}});_0x4ef491[_0x5108('0x17')](_0x5108('0x18'))[_0x5108('0x19')](function(_0x574af6,_0x549de3){if(os[_0x5108('0x1')]()!='win32'){shell['exec'](_0x5108('0x1a'),{'silent':!![]});shell[_0x5108('0x1b')](_0x5108('0x1c'),{'silent':!![]},function(_0x1ef371,_0x477b1d,_0x12b98e){(function(_0x2763d6){var _0xe3c618=_0x2763d6[_0x5108('0x1d')]();if(_0xe3c618){return _0x549de3['status'](0x1f4)[_0x5108('0x14')](_0x5108('0x1e'));}else{_0x26c666['SocketVariables'][_0x5108('0x9')]=null;_0x11657b[_0x5108('0xc')][_0x5108('0xd')]('dataLogger_running',_0x26c666[_0x5108('0xf')][_0x5108('0x9')]);_0x2ad2ff=null;return _0x549de3[_0x5108('0x10')](0xc8)[_0x5108('0x11')]({'serverMessage':'Data\x20logger\x20stopped\x20successfully'});}}(_0x477b1d[_0x5108('0x1d')]()));});}else{return _0x549de3[_0x5108('0x10')](0xc8)['json']({'serverMessage':_0x5108('0x16')});}});function _0xc4cd63(){return function(_0x4437f1,_0x129ce5,_0x3abd6a){if(_0x4437f1['isAuthenticated']()){return _0x3abd6a();}else{_0x129ce5['status'](0x191)[_0x5108('0x14')]('User\x20Unauthenticated');}};}};