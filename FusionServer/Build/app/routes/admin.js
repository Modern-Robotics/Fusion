var _0x187c=['child_process','poweroff','/api/admin/restart','Restart\x20Commencing','sudo','reboot','/api/admin/wirelessSettings','EOL','platform','win32','../../etc/hostapd.conf','utf8','length','split','ssid','SSID','wpa_passphrase','Password','join','stderr','data','log','Successfully\x20changed\x20wifi\x20settings','scan','Wireless\x20interface\x20not\x20found','/api/admin/wirelessConnections','\x09scan_ssid=1\x0a','\x09key_mgmt=WPA-PSK\x0a','exec','wpa_passphrase\x20\x22','stdout','network={\x0a','\x20\x20\x20\x20ssid=\x22','\x20\x20\x20\x20key_mgmt=NONE\x0a','hiddenNetwork','writeFile','sudo\x20wpa_cli\x20-i\x20','\x20reconfigure','SCANNING','4WAY_HANDSHAKE','DISCONNECTED','ASSOCIATING','wpa_state','COMPLETED','Ip\x20address:\x20','\x20assigned','SocketVariables','fusion_wifi_access','sockets','\x20successfully','Error\x20connecting\x20to\x20','indexOf','emit','wifi-connection','/api/admin/wirelessConnections/disconnect','ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev\x0a','update_config=1\x0a','country=US\x0a\x0a','/etc/wpa_supplicant/wpa_supplicant.conf','Disconnected\x20successfully','Error\x20disconnecting','/api/admin/crashReport','.crash','readdir','Error\x20reading\x20crash\x20file','download','No\x20crash\x20files\x20found','/api/diagnostics/start','../../diagnostics/runRemi.sh','../../diagnostics/diagnosticGUI.py','ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27','socketId','diagnostics_running','Diagnostic\x20tool\x20started\x20successfully','Error\x20starting\x20diagnostic\x20tool','Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows','/api/diagnostics/stop','sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)','Unable\x20to\x20stop\x20diagnostic\x20tool','fusion_diagnostics_running','Diagnostic\x20tool\x20stopped\x20successfully','trim','User\x20Unauthenticated','mkdirp','wireless-tools/iwlist','spawn','config','get','exports','post','findOne','username','send','status','Username\x20already\x20taken.','body','password','filepath','generateFileSystem','save','json','User\x20created!','/api/admin/powerOff'];(function(_0x241a8c,_0x483454){var _0x518862=function(_0x139eb8){while(--_0x139eb8){_0x241a8c['push'](_0x241a8c['shift']());}};_0x518862(++_0x483454);}(_0x187c,0xba));var _0x4a0f=function(_0xc6f816,_0x320e1c){_0xc6f816=_0xc6f816-0x0;var _0x359f53=_0x187c[_0xc6f816];return _0x359f53;};var fs=require('fs');var mkdirp=require(_0x4a0f('0x0'));var os=require('os');var path=require('path');var shell=require('shelljs');var wpa_cli=require('wireless-tools/wpa_cli');var iwlist=require(_0x4a0f('0x1'));var wpa_supplicant=require('wireless-tools/wpa_supplicant');var spawn=require('child_process')[_0x4a0f('0x2')];const config=require(_0x4a0f('0x3'));let nicInterface=config[_0x4a0f('0x4')]('Wifi_NIC');module[_0x4a0f('0x5')]=function(_0x4718e1,_0x1a196f,_0x164810,_0x47c64f,_0x2e5170){_0x4718e1[_0x4a0f('0x6')]('/api/admin/users',_0x16d31d(),function(_0x3a24f6,_0x3ebeaf){_0x1a196f[_0x4a0f('0x7')]({'username':_0x3a24f6['body'][_0x4a0f('0x8')]},function(_0x1b80ba,_0x5a5c13){if(_0x1b80ba)return _0x3ebeaf['status'](0x1f4)[_0x4a0f('0x9')](_0x1b80ba);if(_0x5a5c13){return _0x3ebeaf[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0xb'));}else{var _0x5761fb=new _0x1a196f(_0x3a24f6['body']);_0x5761fb[_0x4a0f('0x8')]=_0x3a24f6[_0x4a0f('0xc')][_0x4a0f('0x8')];_0x5761fb[_0x4a0f('0xd')]=_0x5761fb['generateHash'](_0x3a24f6[_0x4a0f('0xc')]['password']);_0x5761fb[_0x4a0f('0xe')]=_0x5761fb[_0x4a0f('0xf')](_0x5761fb[_0x4a0f('0x8')]);_0x5761fb[_0x4a0f('0x10')](function(_0x21401e){if(_0x21401e)return _0x3ebeaf['status'](0x1f4)[_0x4a0f('0x9')](_0x21401e);return _0x3ebeaf[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'serverMessage':_0x4a0f('0x12')});});}});});_0x4718e1[_0x4a0f('0x4')](_0x4a0f('0x13'),function(_0x4ef401,_0xbf2563){_0xbf2563[_0x4a0f('0xa')](0xc8)['json']({'serverMessage':'Shut\x20Down\x20Commencing'});var _0x4bd16a=require(_0x4a0f('0x14'))[_0x4a0f('0x2')];var _0xa00990=_0x4bd16a('sudo',[_0x4a0f('0x15')]);});_0x4718e1[_0x4a0f('0x4')](_0x4a0f('0x16'),function(_0x4c3576,_0xd2b919){_0xd2b919[_0x4a0f('0xa')](0xc8)['send'](_0x4a0f('0x17'));var _0x3de0b4=require(_0x4a0f('0x14'))[_0x4a0f('0x2')];var _0x4a91db=_0x3de0b4(_0x4a0f('0x18'),[_0x4a0f('0x19')]);});_0x4718e1['get'](_0x4a0f('0x1a'),function(_0x1145a0,_0x4f1786){var _0x361e77;var _0x4c2c96=require('os')[_0x4a0f('0x1b')];var _0x5db143;var _0xecf1e4;var _0x3e0507={};if(os[_0x4a0f('0x1c')]()==_0x4a0f('0x1d')){_0x361e77=_0x4a0f('0x1e');fs['readFile'](_0x361e77,_0x4a0f('0x1f'),function(_0x3a2cec,_0xd62231){if(_0x3a2cec)_0x4f1786['status'](0x1f4)[_0x4a0f('0x9')]('Wifi\x20file\x20not\x20found');_0x5db143=_0xd62231['split']('\x0a');for(var _0x440956=0x0;_0x440956<_0x5db143[_0x4a0f('0x20')];_0x440956++){_0xecf1e4=_0x5db143[_0x440956][_0x4a0f('0x21')]('=');if(_0xecf1e4[0x0]==_0x4a0f('0x22'))_0x3e0507[_0x4a0f('0x23')]=_0xecf1e4[0x1];else if(_0xecf1e4[0x0]==_0x4a0f('0x24'))_0x3e0507['Password']=_0xecf1e4[0x1];}_0x4f1786[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'SSID':_0x3e0507[_0x4a0f('0x23')],'Password':_0x3e0507['Password']});});}else{_0x361e77='/etc/hostapd/hostapd.conf';fs['readFile'](_0x361e77,_0x4a0f('0x1f'),function(_0x4d83bd,_0x483dc9){if(_0x4d83bd)_0x4f1786[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')]('Wifi\x20file\x20not\x20found');_0x5db143=_0x483dc9[_0x4a0f('0x21')](_0x4c2c96);for(var _0x32adff=0x0;_0x32adff<_0x5db143[_0x4a0f('0x20')];_0x32adff++){_0xecf1e4=_0x5db143[_0x32adff]['split']('=');if(_0xecf1e4[0x0]==_0x4a0f('0x22'))_0x3e0507[_0x4a0f('0x23')]=_0xecf1e4[0x1];else if(_0xecf1e4[0x0]==_0x4a0f('0x24'))_0x3e0507[_0x4a0f('0x25')]=_0xecf1e4[0x1];}_0x4f1786[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'SSID':_0x3e0507['SSID'],'Password':_0x3e0507[_0x4a0f('0x25')]});});}});_0x4718e1[_0x4a0f('0x6')]('/api/admin/wirelessSettings',function(_0x1accb2,_0x5566e9){try{var _0x27819c;var _0x7abbdc;var _0x3a8717=path[_0x4a0f('0x26')]('..','..','etc','ssid_set.py');if(_0x1accb2[_0x4a0f('0xc')][_0x4a0f('0x22')]==null&&_0x1accb2[_0x4a0f('0xc')][_0x4a0f('0xd')]==null)_0x7abbdc=['python',_0x3a8717,'-d'];else _0x7abbdc=['python',_0x3a8717,'-s',_0x1accb2['body']['ssid'],'-p',_0x1accb2[_0x4a0f('0xc')][_0x4a0f('0xd')]];var _0x420bef=require(_0x4a0f('0x14'))[_0x4a0f('0x2')];python_process=_0x420bef('sudo',_0x7abbdc,{'stdio':'pipe'});python_process[_0x4a0f('0x27')]['on'](_0x4a0f('0x28'),function(_0x370e36){console[_0x4a0f('0x29')](String(_0x370e36));_0x27819c=String(_0x370e36);});python_process['stdout']['on']('close',function(_0x4f725b){if(_0x27819c)return _0x5566e9[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x27819c);else return _0x5566e9[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'serverMessage':_0x4a0f('0x2a')});});}catch(_0x624880){console[_0x4a0f('0x29')](_0x624880);return _0x5566e9['status'](0x1f4)[_0x4a0f('0x9')](_0x624880);}});_0x4718e1[_0x4a0f('0x4')]('/api/admin/wirelessConnections',function(_0x15a5b3,_0x276bab){if(os[_0x4a0f('0x1c')]()==_0x4a0f('0x1d')){return _0x276bab[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x9')]();}else{iwlist[_0x4a0f('0x2b')](nicInterface,function(_0x3828ec,_0x309c0a){if(_0x3828ec)return _0x276bab[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x2c'));else return _0x276bab[_0x4a0f('0xa')](0xc8)['send']({'serverMessage':'Retreived\x20wireless\x20connections','data':_0x309c0a});});}});_0x4718e1['post'](_0x4a0f('0x2d'),function(_0x153ade,_0x6a6842){var _0x4ed622=undefined;var _0x58baf3='ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev\x0a'+'update_config=1\x0a'+'country=US\x0a\x0a';var _0x5539c6='network={\x0a'+'\x09ssid=\x22'+_0x153ade[_0x4a0f('0xc')][_0x4a0f('0x22')]+'\x22\x0a'+_0x4a0f('0x2e')+'\x09psk=\x22'+_0x153ade[_0x4a0f('0xc')]['password']+'\x22\x0a'+_0x4a0f('0x2f')+'}\x0a\x0a';if(_0x153ade['body'][_0x4a0f('0xd')]){_0x4ed622=shell[_0x4a0f('0x30')](_0x4a0f('0x31')+_0x153ade['body'][_0x4a0f('0x22')]+'\x22\x20\x22'+_0x153ade[_0x4a0f('0xc')]['password']+'\x22',{'silent':!![]})[_0x4a0f('0x32')];}else{_0x4ed622=_0x4a0f('0x33')+_0x4a0f('0x34')+_0x153ade[_0x4a0f('0xc')][_0x4a0f('0x22')]+'\x22\x0a'+_0x4a0f('0x35')+'}\x0a';}let _0x344aac='';if(_0x153ade[_0x4a0f('0xc')][_0x4a0f('0x36')])_0x344aac=_0x58baf3+_0x5539c6;else _0x344aac=_0x58baf3+_0x4ed622;fs[_0x4a0f('0x37')]('/etc/wpa_supplicant/wpa_supplicant.conf',_0x344aac,function(_0x4490ee){if(_0x4490ee)return _0x6a6842[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4490ee);shell['exec'](_0x4a0f('0x38')+nicInterface+_0x4a0f('0x39'),{'silent':!![]});const _0x1b54fa=0x3a98;var _0x588875=0x12c;var _0x23c213=0x0;var _0x2d2bd9=setInterval(function(){var _0x13cdde=[_0x4a0f('0x3a'),_0x4a0f('0x3b'),'AUTHENTICATING',_0x4a0f('0x3c'),_0x4a0f('0x3d')];wpa_cli[_0x4a0f('0xa')](nicInterface,function(_0x3fa30e,_0x2ec8fc){if(_0x3fa30e)return _0x6a6842['status'](0x1f4)[_0x4a0f('0x9')](_0x3fa30e);if(_0x2ec8fc[_0x4a0f('0x3e')]==_0x4a0f('0x3f')){if(_0x2ec8fc['ip']){console[_0x4a0f('0x29')](_0x4a0f('0x40')+_0x2ec8fc['ip']+_0x4a0f('0x41'));clearInterval(_0x2d2bd9);_0x2e5170[_0x4a0f('0x42')][_0x4a0f('0x43')]=_0x2ec8fc;_0x47c64f[_0x4a0f('0x44')]['emit']('wifi-connection',_0x2ec8fc);return _0x6a6842[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'serverMessage':'Connected\x20to\x20'+_0x153ade[_0x4a0f('0xc')][_0x4a0f('0x22')]+_0x4a0f('0x45')});}else if(_0x23c213>_0x1b54fa){console[_0x4a0f('0x29')]('Took\x20too\x20long\x20to\x20connect.\x20Something\x20must\x20be\x20wrong.');clearInterval(_0x2d2bd9);return _0x6a6842['status'](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x46')+_0x153ade[_0x4a0f('0xc')][_0x4a0f('0x22')]);}_0x23c213+=_0x588875;}else if(_0x13cdde[_0x4a0f('0x47')](_0x2ec8fc[_0x4a0f('0x3e')])==-0x1){clearInterval(_0x2d2bd9);_0x47c64f[_0x4a0f('0x44')][_0x4a0f('0x48')](_0x4a0f('0x49'),_0x2ec8fc);return _0x6a6842[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x46')+_0x153ade[_0x4a0f('0xc')]['ssid']);}});},_0x588875);});});_0x4718e1[_0x4a0f('0x4')](_0x4a0f('0x4a'),function(_0x3f6e57,_0x32e5fb){if(os[_0x4a0f('0x1c')]()==_0x4a0f('0x1d')){_0x32e5fb[_0x4a0f('0xa')](0x1f4)['send']('Disconnect\x20not\x20available\x20on\x20Windows');}else{var _0x55c4e2=_0x4a0f('0x4b')+_0x4a0f('0x4c')+_0x4a0f('0x4d');fs[_0x4a0f('0x37')](_0x4a0f('0x4e'),_0x55c4e2,function(_0x1458e3){if(_0x1458e3)return _0x32e5fb[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x1458e3);shell[_0x4a0f('0x30')](_0x4a0f('0x38')+nicInterface+_0x4a0f('0x39'),{'silent':!![]});var _0x3560b5=setInterval(function(){var _0x1b31f7=[];wpa_cli['status'](nicInterface,function(_0xb11d27,_0xf19e1f){if(_0xb11d27)return _0x32e5fb[_0x4a0f('0xa')](0x1f4)['send'](_0xb11d27);_0x2e5170[_0x4a0f('0x42')][_0x4a0f('0x43')]=_0xf19e1f;_0x47c64f[_0x4a0f('0x44')]['emit'](_0x4a0f('0x49'),_0xf19e1f);if(_0xf19e1f['wpa_state']==_0x4a0f('0x3c')||_0xf19e1f[_0x4a0f('0x3e')]=='INACTIVE'){clearInterval(_0x3560b5);_0x47c64f[_0x4a0f('0x44')]['emit'](_0x4a0f('0x49'),_0xf19e1f);return _0x32e5fb[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'serverMessage':_0x4a0f('0x4f')});}else if(connectingStatuses[_0x4a0f('0x47')](_0xf19e1f['wpa_state'])==-0x1){clearInterval(_0x3560b5);_0x47c64f['sockets'][_0x4a0f('0x48')](_0x4a0f('0x49'),_0xf19e1f);return _0x32e5fb[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x50'));}});},0x12c);});}});_0x4718e1[_0x4a0f('0x4')](_0x4a0f('0x51'),function(_0x28a600,_0x4f2a1b){var _0x37ee50=_0x4a0f('0x52');fs[_0x4a0f('0x53')](_0x37ee50,function(_0x2a0840,_0x259c30){if(_0x2a0840)return _0x4f2a1b[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x2a0840);if(_0x259c30[_0x4a0f('0x20')]>0x0){fs['readFile'](_0x37ee50+'/'+_0x259c30[0x0],'utf8',function(_0x4bd93e,_0x5d900a){if(_0x4bd93e)return status(0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x54'));_0x4f2a1b['setHeader']('Content-disposition','attachment;\x20filename='+_0x259c30[0x0]);return _0x4f2a1b[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x55')](_0x37ee50+'/'+_0x259c30[0x0]);});}else{return _0x4f2a1b['status'](0xc8)[_0x4a0f('0x9')](_0x4a0f('0x56'));}});});var _0x3483a8=null;_0x4718e1[_0x4a0f('0x6')](_0x4a0f('0x57'),function(_0x14d630,_0x1c5977){if(os[_0x4a0f('0x1c')]()!=_0x4a0f('0x1d')){_0x3483a8=spawn('sudo',['sh',_0x4a0f('0x58'),_0x4a0f('0x59')]);_0x3483a8[_0x4a0f('0x32')]['on'](_0x4a0f('0x28'),function(_0x2c2dd0){console['log'](String(_0x2c2dd0));});_0x3483a8[_0x4a0f('0x27')]['on'](_0x4a0f('0x28'),function(_0x38e223){console[_0x4a0f('0x29')](String(_0x38e223));});var _0x11d7b8=0x1;var _0x3043a4=0x3;var _0x26effd=setInterval(function(){if(_0x11d7b8<=_0x3043a4){var _0x122020=shell[_0x4a0f('0x30')](_0x4a0f('0x5a'),{'silent':!![]})['stdout'];if(_0x122020){clearInterval(_0x26effd);_0x2e5170[_0x4a0f('0x42')]['fusion_diagnostics_running']={'process':_0x122020,'socket':_0x14d630['body'][_0x4a0f('0x5b')]};_0x47c64f[_0x4a0f('0x44')][_0x4a0f('0x48')](_0x4a0f('0x5c'),_0x2e5170[_0x4a0f('0x42')]['fusion_diagnostics_running']);return _0x1c5977[_0x4a0f('0xa')](0xc8)['json']({'serverMessage':_0x4a0f('0x5d')});}else{_0x11d7b8++;}}else{clearInterval(_0x26effd);return _0x1c5977[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x5e'));}},0x12c);}else{return _0x1c5977[_0x4a0f('0xa')](0xc8)[_0x4a0f('0x11')]({'serverMessage':_0x4a0f('0x5f')});}});_0x4718e1[_0x4a0f('0x4')](_0x4a0f('0x60'),function(_0x1ed665,_0x16077c){if(os[_0x4a0f('0x1c')]()!=_0x4a0f('0x1d')){shell[_0x4a0f('0x30')](_0x4a0f('0x61'),{'silent':!![]});shell[_0x4a0f('0x30')](_0x4a0f('0x5a'),{'silent':!![]},function(_0x26cccd,_0xa6dcea,_0x28be91){(function(_0x530a97){var _0x302a7c=_0x530a97['trim']();if(_0x302a7c){return _0x16077c[_0x4a0f('0xa')](0x1f4)[_0x4a0f('0x9')](_0x4a0f('0x62'));}else{_0x2e5170[_0x4a0f('0x42')][_0x4a0f('0x63')]=null;_0x47c64f['sockets'][_0x4a0f('0x48')](_0x4a0f('0x5c'),_0x2e5170[_0x4a0f('0x42')][_0x4a0f('0x63')]);_0x3483a8=null;return _0x16077c[_0x4a0f('0xa')](0xc8)['json']({'serverMessage':_0x4a0f('0x64')});}}(_0xa6dcea[_0x4a0f('0x65')]()));});}else{return _0x16077c['status'](0xc8)[_0x4a0f('0x11')]({'serverMessage':_0x4a0f('0x5f')});}});function _0x16d31d(){return function(_0x2968c2,_0x28869c,_0xa42b10){if(_0x2968c2['isAuthenticated']()){return _0xa42b10();}else{_0x28869c['status'](0x191)[_0x4a0f('0x9')](_0x4a0f('0x66'));}};}};