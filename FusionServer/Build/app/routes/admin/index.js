var _0x3310=['User\x20created!','/api/admin/wirelessConnections','../../socket','../../utils/logger','ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev\x0a','\x09key_mgmt=WPA-PSK\x0a','sockets','hiddenNetwork','pipe','diagnostics_running','exports','username','Shut\x20Down\x20Commencing','ssid_set.py','writeFile','close','body','exec','spawn','Password','\x20\x20\x20\x20ssid=\x22','Wifi\x20file\x20not\x20found','\x09ssid=\x22','setHeader','path','post','Not\x20configured..','readdir','json','Successfully\x20changed\x20wifi\x20settings','\x20reconfigure','wpa_state','ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27','sudo\x20wpa_cli\x20-i\x20','\x20successfully','wpa_passphrase','../../etc/config-wap/hostapd.conf__npp.sh','Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows','data','wpa_passphrase\x20\x22','../../global/fusionSettings','indexOf','status','Error\x20disconnecting','wifi-connection','Error\x20connecting\x20to\x20','Error\x20starting\x20diagnostic\x20tool','filepath','/api/admin/wirelessConnections/disconnect','/api/admin/restart','SSID','\x09scan_ssid=1\x0a','/api/admin/users','/api/autonomous','isAuthenticated','info','../../models/user','../../express','type','length','/etc/hostapd/hostapd.conf','platform','Disconnected\x20successfully','}\x0a\x0a','shelljs','INACTIVE','/etc/wpa_supplicant/wpa_supplicant.conf','.crash','/api/admin/wirelessSettings','stdout','/api/admin/crashReport','trim','Retreived\x20wireless\x20connections','wireless-tools/wpa_cli','Restart\x20Commencing','4WAY_HANDSHAKE','DISCONNECTED','country=US\x0a\x0a','emit','etc','EOL','get','findOne','password','network={\x0a','split','reboot','../../diagnostics/diagnosticGUI.py','wireless-tools/iwlist','Unable\x20to\x20stop\x20diagnostic\x20tool','Connected\x20to\x20','SocketVariables','/api/diagnostics/start','/api/admin/powerOff','win32','Diagnostic\x20tool\x20stopped\x20successfully','sudo','findOneAndUpdate','scan','child_process','Disconnect\x20not\x20available\x20on\x20Windows','download','\x20assigned','User\x20Unauthenticated','attachment;\x20filename=','python','Wireless\x20interface\x20not\x20found','AUTHENTICATING','ssid','./app/filesystem/','COMPLETED','fusion_diagnostics_running','message','Ip\x20address:\x20','No\x20crash\x20files\x20found','generateHash','readFile','../../diagnostics/runRemi.sh','send','utf8','\x09psk=\x22','Username\x20already\x20taken.','socketId'];(function(_0x4a7484,_0x33100a){var _0x150e93=function(_0x5e60f7){while(--_0x5e60f7){_0x4a7484['push'](_0x4a7484['shift']());}};_0x150e93(++_0x33100a);}(_0x3310,0x19d));var _0x150e=function(_0x4a7484,_0x33100a){_0x4a7484=_0x4a7484-0x0;var _0x150e93=_0x3310[_0x4a7484];return _0x150e93;};var fs=require('fs-extra');var mkdirp=require('mkdirp');var os=require('os');var path=require(_0x150e('0x67'));var shell=require(_0x150e('0x14'));var wpa_cli=require(_0x150e('0x1d'));var iwlist=require(_0x150e('0x2c'));var wpa_supplicant=require('wireless-tools/wpa_supplicant');var spawn=require(_0x150e('0x37'))['spawn'];const config=require('config');const autonomous=require('../../models/autonomous');const logger=require(_0x150e('0x52'));let nicInterface=config[_0x150e('0x25')]('Wifi_NIC');const app=require(_0x150e('0xd'));const User=require(_0x150e('0xc'));const io=require(_0x150e('0x51'));const FusionSettings=require(_0x150e('0x77'));module[_0x150e('0x59')]=function(){app[_0x150e('0x68')](_0x150e('0x8'),_0x5c2b89(),function(_0x2f0650,_0x5cb45b){User[_0x150e('0x26')]({'username':_0x2f0650[_0x150e('0x5f')][_0x150e('0x5a')]},async function(_0x51da7b,_0x4ffedf){if(_0x51da7b)return _0x5cb45b[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x51da7b);if(_0x4ffedf){return _0x5cb45b[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x4d'));}else{var _0x3e4ca7=new User(_0x2f0650[_0x150e('0x5f')]);_0x3e4ca7[_0x150e('0x5a')]=_0x2f0650['body'][_0x150e('0x5a')];_0x3e4ca7[_0x150e('0x27')]=_0x3e4ca7[_0x150e('0x47')](_0x2f0650['body'][_0x150e('0x27')]);_0x3e4ca7[_0x150e('0x3')]=await _0x3e4ca7['generateFileSystem'](_0x3e4ca7['username']);_0x3e4ca7['save'](function(_0x2d482d){if(_0x2d482d)return _0x5cb45b[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x2d482d);return _0x5cb45b[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x4f')});});}});});app[_0x150e('0x25')](_0x150e('0x31'),function(_0x5768d8,_0x3e9dfe){_0x3e9dfe[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x5b')});var _0x4f39c1=require(_0x150e('0x37'))['spawn'];var _0x1d02ed=_0x4f39c1(_0x150e('0x34'),['poweroff']);});app[_0x150e('0x25')](_0x150e('0x5'),function(_0x438102,_0x374cce){_0x374cce[_0x150e('0x79')](0xc8)[_0x150e('0x4a')](_0x150e('0x1e'));var _0x360fec=require(_0x150e('0x37'))['spawn'];var _0x30f938=_0x360fec(_0x150e('0x34'),[_0x150e('0x2a')]);});app['get']('/api/admin/wirelessSettings',function(_0x30f110,_0x8d3725){var _0x172138;var _0x1e2ccb=require('os')[_0x150e('0x24')];var _0x3a755b;var _0x72b1ba;var _0xa1d6a6={};if(os[_0x150e('0x11')]()==_0x150e('0x32')){_0x172138=_0x150e('0x73');fs[_0x150e('0x48')](_0x172138,_0x150e('0x4b'),function(_0x9f1a43,_0x4004d5){if(_0x9f1a43)_0x8d3725[_0x150e('0x79')](0x1f4)['send'](_0x150e('0x64'));_0x3a755b=_0x4004d5['split']('\x0a');for(var _0x4127c9=0x0;_0x4127c9<_0x3a755b[_0x150e('0xf')];_0x4127c9++){_0x72b1ba=_0x3a755b[_0x4127c9][_0x150e('0x29')]('=');if(_0x72b1ba[0x0]==_0x150e('0x40'))_0xa1d6a6[_0x150e('0x6')]=_0x72b1ba[0x1];else if(_0x72b1ba[0x0]==_0x150e('0x72'))_0xa1d6a6['Password']=_0x72b1ba[0x1];}_0x8d3725['status'](0xc8)['json']({'SSID':_0xa1d6a6['SSID'],'Password':_0xa1d6a6[_0x150e('0x62')]});});}else{_0x172138=_0x150e('0x10');fs[_0x150e('0x48')](_0x172138,_0x150e('0x4b'),function(_0x3e9555,_0x13ec39){if(_0x3e9555)_0x8d3725[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x64'));_0x3a755b=_0x13ec39[_0x150e('0x29')](_0x1e2ccb);for(var _0xe20e09=0x0;_0xe20e09<_0x3a755b[_0x150e('0xf')];_0xe20e09++){_0x72b1ba=_0x3a755b[_0xe20e09][_0x150e('0x29')]('=');if(_0x72b1ba[0x0]=='ssid')_0xa1d6a6[_0x150e('0x6')]=_0x72b1ba[0x1];else if(_0x72b1ba[0x0]=='wpa_passphrase')_0xa1d6a6[_0x150e('0x62')]=_0x72b1ba[0x1];}if(!_0xa1d6a6[_0x150e('0x6')]){_0xa1d6a6[_0x150e('0x6')]=_0x150e('0x69');_0xa1d6a6[_0x150e('0x62')]='';}_0x8d3725['status'](0xc8)[_0x150e('0x6b')]({'SSID':_0xa1d6a6[_0x150e('0x6')],'Password':_0xa1d6a6[_0x150e('0x62')]});});}});app[_0x150e('0x68')](_0x150e('0x18'),function(_0x31851e,_0x714a5){try{var _0x5320a8;var _0xca21f2;var _0x1d0331=path['join']('..','..',_0x150e('0x23'),_0x150e('0x5c'));if(_0x31851e[_0x150e('0x5f')][_0x150e('0x40')]==null&&_0x31851e['body'][_0x150e('0x27')]==null)_0xca21f2=[_0x150e('0x3d'),_0x1d0331,'-d'];else _0xca21f2=[_0x150e('0x3d'),_0x1d0331,'-s',_0x31851e[_0x150e('0x5f')][_0x150e('0x40')],'-p',_0x31851e[_0x150e('0x5f')][_0x150e('0x27')]];var _0xb0f7a=require(_0x150e('0x37'))[_0x150e('0x61')];python_process=_0xb0f7a('sudo',_0xca21f2,{'stdio':_0x150e('0x57')});python_process['stderr']['on']('data',function(_0x23e12c){logger[_0x150e('0xb')](String(_0x23e12c));_0x5320a8=String(_0x23e12c);});python_process['stdout']['on'](_0x150e('0x5e'),function(_0xe8c0e6){if(_0x5320a8)return _0x714a5[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x5320a8);else return _0x714a5[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x6c')});});}catch(_0x1e4bd0){logger['info'](_0x1e4bd0);return _0x714a5[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x1e4bd0);}});app[_0x150e('0x25')](_0x150e('0x50'),function(_0x5e22d6,_0x4ca23b){if(os[_0x150e('0x11')]()==_0x150e('0x32')){return _0x4ca23b[_0x150e('0x79')](0xc8)[_0x150e('0x4a')]();}else{iwlist[_0x150e('0x36')](nicInterface,function(_0x43439e,_0x3ca932){if(_0x43439e)return _0x4ca23b[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x3e'));else return _0x4ca23b[_0x150e('0x79')](0xc8)[_0x150e('0x4a')]({'serverMessage':_0x150e('0x1c'),'data':_0x3ca932});});}});app[_0x150e('0x68')]('/api/admin/wirelessConnections',function(_0x15803a,_0x175203){var _0x185d8f=undefined;var _0xbf357=_0x150e('0x53')+'update_config=1\x0a'+_0x150e('0x21');var _0x27c9a7=_0x150e('0x28')+_0x150e('0x65')+_0x15803a[_0x150e('0x5f')][_0x150e('0x40')]+'\x22\x0a'+_0x150e('0x7')+_0x150e('0x4c')+_0x15803a[_0x150e('0x5f')][_0x150e('0x27')]+'\x22\x0a'+_0x150e('0x54')+_0x150e('0x13');if(_0x15803a['body'][_0x150e('0x27')]){_0x185d8f=shell[_0x150e('0x60')](_0x150e('0x76')+_0x15803a['body'][_0x150e('0x40')]+'\x22\x20\x22'+_0x15803a[_0x150e('0x5f')][_0x150e('0x27')]+'\x22',{'silent':!![]})[_0x150e('0x19')];}else{_0x185d8f='network={\x0a'+_0x150e('0x63')+_0x15803a[_0x150e('0x5f')]['ssid']+'\x22\x0a'+'\x20\x20\x20\x20key_mgmt=NONE\x0a'+'}\x0a';}let _0x7075a8='';if(_0x15803a[_0x150e('0x5f')][_0x150e('0x56')])_0x7075a8=_0xbf357+_0x27c9a7;else _0x7075a8=_0xbf357+_0x185d8f;fs[_0x150e('0x5d')]('/etc/wpa_supplicant/wpa_supplicant.conf',_0x7075a8,function(_0x9f3f3f){if(_0x9f3f3f)return _0x175203[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x9f3f3f);shell[_0x150e('0x60')](_0x150e('0x70')+nicInterface+_0x150e('0x6d'),{'silent':!![]});const _0x45c2f5=0x3a98;var _0x26c17d=0x12c;var _0x55b587=0x0;var _0x4fa656=setInterval(function(){var _0x13d58c=['SCANNING',_0x150e('0x1f'),_0x150e('0x3f'),_0x150e('0x20'),'ASSOCIATING'];wpa_cli['status'](nicInterface,function(_0x20e993,_0x2ab8c5){if(_0x20e993)return _0x175203['status'](0x1f4)[_0x150e('0x4a')](_0x20e993);if(_0x2ab8c5[_0x150e('0x6e')]==_0x150e('0x42')){if(_0x2ab8c5['ip']){logger['info'](_0x150e('0x45')+_0x2ab8c5['ip']+_0x150e('0x3a'));clearInterval(_0x4fa656);FusionSettings['SocketVariables']['fusion_wifi_access']=_0x2ab8c5;io[_0x150e('0x55')][_0x150e('0x22')]('wifi-connection',_0x2ab8c5);return _0x175203[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x2e')+_0x15803a['body'][_0x150e('0x40')]+_0x150e('0x71')});}else if(_0x55b587>_0x45c2f5){logger['info']('Took\x20too\x20long\x20to\x20connect.\x20Something\x20must\x20be\x20wrong.');clearInterval(_0x4fa656);return _0x175203[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')]('Error\x20connecting\x20to\x20'+_0x15803a[_0x150e('0x5f')][_0x150e('0x40')]);}_0x55b587+=_0x26c17d;}else if(_0x13d58c[_0x150e('0x78')](_0x2ab8c5[_0x150e('0x6e')])==-0x1){clearInterval(_0x4fa656);io[_0x150e('0x55')]['emit'](_0x150e('0x0'),_0x2ab8c5);return _0x175203[_0x150e('0x79')](0x1f4)['send'](_0x150e('0x1')+_0x15803a[_0x150e('0x5f')][_0x150e('0x40')]);}});},_0x26c17d);});});app['get'](_0x150e('0x4'),function(_0x4bcbf8,_0x4e7666){if(os[_0x150e('0x11')]()==_0x150e('0x32')){_0x4e7666['status'](0x1f4)[_0x150e('0x4a')](_0x150e('0x38'));}else{var _0xbee0ee=_0x150e('0x53')+'update_config=1\x0a'+'country=US\x0a\x0a';fs[_0x150e('0x5d')](_0x150e('0x16'),_0xbee0ee,function(_0x369f88){if(_0x369f88)return _0x4e7666[_0x150e('0x79')](0x1f4)['send'](_0x369f88);shell[_0x150e('0x60')]('sudo\x20wpa_cli\x20-i\x20'+nicInterface+_0x150e('0x6d'),{'silent':!![]});var _0xa48fee=setInterval(function(){var _0xd018a3=[];wpa_cli[_0x150e('0x79')](nicInterface,function(_0x5ee516,_0x34797d){if(_0x5ee516)return _0x4e7666[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x5ee516);FusionSettings[_0x150e('0x2f')]['fusion_wifi_access']=_0x34797d;io[_0x150e('0x55')][_0x150e('0x22')](_0x150e('0x0'),_0x34797d);if(_0x34797d[_0x150e('0x6e')]=='DISCONNECTED'||_0x34797d[_0x150e('0x6e')]==_0x150e('0x15')){clearInterval(_0xa48fee);io[_0x150e('0x55')][_0x150e('0x22')]('wifi-connection',_0x34797d);return _0x4e7666['status'](0xc8)['json']({'serverMessage':_0x150e('0x12')});}else if(connectingStatuses[_0x150e('0x78')](_0x34797d[_0x150e('0x6e')])==-0x1){clearInterval(_0xa48fee);io[_0x150e('0x55')]['emit'](_0x150e('0x0'),_0x34797d);return _0x4e7666[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x7a'));}});},0x12c);});}});app['get'](_0x150e('0x1a'),function(_0x2ab5c5,_0x29265d){var _0x424559=_0x150e('0x17');fs[_0x150e('0x6a')](_0x424559,function(_0x2a7200,_0x391e4d){if(_0x2a7200)return _0x29265d[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x2a7200);if(_0x391e4d['length']>0x0){fs[_0x150e('0x48')](_0x424559+'/'+_0x391e4d[0x0],_0x150e('0x4b'),function(_0x37bc01,_0x3838d3){if(_0x37bc01)return status(0x1f4)[_0x150e('0x4a')]('Error\x20reading\x20crash\x20file');_0x29265d[_0x150e('0x66')]('Content-disposition',_0x150e('0x3c')+_0x391e4d[0x0]);return _0x29265d[_0x150e('0x79')](0xc8)[_0x150e('0x39')](_0x424559+'/'+_0x391e4d[0x0]);});}else{return _0x29265d['status'](0xc8)['send'](_0x150e('0x46'));}});});var _0x13badc=null;app['post'](_0x150e('0x30'),function(_0x48e2df,_0x3e8e66){if(os[_0x150e('0x11')]()!='win32'){_0x13badc=spawn(_0x150e('0x34'),['sh',_0x150e('0x49'),_0x150e('0x2b')]);_0x13badc[_0x150e('0x19')]['on']('data',function(_0x2b57cc){logger[_0x150e('0xb')](String(_0x2b57cc));});_0x13badc['stderr']['on'](_0x150e('0x75'),function(_0x2f38ef){logger['info'](String(_0x2f38ef));});var _0x1049a1=0x1;var _0x3ad29c=0x3;var _0x1924e9=setInterval(function(){if(_0x1049a1<=_0x3ad29c){var _0x4fbbb1=shell[_0x150e('0x60')](_0x150e('0x6f'),{'silent':!![]})['stdout'];if(_0x4fbbb1){clearInterval(_0x1924e9);FusionSettings[_0x150e('0x2f')][_0x150e('0x43')]={'process':_0x4fbbb1,'socket':_0x48e2df[_0x150e('0x5f')][_0x150e('0x4e')]};io[_0x150e('0x55')]['emit'](_0x150e('0x58'),FusionSettings['SocketVariables'][_0x150e('0x43')]);return _0x3e8e66[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':'Diagnostic\x20tool\x20started\x20successfully'});}else{_0x1049a1++;}}else{clearInterval(_0x1924e9);return _0x3e8e66[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x2'));}},0x12c);}else{return _0x3e8e66[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x74')});}});app[_0x150e('0x25')]('/api/diagnostics/stop',function(_0x4d60aa,_0x2a762b){if(os['platform']()!=_0x150e('0x32')){shell[_0x150e('0x60')]('sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)',{'silent':!![]});shell['exec'](_0x150e('0x6f'),{'silent':!![]},function(_0x203cb2,_0x1bfaff,_0x31ee63){(function(_0x3929fb){var _0x40fd9a=_0x3929fb[_0x150e('0x1b')]();if(_0x40fd9a){return _0x2a762b[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x150e('0x2d'));}else{FusionSettings[_0x150e('0x2f')][_0x150e('0x43')]=null;io[_0x150e('0x55')][_0x150e('0x22')]('diagnostics_running',FusionSettings['SocketVariables']['fusion_diagnostics_running']);_0x13badc=null;return _0x2a762b[_0x150e('0x79')](0xc8)['json']({'serverMessage':_0x150e('0x33')});}}(_0x1bfaff[_0x150e('0x1b')]()));});}else{return _0x2a762b[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':_0x150e('0x74')});}});app[_0x150e('0x25')](_0x150e('0x9'),async function(_0x420d3a,_0x16b848){try{const _0x49166c=await autonomous[_0x150e('0x26')]()[_0x150e('0x60')]();return _0x16b848[_0x150e('0x6b')](_0x49166c);}catch(_0x35fd9b){return _0x16b848[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](error[_0x150e('0x44')]);}});app[_0x150e('0x68')](_0x150e('0x9'),async function(_0x13e785,_0x1e79d6){try{const _0x5e47dc=await autonomous[_0x150e('0x35')]({},_0x13e785['body']);return _0x1e79d6[_0x150e('0x79')](0xc8)[_0x150e('0x6b')]({'serverMessage':'Updated\x20successfully'});}catch(_0x31a2ff){return _0x1e79d6[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x31a2ff[_0x150e('0x44')]);}});app[_0x150e('0x68')]('/api/autonomousPrograms',async function(_0x3da719,_0x5aaaca){try{const _0x3130fc=_0x3da719[_0x150e('0x5f')][_0x150e('0x5a')];const _0x1d4a77=_0x3da719['body'][_0x150e('0xe')];const _0x2a3def=await fs['readdir'](_0x150e('0x41')+_0x3130fc+'/'+_0x1d4a77);return _0x5aaaca['status'](0xc8)['json']({'files':_0x2a3def});}catch(_0x3c0597){return _0x5aaaca[_0x150e('0x79')](0x1f4)[_0x150e('0x4a')](_0x3c0597['message']);}});function _0x5c2b89(){return function(_0x2db15c,_0x102448,_0x3dbc69){if(_0x2db15c[_0x150e('0xa')]()){return _0x3dbc69();}else{_0x102448['status'](0x191)['send'](_0x150e('0x3b'));}};}}();