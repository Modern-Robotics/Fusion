const _0xc80e=['exports','removeFileSystem','/Editor','Schema','111845IVNzFT','generateFileSystem','Finished\x20Deleting\x20User\x20Directory','4EKIOFV','rimraf','./../utils/logger','609790HeCfQx','hashSync','app/filesystem/','34785IdFzVU','1bmTPtv','bcrypt-nodejs','generateHash','1523yKZcWn','info','146032XlmjCt','securityanswer','1uULity','6KPiDwu','statics','3SVMjjb','methods','fs-extra','validSecurityAnswer','compareSync','13193LjDqJO','160235hITMkY','validPassword','mkdirp','mongoose','genSaltSync','Error\x20creating\x20file\x20system\x20for\x20user:\x20','/Blockly','password'];const _0x14556e=_0x12c2;function _0x12c2(_0x51472e,_0x4d0443){return _0x12c2=function(_0xc80e08,_0x12c2b3){_0xc80e08=_0xc80e08-0xa1;let _0x2d96b8=_0xc80e[_0xc80e08];return _0x2d96b8;},_0x12c2(_0x51472e,_0x4d0443);}(function(_0x4df5d3,_0x1c40a3){const _0x19a912=_0x12c2;while(!![]){try{const _0x27aa7c=-parseInt(_0x19a912(0xc5))*-parseInt(_0x19a912(0xaf))+-parseInt(_0x19a912(0xbb))+-parseInt(_0x19a912(0xb6))*parseInt(_0x19a912(0xc6))+-parseInt(_0x19a912(0xb9))*-parseInt(_0x19a912(0xbe))+-parseInt(_0x19a912(0xac))+parseInt(_0x19a912(0xb5))*-parseInt(_0x19a912(0xc0))+parseInt(_0x19a912(0xb2))*parseInt(_0x19a912(0xbd));if(_0x27aa7c===_0x1c40a3)break;else _0x4df5d3['push'](_0x4df5d3['shift']());}catch(_0x256d41){_0x4df5d3['push'](_0x4df5d3['shift']());}}}(_0xc80e,0x246f1));let mongoose=require(_0x14556e(0xa3)),bcrypt=require(_0x14556e(0xb7)),fs=require(_0x14556e(0xc2)),rimraf=require(_0x14556e(0xb0));const logger=require(_0x14556e(0xb1));let userSchema=mongoose[_0x14556e(0xab)]({'username':{'type':String,'required':!![],'lowercase':!![],'trim':!![]},'password':{'type':String,'required':!![]},'firstname':String,'lastname':String,'language':String,'email':String,'defaultprogramminglanguage':String,'filepath':{'type':String,'required':!![]},'securityquestion':{'type':String,'required':!![]},'securityanswer':{'type':String,'required':!![]},'usergroup':{'type':String,'required':!![]}});userSchema[_0x14556e(0xc1)][_0x14556e(0xb8)]=function(_0x9504e0){const _0x56631c=_0x14556e;return bcrypt[_0x56631c(0xb3)](_0x9504e0,bcrypt[_0x56631c(0xa4)](0x8),null);},userSchema[_0x14556e(0xc1)][_0x14556e(0xa1)]=function(_0x270ab2){const _0x5aba5b=_0x14556e;return bcrypt[_0x5aba5b(0xc4)](_0x270ab2,this[_0x5aba5b(0xa7)]);},userSchema['methods'][_0x14556e(0xc3)]=function(_0x519f55){const _0x2994fe=_0x14556e;return this[_0x2994fe(0xbc)]==_0x519f55;},userSchema[_0x14556e(0xc1)][_0x14556e(0xad)]=function(_0x41cb84){return new Promise(async function(_0x3239f9,_0xf9d5b9){const _0x325412=_0x12c2;var _0x5bc6c6=_0x325412(0xaa),_0x59de7a=_0x325412(0xa6),_0x357164=_0x325412(0xb4)+_0x41cb84;try{return await fs['mkdirp'](_0x357164),await fs[_0x325412(0xa2)](_0x357164+_0x5bc6c6),await fs['mkdirp'](_0x357164+_0x59de7a),_0x3239f9(_0x357164);}catch(_0x4bba2f){return logger['error'](_0x325412(0xa5)+_0x4bba2f),_0xf9d5b9(_0x4bba2f);}});},userSchema[_0x14556e(0xbf)][_0x14556e(0xa9)]=function(_0x3b3618){var _0x5f0f9b='app/filesystem/'+_0x3b3618;rimraf(_0x5f0f9b,function(){const _0x42ea12=_0x12c2;logger[_0x42ea12(0xba)](_0x42ea12(0xae));});},module[_0x14556e(0xa8)]=mongoose['model']('User',userSchema);