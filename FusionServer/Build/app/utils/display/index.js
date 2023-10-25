!function(){const e=require("./../logger"),r=require("./../shell"),t=require("./../software"),n=require("./../wireless"),s=require("./../network"),c=require("./../../events"),a={splashScreenPath:"/usr/Fusion/config/splashscreen",showConnectScreen:async function(){try{if(t.getIsProductionMachine()){let e=await n.getAccessPointSettings(),t=await s.getIpAddress("eth0"),c="from Display import RecruitLCD\n";c+="lcd = RecruitLCD()\n",c+=`lcd.show_connect_screen(ssid='${e.SSID}', password='${e.Password}', wlan0_address='${t}')`,await r.execAsync(`python -u -B -c "${c}"`)}}catch(r){e.error(`Error showing connect screen: ${r}`)}},showIdleScreen:async function(){try{if(t.getIsProductionMachine()){let e="from Display import RecruitLCD\n";e+="lcd = RecruitLCD()\n",e+="lcd.show_splash_screen()",await r.execAsync(`python -u -B -c "${e}"`)}}catch(r){e.error(`Error showing idle screen: ${r}`)}},updateStatusBar:async function(n){try{if(t.getIsProductionMachine()){let e=n.battery,t=(n.wireless.ip,n.program?"True":"False"),s=n.internet?"True":"False",c="from Display import RecruitLCD\n";c+="lcd = RecruitLCD()\n",c+="status = {\n",c+=`   'battery': ${e},\n`,c+=`   'internet': ${s},\n`,c+=`   'program': ${t}\n`,c+="}\n",c+="lcd.update_header(status)",await r.execAsync(`python -u -B -c "${c}"`)}}catch(r){e.error(`Error updating status bar: ${r}`)}}};c.addListener("program-running",(async e=>{e||await a.showIdleScreen()})),c.addListener("client-connected",(async e=>{1==e&&await a.showIdleScreen()})),c.addListener("client-disconnected",(async e=>{e<=0&&await a.showConnectScreen()})),c.addListener("system-status-update",(async e=>{await a.updateStatusBar(e)})),module.exports=a}();