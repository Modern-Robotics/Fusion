var _0x34fc=['timestamp','align','printf','level',']\x20(','pid','toString','padStart','message','exports','winston','moment','transports','DailyRotateFile','warn','join','./../.logs','20m','format','combine'];(function(_0x385e8a,_0x114cf5){var _0x3bea88=function(_0x2dd99b){while(--_0x2dd99b){_0x385e8a['push'](_0x385e8a['shift']());}};_0x3bea88(++_0x114cf5);}(_0x34fc,0x122));var _0x43f0=function(_0x1bedd3,_0x119bb3){_0x1bedd3=_0x1bedd3-0x0;var _0x23f794=_0x34fc[_0x1bedd3];return _0x23f794;};const winston=require(_0x43f0('0x0'));require('winston-daily-rotate-file');const moment=require(_0x43f0('0x1'));const path=require('path');const fileTransport=new winston[(_0x43f0('0x2'))][(_0x43f0('0x3'))]({'level':_0x43f0('0x4'),'datePattern':'YYYY-MM-DD-HH','zippedArchive':![],'filename':'error-%DATE%.log','dirname':path[_0x43f0('0x5')](__dirname,_0x43f0('0x6')),'maxSize':_0x43f0('0x7'),'maxFiles':'14d','handleExceptions':!![],'format':winston[_0x43f0('0x8')][_0x43f0('0x9')](winston[_0x43f0('0x8')][_0x43f0('0xa')](),winston[_0x43f0('0x8')][_0x43f0('0xb')](),winston[_0x43f0('0x8')][_0x43f0('0xc')](_0x51e08b=>moment(_0x51e08b[_0x43f0('0xa')])['format']('MM-DD-YY\x20HH:mm:ss')+'\x20['+_0x51e08b[_0x43f0('0xd')]+_0x43f0('0xe')+process[_0x43f0('0xf')][_0x43f0('0x10')]()[_0x43f0('0x11')](0x6)+'):\x20'+_0x51e08b[_0x43f0('0x12')]))});module[_0x43f0('0x13')]=fileTransport;