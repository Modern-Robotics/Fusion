var _0x18e4=['COPY_FOLDER','max','MOVE_FILE','oldFilename','newFilename','normalize','rename','Error\x20moving\x20file','File\x20moved','Access\x20to\x20location\x20denied','MOVE_FOLDER','Error\x20moving\x20folder','Folder\x20moved','RENAME_FILE','Error\x20renaming\x20file','File\x20renamed','RENAME_FOLDER','Error\x20renaming\x20folder','Folder\x20renamed','in\x20here\x20else...','/api/files/download','param','parse','from','base64','toString','ascii','download','zip','error','send','message','.zip','pipe','split','readdir','digest','text','state','constructor','icon','isAuthenticated','User\x20Unauthenticated','exports','directory-tree','fs-extra','rimraf','moment','path','route','/api/files','get','user','filepath','status','json','body','operation','GET','directory','substr','username','length','type','children','size','\x20kb','md5','update','hex','indexOf','push','then','stat','app/filesystem/','log','name','date','mtime','format','MM/DD/YY\x20\x20h:mm:ss\x20A','CREATE_FILE','writeFile','replace','filename','\x20created','CREATE_FOLDER','mkdir','unlink','File\x20deleted','Error\x20deleting\x20folder','DELETE_MULTI','resolve','file','Error\x20deleting\x20file\x20','All\x20files\x20deleted','Error\x20deleting\x20folder\x20','COPY_FILE','lastIndexOf','copy','File\x20copied','Error\x20generating\x20filename'];(function(_0x5ceb8f,_0x5d4b3b){var _0x23d84a=function(_0x1db61b){while(--_0x1db61b){_0x5ceb8f['push'](_0x5ceb8f['shift']());}};_0x23d84a(++_0x5d4b3b);}(_0x18e4,0x15d));var _0x5837=function(_0x4266f9,_0x39242c){_0x4266f9=_0x4266f9-0x0;var _0x2911b5=_0x18e4[_0x4266f9];return _0x2911b5;};module[_0x5837('0x0')]=function(_0x57a9eb){var _0x3b47b8=require(_0x5837('0x1'));var _0x56d7f2=require('fs');var _0x27352a=require(_0x5837('0x2'));var _0x346a2c=require(_0x5837('0x3'));var _0x164696=require('crypto');var _0x4c87ec=require('archiver');var _0x25a0d5=require(_0x5837('0x4'));var _0x36e778=require(_0x5837('0x5'));_0x57a9eb[_0x5837('0x6')](_0x5837('0x7'),_0x289fea())[_0x5837('0x8')](function(_0x57702b,_0x4d5c4b){var _0x5c8faa=_0x3b47b8(_0x57702b[_0x5837('0x9')][_0x5837('0xa')],{});_0x3162ab(_0x5c8faa,_0x57702b);return _0x4d5c4b[_0x5837('0xb')](0xc8)[_0x5837('0xc')]([_0x5c8faa]);})['post'](function(_0x5ea611,_0x1a67f3){var _0x254f7b=_0x5ea611[_0x5837('0xd')][_0x5837('0xe')];if(_0x254f7b==_0x5837('0xf')){var _0x5c324f=[];var _0x522290=_0x3b47b8(_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+(_0x5ea611[_0x5837('0xd')]['directory']?'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x10')][_0x5837('0x11')](_0x5ea611['user'][_0x5837('0x12')][_0x5837('0x13')]):''),{});if(_0x522290)if(_0x522290[_0x5837('0x14')]=='directory'){for(var _0x19ea43=0x0;_0x19ea43<_0x522290[_0x5837('0x15')][_0x5837('0x13')];_0x19ea43++){if(_0x522290[_0x5837('0x15')][_0x19ea43][_0x5837('0x15')])if(_0x522290[_0x5837('0x15')][_0x19ea43]['children'][_0x5837('0x13')]>0x0)_0x522290[_0x5837('0x15')][_0x19ea43][_0x5837('0x15')]=[];_0x522290[_0x5837('0x15')][_0x19ea43][_0x5837('0x16')]=_0x522290[_0x5837('0x15')][_0x19ea43]['size']+_0x5837('0x17');_0x522290['children'][_0x19ea43]['id']=_0x164696['createHash'](_0x5837('0x18'))[_0x5837('0x19')](_0x522290['children'][_0x19ea43][_0x5837('0x5')])['digest'](_0x5837('0x1a'));var _0x5a7d12=_0x522290[_0x5837('0x15')][_0x19ea43][_0x5837('0x5')][_0x5837('0x1b')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]);_0x522290[_0x5837('0x15')][_0x19ea43][_0x5837('0x5')]=_0x522290['children'][_0x19ea43][_0x5837('0x5')]['substring'](_0x5a7d12);_0x5c324f[_0x5837('0x1c')](_0x522290[_0x5837('0x15')][_0x19ea43]);}}if(_0x5c324f[_0x5837('0x13')]>0x0){for(let _0x19ea43=0x0,_0x325ded=Promise['resolve']();_0x19ea43<_0x5c324f[_0x5837('0x13')];_0x19ea43++){_0x325ded=_0x325ded[_0x5837('0x1d')](function(){return new Promise(function(_0x106dc4){_0x56d7f2[_0x5837('0x1e')](_0x5837('0x1f')+_0x5c324f[_0x19ea43][_0x5837('0x5')],function(_0x52529e,_0x527bb5){if(_0x52529e){console[_0x5837('0x20')]('Error\x20reading\x20'+_0x5c324f[_0x19ea43][_0x5837('0x21')]);}else{_0x5c324f[_0x19ea43][_0x5837('0x22')]=_0x25a0d5(_0x527bb5[_0x5837('0x23')])[_0x5837('0x24')](_0x5837('0x25'));}if(_0x19ea43==_0x5c324f[_0x5837('0x13')]-0x1){return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')](_0x5c324f);}_0x106dc4();});});});}}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')](_0x5c324f);}}else if(_0x254f7b==_0x5837('0x26')){_0x56d7f2[_0x5837('0x27')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')]['filename'][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')]['username'],''),'',function(_0x2f1f9e){if(_0x2f1f9e){return _0x1a67f3['status'](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x2f1f9e});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)['json']({'serverMessage':_0x5ea611['body'][_0x5837('0x29')][_0x5837('0x28')](/^.*[\\\/]/,'')+_0x5837('0x2a')});}});}else if(_0x254f7b==_0x5837('0x2b')){_0x56d7f2[_0x5837('0x2c')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')]['filename'][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'')+'/',function(_0x56a87e){if(_0x56a87e){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x56a87e});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5ea611['body'][_0x5837('0x29')][_0x5837('0x28')](/^.*[\\\/]/,'')+'\x20created'});}});}else if(_0x254f7b=='DELETE_FILE'){_0x56d7f2[_0x5837('0x2d')](_0x5ea611['user']['filepath']+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x29')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')]['username']+'/','')['replace'](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],''),function(_0x5a5272){if(_0x5a5272){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':'Error\x20deleting\x20file'});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x2e')});}});}else if(_0x254f7b=='DELETE_FOLDER'){_0x346a2c(_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x29')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')]['username']+'/','')['replace'](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'')+'/',function(_0x35d78e){if(_0x35d78e){return _0x1a67f3[_0x5837('0xb')](0x1f4)['json']({'serverMessage':_0x5837('0x2f')});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':'Folder\x20deleted'});}});}else if(_0x254f7b==_0x5837('0x30')){var _0x215d5f=_0x5ea611[_0x5837('0xd')]['files'];for(let _0x19ea43=0x0,_0xa26542=Promise[_0x5837('0x31')]();_0x19ea43<_0x215d5f[_0x5837('0x13')];_0x19ea43++){_0xa26542=_0xa26542[_0x5837('0x1d')](function(){return new Promise(function(_0x5989ae){if(_0x215d5f[_0x19ea43][_0x5837('0x14')]==_0x5837('0x32')){var _0x165ce0=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x215d5f[_0x19ea43][_0x5837('0x5')][_0x5837('0x28')](_0x5ea611['user']['username']+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');_0x56d7f2[_0x5837('0x2d')](_0x165ce0,function(_0x2aa1e9){if(_0x2aa1e9){return _0x1a67f3['status'](0x1f4)['json']({'serverMessage':_0x5837('0x33')+_0x215d5f[_0x19ea43]['name']});}else{if(_0x19ea43+0x1>=_0x215d5f[_0x5837('0x13')]){return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x34')});}_0x5989ae();}});}else{var _0x165ce0=_0x5ea611['user'][_0x5837('0xa')]+'/'+_0x215d5f[_0x19ea43][_0x5837('0x5')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')['replace'](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');_0x346a2c(_0x165ce0+'/',function(_0x176300){if(_0x176300){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x35')+_0x215d5f[_0x19ea43][_0x5837('0x21')]});}else{if(_0x19ea43+0x1>=_0x215d5f[_0x5837('0x13')]){return _0x1a67f3[_0x5837('0xb')](0xc8)['json']({'serverMessage':_0x5837('0x34')});}_0x5989ae();}});}});});}}else if(_0x254f7b==_0x5837('0x36')){var _0x2348a7=_0x5ea611[_0x5837('0xd')][_0x5837('0xa')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0xcc7722=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x2348a7['substring'](0x0,Math['max'](_0x2348a7[_0x5837('0x37')]('/'),_0x2348a7['lastIndexOf']('\x5c')));var _0x4e9115=_0x2348a7[_0x5837('0x28')](/^.*[\\\/]/,'');var _0x4a7708='';_0xd0d1c9(_0x4e9115,_0xcc7722)[_0x5837('0x1d')](function(_0x7e9644){_0x4a7708=_0x7e9644;_0x27352a[_0x5837('0x38')](_0xcc7722+'/'+_0x4e9115,_0xcc7722+'/'+_0x4a7708,function(_0x28272e){if(_0x28272e){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':'Error\x20copying\x20file'});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x39')});}});},function(_0x125b46){return _0x1a67f3['status'](0x1f4)['json']({'serverMessage':_0x5837('0x3a')});});}else if(_0x254f7b==_0x5837('0x3b')){var _0x2348a7=_0x5ea611['body'][_0x5837('0xa')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0xcc7722=_0x5ea611['user'][_0x5837('0xa')]+'/'+_0x2348a7['substring'](0x0,Math[_0x5837('0x3c')](_0x2348a7[_0x5837('0x37')]('/'),_0x2348a7[_0x5837('0x37')]('\x5c')));var _0x4e9115=_0x2348a7[_0x5837('0x28')](/^.*[\\\/]/,'');var _0x4a7708='';_0x1c297c(_0x4e9115,_0xcc7722)['then'](function(_0x23d319){_0x4a7708=_0x23d319;_0x27352a['copy'](_0xcc7722+'/'+_0x4e9115,_0xcc7722+'/'+_0x4a7708,function(_0x5ca9d1){if(_0x5ca9d1){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':'Error\x20copying\x20file'});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)['json']({'serverMessage':_0x5837('0x39')});}});},function(_0x236fd4){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':'Error\x20generating\x20filename'});});}else if(_0x254f7b==_0x5837('0x3d')){var _0x34adae=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3e')][_0x5837('0x28')](_0x5ea611['user'][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0x1968cc=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3f')]['replace'](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0x38eda3=_0x36e778[_0x5837('0x31')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]);_0x34adae=_0x36e778[_0x5837('0x40')](_0x34adae);_0x1968cc=_0x36e778['resolve'](_0x36e778[_0x5837('0x40')](_0x1968cc));if(_0x1968cc['indexOf'](_0x38eda3)==0x0){_0x56d7f2[_0x5837('0x41')](_0x34adae,_0x1968cc,function(_0x131099){if(_0x131099){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x42')});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x43')});}});}else{return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x44')});}}else if(_0x254f7b==_0x5837('0x45')){var _0x34adae=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3e')]['replace'](_0x5ea611['user'][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'')+'/';var _0x1968cc=_0x5ea611['user'][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3f')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'')+'/';var _0x38eda3=_0x36e778[_0x5837('0x31')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]);_0x34adae=_0x36e778[_0x5837('0x40')](_0x34adae);_0x1968cc=_0x36e778[_0x5837('0x31')](_0x36e778[_0x5837('0x40')](_0x1968cc));if(_0x1968cc[_0x5837('0x1b')](_0x38eda3)==0x0){_0x56d7f2[_0x5837('0x41')](_0x34adae,_0x1968cc,function(_0x19f82e){if(_0x19f82e){return _0x1a67f3[_0x5837('0xb')](0x1f4)['json']({'serverMessage':_0x5837('0x46')});}else{return _0x1a67f3['status'](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x47')});}});}else{return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':'Access\x20to\x20location\x20denied'});}}else if(_0x254f7b==_0x5837('0x48')){var _0x34adae=_0x5ea611[_0x5837('0x9')]['filepath']+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3e')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0x1968cc=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3f')]['replace'](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'');var _0x38eda3=_0x36e778[_0x5837('0x31')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]);_0x34adae=_0x36e778['normalize'](_0x34adae);_0x1968cc=_0x36e778['resolve'](_0x36e778[_0x5837('0x40')](_0x1968cc));if(_0x1968cc[_0x5837('0x1b')](_0x38eda3)==0x0){_0x56d7f2[_0x5837('0x41')](_0x34adae,_0x1968cc,function(_0x478583){if(_0x478583){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x49')});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x4a')});}});}else{return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x44')});}}else if(_0x254f7b==_0x5837('0x4b')){var _0x34adae=_0x5ea611[_0x5837('0x9')]['filepath']+'/'+_0x5ea611[_0x5837('0xd')][_0x5837('0x3e')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')]['username'],'')+'/';var _0x1968cc=_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]+'/'+_0x5ea611['body'][_0x5837('0x3f')][_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')]+'/','')[_0x5837('0x28')](_0x5ea611[_0x5837('0x9')][_0x5837('0x12')],'')+'/';var _0x38eda3=_0x36e778[_0x5837('0x31')](_0x5ea611[_0x5837('0x9')][_0x5837('0xa')]);_0x34adae=_0x36e778['normalize'](_0x34adae);_0x1968cc=_0x36e778['resolve'](_0x36e778[_0x5837('0x40')](_0x1968cc));if(_0x1968cc['indexOf'](_0x38eda3)==0x0){_0x56d7f2[_0x5837('0x41')](_0x34adae,_0x1968cc,function(_0x3e3d29){if(_0x3e3d29){return _0x1a67f3[_0x5837('0xb')](0x1f4)[_0x5837('0xc')]({'serverMessage':_0x5837('0x4c')});}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x4d')});}});}else{return _0x1a67f3[_0x5837('0xb')](0x1f4)['json']({'serverMessage':_0x5837('0x44')});}}else{return _0x1a67f3[_0x5837('0xb')](0xc8)[_0x5837('0xc')]({'serverMessage':_0x5837('0x4e')});}});_0x57a9eb[_0x5837('0x6')](_0x5837('0x4f'))[_0x5837('0x8')](function(_0x3892d7,_0x6895b0){var _0x256e61=_0x3892d7[_0x5837('0x50')]('d');var _0x49b519=JSON[_0x5837('0x51')](Buffer[_0x5837('0x52')](_0x256e61,_0x5837('0x53'))[_0x5837('0x54')](_0x5837('0x55')));var _0x357780=_0x49b519[_0x5837('0x12')];var _0x475dda=_0x49b519['userFilepath'];var _0x50903e=_0x49b519[_0x5837('0xa')];var _0x525907=_0x49b519[_0x5837('0x14')];if(_0x525907==_0x5837('0x32')){var _0x2b6f1e=_0x475dda+'/'+_0x50903e[_0x5837('0x28')](_0x357780+'/','')[_0x5837('0x28')](_0x357780,'');_0x6895b0[_0x5837('0x56')](_0x2b6f1e);}else{var _0x2322ef=_0x475dda+'/'+_0x50903e[_0x5837('0x28')](_0x357780+'/','')[_0x5837('0x28')](_0x357780,'');var _0x1f2192=_0x3b47b8(_0x2322ef,{});var _0x26208c=_0x4c87ec(_0x5837('0x57'));_0x26208c['on'](_0x5837('0x58'),function(_0xb4d3c8){_0x6895b0[_0x5837('0xb')](0x1f4)[_0x5837('0x59')]({'error':_0xb4d3c8[_0x5837('0x5a')]});});_0x6895b0['attachment'](_0x2322ef['replace'](/^.*[\\\/]/,'')+_0x5837('0x5b'));_0x26208c[_0x5837('0x5c')](_0x6895b0);_0x26208c[_0x5837('0x10')](_0x2322ef,_0x2322ef[_0x5837('0x28')](/^.*[\\\/]/,''));_0x26208c['finalize']();}});function _0xd0d1c9(_0x56ed57,_0x5d2bfc){return new Promise(function(_0x16bd84,_0x3a6b62){_0x56d7f2['readdir'](_0x5d2bfc,function(_0x2baf8a,_0xc1d67){if(_0x2baf8a){console[_0x5837('0x20')](_0x2baf8a);_0x3a6b62();}else{var _0xbd0938=_0x56ed57[_0x5837('0x5d')]('.');var _0x404a51=_0xbd0938[0x0];var _0x38b6f5=0x1;var _0x4cad17=_0xbd0938[0x1];var _0x18f8f8=_0x404a51+_0x38b6f5+'.'+_0x4cad17;while(_0xc1d67[_0x5837('0x1b')](_0x18f8f8)!=-0x1){_0x18f8f8=_0x404a51+ ++_0x38b6f5+'.'+_0x4cad17;}_0x16bd84(_0x18f8f8);}});});}function _0x1c297c(_0x3db37f,_0x112820){return new Promise(function(_0x31f3cb,_0x1f0fc3){_0x56d7f2[_0x5837('0x5e')](_0x112820,function(_0xf8025b,_0x32b7f3){if(_0xf8025b){console[_0x5837('0x20')](_0xf8025b);_0x1f0fc3();}else{var _0x1886f0=_0x3db37f['split']('.');var _0x44d8ab=_0x1886f0[0x0];var _0xe8ac7=0x1;var _0x12e982=_0x44d8ab+_0xe8ac7;while(_0x32b7f3[_0x5837('0x1b')](_0x12e982)!=-0x1){_0x12e982=_0x44d8ab+ ++_0xe8ac7;}_0x31f3cb(_0x12e982);}});});}function _0x3162ab(_0x1b8600,_0x5183b5){if(_0x1b8600[_0x5837('0x14')]=='directory'){_0x1b8600['id']=_0x164696['createHash'](_0x5837('0x18'))[_0x5837('0x19')](_0x1b8600[_0x5837('0x5')])[_0x5837('0x5f')](_0x5837('0x1a'));_0x1b8600[_0x5837('0x60')]=_0x1b8600[_0x5837('0x21')];if(_0x1b8600[_0x5837('0x21')]==_0x5183b5[_0x5837('0x9')][_0x5837('0x12')])_0x1b8600[_0x5837('0x61')]={'selected':!![],'opened':!![]};_0x3162ab(_0x1b8600['children'],_0x5183b5);}else if(_0x1b8600[_0x5837('0x62')]===Array){for(var _0x1f1aff=0x0;_0x1f1aff<_0x1b8600[_0x5837('0x13')];_0x1f1aff++){_0x3162ab(_0x1b8600[_0x1f1aff],_0x5183b5);}}else if(_0x1b8600[_0x5837('0x14')]==_0x5837('0x32')){_0x1b8600['id']=_0x164696['createHash'](_0x5837('0x18'))['update'](_0x1b8600[_0x5837('0x5')])['digest'](_0x5837('0x1a'));_0x1b8600['text']=_0x1b8600['name'];_0x1b8600[_0x5837('0x63')]='jstree-file';}}function _0x289fea(){return function(_0x1ae476,_0x1aa156,_0x36c7e7){if(_0x1ae476[_0x5837('0x64')]()){return _0x36c7e7();}else{_0x1aa156[_0x5837('0xb')](0x191)[_0x5837('0x59')](_0x5837('0x65'));}};}};