!function(){var e=require("fs");const r=require("./../utils/logger");FileUploadController=function(){},FileUploadController.prototype.uploadFile=function(l,t){var i,n,o=l.files.file,a=o.name.substr(o.name.length-3);l.body.workingDirectory?n=l.user.filepath.replace(l.user.username+"/","").replace(l.user.username,"")+l.body.workingDirectory+"/"+o.name:(i=".py"==a?"/Editor/":"/Blockly/",n=l.user.filepath+i+o.name),e.stat(n,(function(i,a){if(null==i)return t.status(500).send("File already exists with name.");e.readFile(l.files.file.path,(function(l,i){o.path=n,e.writeFile(o.path,i,(function(e){if(e)return console.warn(e);r.info("The file: "+o.name+" was saved to "+o.path),t.status(200).send("File imported successfully.")}))}))}))},module.exports=new FileUploadController}();