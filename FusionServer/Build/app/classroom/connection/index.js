const _0x4975=['Connecting\x20to\x20classroom:\x20','CMMthgilxoBsecure','passphrase','wifiInterface','serial','split','Gateway\x20found\x20at:\x20','Fusion\x20serial\x20number:\x20','Connecting\x20to\x20hidden\x20classroom:\x20','Error\x20accessing\x20network\x20interface:\x20','No\x20fallback\x20network\x20found','fallBackNetwork','shelljs','hiddenPassword','fallbackNetwork',':8443/api/v1/connect/','No\x20more\x20networks\x20to\x20try.\x20Restoring\x20fallback\x20network','substr','message','On\x20hidden\x20network,\x20rechecking\x20community\x20access','Not\x20connected\x20to\x20classroom\x20network','community_access','request-promise','config','connected','exports','Next\x20network\x20is:\x20','wifi','Trying\x20next\x20hidden\x20classroom\x20network','wifiStatus','join','Fallback\x20network\x20found:\x20','status','trim','eth0','stdout','Already\x20connected\x20to\x20classroom\x20network','https://','getmac','warn','MyBot_Gatekeeper_WiFi','connectToNetwork','\x20\x20metric\x27\x20|\x20awk\x20\x27{print\x20$3}\x27','Connecting\x20classroom\x20socket\x20communication','Not\x20part\x20of\x20the\x20classroom\x20community','ssid','length','data','debug','ip\x20route\x20show\x20|\x20grep\x20-i\x20\x27','get','Wifi\x20interface\x20status:\x20','stringify','Wifi_NIC'];(function(_0x673efe,_0x4975bd){const _0x3954f4=function(_0x20b292){while(--_0x20b292){_0x673efe['push'](_0x673efe['shift']());}};_0x3954f4(++_0x4975bd);}(_0x4975,0x7f));const _0x3954=function(_0x673efe,_0x4975bd){_0x673efe=_0x673efe-0x0;let _0x3954f4=_0x4975[_0x673efe];return _0x3954f4;};const config=require(_0x3954('0x4'));const logger=require('../../utils/logger');const rp=require(_0x3954('0x3'));const wpa_cli=require('wireless-tools/wpa_cli');const mac=require(_0x3954('0x13'));const shell=require(_0x3954('0x2f'));const wireless=require('./../../utils/wireless');let classroomConnection={'wifiInterface':config[_0x3954('0x1f')](_0x3954('0x22')),'currentNetwork':0x0,'networks':[{'hiddenSSID':_0x3954('0x15'),'hiddenPassword':_0x3954('0x24')}],'serial':null,'wifiStatus':null,'fallbackNetwork':null};const connection={'connected':![],'connect':async function(){classroomConnection[_0x3954('0x2e')]=await getFallBackNetwork();classroomConnection[_0x3954('0x27')]=await getSerial();classroomConnection[_0x3954('0xa')]=await getWifiStatus();await checkCommunityAccess();}};function getSerial(){return new Promise((_0x3a9a9d,_0x573354)=>{mac['getMac']({'iface':_0x3954('0xf')},function(_0x3e840a,_0x21640c){if(_0x3e840a){return _0x573354(_0x3e840a[_0x3954('0x35')]);}else{let _0x41dc2e=_0x21640c[_0x3954('0x28')](':')[_0x3954('0xb')]('')[_0x3954('0x34')](-0x6);logger[_0x3954('0x1d')](_0x3954('0x2a')+_0x41dc2e);return _0x3a9a9d(_0x41dc2e);}});});};function getWifiStatus(){return new Promise((_0x5b826f,_0x3c6159)=>{wpa_cli[_0x3954('0xd')](classroomConnection[_0x3954('0x26')],function(_0x564edf,_0x2e707b){if(_0x564edf){return _0x3c6159(_0x3954('0x2c')+_0x564edf);}logger[_0x3954('0x1d')](_0x3954('0x20')+JSON[_0x3954('0x21')](_0x2e707b));return _0x5b826f(_0x2e707b);});});};async function checkCommunityAccess(){const _0x8d94c0=_0x3954('0x1e')+classroomConnection[_0x3954('0x26')]+_0x3954('0x17');const _0x4c6b0f=await shell['exec'](_0x8d94c0,{'silent':!![]})[_0x3954('0x10')][_0x3954('0xe')]();logger[_0x3954('0x1d')](_0x3954('0x29')+_0x4c6b0f);let _0x10dd73={'uri':_0x3954('0x12')+_0x4c6b0f+_0x3954('0x32')+classroomConnection[_0x3954('0x27')],'rejectUnauthorized':![],'json':!![],'timeout':0x1388};try{let _0x5c6a43=await rp(_0x10dd73);logger[_0x3954('0x1d')](JSON[_0x3954('0x21')](_0x5c6a43));let _0x4bb109=![];if(_0x5c6a43[_0x3954('0x1c')]){_0x4bb109=_0x5c6a43['data'][_0x3954('0x2')];}if(_0x4bb109){let _0x80fb95={'ssid':_0x5c6a43['wifi'][_0x3954('0x1a')],'passphrase':_0x5c6a43[_0x3954('0x8')][_0x3954('0x25')]};await checkIfOnClassroomNetwork(_0x80fb95);}else{logger['debug'](_0x3954('0x19'));await tryNextClassroomNetwork();}}catch(_0x5b2763){logger[_0x3954('0x14')]('Unable\x20to\x20reach\x20classroom\x20community:\x20'+_0x5b2763);await tryNextClassroomNetwork();}};async function checkIfOnClassroomNetwork(_0x337e1a){if(classroomConnection[_0x3954('0xa')]['ssid']==_0x337e1a[_0x3954('0x1a')]){logger['debug'](_0x3954('0x11'));await connectSockets();}else{logger[_0x3954('0x1d')](_0x3954('0x1'));await connectToClassroomNetwork(_0x337e1a);}};async function connectSockets(){logger[_0x3954('0x1d')](_0x3954('0x18'));await require('../sockets');connection[_0x3954('0x5')]=!![];};async function connectToClassroomNetwork(_0x300617){try{logger['debug'](_0x3954('0x23')+_0x300617[_0x3954('0x1a')]);let _0x2a2a3a={'ssid':_0x300617['ssid'],'password':_0x300617['passphrase'],'hidden':![]};await wireless[_0x3954('0x16')](_0x2a2a3a);await connectSockets();}catch(_0x4d4dcc){logger[_0x3954('0x14')]('Error\x20connecting\x20to\x20classroom\x20network:\x20'+_0x4d4dcc);}};async function getFallBackNetwork(){return new Promise((_0x391469,_0x513cab)=>{let _0x342d16=null;if(_0x342d16){logger['debug']('Storing\x20fallback\x20network');}else{logger['debug']('No\x20fallback\x20network\x20found');}return _0x391469(null);});};async function restoreFallBackNetwork(){logger['debug']('Checking\x20for\x20fallback\x20network');if(classroomConnection[_0x3954('0x31')]){logger[_0x3954('0x1d')](_0x3954('0xc')+classroomConnection[_0x3954('0x31')]);}else{logger[_0x3954('0x1d')](_0x3954('0x2d'));}};async function connectToHiddenClassroomNetwork(_0x4f448d){try{logger['debug'](_0x3954('0x2b')+_0x4f448d['hiddenSSID']);let _0x2c7c07={'ssid':_0x4f448d['hiddenSSID'],'password':_0x4f448d[_0x3954('0x30')],'hidden':!![]};await wireless['connectToNetwork'](_0x2c7c07);logger[_0x3954('0x1d')](_0x3954('0x0'));await checkCommunityAccess();}catch(_0x2182c2){logger['warn'](_0x2182c2);await tryNextClassroomNetwork();}};async function tryNextClassroomNetwork(){logger[_0x3954('0x1d')](_0x3954('0x9'));let _0x583d34=await getNextNetwork();if(_0x583d34){logger[_0x3954('0x1d')](_0x3954('0x7')+_0x583d34['hiddenSSID']);await connectToHiddenClassroomNetwork(_0x583d34);}else{logger[_0x3954('0x1d')](_0x3954('0x33'));await restoreFallBackNetwork();}};async function getNextNetwork(){let _0x36e8b8=null;if(classroomConnection['currentNetwork']<classroomConnection['networks'][_0x3954('0x1b')])_0x36e8b8=classroomConnection['networks'][classroomConnection['currentNetwork']++];return _0x36e8b8;};module[_0x3954('0x6')]=connection;