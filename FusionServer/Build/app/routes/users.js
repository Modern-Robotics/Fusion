var _0x14a6=['readdir','/home/c3/FusionFilesystem/','mkdir','Error\x20creating\x20classroom\x20file\x20system:\x20','Classroom\x20file\x20system\x20created','Classroom\x20file\x20system\x20found','User\x27s\x20classroom\x20file\x20system\x20created','/Editor/','Error\x20creating\x20user\x27s\x20editor\x20directory:\x20','User\x27s\x20editor\x20directory\x20created','User\x27s\x20editor\x20directory\x20found','/Blockly/','Error\x20creating\x20user\x27s\x20blockly\x20directory:\x20','User\x27s\x20blockly\x20directory\x20created','User\x27s\x20blockly\x20directory\x20found','Editor','Blockly','verbose','filename','Getting\x20data\x20for\x20','push','/Editor','stat','name','/Blockly','debug','Local\x20mtime:\x20','floor','mtimeMs','Remote\x20mtime:\x20','attrs','mtime','Local\x20\x22','\x22\x20newer,\x20updating\x20classroom\x20version','Remote\x20\x22','\x22\x20newer,\x20updating\x20local\x20version','Error:\x20','\x20not\x20a\x20common\x20file!','Local\x20Path:\x20','fastPut','Error\x20uploading\x20file:\x20','Uploaded\x20','filepath','Remote\x20path:\x20','Retrieved\x20','Error\x20creating\x20user\x20file\x20system:\x20','User\x20c3\x20directory\x20created','Error\x20creating\x20editor\x20directory:\x20','Editor\x20directory\x20created','Blockly\x20directory\x20created','Error\x20reading\x20classroom\x20editor\x20files:\x20','Error\x20reading\x20classroom\x20blockly\x20files:\x20','Retrieving\x20files','Moving:\x20','\x20to\x20','Error\x20downloading:\x20',',\x20error:\x20','ssh2','fs-extra','path','request-promise','./../../server/classroom/connection/','winston','exports','get','/api/users','find','Guest','send','json','post','authenticate','local-signup','user','Error','status','MultiUserAccess','body','socketId','User\x20created!','logout','User\x20created\x20but\x20another\x20user\x20is\x20already\x20logged\x20in.','/api/users/:User_Id','findOne','params','toLowerCase','trim','put','User_Id','password','generateHash','firstname','lastname','language','email','defaultprogramminglanguage','securityquestion','securityanswer','usergroup','delete','username','SocketVariables','fusion_program_running','User','KillProgram','removeFileSystem','Successfully\x20deleted','local-login','connected','Login\x20Successful','log','\x20connected\x20to\x20classroom?\x20','Another\x20user\x20is\x20already\x20logged\x20in.','/api/users/cloudLogin','POST','https://172.16.0.1/backend/auth/ldap','exec','login','Error\x20with\x20request\x20promise.\x20','/api/users/logout','local-recovery','/api/allowedUserGroups','Admin','unshift','connectedClients','length','isAuthenticated','info','ready','sftp','Error\x20communicating\x20with\x20c3:\x20','end','stringify','c3edu.online','root'];(function(_0x30198c,_0x4bdd5e){var _0x1f3721=function(_0x1a7dff){while(--_0x1a7dff){_0x30198c['push'](_0x30198c['shift']());}};_0x1f3721(++_0x4bdd5e);}(_0x14a6,0x1ce));var _0xa2d8=function(_0x5ae47c,_0x1fda64){_0x5ae47c=_0x5ae47c-0x0;var _0x5b93c6=_0x14a6[_0x5ae47c];return _0x5b93c6;};var SCP=require('scp2');var SSH=require(_0xa2d8('0x0'))['Client'];var fs=require(_0xa2d8('0x1'));var path=require(_0xa2d8('0x2'));var rp=require(_0xa2d8('0x3'));const classroomConnection=require(_0xa2d8('0x4'));const winston=require(_0xa2d8('0x5'));module[_0xa2d8('0x6')]=function(_0x3495a3,_0x1f233c,_0x10aae1,_0x436550,_0x3e678c,_0x382cbe){_0x3495a3[_0xa2d8('0x7')](_0xa2d8('0x8'),_0x220a40(),function(_0x542cd9,_0x5ae764){_0x1f233c[_0xa2d8('0x9')]({'usergroup':{'$ne':_0xa2d8('0xa')}},function(_0x51c0e8,_0x52895c){if(_0x51c0e8)_0x5ae764[_0xa2d8('0xb')](_0x51c0e8);_0x5ae764[_0xa2d8('0xc')](_0x52895c);});});_0x3495a3[_0xa2d8('0xd')](_0xa2d8('0x8'),_0x10aae1[_0xa2d8('0xe')](_0xa2d8('0xf'),{'session':!![]}),function(_0x305726,_0x109aec){if(_0x305726[_0xa2d8('0x10')][_0xa2d8('0x11')]){return _0x109aec[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')](_0x305726[_0xa2d8('0x10')][_0xa2d8('0x11')]);}else{if(_0x382cbe[_0xa2d8('0x13')]){if(classroomConnection['connected']){_0x1bde02(_0x305726[_0xa2d8('0x10')]);}_0x1a1ecb(_0x305726[_0xa2d8('0x14')][_0xa2d8('0x15')],_0x305726[_0xa2d8('0x10')]);return _0x109aec[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':'User\x20created!','user':_0x305726[_0xa2d8('0x10')]});}else{if(_0x3f1a3f()==0x0){_0x1a1ecb(_0x305726[_0xa2d8('0x14')]['socketId'],_0x305726[_0xa2d8('0x10')]);if(classroomConnection['connected']){_0x1bde02(_0x305726['user']);}return _0x109aec[_0xa2d8('0x12')](0xc8)['json']({'serverMessage':_0xa2d8('0x16'),'user':_0x305726[_0xa2d8('0x10')]});}else{_0x305726[_0xa2d8('0x17')]();return _0x109aec[_0xa2d8('0x12')](0x1f4)['send'](_0xa2d8('0x18'));}}}});_0x3495a3['get'](_0xa2d8('0x19'),_0x220a40(),function(_0x2b08ff,_0x4375e1){_0x1f233c[_0xa2d8('0x1a')]({'username':_0x2b08ff[_0xa2d8('0x1b')]['User_Id'][_0xa2d8('0x1c')]()[_0xa2d8('0x1d')]()},function(_0x1eee9a,_0x301e7e){if(_0x1eee9a)_0x4375e1[_0xa2d8('0xb')](_0x1eee9a);_0x4375e1[_0xa2d8('0xc')](_0x301e7e);});});_0x3495a3[_0xa2d8('0x1e')](_0xa2d8('0x19'),_0x220a40(),function(_0x29dc42,_0x554a96){_0x1f233c[_0xa2d8('0x1a')]({'username':_0x29dc42[_0xa2d8('0x1b')][_0xa2d8('0x1f')][_0xa2d8('0x1c')]()[_0xa2d8('0x1d')]()},function(_0xa20792,_0xa64e92){if(_0xa20792)_0x554a96[_0xa2d8('0xb')](_0xa20792);if(_0x29dc42['body'][_0xa2d8('0x20')]){_0xa64e92[_0xa2d8('0x20')]=_0xa64e92[_0xa2d8('0x21')](_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x20')]);}if(_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x22')]){_0xa64e92[_0xa2d8('0x22')]=_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x22')];}if(_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x23')]){_0xa64e92[_0xa2d8('0x23')]=_0x29dc42['body'][_0xa2d8('0x23')];}if(_0x29dc42[_0xa2d8('0x14')]['language']){_0xa64e92[_0xa2d8('0x24')]=_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x24')];}if(_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x25')]){_0xa64e92['email']=_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x25')];}if(_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x26')]){_0xa64e92[_0xa2d8('0x26')]=_0x29dc42[_0xa2d8('0x14')]['defaultprogramminglanguage'];}if(_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x27')]){_0xa64e92[_0xa2d8('0x27')]=_0x29dc42[_0xa2d8('0x14')][_0xa2d8('0x27')];}if(_0x29dc42['body'][_0xa2d8('0x28')]){_0xa64e92[_0xa2d8('0x28')]=_0x29dc42[_0xa2d8('0x14')]['securityanswer'];}if(_0x29dc42[_0xa2d8('0x14')]['usergroup']){_0xa64e92[_0xa2d8('0x29')]=_0x29dc42['body']['usergroup'];}_0xa64e92['save'](function(_0xa20792){if(_0xa20792)_0x554a96[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')](_0xa20792);_0x554a96[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':'User\x20updated!'});});});});_0x3495a3[_0xa2d8('0x2a')](_0xa2d8('0x19'),_0x220a40(),function(_0x1f3a96,_0xf4a784){if(_0x1f3a96['params'][_0xa2d8('0x1f')]['toLowerCase']()['trim']()==_0x1f3a96[_0xa2d8('0x10')][_0xa2d8('0x2b')]){if(_0x382cbe[_0xa2d8('0x2c')][_0xa2d8('0x2d')])if(_0x382cbe[_0xa2d8('0x2c')]['fusion_program_running'][_0xa2d8('0x2e')]==_0x1f3a96['user'][_0xa2d8('0x2b')])_0x436550[_0xa2d8('0x2f')]();_0x425a24(_0x1f3a96[_0xa2d8('0x10')][_0xa2d8('0x2b')]);_0x1f3a96[_0xa2d8('0x17')]();}_0x1f233c['remove']({'username':_0x1f3a96['params'][_0xa2d8('0x1f')]['toLowerCase']()[_0xa2d8('0x1d')]()},function(_0x23169f,_0x47fac4){if(_0x23169f)return _0xf4a784['send'](_0x23169f);_0x1f233c[_0xa2d8('0x30')](_0x1f3a96['params'][_0xa2d8('0x1f')][_0xa2d8('0x1c')]()[_0xa2d8('0x1d')]());return _0xf4a784[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':_0xa2d8('0x31')});});});_0x3495a3[_0xa2d8('0xd')]('/api/users/login',_0x10aae1['authenticate'](_0xa2d8('0x32'),{'session':!![]}),function(_0x4abfc5,_0x41bfb9){if(_0x382cbe[_0xa2d8('0x13')]){if(classroomConnection[_0xa2d8('0x33')]){_0x1bde02(_0x4abfc5[_0xa2d8('0x10')]);}_0x1a1ecb(_0x4abfc5[_0xa2d8('0x14')]['socketId'],_0x4abfc5[_0xa2d8('0x10')]);return _0x41bfb9[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':_0xa2d8('0x34'),'user':_0x4abfc5[_0xa2d8('0x10')]});}else{if(_0x3f1a3f()==0x0){_0x1a1ecb(_0x4abfc5[_0xa2d8('0x14')][_0xa2d8('0x15')],_0x4abfc5[_0xa2d8('0x10')]);console[_0xa2d8('0x35')]('User:\x20'+_0x4abfc5['user']+_0xa2d8('0x36')+classroomConnection['connected']);if(classroomConnection[_0xa2d8('0x33')]){_0x1bde02(_0x4abfc5[_0xa2d8('0x10')]);}return _0x41bfb9['status'](0xc8)[_0xa2d8('0xc')]({'serverMessage':_0xa2d8('0x34'),'user':_0x4abfc5[_0xa2d8('0x10')]});}else{_0x4abfc5[_0xa2d8('0x17')]();return _0x41bfb9[_0xa2d8('0x12')](0x1f4)['send'](_0xa2d8('0x37'));}}});_0x3495a3['post'](_0xa2d8('0x38'),async function(_0x598618,_0x271549){console[_0xa2d8('0x35')]('in\x20cloud\x20login');var _0xa8483e={'method':_0xa2d8('0x39'),'uri':_0xa2d8('0x3a'),'body':{'username':_0x598618[_0xa2d8('0x14')][_0xa2d8('0x2b')],'password':_0x598618[_0xa2d8('0x14')][_0xa2d8('0x20')]},'json':!![],'rejectUnauthorized':![]};try{let _0x3bad24=await rp(_0xa8483e);let _0x93e56f=await _0x1f233c['findOne']({'username':_0x598618['body'][_0xa2d8('0x2b')]})[_0xa2d8('0x3b')]();if(_0x93e56f){return _0x271549[_0xa2d8('0x12')](0xc8)['send'](_0xa2d8('0x3c'));}else{return _0x271549[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xb')]('create');}}catch(_0x1c32a8){console[_0xa2d8('0x35')](_0xa2d8('0x3d')+_0x1c32a8);return _0x271549[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')](_0x1c32a8);}});_0x3495a3[_0xa2d8('0xd')](_0xa2d8('0x3e'),_0x220a40(),function(_0x1ccdd2,_0x4805f2){if(_0x382cbe[_0xa2d8('0x2c')][_0xa2d8('0x2d')])if(_0x382cbe['SocketVariables'][_0xa2d8('0x2d')][_0xa2d8('0x2e')]==_0x1ccdd2[_0xa2d8('0x10')][_0xa2d8('0x2b')])_0x436550['KillProgram']();_0x505906(_0x1ccdd2[_0xa2d8('0x14')][_0xa2d8('0x15')]);_0x1ccdd2[_0xa2d8('0x17')]();_0x4805f2[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':'Logged\x20out\x20successfully'});});_0x3495a3[_0xa2d8('0x7')]('/api/recovery/:User_Id',function(_0x2b4782,_0x52b59a){_0x1f233c[_0xa2d8('0x1a')]({'username':_0x2b4782['params'][_0xa2d8('0x1f')][_0xa2d8('0x1c')]()[_0xa2d8('0x1d')]()},function(_0x305e4e,_0x348cdd){if(_0x305e4e)return _0x52b59a[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')](_0x305e4e);if(!_0x348cdd)return _0x52b59a[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')]('User\x20does\x20not\x20exist');else return _0x52b59a['status'](0xc8)[_0xa2d8('0xc')](_0x348cdd[_0xa2d8('0x27')]);});});_0x3495a3[_0xa2d8('0xd')]('/api/recovery',_0x10aae1[_0xa2d8('0xe')](_0xa2d8('0x3f'),{'session':!![]}),function(_0x920901,_0x184854){if(_0x382cbe[_0xa2d8('0x13')]){if(classroomConnection[_0xa2d8('0x33')]){_0x1bde02(_0x920901[_0xa2d8('0x10')]);}_0x1a1ecb(_0x920901[_0xa2d8('0x14')][_0xa2d8('0x15')],_0x920901[_0xa2d8('0x10')]);return _0x184854[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':_0xa2d8('0x34'),'user':_0x920901[_0xa2d8('0x10')]});}else{if(_0x3f1a3f()==0x0){_0x1a1ecb(_0x920901[_0xa2d8('0x14')]['socketId'],_0x920901[_0xa2d8('0x10')]);if(classroomConnection[_0xa2d8('0x33')]){_0x1bde02(_0x920901[_0xa2d8('0x10')]);}return _0x184854[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xc')]({'serverMessage':_0xa2d8('0x34'),'user':_0x920901[_0xa2d8('0x10')]});}else{_0x920901[_0xa2d8('0x17')]();return _0x184854[_0xa2d8('0x12')](0x1f4)[_0xa2d8('0xb')]('Another\x20user\x20is\x20already\x20logged\x20in.');}}});_0x3495a3[_0xa2d8('0x7')](_0xa2d8('0x40'),function(_0x24aa08,_0x480246){var _0x44a5c9=[_0xa2d8('0x2e')];_0x1f233c[_0xa2d8('0x1a')]({'usergroup':_0xa2d8('0x41')},function(_0xfea60d,_0x320d87){if(_0xfea60d)return _0x480246['status'](0xc8)[_0xa2d8('0xb')](_0x44a5c9);if(!_0x320d87)_0x44a5c9[_0xa2d8('0x42')](_0xa2d8('0x41'));return _0x480246[_0xa2d8('0x12')](0xc8)[_0xa2d8('0xb')](_0x44a5c9);});});function _0x3f1a3f(){var _0x214f2b=0x0;for(var _0x419b71=0x0;_0x419b71<_0x382cbe['connectedClients']['length'];_0x419b71++){if(_0x382cbe['connectedClients'][_0x419b71][_0xa2d8('0x2e')]){_0x214f2b++;}}return _0x214f2b;}function _0x1a1ecb(_0x2a1e6e,_0x3a04de){for(var _0x16e018=0x0;_0x16e018<_0x382cbe[_0xa2d8('0x43')][_0xa2d8('0x44')];_0x16e018++){if(_0x382cbe[_0xa2d8('0x43')][_0x16e018]['id']==_0x2a1e6e){_0x382cbe[_0xa2d8('0x43')][_0x16e018][_0xa2d8('0x2e')]=_0x3a04de;break;}}}function _0x505906(_0x37e312){for(var _0x4d3b04=0x0;_0x4d3b04<_0x382cbe[_0xa2d8('0x43')][_0xa2d8('0x44')];_0x4d3b04++){if(_0x382cbe[_0xa2d8('0x43')][_0x4d3b04]['id']==_0x37e312){_0x382cbe[_0xa2d8('0x43')][_0x4d3b04][_0xa2d8('0x2e')]=undefined;break;}}}function _0x425a24(_0x1b48a4){for(var _0x33b258=0x0;_0x33b258<_0x382cbe['connectedClients'][_0xa2d8('0x44')];_0x33b258++){if(_0x382cbe['connectedClients'][_0x33b258][_0xa2d8('0x2e')][_0xa2d8('0x2b')]==_0x1b48a4){_0x382cbe[_0xa2d8('0x43')][_0x33b258]['User']=undefined;break;}}}function _0x220a40(){return function(_0x535c01,_0x59cb7b,_0x4e2c45){if(_0x535c01[_0xa2d8('0x45')]()){return _0x4e2c45();}else{_0x59cb7b[_0xa2d8('0x12')](0x191)[_0xa2d8('0xb')]('User\x20Unauthenticated');}};}async function _0x1bde02(_0x2c7081){try{await _0x2a8ec1(_0x2c7081);}catch(_0x125dee){winston['info'](_0x125dee);winston[_0xa2d8('0x46')]('Error\x20downloading\x20classroom\x20files\x20for\x20'+_0x2c7081[_0xa2d8('0x2b')]);}};function _0x2a8ec1(_0x30c8b0){return new Promise(function(_0x5e3d51,_0x317c16){var _0x38d8dd=new SSH();_0x38d8dd['on'](_0xa2d8('0x47'),function(){_0x38d8dd[_0xa2d8('0x48')](async function(_0xd7e808,_0x493adf){if(_0xd7e808){winston[_0xa2d8('0x46')](_0xa2d8('0x49')+_0xd7e808);_0x38d8dd[_0xa2d8('0x4a')]();return _0x317c16(_0xd7e808);}try{await _0x353e61(_0x493adf);await _0x3c910b(_0x493adf,_0x30c8b0['username']);await _0x144095(_0x493adf,_0x30c8b0[_0xa2d8('0x2b')]);await _0x5d5a78(_0x493adf,_0x30c8b0[_0xa2d8('0x2b')]);let _0x344069=await _0x156699(_0x493adf,_0x30c8b0[_0xa2d8('0x2b')]);winston[_0xa2d8('0x46')](JSON[_0xa2d8('0x4b')](_0x344069));let _0x162f85=await _0xfd5692(_0x30c8b0['filepath']);winston['info'](JSON[_0xa2d8('0x4b')](_0x162f85));await _0x21b0be(_0x493adf,_0x30c8b0,_0x344069,_0x162f85);_0x38d8dd[_0xa2d8('0x4a')]();return _0x5e3d51();}catch(_0x2cb340){winston[_0xa2d8('0x46')](_0x2cb340);_0x38d8dd['end']();return _0x317c16(_0x2cb340);}});})['connect']({'host':_0xa2d8('0x4c'),'port':0x16,'username':'c3','password':_0xa2d8('0x4d')});});};function _0x353e61(_0x29e89){return new Promise(function(_0xa20c07,_0x21c927){_0x29e89[_0xa2d8('0x4e')](_0xa2d8('0x4f'),function(_0x2c4ed8){if(_0x2c4ed8){_0x29e89[_0xa2d8('0x50')](_0xa2d8('0x4f'),function(_0x4c701d){if(_0x4c701d){return _0x21c927(_0xa2d8('0x51')+_0x4c701d);}else{winston[_0xa2d8('0x46')](_0xa2d8('0x52'));return _0xa20c07();}});}else{winston[_0xa2d8('0x46')](_0xa2d8('0x53'));return _0xa20c07();}});});};function _0x3c910b(_0xc5002c,_0x500f72){return new Promise(function(_0x45566d,_0x1cd435){_0xc5002c[_0xa2d8('0x4e')]('/home/c3/FusionFilesystem/'+_0x500f72,function(_0x40eb8b){if(_0x40eb8b){_0xc5002c[_0xa2d8('0x50')](_0xa2d8('0x4f')+_0x500f72,function(_0x5ea3e6){if(_0x5ea3e6){return _0x1cd435('Error\x20creating\x20user\x27s\x20classroom\x20file\x20system:\x20'+_0x5ea3e6);}else{winston[_0xa2d8('0x46')](_0xa2d8('0x54'));return _0x45566d();}});}else{winston[_0xa2d8('0x46')]('User\x27s\x20classroom\x20file\x20system\x20found');return _0x45566d();}});});};function _0x144095(_0x39ad65,_0x172e77){return new Promise(function(_0x1acabb,_0x21fdd1){_0x39ad65['readdir'](_0xa2d8('0x4f')+_0x172e77+_0xa2d8('0x55'),function(_0x1cd200){if(_0x1cd200){_0x39ad65[_0xa2d8('0x50')](_0xa2d8('0x4f')+_0x172e77+_0xa2d8('0x55'),function(_0x45dbdd){if(_0x45dbdd){return _0x21fdd1(_0xa2d8('0x56')+_0x45dbdd);}else{winston[_0xa2d8('0x46')](_0xa2d8('0x57'));return _0x1acabb();}});}else{winston['info'](_0xa2d8('0x58'));return _0x1acabb();}});});};function _0x5d5a78(_0x48c0d1,_0x5a8796){return new Promise(function(_0x4608f6,_0x47c719){_0x48c0d1[_0xa2d8('0x4e')](_0xa2d8('0x4f')+_0x5a8796+_0xa2d8('0x59'),function(_0x17094f){if(_0x17094f){_0x48c0d1[_0xa2d8('0x50')](_0xa2d8('0x4f')+_0x5a8796+_0xa2d8('0x59'),function(_0x569a66){if(_0x569a66){return _0x47c719(_0xa2d8('0x5a')+_0x569a66);}else{winston[_0xa2d8('0x46')](_0xa2d8('0x5b'));return _0x4608f6();}});}else{winston[_0xa2d8('0x46')](_0xa2d8('0x5c'));return _0x4608f6();}});});};function _0x156699(_0x3525d6,_0x26e54c){return new Promise(async function(_0x552037,_0x3f75f9){try{let _0x498b52={};_0x498b52[_0xa2d8('0x5d')]=await _0x4da4a5(_0x3525d6,_0x26e54c);_0x498b52[_0xa2d8('0x5e')]=await _0x259557(_0x3525d6,_0x26e54c);return _0x552037(_0x498b52);}catch(_0x3ab8a7){return _0x3f75f9(_0x3ab8a7);}});};function _0x4da4a5(_0x5ce57f,_0x5025a0){return new Promise(function(_0x1b70e8,_0x1e51b5){_0x5ce57f[_0xa2d8('0x4e')](_0xa2d8('0x4f')+_0x5025a0+_0xa2d8('0x55'),function(_0x296875,_0x1ab02c){if(_0x296875)return _0x1e51b5(_0x296875);let _0x173705=[];for(let _0x4f097c=0x0;_0x4f097c<_0x1ab02c[_0xa2d8('0x44')];_0x4f097c++){winston[_0xa2d8('0x5f')]('Getting\x20data\x20for\x20'+_0x1ab02c[_0x4f097c][_0xa2d8('0x60')]);_0x173705['push'](_0x1ab02c[_0x4f097c]);}return _0x1b70e8(_0x173705);});});};function _0x259557(_0x921ad,_0x3a7d23){return new Promise(function(_0x56916b,_0xcc2554){_0x921ad[_0xa2d8('0x4e')](_0xa2d8('0x4f')+_0x3a7d23+'/Blockly/',function(_0x19b622,_0x34a9e9){if(_0x19b622)return _0xcc2554(_0x19b622);let _0x28daa5=[];for(let _0x54ea6f=0x0;_0x54ea6f<_0x34a9e9[_0xa2d8('0x44')];_0x54ea6f++){winston[_0xa2d8('0x5f')](_0xa2d8('0x61')+_0x34a9e9[_0x54ea6f][_0xa2d8('0x60')]);_0x28daa5[_0xa2d8('0x62')](_0x34a9e9[_0x54ea6f]);}return _0x56916b(_0x28daa5);});});};function _0xfd5692(_0x26cd5f){return new Promise(async function(_0x32b0ad,_0x4a1b43){try{let _0x395776={};_0x395776[_0xa2d8('0x5d')]=await _0x44df1c(_0x26cd5f);_0x395776[_0xa2d8('0x5e')]=await _0x233e62(_0x26cd5f);return _0x32b0ad(_0x395776);}catch(_0x507ad6){return _0x4a1b43(_0x507ad6);}});};function _0x44df1c(_0x5e3a61){return new Promise(async function(_0x5cac61,_0x1c394e){try{let _0x3cb60e=[];let _0x35c26e=await fs['readdir'](_0x5e3a61+_0xa2d8('0x63'));for(let _0x4ef2d7=0x0;_0x4ef2d7<_0x35c26e[_0xa2d8('0x44')];_0x4ef2d7++){winston['verbose'](_0xa2d8('0x61')+_0x35c26e[_0x4ef2d7]);let _0x56b97b=await fs[_0xa2d8('0x64')](_0x5e3a61+'/Editor/'+_0x35c26e[_0x4ef2d7]);_0x56b97b[_0xa2d8('0x65')]=_0x35c26e[_0x4ef2d7];_0x3cb60e[_0xa2d8('0x62')](_0x56b97b);}return _0x5cac61(_0x3cb60e);}catch(_0x50d13c){return _0x1c394e(_0x50d13c);}});};function _0x233e62(_0x104e59){return new Promise(async function(_0x5425d2,_0xa7845b){try{let _0x5b9d2b=[];let _0x2157d3=await fs[_0xa2d8('0x4e')](_0x104e59+_0xa2d8('0x66'));for(let _0x5ef13a=0x0;_0x5ef13a<_0x2157d3[_0xa2d8('0x44')];_0x5ef13a++){winston[_0xa2d8('0x5f')](_0xa2d8('0x61')+_0x2157d3[_0x5ef13a]);let _0x2fab2f=await fs[_0xa2d8('0x64')](_0x104e59+'/Blockly/'+_0x2157d3[_0x5ef13a]);_0x2fab2f[_0xa2d8('0x65')]=_0x2157d3[_0x5ef13a];_0x5b9d2b['push'](_0x2fab2f);}return _0x5425d2(_0x5b9d2b);}catch(_0x55b179){return _0xa7845b(_0x55b179);}});};function _0x21b0be(_0x4339cb,_0x48f8c7,_0x2ced40,_0x41cf3c){return new Promise(async function(_0x12e44a,_0x2100e7){try{for(let _0x1d3ba8=0x0;_0x1d3ba8<_0x2ced40[_0xa2d8('0x5d')][_0xa2d8('0x44')];_0x1d3ba8++){let _0xcad04c=![];for(let _0x1ecef5=0x0;_0x1ecef5<_0x41cf3c['Editor']['length'];_0x1ecef5++){if(_0x41cf3c[_0xa2d8('0x5d')][_0x1ecef5][_0xa2d8('0x65')]==_0x2ced40[_0xa2d8('0x5d')][_0x1d3ba8][_0xa2d8('0x60')]){winston[_0xa2d8('0x67')](_0xa2d8('0x68')+Math[_0xa2d8('0x69')](_0x41cf3c['Editor'][_0x1ecef5][_0xa2d8('0x6a')]/0x3e8));winston['debug'](_0xa2d8('0x6b')+_0x2ced40['Editor'][_0x1d3ba8][_0xa2d8('0x6c')][_0xa2d8('0x6d')]);if(Math[_0xa2d8('0x69')](_0x41cf3c[_0xa2d8('0x5d')][_0x1ecef5][_0xa2d8('0x6a')]/0x3e8)>_0x2ced40[_0xa2d8('0x5d')][_0x1d3ba8][_0xa2d8('0x6c')][_0xa2d8('0x6d')]){_0xcad04c=!![];winston[_0xa2d8('0x5f')](_0xa2d8('0x6e')+_0x41cf3c[_0xa2d8('0x5d')][_0x1ecef5][_0xa2d8('0x65')]+_0xa2d8('0x6f'));try{await _0x4b5a79(_0x4339cb,_0x48f8c7,_0x2ced40[_0xa2d8('0x5d')][_0x1d3ba8][_0xa2d8('0x60')],_0xa2d8('0x5d'));}catch(_0x179866){return _0x2100e7(_0x179866);}break;}else{_0xcad04c=!![];winston[_0xa2d8('0x5f')](_0xa2d8('0x70')+_0x41cf3c[_0xa2d8('0x5d')][_0x1ecef5][_0xa2d8('0x65')]+_0xa2d8('0x71'));try{await _0xfb4ba(_0x4339cb,_0x48f8c7,_0x2ced40[_0xa2d8('0x5d')][_0x1d3ba8][_0xa2d8('0x60')],'Editor');}catch(_0x23a058){winston['debug'](_0xa2d8('0x72')+_0x23a058);return _0x2100e7(_0x23a058);}break;}}}if(!_0xcad04c){winston[_0xa2d8('0x5f')](_0x2ced40['Editor'][_0x1d3ba8][_0xa2d8('0x60')]+_0xa2d8('0x73'));try{await _0xfb4ba(_0x4339cb,_0x48f8c7,_0x2ced40[_0xa2d8('0x5d')][_0x1d3ba8]['filename'],_0xa2d8('0x5d'));}catch(_0x37b96f){return _0x2100e7(_0x37b96f);}}}for(let _0x6ce8d3=0x0;_0x6ce8d3<_0x2ced40[_0xa2d8('0x5e')]['length'];_0x6ce8d3++){let _0xcad04c=![];for(let _0x1ecef5=0x0;_0x1ecef5<_0x41cf3c[_0xa2d8('0x5e')]['length'];_0x1ecef5++){if(_0x41cf3c[_0xa2d8('0x5e')][_0x1ecef5]['name']==_0x2ced40[_0xa2d8('0x5e')][_0x6ce8d3][_0xa2d8('0x60')]){winston['debug'](_0xa2d8('0x68')+Math['floor'](_0x41cf3c[_0xa2d8('0x5e')][_0x1ecef5][_0xa2d8('0x6a')]/0x3e8));winston['debug']('Remote\x20mtime:\x20'+_0x2ced40[_0xa2d8('0x5e')][_0x6ce8d3][_0xa2d8('0x6c')]['mtime']);if(Math[_0xa2d8('0x69')](_0x41cf3c[_0xa2d8('0x5e')][_0x1ecef5][_0xa2d8('0x6a')]/0x3e8)>_0x2ced40['Blockly'][_0x6ce8d3][_0xa2d8('0x6c')]['mtime']){_0xcad04c=!![];winston[_0xa2d8('0x5f')](_0xa2d8('0x6e')+_0x41cf3c['Blockly'][_0x1ecef5][_0xa2d8('0x65')]+_0xa2d8('0x6f'));try{await _0x4b5a79(_0x4339cb,_0x48f8c7,_0x2ced40[_0xa2d8('0x5e')][_0x6ce8d3]['filename'],_0xa2d8('0x5e'));}catch(_0x308dd8){return _0x2100e7(_0x308dd8);}break;}else{_0xcad04c=!![];winston['verbose'](_0xa2d8('0x70')+_0x41cf3c[_0xa2d8('0x5e')][_0x1ecef5][_0xa2d8('0x65')]+_0xa2d8('0x71'));try{await _0xfb4ba(_0x4339cb,_0x48f8c7,_0x2ced40['Blockly'][_0x6ce8d3][_0xa2d8('0x60')],_0xa2d8('0x5e'));}catch(_0x3f61fa){winston['debug'](_0xa2d8('0x72')+_0x3f61fa);return _0x2100e7(_0x3f61fa);}break;}}}if(!_0xcad04c){winston[_0xa2d8('0x5f')](_0x2ced40[_0xa2d8('0x5e')][_0x6ce8d3]['filename']+_0xa2d8('0x73'));try{await _0xfb4ba(_0x4339cb,_0x48f8c7,_0x2ced40[_0xa2d8('0x5e')][_0x6ce8d3][_0xa2d8('0x60')],_0xa2d8('0x5e'));}catch(_0x13646b){return _0x2100e7(_0x13646b);}}}return _0x12e44a();}catch(_0xc11479){return _0x2100e7(_0xc11479);}});};function _0x4b5a79(_0xa0631f,_0x246f58,_0x14b659,_0x4b97dd){return new Promise((_0x4e2bde,_0x1f895d)=>{try{let _0x5e1665=_0xa2d8('0x4f')+_0x246f58[_0xa2d8('0x2b')]+'/'+_0x4b97dd+'/'+_0x14b659;let _0x1df748=_0x246f58['filepath']+'/'+_0x4b97dd+'/'+_0x14b659;winston['verbose']('Remote\x20path:\x20'+_0x5e1665);winston[_0xa2d8('0x5f')](_0xa2d8('0x74')+_0x1df748);_0xa0631f[_0xa2d8('0x75')](_0x1df748,_0x5e1665,{},function(_0x493bfa){if(_0x493bfa){winston[_0xa2d8('0x67')](_0xa2d8('0x76')+_0x14b659);return _0x1f895d(_0x493bfa);}winston[_0xa2d8('0x46')](_0xa2d8('0x77')+_0x14b659);return _0x4e2bde();});}catch(_0x1ccf54){return _0x1f895d(_0x1ccf54);}});};function _0xfb4ba(_0x3aa8f8,_0x3401cd,_0x202a2a,_0x40e4d1){return new Promise((_0x3580c3,_0xb60a86)=>{try{let _0x4676f9='/home/c3/FusionFilesystem/'+_0x3401cd[_0xa2d8('0x2b')]+'/'+_0x40e4d1+'/'+_0x202a2a;let _0x9fe81e=_0x3401cd[_0xa2d8('0x78')]+'/'+_0x40e4d1+'/'+_0x202a2a;winston[_0xa2d8('0x5f')](_0xa2d8('0x79')+_0x4676f9);winston[_0xa2d8('0x5f')](_0xa2d8('0x74')+_0x9fe81e);_0x3aa8f8['fastGet'](_0x4676f9,_0x9fe81e,{},function(_0x15b785){if(_0x15b785){winston[_0xa2d8('0x67')]('Error\x20downloading\x20file:\x20'+_0x202a2a);return _0xb60a86(_0x15b785);}winston[_0xa2d8('0x46')](_0xa2d8('0x7a')+_0x202a2a);return _0x3580c3();});}catch(_0x5f1fd){return _0xb60a86(_0x5f1fd);}});};function _0x44509f(_0x5dc174,_0x538608,_0x1bef61,_0x126ff4){_0x5dc174[_0xa2d8('0x4e')](_0xa2d8('0x4f')+_0x538608[_0xa2d8('0x2b')],function(_0x39da28){if(_0x39da28){console[_0xa2d8('0x35')]('Error\x20reading\x20user\x20file\x20system:\x20'+_0x39da28);_0x5dc174[_0xa2d8('0x50')](_0xa2d8('0x4f')+_0x538608[_0xa2d8('0x2b')],function(_0x1b840a){if(_0x1b840a){console[_0xa2d8('0x35')](_0xa2d8('0x7b')+_0x1b840a);throw _0x1b840a;}console[_0xa2d8('0x35')](_0xa2d8('0x7c'));_0x5dc174['mkdir'](_0xa2d8('0x4f')+_0x538608[_0xa2d8('0x2b')]+_0xa2d8('0x55'),function(_0x4707ef){if(_0x4707ef){console['log'](_0xa2d8('0x7d')+_0x4707ef);throw _0x4707ef;}console['log'](_0xa2d8('0x7e'));_0x5dc174['mkdir']('/home/c3/FusionFilesystem/'+_0x538608[_0xa2d8('0x2b')]+'/Blockly/',function(_0x5cd5a1){if(_0x5cd5a1){console[_0xa2d8('0x35')]('Error\x20creating\x20blockly\x20directory:\x20'+_0x5cd5a1);throw _0x5cd5a1;}console[_0xa2d8('0x35')](_0xa2d8('0x7f'));_0x126ff4(_0x5dc174,_0x538608,_0x1bef61);});});});}_0x126ff4(_0x5dc174,_0x538608,_0x1bef61);});};function _0x166d88(_0x4f55f6,_0x4bd562,_0x324ef4){_0x4f55f6['readdir'](_0xa2d8('0x4f')+_0x4bd562[_0xa2d8('0x2b')]+'/Editor/',function(_0x24a522,_0x1dfdad){if(_0x24a522){console[_0xa2d8('0x35')](_0xa2d8('0x80')+_0x24a522);throw _0x24a522;}_0x5e82d3(_0x4bd562,_0xa2d8('0x5d'),_0x1dfdad,_0x324ef4);});_0x4f55f6['readdir']('/home/c3/FusionFilesystem/'+_0x4bd562[_0xa2d8('0x2b')]+_0xa2d8('0x59'),function(_0x55f401,_0x13f9c6){if(_0x55f401){console[_0xa2d8('0x35')](_0xa2d8('0x81')+_0x55f401);throw _0x55f401;}_0x5e82d3(_0x4bd562,'Blockly',_0x13f9c6,_0x324ef4);});};function _0x5e82d3(_0xf0def8,_0x5d6ba4,_0x49e5a9,_0x7f9165){console[_0xa2d8('0x35')](_0xa2d8('0x82'));if(_0x5d6ba4==_0xa2d8('0x5e')&&_0x49e5a9[_0xa2d8('0x44')]==0x0){_0x7f9165[_0xa2d8('0x4a')]();}for(var _0x493de6=0x0;_0x493de6<_0x49e5a9[_0xa2d8('0x44')];_0x493de6++){let _0x17aa15=_0xa2d8('0x4f')+_0xf0def8['username']+'/'+_0x5d6ba4+'/'+_0x49e5a9[_0x493de6][_0xa2d8('0x60')];let _0x1f9a4d='app/filesystem/'+_0xf0def8[_0xa2d8('0x2b')]+'/'+_0x5d6ba4+'/';console[_0xa2d8('0x35')](_0xa2d8('0x83')+_0x17aa15+_0xa2d8('0x84')+_0x1f9a4d);SCP['scp']('c3:root@172.16.0.1:'+_0x17aa15,_0x1f9a4d,function(_0x4cf499){if(_0x4cf499){console[_0xa2d8('0x35')](_0xa2d8('0x85')+_0x17aa15+_0xa2d8('0x86')+_0x4cf499);}if(_0x5d6ba4=='Blockly'&&(_0x493de6=_0x49e5a9[_0xa2d8('0x44')]-0x1)){_0x7f9165[_0xa2d8('0x4a')]();}});}};};