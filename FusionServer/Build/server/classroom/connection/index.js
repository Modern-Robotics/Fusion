var _0x1ae7=['hiddenPassword','serverMessage','Connecting\x20to\x20classroom\x20network','Error\x20connecting\x20to\x20classroom\x20network','status','Updated\x20ip\x20address!','Can\x20reach\x20community','winston','request-promise','wireless-tools/wpa_cli','config','get','Wifi_NIC','c3online.edu','c3online.edu/backend','https://10.200.200.1','MyBot_Gatekeeper_WiFi','CMMthgilxoBsecure','attemptConnection','./../../../config/serial','partOfCommunity','Current\x20network:\x20','wifi','ssid','passphrase','./../sockets/','connected','info','wifiInterface','Error\x20accessing\x20wifi\x20dongle','Wireless\x20dongle\x20detected','globalUrl',':8443/api/v1/connect/','message','Fusion\x20not\x20part\x20of\x20community','Fusion\x20is\x20part\x20of\x20community','Fusion\x20not\x20part\x20of\x20this\x20community','Could\x20not\x20access\x20classroom\x20environment','Connecting\x20to\x20hidden\x20network','POST','http://localhost:8080/api/admin/wirelessConnections','hiddenSSID'];(function(_0x303898,_0x1a633a){var _0x542c15=function(_0x1576d4){while(--_0x1576d4){_0x303898['push'](_0x303898['shift']());}};_0x542c15(++_0x1a633a);}(_0x1ae7,0x181));var _0x2b22=function(_0x2319b7,_0x444804){_0x2319b7=_0x2319b7-0x0;var _0x50eeef=_0x1ae7[_0x2319b7];return _0x50eeef;};const winston=require(_0x2b22('0x0'));const rp=require(_0x2b22('0x1'));const wpa_cli=require(_0x2b22('0x2'));const config=require(_0x2b22('0x3'));const settings={'wifiInterface':config[_0x2b22('0x4')](_0x2b22('0x5'))};const classroomConnection={'url':_0x2b22('0x6'),'classroomBackend':_0x2b22('0x7'),'classroomAPI':'c3online.edu:8443','globalUrl':_0x2b22('0x8'),'connected':![],'hiddenSSID':_0x2b22('0x9'),'hiddenPassword':_0x2b22('0xa')};classroomConnection[_0x2b22('0xb')]=function(){return new Promise(async function(_0x1ccedc,_0x20e645){try{const _0x1f7a84=await require(_0x2b22('0xc'));const _0x295140=_0x1f7a84['serialId'];await checkHasWirelessDongle();let _0x40c87b=await communityReachable();if(!_0x40c87b)await connectToHiddenClassroomNetwork();let _0x1fe925=await determineCommunityAccess(_0x295140);if(_0x1fe925[_0x2b22('0xd')]){let _0x223a34=await getConnectedNetworkName();winston['info'](_0x2b22('0xe')+_0x223a34);if(_0x223a34!=_0x1fe925[_0x2b22('0xf')]['ssid'])await connectToClassroomNetwork(_0x1fe925['wifi'][_0x2b22('0x10')],_0x1fe925[_0x2b22('0xf')][_0x2b22('0x11')]);await updateIPAddress(_0x295140);await require(_0x2b22('0x12'));classroomConnection[_0x2b22('0x13')]=!![];}return _0x1ccedc();}catch(_0x5229ee){winston[_0x2b22('0x14')](_0x5229ee);return _0x1ccedc();}});};function checkHasWirelessDongle(){return new Promise(function(_0x12823b,_0x56e91a){wpa_cli['status'](settings[_0x2b22('0x15')],function(_0x91a090,_0x33c767){if(_0x91a090){return _0x56e91a(_0x2b22('0x16'));}winston[_0x2b22('0x14')](_0x2b22('0x17'));return _0x12823b('Wifi\x20dongle\x20found');});});};function determineCommunityAccess(_0x1b3b88){return new Promise(async function(_0x1903c6,_0x316f7d){let _0x102b4d={'uri':classroomConnection[_0x2b22('0x18')]+_0x2b22('0x19')+_0x1b3b88,'rejectUnauthorized':![],'json':!![],'timeout':0x2710};try{let _0x480ec3=await rp(_0x102b4d);if(_0x480ec3[_0x2b22('0x1a')]!=_0x2b22('0x1b')){_0x480ec3[_0x2b22('0xd')]=!![];winston['info'](_0x2b22('0x1c'));}else{_0x480ec3[_0x2b22('0xd')]=![];winston[_0x2b22('0x14')](_0x2b22('0x1d'));}return _0x1903c6(_0x480ec3);}catch(_0x568e43){return _0x316f7d(_0x2b22('0x1e'));}});};function connectToHiddenClassroomNetwork(){return new Promise(async function(_0x37cb2b,_0x585551){try{winston[_0x2b22('0x14')](_0x2b22('0x1f'));let _0x3fee87={'method':_0x2b22('0x20'),'uri':_0x2b22('0x21'),'body':{'ssid':classroomConnection[_0x2b22('0x22')],'password':classroomConnection[_0x2b22('0x23')],'hiddenNetwork':!![]},'json':!![]};let _0x1b5f6a=await rp(_0x3fee87);winston['info'](_0x1b5f6a[_0x2b22('0x24')]);return _0x37cb2b(_0x1b5f6a);}catch(_0x443e53){winston[_0x2b22('0x14')]('Error\x20connecting\x20to\x20hidden\x20network');winston[_0x2b22('0x14')](_0x443e53);return _0x585551(_0x443e53);}});};function connectToClassroomNetwork(_0x2bc4ec,_0x5bb30b){return new Promise(async function(_0x5d725e,_0x81bd77){try{winston[_0x2b22('0x14')](_0x2b22('0x25'));let _0x3e2893={'method':_0x2b22('0x20'),'uri':'http://localhost:8080/api/admin/wirelessConnections','body':{'ssid':_0x2bc4ec,'password':_0x5bb30b},'json':!![]};let _0x3947d4=await rp(_0x3e2893);winston[_0x2b22('0x14')](_0x3947d4[_0x2b22('0x24')]);return _0x5d725e(_0x3947d4);}catch(_0x243397){winston['info'](_0x2b22('0x26'));winston['info'](_0x243397);return _0x81bd77(_0x243397);}});};function getConnectedNetworkName(){return new Promise(function(_0x812699,_0x26afbe){wpa_cli[_0x2b22('0x27')](settings[_0x2b22('0x15')],function(_0x495ac4,_0x537da9){if(_0x495ac4)return _0x26afbe(_0x495ac4);return _0x812699(_0x537da9['ssid']);});});};function updateIPAddress(_0x114995){return new Promise(async function(_0x40b34d,_0x1fd1e9){let _0x4d09f4={'uri':classroomConnection[_0x2b22('0x18')]+':8443/api/v1/connect/'+_0x114995,'rejectUnauthorized':![],'json':!![],'resolveWithFullResponse':!![],'timeout':0x2710};try{let _0x33acc8=await rp(_0x4d09f4);winston['info'](_0x2b22('0x28'));return _0x40b34d(_0x33acc8);}catch(_0x31d32b){winston['info']('Failed\x20to\x20update\x20ip\x20address');return _0x1fd1e9(_0x31d32b);}});};function communityReachable(){return new Promise(async function(_0x497471,_0x30d5d9){try{let _0x3bc4dc={'uri':classroomConnection['globalUrl'],'rejectUnauthorized':![],'json':!![],'timeout':0x2710};await rp(_0x3bc4dc);winston[_0x2b22('0x14')](_0x2b22('0x29'));return _0x497471(!![]);}catch(_0x49cf6e){winston[_0x2b22('0x14')]('Community\x20unreachable');return _0x497471(![]);}});};module['exports']=classroomConnection;