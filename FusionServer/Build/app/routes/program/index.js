!function(){const e=require("../../utils/logger"),t=require("fs-extra"),n=require("path"),a=require("directory-tree"),r=require("os"),i=require("scp2"),s=require("ssh2").Client,o=require("../../classroom/connection"),l=require("../../express"),m=require("mkdirp"),u=require("../../global/fusionSettings"),d=require("../../fusionProgram"),c=require("connect-multiparty")(),p=require("../../controllers/FileUploadController"),f=require("./../../utils/software"),b=["Fusion","VirtualGamepad","CoreControl"];let g="",E="/usr/local/lib/python2.7/dist-packages";const v=function(e){if("directory"==e.type)"Examples"==e.name?(g+="<md-menu>",g+='<md-button ng-click="$mdMenu.open()" translate="EDITOR.MENUBAR_HELP_EXAMPLES" aria-label="Editor Examples"></md-button>',g+="<md-menu-content>",v(e.children),g+="</md-menu-content>",g+="</md-menu>"):(g+="<md-menu-item>",g+="<md-menu>",g+='<md-button ng-click="$mdMenu.open()">'+e.name+"</md-button>",g+="<md-menu-content>",v(e.children),g+="</md-menu-content>",g+="</md-menu>",g+="</md-menu-item>");else if(e.constructor===Array)for(var t=0;t<e.length;t++)v(e[t]);else"file"!=e.type&&null!=e.type||(g+="<md-menu-item>",g+="<md-button ng-click=\"openExampleProgram('"+e.name+"','"+e.path.split("\\").join("/")+"')\">"+e.name+"</md-button>",g+="</md-menu-item>")};f.getIsProductionMachine()||(E=n.join(__dirname,"../../../../../lib/python/src"));const h=a(E,{extensions:/\.py$/,attributes:["size","type"]});h.name="Examples";for(var O=h.children.length-1;O>=0;O--)if(-1==b.indexOf(h.children[O].name))h.children.splice(O,1);else if(b.indexOf(h.children[O].name)>-1&&"directory"==h.children[O].type)for(var _=0;_<h.children[O].children.length;_++)if("examples"==h.children[O].children[_].name&&"directory"==h.children[O].children[_].type){h.children[O].children[_].name=h.children[O].name,h.children[O]=h.children[O].children[_];break}v(h);const F='<div class="fusion-toolbar-container"><md-toolbar class="md-menu-toolbar"><div layout="row"><div class="fusion-toolbar"><h2 class="md-toolbar-tools" ng-class="isExampleFile(SelectedFile)">{{displaySaveSymbol(SelectedFile.NeedsSaving)}} {{SelectedFile.Name}}</h2><md-menu-bar><md-menu><button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_FILE"></button><md-menu-content><md-menu-item><md-button ng-click="CreateNewWorkspaceFile()" translate="EDITOR.MENUBAR_FILE_NEW" aria-label="New File"></md-button></md-menu-item><md-menu-item><md-button ng-click="OpenFileDialog(ev)" translate="EDITOR.MENUBAR_FILE_OPEN" aria-label="Open File"></md-button></md-menu-item><md-menu-item><md-button ng-click="CloseFile(SelectedFile)" translate="EDITOR.MENUBAR_FILE_CLOSE" aria-label="Close File"></md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item><md-button ng-click="SaveFileDialog()" translate="EDITOR.MENUBAR_FILE_SAVE" aria-label="Save File"></md-button></md-menu-item><md-menu-item><md-button ng-click="SaveAsDialog(ev)" translate="EDITOR.MENUBAR_FILE_SAVE_AS" aria-label="Save File As"></md-button></md-menu-item><md-menu-item><md-button ng-click="SaveAllDialog()" translate="EDITOR.MENUBAR_FILE_SAVE_ALL" aria-label="Save All Files"></md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item><md-button ng-click="DeleteDialog(ev)" translate="EDITOR.MENUBAR_FILE_DELETE" aria-label="Delete File"></md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item><md-button ng-click="PrintDialog()" translate="EDITOR.MENUBAR_FILE_PRINT" aria-label="Print File"></md-button></md-menu-item></md-menu-content></md-menu><md-menu><button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_MANAGE">Manage</button><md-menu-content><md-menu-item><md-button ng-click="UploadFilesDialog()" translate="EDITOR.MENUBAR_MANAGE_IMPORT" aria-label="Import Files"></md-button></md-menu-item><md-menu-item><md-button ng-click="DownloadFilesDialog()" translate="EDITOR.MENUBAR_MANAGE_EXPORT" aria-label="Download Files"></md-button></md-menu-item></md-menu-content></md-menu><md-menu><button ng-click="$mdMenu.open()" class="fusion-toolbar-item" translate="EDITOR.MENUBAR_HELP"></button><md-menu-content>'+g+'<md-menu-item><md-button ng-click="takeToEditorDocs()" translate="EDITOR.MENUBAR_HELP_DOCUMENTATION" aria-label="Editor Documentation"></md-button></md-menu-item></md-menu-content></md-menu></md-menu-bar></div></div><div class="fusion-ribbon"><md-button class="fusion-ribbon-button tooltip" ng-click="CreateNewWorkspaceFile()" aria-label="New File"><md-tooltip><div translate="EDITOR.TOOLBAR_NEW_FILE_TOOLTIP"></div></md-tooltip><i class="far fa-file-alt fa-lg fa-fw"></i></md-button><md-button class="fusion-ribbon-button" ng-click="OpenFileDialog(ev)" aria-label="Open File"><md-tooltip><div translate="EDITOR.TOOLBAR_OPEN_FILE_TOOLTIP"></div></md-tooltip><i class="far fa-folder-open fa-lg fa-fw"></i></md-button><md-button class="fusion-ribbon-button" ng-click="SaveFileDialog()" aria-label="Save File As"><md-tooltip><div translate="EDITOR.TOOLBAR_SAVE_FILE_TOOLTIP"></div></md-tooltip><i class="far fa-save fa-lg fa-fw"></i></md-button><md-button class="fusion-ribbon-button" ng-click="SaveAllDialog()" aria-label="Save All Files"><md-tooltip><div translate="EDITOR.TOOLBAR_SAVE_FILES_TOOLTIP"></div></md-tooltip><span class="fa-layers fa-fw  fa-lg fa-fw"><i class="far fa-save" data-fa-transform="shrink-3 down-8 left-4"></i><i class="far fa-save" data-fa-transform="shrink-3 up-2 right-4"></i></span></md-button><md-button class="md-primary fusion-ribbon-button" ng-click="RunExistingEditorFile()" aria-label="Run Program"><md-tooltip><div translate="EDITOR.TOOLBAR_RUN_FILE_TOOLTIP"></div></md-tooltip><i class="fas fa-play fa-lg fa-fw"></i></md-button><md-button class="md-warn fusion-ribbon-button" ng-click="StopRunningEditorFile()" aria-label="Stop Program"><md-tooltip><div translate="EDITOR.TOOLBAR_STOP_FILE_TOOLTIP"></div></md-tooltip><i class="fas fa-stop fa-lg fa-fw"></i></md-button><md-button class="fusion-ribbon-button" ng-click="OpenVirtualGamepad()" ng-disabled="DisableVirtualGamepad()" aria-label="Open Virtual Gamepad"><md-tooltip><div translate="EDITOR.TOOLBAR_GAMEPAD_TOOLTIP"></div></md-tooltip><i class="fas fa-gamepad fa-lg fa-fw"></i></md-button></div></md-toolbar></div>';module.exports=(l.get("/api/programs",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(e,n){var a=e.user.filepath+"/Editor";m(a,(function(e){e&&n.status(500).send(e),t.readdir(a,(function(e,t){return e?n.status(500).send(e):n.status(200).send(t)}))}))})),l.post("/api/programs",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(n,a){t.stat(n.user.filepath+"/Editor/"+n.body.filename,(function(r,s){return null==r?a.status(500).json({serverMessage:"A file with that name already exists"}):"ENOENT"!=r.code?a.status(500).json({serverMessage:"An error occurred"}):void t.writeFile(n.user.filepath+"/Editor/"+n.body.filename,n.body.code,(function(t){return t?a.status(500).json({serverMessage:t}):(o.connected&&(r=n.user.filepath+"/Editor/"+n.body.filename,s=n.user.username+"/Editor/"+n.body.filename,i.scp(r,"c3:root@172.16.0.1:/home/c3/FusionFilesystem/"+s,(function(t){t?e.error(t):e.debug(`Created: '${s}' in classroom server`)}))),a.status(200).json({serverMessage:"Program Created Successfully"}));var r,s}))}))})),l.get("/api/programs/:Program_Name",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(e,n){t.readFile(e.user.filepath+"/Editor/"+e.params.Program_Name,"utf8",(function(t,a){return t?n.status(500).send(t):n.status(200).json({filename:e.params.Program_Name,code:a})}))})),l.put("/api/programs/:Program_Name",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(n,a){t.readFile(n.user.filepath+"/Editor/"+n.params.Program_Name,"utf8",(function(r,s){if(r)return a.status(500).send(r);t.writeFile(n.user.filepath+"/Editor/"+n.params.Program_Name,n.body.code,"utf-8",(function(t){return t?a.status(500).send(t):(o.connected&&(r=n.user.filepath+"/Editor/"+n.params.Program_Name,s=n.user.username+"/Editor/"+n.params.Program_Name,i.scp(r,"c3:root@172.16.0.1:/home/c3/FusionFilesystem/"+s,(function(t){t?e.error(t):e.debug(`Updated: '${s}' in classroom server`)}))),a.status(200).json({serverMessage:"Program Updated Successfully"}));var r,s}))}))})),l.delete("/api/programs/:Program_Name",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(n,a){t.readFile(n.user.filepath+"/Editor/"+n.params.Program_Name,"utf8",(function(r,i){return r?a.status(500).send("File Does Not Exist."):(t.unlinkSync(n.user.filepath+"/Editor/"+n.params.Program_Name),o.connected&&(l=n.user.username+"/Editor/"+n.params.Program_Name,(m=new s).on("ready",(function(){m.exec("rm /home/c3/FusionFilesystem/"+l,(function(t,n){if(t)throw t;n.on("close",(function(t,n){e.info("Stream :: close :: code: "+t+", signal: "+n),m.end()})).on("data",(function(t){e.info("STDOUT: "+t)})).stderr.on("data",(function(t){e.error("STDERR: "+t)}))}))})).connect({host:"172.16.0.1",port:22,username:"c3",password:"root"})),a.status(200).json({serverMessage:"Program Deleted Successfully"}));var l,m}))})),l.post("/api/programs/start/:Program_Name",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(e,t){var n=d.StartProgram(e.user.username,e.user.filepath+"/Editor/"+e.params.Program_Name,e.body.socketId);return t.status(n.status).json({serverMessage:n.message})})),l.post("/api/programs/stop",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(e,t){var n=d.StopProgram(e.user.username);return t.status(n.status).json({serverMessage:n.message})})),l.post("/api/programs/sendInput",(function(e,t,n){return e.isAuthenticated()?n():t.status(401).send("User Unauthenticated")}),(function(e,t){return u.SocketVariables.fusion_program_running&&d.sendInput(e.body.input),t.status(200).send()})),l.post("/api/programs/import",c,p.uploadFile,(function(e,t){})),l.get("/api/samplePrograms",(function(e,t){var n;n="raspberrypi"!=r.hostname()?"C:/Users/Hector/Desktop/examples":"/usr/local/lib/python2.7/dist-packages/Fusion/examples";var i=a(n);return t.status(200).json(i)})),l.post("/api/samplePrograms",(function(e,n){t.readFile(e.body.filepath,"utf8",(function(e,t){return e?n.status(500).send("Error loading example"):n.status(200).json({code:t})}))})),l.post("/api/samplePrograms/run",(function(e,t){var n=d.StartProgram(e.user.username,e.body.filepath,e.body.socketId);return t.status(n.status).json({serverMessage:n.message})})),void l.get("/api/editor/toolbar",(function(e,t){return t.status(200).send(F)})))}();