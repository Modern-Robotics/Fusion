var _0x302b=['MM-DD-YY\x20HH:mm:ss','level',']\x20(','pid','toString','padStart','message','exports','winston','winston-daily-rotate-file','moment','path','transports','DailyRotateFile','YYYY-MM-DD-HH','join','./../.logs','20m','14d','format','align','printf'];(function(_0x1339d8,_0x4a5b12){var _0x2e5a24=function(_0x146046){while(--_0x146046){_0x1339d8['push'](_0x1339d8['shift']());}};_0x2e5a24(++_0x4a5b12);}(_0x302b,0x1c0));var _0x1704=function(_0x1df27e,_0x5b4840){_0x1df27e=_0x1df27e-0x0;var _0x475d88=_0x302b[_0x1df27e];return _0x475d88;};const winston=require(_0x1704('0x0'));require(_0x1704('0x1'));const moment=require(_0x1704('0x2'));const path=require(_0x1704('0x3'));const fileTransport=new winston[(_0x1704('0x4'))][(_0x1704('0x5'))]({'level':'warn','datePattern':_0x1704('0x6'),'zippedArchive':![],'filename':'error-%DATE%.log','dirname':path[_0x1704('0x7')](__dirname,_0x1704('0x8')),'maxSize':_0x1704('0x9'),'maxFiles':_0x1704('0xa'),'handleExceptions':!![],'format':winston[_0x1704('0xb')]['combine'](winston[_0x1704('0xb')]['timestamp'](),winston[_0x1704('0xb')][_0x1704('0xc')](),winston[_0x1704('0xb')][_0x1704('0xd')](_0x208f50=>moment(_0x208f50['timestamp'])[_0x1704('0xb')](_0x1704('0xe'))+'\x20['+_0x208f50[_0x1704('0xf')]+_0x1704('0x10')+process[_0x1704('0x11')][_0x1704('0x12')]()[_0x1704('0x13')](0x6)+'):\x20'+_0x208f50[_0x1704('0x14')]))});module[_0x1704('0x15')]=fileTransport;