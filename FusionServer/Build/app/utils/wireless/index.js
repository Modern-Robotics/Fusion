const _0x3458=['COMPLETED','win32','password','networkInterface','Invalid\x20SSID\x20or\x20Password','./../logger','config','Wifi_NIC','status','ssid','\x09scan_ssid=','verbose','Connecting\x20to\x20\x22','exec','EOL','writeFile','sudo\x20wpa_cli\x20-i\x20','debug','trim','FAIL','stringify','Failed\x20to\x20connect\x20to\x20','\x09ssid=\x22','\x22\x20using\x20password:\x20\x22','WPA\x20supplicant\x20data:\x20\x0a','network={','get','fs-extra','\x09psk=\x22','Attempts:\x20','ctrl_interface=DIR=/var/run/wpa_supplicant\x20GROUP=netdev','wireless-tools/wpa_cli','wpa_state','hidden','update_config=1','exports','undefined','platform'];(function(_0x5a4cd6,_0x3458de){const _0xc80047=function(_0x2cd551){while(--_0x2cd551){_0x5a4cd6['push'](_0x5a4cd6['shift']());}};_0xc80047(++_0x3458de);}(_0x3458,0x1df));const _0xc800=function(_0x5a4cd6,_0x3458de){_0x5a4cd6=_0x5a4cd6-0x0;let _0xc80047=_0x3458[_0x5a4cd6];return _0xc80047;};const config=require(_0xc800('0x15'));const logger=require(_0xc800('0x14'));const shell=require('shelljs');const fs=require(_0xc800('0x4'));const os=require('os');const wpa_cli=require(_0xc800('0x8'));const wireless={'networkInterface':config[_0xc800('0x3')](_0xc800('0x16')),'connectToNetwork':async function(_0x44371f){if(os[_0xc800('0xe')]()==_0xc800('0x10'))throw'Windows\x20wifi\x20connecting\x20not\x20supported';const _0x3e4e94=_0x44371f[_0xc800('0x18')];const _0x57550b=_0x44371f[_0xc800('0x11')];let _0x447a03=0x0;if(_0x44371f[_0xc800('0xa')]){_0x447a03=0x1;}logger[_0xc800('0x1a')](_0xc800('0x1b')+_0x3e4e94+_0xc800('0x0')+_0x57550b+'\x22');let _0x1617e0='';_0x1617e0+=_0xc800('0x7')+os[_0xc800('0x1d')];_0x1617e0+=_0xc800('0xb')+os[_0xc800('0x1d')];_0x1617e0+='country=US'+os[_0xc800('0x1d')];_0x1617e0+=''+os[_0xc800('0x1d')];_0x1617e0+=_0xc800('0x2')+os[_0xc800('0x1d')];_0x1617e0+=_0xc800('0x25')+_0x3e4e94+'\x22'+os['EOL'];_0x1617e0+=_0xc800('0x19')+_0x447a03+os[_0xc800('0x1d')];_0x1617e0+=_0xc800('0x5')+_0x57550b+'\x22'+os[_0xc800('0x1d')];_0x1617e0+='\x09key_mgmt=WPA-PSK'+os[_0xc800('0x1d')];_0x1617e0+='}';logger[_0xc800('0x20')](_0xc800('0x1')+_0x1617e0);await fs[_0xc800('0x1e')]('/etc/wpa_supplicant/wpa_supplicant.conf',_0x1617e0);let _0x1a5f12=shell[_0xc800('0x1c')](_0xc800('0x1f')+this[_0xc800('0x12')]+'\x20reconfigure',{'silent':!![]})['stdout'];if(_0x1a5f12[_0xc800('0x21')]()==_0xc800('0x22'))throw _0xc800('0x13');let _0x48bdd1=![];let _0x4db70d=null;for(let _0x3754a0=0x0;_0x3754a0<0x3e8;_0x3754a0++){_0x4db70d=await this['getNetworkStatus']();if(_0x4db70d[_0xc800('0x9')]==_0xc800('0xf')&&typeof _0x4db70d['ip']!==_0xc800('0xd')){logger[_0xc800('0x20')](_0xc800('0x6')+_0x3754a0);logger[_0xc800('0x20')](JSON[_0xc800('0x23')](_0x4db70d));_0x48bdd1=!![];break;}}if(_0x48bdd1){logger[_0xc800('0x20')]('Connected\x20to:\x20'+_0x3e4e94);}else{throw _0xc800('0x24')+_0x3e4e94;}},'getNetworkStatus':async function(){return new Promise((_0x2122a,_0x2ec90c)=>{wpa_cli[_0xc800('0x17')](this[_0xc800('0x12')],function(_0x5d39bf,_0x3a9977){if(_0x5d39bf)return _0x2ec90c(_0x5d39bf);return _0x2122a(_0x3a9977);});});}};module[_0xc800('0xc')]=wireless;