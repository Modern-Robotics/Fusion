var _0x54f3=['securityanswer','passport-local','Strategy','deserializeUser','findById','use','local-signup','password','toLowerCase','trim','Error','Username\x20Already\x20Exists','body','username','generateHash','filepath','generateFileSystem','save','local-login','findOne','validPassword','local-recovery','validSecurityAnswer'];(function(_0x54aef7,_0x2e086c){var _0x19d5dc=function(_0x30a864){while(--_0x30a864){_0x54aef7['push'](_0x54aef7['shift']());}};_0x19d5dc(++_0x2e086c);}(_0x54f3,0xe7));var _0x1517=function(_0x124d44,_0x590c47){_0x124d44=_0x124d44-0x0;var _0x291900=_0x54f3[_0x124d44];return _0x291900;};var LocalStrategy=require(_0x1517('0x0'))[_0x1517('0x1')];var User=require('../app/models/user');module['exports']=function(_0x17b3c6){_0x17b3c6['serializeUser'](function(_0x13af25,_0x1f24f8){_0x1f24f8(null,_0x13af25['id']);});_0x17b3c6[_0x1517('0x2')](function(_0x30c1fa,_0x5531db){User[_0x1517('0x3')](_0x30c1fa,function(_0x2b045f,_0x39f11e){_0x5531db(_0x2b045f,_0x39f11e);});});_0x17b3c6[_0x1517('0x4')](_0x1517('0x5'),new LocalStrategy({'usernameField':'username','passwordField':_0x1517('0x6'),'passReqToCallback':!![]},function(_0x41243f,_0x9f3979,_0x3fc4fa,_0x2e98f4){User['findOne']({'username':_0x9f3979[_0x1517('0x7')]()[_0x1517('0x8')]()},async function(_0x2ef87b,_0x41f567){if(_0x2ef87b)return _0x2e98f4(_0x2ef87b);if(_0x41f567){_0x41f567[_0x1517('0x9')]=_0x1517('0xa');return _0x2e98f4(null,_0x41f567);}else{var _0x45d892=new User(_0x41243f[_0x1517('0xb')]);_0x45d892[_0x1517('0xc')]=_0x9f3979;_0x45d892[_0x1517('0x6')]=_0x45d892[_0x1517('0xd')](_0x3fc4fa);_0x45d892[_0x1517('0xe')]=await _0x45d892[_0x1517('0xf')](_0x45d892[_0x1517('0xc')]);_0x45d892[_0x1517('0x10')](function(_0x2ef87b){if(_0x2ef87b)throw _0x2ef87b;return _0x2e98f4(null,_0x45d892);});}});}));_0x17b3c6['use'](_0x1517('0x11'),new LocalStrategy({'usernameField':_0x1517('0xc'),'passwordField':_0x1517('0x6'),'passReqToCallback':!![]},function(_0x1a8f24,_0x55b480,_0x44d3cf,_0x3d422d){User[_0x1517('0x12')]({'username':_0x55b480['toLowerCase']()['trim']()},function(_0x31e1b7,_0x35a807){if(_0x31e1b7)return _0x3d422d(_0x31e1b7);if(!_0x35a807)return _0x3d422d(null,![]);if(!_0x35a807[_0x1517('0x13')](_0x44d3cf))return _0x3d422d(null,![]);return _0x3d422d(null,_0x35a807);});}));_0x17b3c6[_0x1517('0x4')](_0x1517('0x14'),new LocalStrategy({'usernameField':_0x1517('0xc'),'passwordField':_0x1517('0x6'),'passReqToCallback':!![]},function(_0x5e5808,_0x35bbc2,_0xbddfbd,_0x4fd9c9){User[_0x1517('0x12')]({'username':_0x35bbc2[_0x1517('0x7')]()['trim']()},function(_0x5c4859,_0x295ed3){if(_0x5c4859)return _0x4fd9c9(_0x5c4859);if(!_0x295ed3)return _0x4fd9c9(null,![]);if(!_0x295ed3[_0x1517('0x15')](_0x5e5808[_0x1517('0xb')][_0x1517('0x16')]))return _0x4fd9c9(null,![]);return _0x4fd9c9(null,_0x295ed3);});}));};