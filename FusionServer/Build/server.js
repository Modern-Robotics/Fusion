var _0x52af=['raspberry','.serverConfig','/usr/Fusion/FusionServer/','express','http','Server','socket.io','*:*','env','PORT','mongoose','passport','connect-flash','connect-multiparty','cookie-parser','express-session','NODE_ENV','dev','local','./app/models/user','log','Running\x20in\x20\x22','\x22\x20mode','./server/utils/logging/','./config/database','./config/passport','./config/app','./config/socket.js','./app/routes.js','listen','The\x20magic\x20happens\x20on\x20port\x20','./server/classroom/','wlan1','/usr/Fusion/FusionServer/config/','classroom','FusionAP_41cff4','mrifusion'];(function(_0x1a73e8,_0x37d16c){var _0x1c2146=function(_0x38ee85){while(--_0x38ee85){_0x1a73e8['push'](_0x1a73e8['shift']());}};_0x1c2146(++_0x37d16c);}(_0x52af,0x123));var _0x10d4=function(_0x10af00,_0x6ac790){_0x10af00=_0x10af00-0x0;var _0x4518bb=_0x52af[_0x10af00];return _0x4518bb;};var FusionSettings={'MultiUserAccess':![],'SocketVariables':{'fusion_battery_level':'','fusion_current_SHA':'','fusion_current_version':'','fusion_latest_SHA':'','fusion_latest_version':'','fusion_update_available':![],'fusion_gamepad_available':![],'fusion_diagnostics_running':null,'fusion_internet_access':![],'fusion_wifi_access':![],'fusion_program_running':null},'Storage':{'primaryInterface':_0x10d4('0x0'),'type':'local','address':null,'configLocation':_0x10d4('0x1')},'Cloud':[{'name':'c3','type':_0x10d4('0x2'),'ip':'172.16.0.1','hiddenSSID':_0x10d4('0x3'),'hiddenPass':_0x10d4('0x4'),'ssh_user':'pi','ssh_pass':_0x10d4('0x5'),'configFileName':_0x10d4('0x6'),'configFilePath':_0x10d4('0x7')+_0x10d4('0x6')}]};var express=require(_0x10d4('0x8'));var app=express();var server=require(_0x10d4('0x9'))[_0x10d4('0xa')](app);var io=require(_0x10d4('0xb'))(server,{'origins':_0x10d4('0xc'),'serveClient':![],'cookie':![]});var port=process[_0x10d4('0xd')][_0x10d4('0xe')]||0x1f90;var mongoose=require(_0x10d4('0xf'));var passport=require(_0x10d4('0x10'));var methodOverride=require('method-override');var flash=require(_0x10d4('0x11'));var fusionProgram=require('./app/fusionProgram.js')(io,FusionSettings);var fs=require('fs');var multiparty=require(_0x10d4('0x12'));var FileUploadController=require('./app/controllers/FileUploadController');var multipartyMiddleware=multiparty();var morgan=require('morgan');var cookieParser=require(_0x10d4('0x13'));var bodyParser=require('body-parser');var session=require(_0x10d4('0x14'));var configDB=require('./config/database.js');var env=process[_0x10d4('0xd')][_0x10d4('0x15')]||_0x10d4('0x16');var storage={'type':_0x10d4('0x17')};var user=require(_0x10d4('0x18'));module['exports']=async function ServerInitialization(){console[_0x10d4('0x19')](_0x10d4('0x1a')+env+_0x10d4('0x1b'));await require(_0x10d4('0x1c'));require(_0x10d4('0x1d'))(mongoose,user);require(_0x10d4('0x1e'))(passport);require(_0x10d4('0x1f'))(app,express,__dirname,morgan,cookieParser,bodyParser,methodOverride,session,passport,flash,env,storage,fs);require(_0x10d4('0x20'))(io,fusionProgram,FusionSettings);require(_0x10d4('0x21'))(app,passport,fusionProgram,io,multipartyMiddleware,FileUploadController,env,storage,FusionSettings);server[_0x10d4('0x22')](port,async function(){console['log'](_0x10d4('0x23')+port);await require(_0x10d4('0x24'));});}();