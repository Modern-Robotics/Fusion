var _0x373e=['pipe','diagnostics_running','/api/diagnostics/start','COMPLETED','Diagnostic\x20tool\x20stopped\x20successfully','ssid_set.py','wpa_passphrase\x20\x22','\x20\x20\x20\x20ssid=\x22','json','\x09scan_ssid=1\x0a','Unable\x20to\x20stop\x20diagnostic\x20tool','Content-disposition','readFile','wifi-connection','User\x20created!','body','config','Wifi\x20file\x20not\x20found','DISCONNECTED','\x20\x20\x20\x20key_mgmt=NONE\x0a','log','data','../../diagnostics/diagnosticGUI.py','4WAY_HANDSHAKE','spawn','\x09ssid=\x22','\x22\x20\x22','writeFile','generateHash','filepath','\x20assigned','/api/admin/restart','wpa_passphrase','./../models/autonomous','trim','ASSOCIATING','message','network={\x0a','Diagnostic\x20tool\x20started\x20successfully','path','findOne','\x20successfully','platform','Successfully\x20changed\x20wifi\x20settings','Wireless\x20interface\x20not\x20found','/api/admin/crashReport','exec','Error\x20starting\x20diagnostic\x20tool','sudo\x20wpa_cli\x20-i\x20','utf8','type','\x09key_mgmt=WPA-PSK\x0a','wireless-tools/iwlist','Username\x20already\x20taken.','child_process','emit','save','sockets','EOL','SocketVariables','password','INACTIVE','sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)','Error\x20disconnecting','.crash','/api/admin/powerOff','mkdirp','wireless-tools/wpa_supplicant','wireless-tools/wpa_cli','User\x20Unauthenticated','ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev\x0a','send','exports','stdout','status','setHeader','get','Restart\x20Commencing','No\x20crash\x20files\x20found','generateFileSystem','stderr','post','Took\x20too\x20long\x20to\x20connect.\x20Something\x20must\x20be\x20wrong.','attachment;\x20filename=','download','join','split','socketId','findOneAndUpdate','scan','length','Connected\x20to\x20','Ip\x20address:\x20','/api/admin/wirelessConnections/disconnect','Shut\x20Down\x20Commencing','/etc/wpa_supplicant/wpa_supplicant.conf','country=US\x0a\x0a','/api/admin/wirelessConnections','/api/admin/wirelessSettings','win32','SCANNING','close','readdir','Password','/api/diagnostics/stop','Not\x20configured..','ssid','Disconnected\x20successfully','ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27','etc','SSID','\x20reconfigure','hiddenNetwork','fusion_wifi_access','/etc/hostapd/hostapd.conf','update_config=1\x0a','/api/autonomous','isAuthenticated','/api/autonomousPrograms','Updated\x20successfully','python','fusion_diagnostics_running','wpa_state','username','sudo','Disconnect\x20not\x20available\x20on\x20Windows'];(function(_0x449ce9,_0x495eb6){var _0x3b4937=function(_0x2f208d){while(--_0x2f208d){_0x449ce9['push'](_0x449ce9['shift']());}};_0x3b4937(++_0x495eb6);}(_0x373e,0x114));var _0x4132=function(_0x449ce9,_0x495eb6){_0x449ce9=_0x449ce9-0x0;var _0x3b4937=_0x373e[_0x449ce9];return _0x3b4937;};var fs=require('fs-extra');var mkdirp=require(_0x4132('0x2a'));var os=require('os');var path=require(_0x4132('0xf'));var shell=require('shelljs');var wpa_cli=require(_0x4132('0x2c'));var iwlist=require(_0x4132('0x1c'));var wpa_supplicant=require(_0x4132('0x2b'));var spawn=require('child_process')[_0x4132('0x0')];const config=require(_0x4132('0x76'));const autonomous=require(_0x4132('0x9'));let nicInterface=config[_0x4132('0x34')]('Wifi_NIC');module[_0x4132('0x30')]=function(_0x3f5fe7,_0x2f4511,_0x1d02bd,_0x3a7182,_0x192d2c){_0x3f5fe7[_0x4132('0x39')]('/api/admin/users',_0x39b43b(),function(_0x1d96ef,_0x4417ad){_0x2f4511[_0x4132('0x10')]({'username':_0x1d96ef[_0x4132('0x75')]['username']},async function(_0x2c1912,_0x1e215e){if(_0x2c1912)return _0x4417ad['status'](0x1f4)[_0x4132('0x2f')](_0x2c1912);if(_0x1e215e){return _0x4417ad[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')](_0x4132('0x1d'));}else{var _0x4dd32e=new _0x2f4511(_0x1d96ef[_0x4132('0x75')]);_0x4dd32e[_0x4132('0x63')]=_0x1d96ef[_0x4132('0x75')][_0x4132('0x63')];_0x4dd32e[_0x4132('0x24')]=_0x4dd32e[_0x4132('0x4')](_0x1d96ef[_0x4132('0x75')][_0x4132('0x24')]);_0x4dd32e[_0x4132('0x5')]=await _0x4dd32e[_0x4132('0x37')](_0x4dd32e[_0x4132('0x63')]);_0x4dd32e[_0x4132('0x20')](function(_0x5a453e){if(_0x5a453e)return _0x4417ad[_0x4132('0x32')](0x1f4)['send'](_0x5a453e);return _0x4417ad[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x74')});});}});});_0x3f5fe7['get'](_0x4132('0x29'),function(_0x1b92bf,_0x2a6bb0){_0x2a6bb0['status'](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x46')});var _0xde0cb3=require(_0x4132('0x1e'))[_0x4132('0x0')];var _0x44ae8d=_0xde0cb3(_0x4132('0x64'),['poweroff']);});_0x3f5fe7[_0x4132('0x34')](_0x4132('0x7'),function(_0x496f49,_0x7446db){_0x7446db[_0x4132('0x32')](0xc8)[_0x4132('0x2f')](_0x4132('0x35'));var _0xd04ce4=require('child_process')[_0x4132('0x0')];var _0x1d386e=_0xd04ce4('sudo',['reboot']);});_0x3f5fe7[_0x4132('0x34')]('/api/admin/wirelessSettings',function(_0x247ecc,_0x572282){var _0x877486;var _0x26748f=require('os')[_0x4132('0x22')];var _0x15077f;var _0x36b1dd;var _0x4e4b63={};if(os[_0x4132('0x12')]()==_0x4132('0x4b')){_0x877486='../../etc/config-wap/hostapd.conf__npp.sh';fs['readFile'](_0x877486,_0x4132('0x19'),function(_0x220532,_0x225d22){if(_0x220532)_0x572282['status'](0x1f4)[_0x4132('0x2f')](_0x4132('0x77'));_0x15077f=_0x225d22[_0x4132('0x3e')]('\x0a');for(var _0x3c22d4=0x0;_0x3c22d4<_0x15077f['length'];_0x3c22d4++){_0x36b1dd=_0x15077f[_0x3c22d4][_0x4132('0x3e')]('=');if(_0x36b1dd[0x0]=='ssid')_0x4e4b63[_0x4132('0x56')]=_0x36b1dd[0x1];else if(_0x36b1dd[0x0]==_0x4132('0x8'))_0x4e4b63[_0x4132('0x4f')]=_0x36b1dd[0x1];}_0x572282['status'](0xc8)[_0x4132('0x6e')]({'SSID':_0x4e4b63['SSID'],'Password':_0x4e4b63[_0x4132('0x4f')]});});}else{_0x877486=_0x4132('0x5a');fs[_0x4132('0x72')](_0x877486,_0x4132('0x19'),function(_0x4f5f6e,_0x1257fb){if(_0x4f5f6e)_0x572282[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')](_0x4132('0x77'));_0x15077f=_0x1257fb[_0x4132('0x3e')](_0x26748f);for(var _0x3167b2=0x0;_0x3167b2<_0x15077f[_0x4132('0x42')];_0x3167b2++){_0x36b1dd=_0x15077f[_0x3167b2]['split']('=');if(_0x36b1dd[0x0]=='ssid')_0x4e4b63[_0x4132('0x56')]=_0x36b1dd[0x1];else if(_0x36b1dd[0x0]==_0x4132('0x8'))_0x4e4b63[_0x4132('0x4f')]=_0x36b1dd[0x1];}if(!_0x4e4b63[_0x4132('0x56')]){_0x4e4b63[_0x4132('0x56')]=_0x4132('0x51');_0x4e4b63['Password']='';}_0x572282[_0x4132('0x32')](0xc8)['json']({'SSID':_0x4e4b63[_0x4132('0x56')],'Password':_0x4e4b63[_0x4132('0x4f')]});});}});_0x3f5fe7[_0x4132('0x39')](_0x4132('0x4a'),function(_0x557f45,_0x35e401){try{var _0x3e8a4f;var _0x27459b;var _0x37d260=path[_0x4132('0x3d')]('..','..',_0x4132('0x55'),_0x4132('0x6b'));if(_0x557f45['body'][_0x4132('0x52')]==null&&_0x557f45[_0x4132('0x75')]['password']==null)_0x27459b=[_0x4132('0x60'),_0x37d260,'-d'];else _0x27459b=[_0x4132('0x60'),_0x37d260,'-s',_0x557f45[_0x4132('0x75')][_0x4132('0x52')],'-p',_0x557f45['body'][_0x4132('0x24')]];var _0x32573f=require('child_process')['spawn'];python_process=_0x32573f(_0x4132('0x64'),_0x27459b,{'stdio':_0x4132('0x66')});python_process['stderr']['on'](_0x4132('0x7b'),function(_0x3fb07f){console[_0x4132('0x7a')](String(_0x3fb07f));_0x3e8a4f=String(_0x3fb07f);});python_process[_0x4132('0x31')]['on'](_0x4132('0x4d'),function(_0xf962ff){if(_0x3e8a4f)return _0x35e401['status'](0x1f4)[_0x4132('0x2f')](_0x3e8a4f);else return _0x35e401[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x13')});});}catch(_0x382244){console[_0x4132('0x7a')](_0x382244);return _0x35e401['status'](0x1f4)[_0x4132('0x2f')](_0x382244);}});_0x3f5fe7[_0x4132('0x34')](_0x4132('0x49'),function(_0x4b8f4a,_0x2108c3){if(os['platform']()==_0x4132('0x4b')){return _0x2108c3[_0x4132('0x32')](0xc8)[_0x4132('0x2f')]();}else{iwlist[_0x4132('0x41')](nicInterface,function(_0x3b1225,_0x301f2e){if(_0x3b1225)return _0x2108c3['status'](0x1f4)[_0x4132('0x2f')](_0x4132('0x14'));else return _0x2108c3[_0x4132('0x32')](0xc8)[_0x4132('0x2f')]({'serverMessage':'Retreived\x20wireless\x20connections','data':_0x301f2e});});}});_0x3f5fe7[_0x4132('0x39')](_0x4132('0x49'),function(_0x560de2,_0x471e1f){var _0x84af82=undefined;var _0x534cf3=_0x4132('0x2e')+_0x4132('0x5b')+'country=US\x0a\x0a';var _0x6f89ff=_0x4132('0xd')+_0x4132('0x1')+_0x560de2['body'][_0x4132('0x52')]+'\x22\x0a'+_0x4132('0x6f')+'\x09psk=\x22'+_0x560de2[_0x4132('0x75')]['password']+'\x22\x0a'+_0x4132('0x1b')+'}\x0a\x0a';if(_0x560de2[_0x4132('0x75')]['password']){_0x84af82=shell[_0x4132('0x16')](_0x4132('0x6c')+_0x560de2[_0x4132('0x75')][_0x4132('0x52')]+_0x4132('0x2')+_0x560de2[_0x4132('0x75')][_0x4132('0x24')]+'\x22',{'silent':!![]})[_0x4132('0x31')];}else{_0x84af82=_0x4132('0xd')+_0x4132('0x6d')+_0x560de2[_0x4132('0x75')][_0x4132('0x52')]+'\x22\x0a'+_0x4132('0x79')+'}\x0a';}let _0x2d2a44='';if(_0x560de2[_0x4132('0x75')][_0x4132('0x58')])_0x2d2a44=_0x534cf3+_0x6f89ff;else _0x2d2a44=_0x534cf3+_0x84af82;fs[_0x4132('0x3')](_0x4132('0x47'),_0x2d2a44,function(_0xd64644){if(_0xd64644)return _0x471e1f[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')](_0xd64644);shell[_0x4132('0x16')](_0x4132('0x18')+nicInterface+_0x4132('0x57'),{'silent':!![]});const _0x1463b2=0x3a98;var _0x21ec77=0x12c;var _0x494f7b=0x0;var _0x231e6b=setInterval(function(){var _0x280425=[_0x4132('0x4c'),_0x4132('0x7d'),'AUTHENTICATING','DISCONNECTED',_0x4132('0xb')];wpa_cli['status'](nicInterface,function(_0x130441,_0x281184){if(_0x130441)return _0x471e1f[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')](_0x130441);if(_0x281184[_0x4132('0x62')]==_0x4132('0x69')){if(_0x281184['ip']){console[_0x4132('0x7a')](_0x4132('0x44')+_0x281184['ip']+_0x4132('0x6'));clearInterval(_0x231e6b);_0x192d2c['SocketVariables'][_0x4132('0x59')]=_0x281184;_0x3a7182['sockets'][_0x4132('0x1f')](_0x4132('0x73'),_0x281184);return _0x471e1f['status'](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x43')+_0x560de2[_0x4132('0x75')][_0x4132('0x52')]+_0x4132('0x11')});}else if(_0x494f7b>_0x1463b2){console[_0x4132('0x7a')](_0x4132('0x3a'));clearInterval(_0x231e6b);return _0x471e1f[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')]('Error\x20connecting\x20to\x20'+_0x560de2[_0x4132('0x75')][_0x4132('0x52')]);}_0x494f7b+=_0x21ec77;}else if(_0x280425['indexOf'](_0x281184[_0x4132('0x62')])==-0x1){clearInterval(_0x231e6b);_0x3a7182[_0x4132('0x21')][_0x4132('0x1f')](_0x4132('0x73'),_0x281184);return _0x471e1f[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')]('Error\x20connecting\x20to\x20'+_0x560de2[_0x4132('0x75')][_0x4132('0x52')]);}});},_0x21ec77);});});_0x3f5fe7[_0x4132('0x34')](_0x4132('0x45'),function(_0x56e174,_0x367414){if(os[_0x4132('0x12')]()=='win32'){_0x367414[_0x4132('0x32')](0x1f4)['send'](_0x4132('0x65'));}else{var _0x86354c=_0x4132('0x2e')+'update_config=1\x0a'+_0x4132('0x48');fs[_0x4132('0x3')](_0x4132('0x47'),_0x86354c,function(_0x1e7129){if(_0x1e7129)return _0x367414[_0x4132('0x32')](0x1f4)['send'](_0x1e7129);shell[_0x4132('0x16')](_0x4132('0x18')+nicInterface+_0x4132('0x57'),{'silent':!![]});var _0x10952a=setInterval(function(){var _0x4fc52f=[];wpa_cli[_0x4132('0x32')](nicInterface,function(_0x2474e6,_0x25f92d){if(_0x2474e6)return _0x367414[_0x4132('0x32')](0x1f4)['send'](_0x2474e6);_0x192d2c[_0x4132('0x23')][_0x4132('0x59')]=_0x25f92d;_0x3a7182['sockets']['emit'](_0x4132('0x73'),_0x25f92d);if(_0x25f92d['wpa_state']==_0x4132('0x78')||_0x25f92d['wpa_state']==_0x4132('0x25')){clearInterval(_0x10952a);_0x3a7182[_0x4132('0x21')][_0x4132('0x1f')](_0x4132('0x73'),_0x25f92d);return _0x367414[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x53')});}else if(connectingStatuses['indexOf'](_0x25f92d[_0x4132('0x62')])==-0x1){clearInterval(_0x10952a);_0x3a7182[_0x4132('0x21')][_0x4132('0x1f')](_0x4132('0x73'),_0x25f92d);return _0x367414['status'](0x1f4)[_0x4132('0x2f')](_0x4132('0x27'));}});},0x12c);});}});_0x3f5fe7['get'](_0x4132('0x15'),function(_0x1fbdf5,_0x438738){var _0x4c7866=_0x4132('0x28');fs[_0x4132('0x4e')](_0x4c7866,function(_0x540d17,_0x2fa52f){if(_0x540d17)return _0x438738[_0x4132('0x32')](0x1f4)[_0x4132('0x2f')](_0x540d17);if(_0x2fa52f['length']>0x0){fs[_0x4132('0x72')](_0x4c7866+'/'+_0x2fa52f[0x0],_0x4132('0x19'),function(_0x51954c,_0x5db590){if(_0x51954c)return status(0x1f4)['send']('Error\x20reading\x20crash\x20file');_0x438738[_0x4132('0x33')](_0x4132('0x71'),_0x4132('0x3b')+_0x2fa52f[0x0]);return _0x438738[_0x4132('0x32')](0xc8)[_0x4132('0x3c')](_0x4c7866+'/'+_0x2fa52f[0x0]);});}else{return _0x438738[_0x4132('0x32')](0xc8)[_0x4132('0x2f')](_0x4132('0x36'));}});});var _0x2ddbc7=null;_0x3f5fe7[_0x4132('0x39')](_0x4132('0x68'),function(_0x317a29,_0x10b4ac){if(os[_0x4132('0x12')]()!=_0x4132('0x4b')){_0x2ddbc7=spawn(_0x4132('0x64'),['sh','../../diagnostics/runRemi.sh',_0x4132('0x7c')]);_0x2ddbc7[_0x4132('0x31')]['on'](_0x4132('0x7b'),function(_0x2c5a6b){console[_0x4132('0x7a')](String(_0x2c5a6b));});_0x2ddbc7[_0x4132('0x38')]['on'](_0x4132('0x7b'),function(_0x55392b){console[_0x4132('0x7a')](String(_0x55392b));});var _0x5bae54=0x1;var _0x4acd7d=0x3;var _0x56be86=setInterval(function(){if(_0x5bae54<=_0x4acd7d){var _0x242463=shell[_0x4132('0x16')](_0x4132('0x54'),{'silent':!![]})[_0x4132('0x31')];if(_0x242463){clearInterval(_0x56be86);_0x192d2c[_0x4132('0x23')][_0x4132('0x61')]={'process':_0x242463,'socket':_0x317a29['body'][_0x4132('0x3f')]};_0x3a7182['sockets'][_0x4132('0x1f')](_0x4132('0x67'),_0x192d2c['SocketVariables'][_0x4132('0x61')]);return _0x10b4ac[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0xe')});}else{_0x5bae54++;}}else{clearInterval(_0x56be86);return _0x10b4ac['status'](0x1f4)[_0x4132('0x2f')](_0x4132('0x17'));}},0x12c);}else{return _0x10b4ac['status'](0xc8)[_0x4132('0x6e')]({'serverMessage':'Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows'});}});_0x3f5fe7['get'](_0x4132('0x50'),function(_0x340ff6,_0x144a7f){if(os['platform']()!='win32'){shell[_0x4132('0x16')](_0x4132('0x26'),{'silent':!![]});shell[_0x4132('0x16')](_0x4132('0x54'),{'silent':!![]},function(_0x154483,_0x5bb6a6,_0x4fa815){(function(_0x20a12b){var _0x138eb4=_0x20a12b['trim']();if(_0x138eb4){return _0x144a7f['status'](0x1f4)['send'](_0x4132('0x70'));}else{_0x192d2c[_0x4132('0x23')][_0x4132('0x61')]=null;_0x3a7182[_0x4132('0x21')]['emit'](_0x4132('0x67'),_0x192d2c[_0x4132('0x23')][_0x4132('0x61')]);_0x2ddbc7=null;return _0x144a7f[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x6a')});}}(_0x5bb6a6[_0x4132('0xa')]()));});}else{return _0x144a7f[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':'Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows'});}});_0x3f5fe7['get'](_0x4132('0x5c'),async function(_0x3d4aee,_0x5d3f54){try{const _0x39b4df=await autonomous['findOne']()[_0x4132('0x16')]();return _0x5d3f54[_0x4132('0x6e')](_0x39b4df);}catch(_0x5e92ae){return _0x5d3f54['status'](0x1f4)[_0x4132('0x2f')](error[_0x4132('0xc')]);}});_0x3f5fe7['post'](_0x4132('0x5c'),async function(_0x21f341,_0x59b423){try{const _0x1d7ed2=await autonomous[_0x4132('0x40')]({},_0x21f341['body']);return _0x59b423[_0x4132('0x32')](0xc8)[_0x4132('0x6e')]({'serverMessage':_0x4132('0x5f')});}catch(_0x98f618){return _0x59b423[_0x4132('0x32')](0x1f4)['send'](_0x98f618['message']);}});_0x3f5fe7['post'](_0x4132('0x5e'),async function(_0x586d39,_0x4c9e8f){try{const _0x2a7656=_0x586d39[_0x4132('0x75')]['username'];const _0x4a50c1=_0x586d39[_0x4132('0x75')][_0x4132('0x1a')];const _0x16b343=await fs[_0x4132('0x4e')]('./app/filesystem/'+_0x2a7656+'/'+_0x4a50c1);return _0x4c9e8f[_0x4132('0x32')](0xc8)['json']({'files':_0x16b343});}catch(_0x2d3cbc){return _0x4c9e8f[_0x4132('0x32')](0x1f4)['send'](_0x2d3cbc[_0x4132('0xc')]);}});function _0x39b43b(){return function(_0x1b238b,_0x2de15e,_0x3f23f0){if(_0x1b238b[_0x4132('0x5d')]()){return _0x3f23f0();}else{_0x2de15e['status'](0x191)['send'](_0x4132('0x2d'));}};}};