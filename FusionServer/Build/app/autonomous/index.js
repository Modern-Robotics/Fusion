const _0x2443=['Autonomus\x20mode\x20active\x20:\x20Running\x20\x22','./../utils/logger','Configuring\x20default\x20autonomus\x20settings','user','./../fusionProgram','active','autonomous','Editor','info','./../models/autonomous','\x22\x20for\x20\x22','verbose','exec','./app/filesystem/','error','type','StartProgram','create','exports'];(function(_0x19b834,_0x2443a0){const _0x5f33af=function(_0xf96c3e){while(--_0xf96c3e){_0x19b834['push'](_0x19b834['shift']());}};_0x5f33af(++_0x2443a0);}(_0x2443,0xd0));const _0x5f33=function(_0x19b834,_0x2443a0){_0x19b834=_0x19b834-0x0;let _0x5f33af=_0x2443[_0x19b834];return _0x5f33af;};const autonomous=require(_0x5f33('0xa'));const logger=require(_0x5f33('0x2'));const fusionProgram=require(_0x5f33('0x5'));module[_0x5f33('0x0')]=async function(){try{const _0x18490e=await autonomous['findOne']({})[_0x5f33('0xd')]();if(_0x18490e){if(_0x18490e[_0x5f33('0x6')]){logger[_0x5f33('0x9')](_0x5f33('0x1')+_0x18490e['program']+_0x5f33('0xb')+_0x18490e[_0x5f33('0x4')]+'\x22');if(_0x18490e[_0x5f33('0x10')]==_0x5f33('0x8')){const _0x3c3be7=_0x18490e[_0x5f33('0x4')];const _0x25f412=_0x5f33('0xe')+_0x3c3be7+'/'+_0x18490e[_0x5f33('0x10')]+'/'+_0x18490e['program'];fusionProgram[_0x5f33('0x11')](_0x3c3be7,_0x25f412,_0x5f33('0x7'));}}else{logger['info']('Autonomous\x20mode\x20inactive');}}else{logger[_0x5f33('0xc')](_0x5f33('0x3'));await autonomous[_0x5f33('0x12')]({});}}catch(_0x192ca8){logger[_0x5f33('0xf')](_0x192ca8);}}();