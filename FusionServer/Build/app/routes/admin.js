var _0x41dc=['\x20reconfigure','INACTIVE','Disconnected\x20successfully','.crash','readdir','Error\x20reading\x20crash\x20file','setHeader','download','No\x20crash\x20files\x20found','/api/diagnostics/start','../../diagnostics/runRemi.sh','../../diagnostics/diagnosticGUI.py','ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27','fusion_diagnostics_running','socketId','diagnostics_running','Diagnostic\x20tool\x20started\x20successfully','sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)','trim','Unable\x20to\x20stop\x20diagnostic\x20tool','Diagnostic\x20tool\x20stopped\x20successfully','Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows','message','/api/autonomous','findOneAndUpdate','type','./app/filesystem/','isAuthenticated','User\x20Unauthenticated','fs-extra','wireless-tools/wpa_cli','wireless-tools/iwlist','wireless-tools/wpa_supplicant','child_process','spawn','config','./../models/autonomous','get','Wifi_NIC','exports','post','/api/admin/users','findOne','body','username','send','status','Username\x20already\x20taken.','password','generateHash','generateFileSystem','json','User\x20created!','/api/admin/powerOff','Shut\x20Down\x20Commencing','sudo','poweroff','/api/admin/restart','Restart\x20Commencing','reboot','/api/admin/wirelessSettings','EOL','win32','../../etc/config-wap/hostapd.conf__npp.sh','readFile','utf8','length','wpa_passphrase','Password','/etc/hostapd/hostapd.conf','Wifi\x20file\x20not\x20found','split','ssid','SSID','join','etc','ssid_set.py','python','pipe','stderr','data','log','stdout','close','Successfully\x20changed\x20wifi\x20settings','/api/admin/wirelessConnections','platform','scan','Wireless\x20interface\x20not\x20found','Retreived\x20wireless\x20connections','ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev\x0a','update_config=1\x0a','country=US\x0a\x0a','network={\x0a','\x09ssid=\x22','}\x0a\x0a','\x22\x20\x22','\x20\x20\x20\x20ssid=\x22','\x20\x20\x20\x20key_mgmt=NONE\x0a','writeFile','/etc/wpa_supplicant/wpa_supplicant.conf','sudo\x20wpa_cli\x20-i\x20','SCANNING','4WAY_HANDSHAKE','AUTHENTICATING','DISCONNECTED','ASSOCIATING','wpa_state','COMPLETED','Ip\x20address:\x20','\x20assigned','SocketVariables','fusion_wifi_access','sockets','emit','wifi-connection','Connected\x20to\x20','\x20successfully','Took\x20too\x20long\x20to\x20connect.\x20Something\x20must\x20be\x20wrong.','Error\x20connecting\x20to\x20','indexOf','/api/admin/wirelessConnections/disconnect','Disconnect\x20not\x20available\x20on\x20Windows','exec'];(function(_0x947009,_0x57d5ab){var _0x3b9ea5=function(_0x4312c8){while(--_0x4312c8){_0x947009['push'](_0x947009['shift']());}};_0x3b9ea5(++_0x57d5ab);}(_0x41dc,0x191));var _0xcfd2=function(_0x947009,_0x57d5ab){_0x947009=_0x947009-0x0;var _0x3b9ea5=_0x41dc[_0x947009];return _0x3b9ea5;};var fs=require(_0xcfd2('0x0'));var mkdirp=require('mkdirp');var os=require('os');var path=require('path');var shell=require('shelljs');var wpa_cli=require(_0xcfd2('0x1'));var iwlist=require(_0xcfd2('0x2'));var wpa_supplicant=require(_0xcfd2('0x3'));var spawn=require(_0xcfd2('0x4'))[_0xcfd2('0x5')];const config=require(_0xcfd2('0x6'));const autonomous=require(_0xcfd2('0x7'));let nicInterface=config[_0xcfd2('0x8')](_0xcfd2('0x9'));module[_0xcfd2('0xa')]=function(_0x256707,_0x292654,_0x1bd7a6,_0x155bfd,_0x55b8d7){_0x256707[_0xcfd2('0xb')](_0xcfd2('0xc'),_0xe542f6(),function(_0x5427c1,_0x5c121b){_0x292654[_0xcfd2('0xd')]({'username':_0x5427c1[_0xcfd2('0xe')][_0xcfd2('0xf')]},async function(_0x27219c,_0x540661){if(_0x27219c)return _0x5c121b['status'](0x1f4)[_0xcfd2('0x10')](_0x27219c);if(_0x540661){return _0x5c121b[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x12'));}else{var _0x54047c=new _0x292654(_0x5427c1[_0xcfd2('0xe')]);_0x54047c['username']=_0x5427c1['body'][_0xcfd2('0xf')];_0x54047c[_0xcfd2('0x13')]=_0x54047c[_0xcfd2('0x14')](_0x5427c1[_0xcfd2('0xe')][_0xcfd2('0x13')]);_0x54047c['filepath']=await _0x54047c[_0xcfd2('0x15')](_0x54047c[_0xcfd2('0xf')]);_0x54047c['save'](function(_0x114d5f){if(_0x114d5f)return _0x5c121b['status'](0x1f4)['send'](_0x114d5f);return _0x5c121b['status'](0xc8)[_0xcfd2('0x16')]({'serverMessage':_0xcfd2('0x17')});});}});});_0x256707['get'](_0xcfd2('0x18'),function(_0x31160c,_0xa8c348){_0xa8c348[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x16')]({'serverMessage':_0xcfd2('0x19')});var _0x556f99=require(_0xcfd2('0x4'))['spawn'];var _0x50ddfb=_0x556f99(_0xcfd2('0x1a'),[_0xcfd2('0x1b')]);});_0x256707['get'](_0xcfd2('0x1c'),function(_0x1af34d,_0x25943c){_0x25943c[_0xcfd2('0x11')](0xc8)['send'](_0xcfd2('0x1d'));var _0x361a18=require(_0xcfd2('0x4'))[_0xcfd2('0x5')];var _0x5d84e0=_0x361a18(_0xcfd2('0x1a'),[_0xcfd2('0x1e')]);});_0x256707[_0xcfd2('0x8')](_0xcfd2('0x1f'),function(_0xb97b43,_0x1d92a6){var _0x5d0388;var _0x120f92=require('os')[_0xcfd2('0x20')];var _0x24d62b;var _0x588d66;var _0xdbd534={};if(os['platform']()==_0xcfd2('0x21')){_0x5d0388=_0xcfd2('0x22');fs[_0xcfd2('0x23')](_0x5d0388,_0xcfd2('0x24'),function(_0x4466af,_0xaf4c91){if(_0x4466af)_0x1d92a6[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')]('Wifi\x20file\x20not\x20found');_0x24d62b=_0xaf4c91['split']('\x0a');for(var _0x476d9d=0x0;_0x476d9d<_0x24d62b[_0xcfd2('0x25')];_0x476d9d++){_0x588d66=_0x24d62b[_0x476d9d]['split']('=');if(_0x588d66[0x0]=='ssid')_0xdbd534['SSID']=_0x588d66[0x1];else if(_0x588d66[0x0]==_0xcfd2('0x26'))_0xdbd534[_0xcfd2('0x27')]=_0x588d66[0x1];}_0x1d92a6[_0xcfd2('0x11')](0xc8)['json']({'SSID':_0xdbd534['SSID'],'Password':_0xdbd534[_0xcfd2('0x27')]});});}else{_0x5d0388=_0xcfd2('0x28');fs[_0xcfd2('0x23')](_0x5d0388,_0xcfd2('0x24'),function(_0x2808dc,_0x2ef094){if(_0x2808dc)_0x1d92a6[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x29'));_0x24d62b=_0x2ef094[_0xcfd2('0x2a')](_0x120f92);for(var _0x58e0bc=0x0;_0x58e0bc<_0x24d62b['length'];_0x58e0bc++){_0x588d66=_0x24d62b[_0x58e0bc]['split']('=');if(_0x588d66[0x0]==_0xcfd2('0x2b'))_0xdbd534[_0xcfd2('0x2c')]=_0x588d66[0x1];else if(_0x588d66[0x0]==_0xcfd2('0x26'))_0xdbd534[_0xcfd2('0x27')]=_0x588d66[0x1];}if(!_0xdbd534['SSID']){_0xdbd534['SSID']='Not\x20configured..';_0xdbd534['Password']='';}_0x1d92a6[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x16')]({'SSID':_0xdbd534[_0xcfd2('0x2c')],'Password':_0xdbd534[_0xcfd2('0x27')]});});}});_0x256707['post'](_0xcfd2('0x1f'),function(_0x4a0b4c,_0x5a6807){try{var _0x4b2654;var _0x5ebfca;var _0x220665=path[_0xcfd2('0x2d')]('..','..',_0xcfd2('0x2e'),_0xcfd2('0x2f'));if(_0x4a0b4c['body'][_0xcfd2('0x2b')]==null&&_0x4a0b4c[_0xcfd2('0xe')][_0xcfd2('0x13')]==null)_0x5ebfca=[_0xcfd2('0x30'),_0x220665,'-d'];else _0x5ebfca=[_0xcfd2('0x30'),_0x220665,'-s',_0x4a0b4c['body'][_0xcfd2('0x2b')],'-p',_0x4a0b4c['body'][_0xcfd2('0x13')]];var _0x1e2064=require(_0xcfd2('0x4'))[_0xcfd2('0x5')];python_process=_0x1e2064(_0xcfd2('0x1a'),_0x5ebfca,{'stdio':_0xcfd2('0x31')});python_process[_0xcfd2('0x32')]['on'](_0xcfd2('0x33'),function(_0xcf15c0){console[_0xcfd2('0x34')](String(_0xcf15c0));_0x4b2654=String(_0xcf15c0);});python_process[_0xcfd2('0x35')]['on'](_0xcfd2('0x36'),function(_0x1abe36){if(_0x4b2654)return _0x5a6807[_0xcfd2('0x11')](0x1f4)['send'](_0x4b2654);else return _0x5a6807[_0xcfd2('0x11')](0xc8)['json']({'serverMessage':_0xcfd2('0x37')});});}catch(_0x22a69a){console[_0xcfd2('0x34')](_0x22a69a);return _0x5a6807[_0xcfd2('0x11')](0x1f4)['send'](_0x22a69a);}});_0x256707['get'](_0xcfd2('0x38'),function(_0x2c6f23,_0x282a43){if(os[_0xcfd2('0x39')]()==_0xcfd2('0x21')){return _0x282a43[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x10')]();}else{iwlist[_0xcfd2('0x3a')](nicInterface,function(_0x339d4d,_0x85712e){if(_0x339d4d)return _0x282a43[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x3b'));else return _0x282a43[_0xcfd2('0x11')](0xc8)['send']({'serverMessage':_0xcfd2('0x3c'),'data':_0x85712e});});}});_0x256707['post'](_0xcfd2('0x38'),function(_0x15ac76,_0x183cd5){var _0xdedc5d=undefined;var _0x42e770=_0xcfd2('0x3d')+_0xcfd2('0x3e')+_0xcfd2('0x3f');var _0x369ce5=_0xcfd2('0x40')+_0xcfd2('0x41')+_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x2b')]+'\x22\x0a'+'\x09scan_ssid=1\x0a'+'\x09psk=\x22'+_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x13')]+'\x22\x0a'+'\x09key_mgmt=WPA-PSK\x0a'+_0xcfd2('0x42');if(_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x13')]){_0xdedc5d=shell['exec']('wpa_passphrase\x20\x22'+_0x15ac76[_0xcfd2('0xe')]['ssid']+_0xcfd2('0x43')+_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x13')]+'\x22',{'silent':!![]})['stdout'];}else{_0xdedc5d='network={\x0a'+_0xcfd2('0x44')+_0x15ac76['body'][_0xcfd2('0x2b')]+'\x22\x0a'+_0xcfd2('0x45')+'}\x0a';}let _0x1ed5fc='';if(_0x15ac76[_0xcfd2('0xe')]['hiddenNetwork'])_0x1ed5fc=_0x42e770+_0x369ce5;else _0x1ed5fc=_0x42e770+_0xdedc5d;fs[_0xcfd2('0x46')](_0xcfd2('0x47'),_0x1ed5fc,function(_0x2793fc){if(_0x2793fc)return _0x183cd5[_0xcfd2('0x11')](0x1f4)['send'](_0x2793fc);shell['exec'](_0xcfd2('0x48')+nicInterface+'\x20reconfigure',{'silent':!![]});const _0x186b2a=0x3a98;var _0x170cfa=0x12c;var _0x3d5676=0x0;var _0x4d5da3=setInterval(function(){var _0x1e706f=[_0xcfd2('0x49'),_0xcfd2('0x4a'),_0xcfd2('0x4b'),_0xcfd2('0x4c'),_0xcfd2('0x4d')];wpa_cli[_0xcfd2('0x11')](nicInterface,function(_0x581a8a,_0x268b30){if(_0x581a8a)return _0x183cd5['status'](0x1f4)[_0xcfd2('0x10')](_0x581a8a);if(_0x268b30[_0xcfd2('0x4e')]==_0xcfd2('0x4f')){if(_0x268b30['ip']){console[_0xcfd2('0x34')](_0xcfd2('0x50')+_0x268b30['ip']+_0xcfd2('0x51'));clearInterval(_0x4d5da3);_0x55b8d7[_0xcfd2('0x52')][_0xcfd2('0x53')]=_0x268b30;_0x155bfd[_0xcfd2('0x54')][_0xcfd2('0x55')](_0xcfd2('0x56'),_0x268b30);return _0x183cd5[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x16')]({'serverMessage':_0xcfd2('0x57')+_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x2b')]+_0xcfd2('0x58')});}else if(_0x3d5676>_0x186b2a){console['log'](_0xcfd2('0x59'));clearInterval(_0x4d5da3);return _0x183cd5[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x5a')+_0x15ac76[_0xcfd2('0xe')][_0xcfd2('0x2b')]);}_0x3d5676+=_0x170cfa;}else if(_0x1e706f[_0xcfd2('0x5b')](_0x268b30['wpa_state'])==-0x1){clearInterval(_0x4d5da3);_0x155bfd[_0xcfd2('0x54')][_0xcfd2('0x55')](_0xcfd2('0x56'),_0x268b30);return _0x183cd5[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x5a')+_0x15ac76['body'][_0xcfd2('0x2b')]);}});},_0x170cfa);});});_0x256707[_0xcfd2('0x8')](_0xcfd2('0x5c'),function(_0x13d86c,_0x1e6fbb){if(os[_0xcfd2('0x39')]()==_0xcfd2('0x21')){_0x1e6fbb[_0xcfd2('0x11')](0x1f4)['send'](_0xcfd2('0x5d'));}else{var _0x2ea1c8=_0xcfd2('0x3d')+'update_config=1\x0a'+_0xcfd2('0x3f');fs['writeFile'](_0xcfd2('0x47'),_0x2ea1c8,function(_0x2e278d){if(_0x2e278d)return _0x1e6fbb[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0x2e278d);shell[_0xcfd2('0x5e')](_0xcfd2('0x48')+nicInterface+_0xcfd2('0x5f'),{'silent':!![]});var _0x3f91d8=setInterval(function(){var _0x5cf10b=[];wpa_cli[_0xcfd2('0x11')](nicInterface,function(_0x492eb4,_0x2f31d6){if(_0x492eb4)return _0x1e6fbb[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0x492eb4);_0x55b8d7[_0xcfd2('0x52')]['fusion_wifi_access']=_0x2f31d6;_0x155bfd['sockets']['emit'](_0xcfd2('0x56'),_0x2f31d6);if(_0x2f31d6[_0xcfd2('0x4e')]==_0xcfd2('0x4c')||_0x2f31d6[_0xcfd2('0x4e')]==_0xcfd2('0x60')){clearInterval(_0x3f91d8);_0x155bfd[_0xcfd2('0x54')]['emit'](_0xcfd2('0x56'),_0x2f31d6);return _0x1e6fbb['status'](0xc8)['json']({'serverMessage':_0xcfd2('0x61')});}else if(connectingStatuses[_0xcfd2('0x5b')](_0x2f31d6[_0xcfd2('0x4e')])==-0x1){clearInterval(_0x3f91d8);_0x155bfd['sockets'][_0xcfd2('0x55')]('wifi-connection',_0x2f31d6);return _0x1e6fbb['status'](0x1f4)[_0xcfd2('0x10')]('Error\x20disconnecting');}});},0x12c);});}});_0x256707[_0xcfd2('0x8')]('/api/admin/crashReport',function(_0x40c037,_0x9f8f97){var _0x35c5cd=_0xcfd2('0x62');fs[_0xcfd2('0x63')](_0x35c5cd,function(_0x46a4dc,_0x174276){if(_0x46a4dc)return _0x9f8f97[_0xcfd2('0x11')](0x1f4)['send'](_0x46a4dc);if(_0x174276[_0xcfd2('0x25')]>0x0){fs[_0xcfd2('0x23')](_0x35c5cd+'/'+_0x174276[0x0],'utf8',function(_0x224235,_0x136f75){if(_0x224235)return status(0x1f4)[_0xcfd2('0x10')](_0xcfd2('0x64'));_0x9f8f97[_0xcfd2('0x65')]('Content-disposition','attachment;\x20filename='+_0x174276[0x0]);return _0x9f8f97[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x66')](_0x35c5cd+'/'+_0x174276[0x0]);});}else{return _0x9f8f97[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x10')](_0xcfd2('0x67'));}});});var _0x14046d=null;_0x256707[_0xcfd2('0xb')](_0xcfd2('0x68'),function(_0x1f303e,_0x491df5){if(os[_0xcfd2('0x39')]()!='win32'){_0x14046d=spawn('sudo',['sh',_0xcfd2('0x69'),_0xcfd2('0x6a')]);_0x14046d[_0xcfd2('0x35')]['on']('data',function(_0x5244b4){console[_0xcfd2('0x34')](String(_0x5244b4));});_0x14046d[_0xcfd2('0x32')]['on'](_0xcfd2('0x33'),function(_0x3bd9cf){console['log'](String(_0x3bd9cf));});var _0xc9fd56=0x1;var _0x370721=0x3;var _0x6f6247=setInterval(function(){if(_0xc9fd56<=_0x370721){var _0x1db67b=shell[_0xcfd2('0x5e')](_0xcfd2('0x6b'),{'silent':!![]})['stdout'];if(_0x1db67b){clearInterval(_0x6f6247);_0x55b8d7[_0xcfd2('0x52')][_0xcfd2('0x6c')]={'process':_0x1db67b,'socket':_0x1f303e[_0xcfd2('0xe')][_0xcfd2('0x6d')]};_0x155bfd[_0xcfd2('0x54')][_0xcfd2('0x55')](_0xcfd2('0x6e'),_0x55b8d7[_0xcfd2('0x52')][_0xcfd2('0x6c')]);return _0x491df5[_0xcfd2('0x11')](0xc8)['json']({'serverMessage':_0xcfd2('0x6f')});}else{_0xc9fd56++;}}else{clearInterval(_0x6f6247);return _0x491df5[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')]('Error\x20starting\x20diagnostic\x20tool');}},0x12c);}else{return _0x491df5[_0xcfd2('0x11')](0xc8)['json']({'serverMessage':'Diagnostic\x20tool\x20does\x20not\x20run\x20on\x20windows'});}});_0x256707['get']('/api/diagnostics/stop',function(_0x84f593,_0x47db0b){if(os[_0xcfd2('0x39')]()!='win32'){shell[_0xcfd2('0x5e')](_0xcfd2('0x70'),{'silent':!![]});shell['exec'](_0xcfd2('0x6b'),{'silent':!![]},function(_0x56a282,_0x2c3026,_0x271854){(function(_0x3d09bc){var _0x1acf0d=_0x3d09bc[_0xcfd2('0x71')]();if(_0x1acf0d){return _0x47db0b[_0xcfd2('0x11')](0x1f4)['send'](_0xcfd2('0x72'));}else{_0x55b8d7['SocketVariables'][_0xcfd2('0x6c')]=null;_0x155bfd[_0xcfd2('0x54')][_0xcfd2('0x55')](_0xcfd2('0x6e'),_0x55b8d7[_0xcfd2('0x52')]['fusion_diagnostics_running']);_0x14046d=null;return _0x47db0b[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x16')]({'serverMessage':_0xcfd2('0x73')});}}(_0x2c3026[_0xcfd2('0x71')]()));});}else{return _0x47db0b['status'](0xc8)[_0xcfd2('0x16')]({'serverMessage':_0xcfd2('0x74')});}});_0x256707[_0xcfd2('0x8')]('/api/autonomous',async function(_0x4d6d47,_0x58b2ed){try{const _0x47fd73=await autonomous['findOne']()[_0xcfd2('0x5e')]();return _0x58b2ed[_0xcfd2('0x16')](_0x47fd73);}catch(_0x2b4472){return _0x58b2ed[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](error[_0xcfd2('0x75')]);}});_0x256707[_0xcfd2('0xb')](_0xcfd2('0x76'),async function(_0x229daa,_0x169e82){try{const _0x3a077c=await autonomous[_0xcfd2('0x77')]({},_0x229daa['body']);return _0x169e82[_0xcfd2('0x11')](0xc8)['json']({'serverMessage':'Updated\x20successfully'});}catch(_0x58a5a5){return _0x169e82[_0xcfd2('0x11')](0x1f4)[_0xcfd2('0x10')](_0x58a5a5['message']);}});_0x256707[_0xcfd2('0xb')]('/api/autonomousPrograms',async function(_0xdec65,_0x48f010){try{const _0x4e8750=_0xdec65['body']['username'];const _0x25fb02=_0xdec65[_0xcfd2('0xe')][_0xcfd2('0x78')];const _0x3f36bf=await fs['readdir'](_0xcfd2('0x79')+_0x4e8750+'/'+_0x25fb02);return _0x48f010[_0xcfd2('0x11')](0xc8)[_0xcfd2('0x16')]({'files':_0x3f36bf});}catch(_0x1a8577){return _0x48f010['status'](0x1f4)[_0xcfd2('0x10')](_0x1a8577['message']);}});function _0xe542f6(){return function(_0x66838d,_0x3629dd,_0x2e7377){if(_0x66838d[_0xcfd2('0x7a')]()){return _0x2e7377();}else{_0x3629dd[_0xcfd2('0x11')](0x191)[_0xcfd2('0x10')](_0xcfd2('0x7b'));}};}};