var _0xcdaa=['/public','use','static','crashreporter','configure','dev','Access-Control-Allow-Origin','get','Origin','setHeader','header','Access-Control-Allow-Headers','Accept,\x20Authorization,\x20Content-Type,\x20X-Requested-With,\x20Range','Access-Control-Allow-Credentials','json','ilovemyfusioncontroller','session','join','log','debug','warn','error','init','win32','exec','net-ping','createSession','shelljs','i18n','path','exports'];(function(_0x556eeb,_0x440f62){var _0x39df83=function(_0xfa72c9){while(--_0xfa72c9){_0x556eeb['push'](_0x556eeb['shift']());}};_0x39df83(++_0x440f62);}(_0xcdaa,0xd3));var _0x317a=function(_0x3c8f65,_0x41d208){_0x3c8f65=_0x3c8f65-0x0;var _0x4b922b=_0xcdaa[_0x3c8f65];return _0x4b922b;};var ping=require(_0x317a('0x0'));var pingSession=ping[_0x317a('0x1')]();var shell=require(_0x317a('0x2'));var os=require('os');let i18n=require(_0x317a('0x3'));let path=require(_0x317a('0x4'));module[_0x317a('0x5')]=function(_0x376ef8,_0x1d790e,_0x17d112,_0x436204,_0x5cf3c0,_0x4d4605,_0x3894c9,_0x42472d,_0x21b065,_0x4ae463,_0x5c23bd,_0xb4a24,_0x3c4007){var _0x508386=_0x317a('0x6');_0x376ef8[_0x317a('0x7')](_0x1d790e[_0x317a('0x8')](_0x17d112+_0x508386));require(_0x317a('0x9'))[_0x317a('0xa')]({'outDir':'.crash','exitOnCrash':!![],'maxCrashFile':0x1});_0x376ef8[_0x317a('0x7')](_0x3894c9('X-HTTP-Method-Override'));_0x376ef8[_0x317a('0x7')](_0x436204(_0x317a('0xb')));_0x376ef8['use'](_0x5cf3c0());_0x376ef8[_0x317a('0x7')](function(_0x1fddd2,_0x5dd923,_0x4abd55){_0x5dd923['header'](_0x317a('0xc'),_0x1fddd2[_0x317a('0xd')](_0x317a('0xe'))||'*');_0x5dd923[_0x317a('0xf')]('Access-Control-Allow-Methods','GET,\x20POST,\x20OPTIONS,\x20PUT,\x20PATCH,\x20DELETE,\x20CONNECT');_0x5dd923[_0x317a('0x10')](_0x317a('0x11'),_0x317a('0x12'));_0x5dd923['setHeader'](_0x317a('0x13'),!![]);_0x4abd55();});_0x376ef8[_0x317a('0x7')](_0x4d4605[_0x317a('0x14')]());_0x376ef8[_0x317a('0x7')](_0x4d4605['urlencoded']({'extended':!![]}));_0x376ef8[_0x317a('0x7')](_0x42472d({'secret':_0x317a('0x15'),'resave':![],'saveUninitialized':!![]}));_0x376ef8[_0x317a('0x7')](_0x4ae463());_0x376ef8[_0x317a('0x7')](_0x21b065['initialize']());_0x376ef8[_0x317a('0x7')](_0x21b065[_0x317a('0x16')]());i18n[_0x317a('0xa')]({'defaultLocale':'en','locales':['en','es'],'directory':path[_0x317a('0x17')](__dirname,'./locales'),'cookie':'NG_TRANSLATE_LANG_KEY','autoReload':!![],'objectNotation':!![],'syncFiles':!![],'logDebugFn':function(_0x1d2072){console[_0x317a('0x18')](_0x317a('0x19'),_0x1d2072);},'logWarnFn':function(_0x1a1051){console['log'](_0x317a('0x1a'),_0x1a1051);},'logErrorFn':function(_0x9a12dc){console[_0x317a('0x18')](_0x317a('0x1b'),_0x9a12dc);}});_0x376ef8[_0x317a('0x7')](i18n[_0x317a('0x1c')]);var _0x3ba715='app/filesystem';if(!_0x3c4007['existsSync'](_0x3ba715)){_0x3c4007['mkdirSync'](_0x3ba715);}if(os['platform']()!=_0x317a('0x1d'))shell[_0x317a('0x1e')]('sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)',{'silent':!![]});};