const _0x440f=['Origin','header','mkdirSync','urlencoded','Configuring\x20API\x20security','Access-Control-Allow-Headers','passport','morgan','body-parser','debug','Configuring\x20JSON\x20body\x20parser','verbose','static','i18n','dev','Access-Control-Allow-Origin','init','method-override','use','configure','NG_TRANSLATE_LANG_KEY','express-session','Configuring\x20file\x20system','platform','setHeader','X-HTTP-Method-Override','sudo\x20kill\x20$(ps\x20aux\x20|\x20grep\x20\x27[s]udo\x20python\x20../../diagnostics/diagnosticGUI.py\x27\x20|\x20awk\x20\x27{print\x20$2}\x27)','Configuring\x20server\x20sessions','Configuring\x20i18n\x20defaults','memorystore','warn','Configuring\x20URL\x20encodede\x20body\x20parser','Configuring\x20API\x20headers','express','./../../config/locales','win32','stream','initialize','exec','Configuring\x20API\x20request\x20logging','join','existsSync','Access-Control-Allow-Methods','Access-Control-Allow-Credentials','Accept,\x20Authorization,\x20Content-Type,\x20X-Requested-With,\x20Range','app/filesystem'];(function(_0x3b3cf0,_0x440f87){const _0x38e83d=function(_0x4dec68){while(--_0x4dec68){_0x3b3cf0['push'](_0x3b3cf0['shift']());}};_0x38e83d(++_0x440f87);}(_0x440f,0x15d));const _0x38e8=function(_0x3b3cf0,_0x440f87){_0x3b3cf0=_0x3b3cf0-0x0;let _0x38e83d=_0x440f[_0x3b3cf0];return _0x38e83d;};const logger=require('../utils/logger');const app=require('.');const express=require(_0x38e8('0x6'));const morgan=require(_0x38e8('0x1a'));const bodyParser=require(_0x38e8('0x1b'));const methodOverride=require(_0x38e8('0x24'));const session=require(_0x38e8('0x28'));const MemoryStore=require(_0x38e8('0x2'))(session);const passport=require(_0x38e8('0x19'));const fs=require('fs');const shell=require('shelljs');const os=require('os');const i18n=require(_0x38e8('0x20'));const path=require('path');const helmet=require('helmet');const compression=require('compression');module['exports']=async function(){logger[_0x38e8('0x1e')]('Configuring\x20public\x20directory');app[_0x38e8('0x25')](express[_0x38e8('0x1f')](path[_0x38e8('0xd')](__dirname,'./../../public')));logger[_0x38e8('0x1e')](_0x38e8('0x5'));app[_0x38e8('0x25')](function(_0x54b212,_0x5e1f39,_0x10f3e6){_0x5e1f39[_0x38e8('0x14')](_0x38e8('0x22'),_0x54b212['get'](_0x38e8('0x13'))||'*');_0x5e1f39[_0x38e8('0x2b')](_0x38e8('0xf'),'GET,\x20POST,\x20OPTIONS,\x20PUT,\x20PATCH,\x20DELETE,\x20CONNECT');_0x5e1f39[_0x38e8('0x14')](_0x38e8('0x18'),_0x38e8('0x11'));_0x5e1f39['setHeader'](_0x38e8('0x10'),!![]);_0x10f3e6();});logger[_0x38e8('0x1e')]('Configuring\x20API\x20method\x20override');app[_0x38e8('0x25')](methodOverride(_0x38e8('0x2c')));logger[_0x38e8('0x1e')](_0x38e8('0xc'));app[_0x38e8('0x25')](morgan(_0x38e8('0x21'),{'stream':logger[_0x38e8('0x9')]}));logger[_0x38e8('0x1e')](_0x38e8('0x1d'));app[_0x38e8('0x25')](bodyParser['json']());logger[_0x38e8('0x1e')](_0x38e8('0x4'));app['use'](bodyParser[_0x38e8('0x16')]({'extended':!![]}));logger['verbose'](_0x38e8('0x0'));app[_0x38e8('0x25')](session({'secret':'ilovemyfusioncontroller','resave':![],'saveUninitialized':![],'store':new MemoryStore({'checkPeriod':0x5265c00})}));logger[_0x38e8('0x1e')]('Configuring\x20authentication\x20protocol');app['use'](passport[_0x38e8('0xa')]());app[_0x38e8('0x25')](passport['session']());logger[_0x38e8('0x1e')](_0x38e8('0x17'));app['use'](helmet());logger[_0x38e8('0x1e')]('Configuring\x20response\x20compression');app[_0x38e8('0x25')](compression());logger[_0x38e8('0x1e')](_0x38e8('0x1'));i18n[_0x38e8('0x26')]({'defaultLocale':'en','locales':['en','es'],'directory':path[_0x38e8('0xd')](__dirname,_0x38e8('0x7')),'cookie':_0x38e8('0x27'),'autoReload':![],'objectNotation':!![],'syncFiles':![],'logDebugFn':function(_0x864ad5){logger[_0x38e8('0x1c')](_0x864ad5);},'logWarnFn':function(_0x247daa){logger[_0x38e8('0x3')](_0x247daa);},'logErrorFn':function(_0x49a788){logger['error'](_0x49a788);}});logger[_0x38e8('0x1e')]('Configuring\x20server\x20with\x20i18n\x20support');app['use'](i18n[_0x38e8('0x23')]);var _0x1e3e39=_0x38e8('0x12');if(!fs[_0x38e8('0xe')](_0x1e3e39)){logger[_0x38e8('0x1e')](_0x38e8('0x29'));fs[_0x38e8('0x15')](_0x1e3e39);}if(os[_0x38e8('0x2a')]()!=_0x38e8('0x8'))shell[_0x38e8('0xb')](_0x38e8('0x2d'),{'silent':!![]});}();