!function(){const e=require("config"),t=require("../../utils/logger"),n=require("request-promise"),o=require("wireless-tools/wpa_cli"),a=require("getmac"),i=require("shelljs"),r=require("./../../utils/wireless"),s=require("fs-extra"),c=require("path");let u={wifiInterface:e.get("Wifi_NIC"),currentNetwork:0,networks:[{hiddenSSID:"MyBot_Gatekeeper_WiFi",hiddenPassword:"CMMthgilxoBsecure"}],serial:null,wifiStatus:null,fallbackNetwork:null};const w={connected:!1,connect:async function(){u.fallBackNetwork=await async function(){return new Promise(((e,n)=>(null?t.debug("Storing fallback network"):t.warn("No fallback network found"),e(null))))}(),u.serial=await new Promise(((e,n)=>{a.getMac({iface:"eth0"},(function(o,a){if(o)return n(o.message);{let n=a.split(":").join("").substr(-6);return t.debug("Fusion serial number: "+n),e(n)}}))})),u.wifiStatus=await new Promise(((e,n)=>{o.status(u.wifiInterface,(function(o,a){return o?n("Error accessing network interface: "+o):(t.debug("Wifi interface status: "+JSON.stringify(a)),e(a))}))})),await async function(){try{const e=c.join(__dirname,"./../../../../../etc/MMCNetworks.json"),n=await s.readJSON(e),o=u.networks.concat(n);u.networks=o,t.info("Classroom connection list found and imported.")}catch(e){"ENOENT"==e.code?t.warn("No classroom connection list found"):t.warn("Cannot read classroom connection list due to improper formatting.")}}(),await l()}};async function l(){const e="ip route show | grep -i '"+u.wifiInterface+"  metric' | awk '{print $3}'",o=await i.exec(e,{silent:!0}).stdout.trim();t.debug("Gateway found at: "+o);let a={uri:"https://"+o+":8443/api/v1/connect/"+u.serial,rejectUnauthorized:!1,json:!0,timeout:5e3};try{let e=await n(a);t.debug(JSON.stringify(e));let o=!1;if(e.data&&(o=e.data.community_access),o){let n={ssid:e.wifi.ssid,passphrase:e.wifi.passphrase};await async function(e){u.wifiStatus.ssid==e.ssid?(t.debug("Already connected to classroom network"),await d()):(t.debug("Not connected to classroom network"),await async function(e){try{t.debug("Connecting to classroom: "+e.ssid);let n={ssid:e.ssid,password:e.passphrase,hidden:!1};await r.connectToNetwork(n),await d()}catch(e){t.warn("Error connecting to classroom network: "+e)}}(e))}(n)}else t.debug("Not part of the classroom community"),await f()}catch(e){t.warn("Unable to reach classroom community: "+e),await f()}}async function d(){t.debug("Connecting classroom socket communication"),await require("../sockets"),w.connected=!0}async function f(){t.debug("Trying next hidden classroom network");let e=await async function(){let e=null;u.currentNetwork<u.networks.length&&(e=u.networks[u.currentNetwork++]);return e}();e?(t.debug("Next network is: "+e.hiddenSSID),await async function(e){try{t.debug("Connecting to hidden classroom: "+e.hiddenSSID);let n={ssid:e.hiddenSSID,password:e.hiddenPassword,hidden:!0};await r.connectToNetwork(n),t.debug("On hidden network, rechecking community access"),await l()}catch(e){t.warn(e),await f()}}(e)):(t.debug("No more networks to try. Restoring fallback network"),await async function(){t.debug("Checking for fallback network"),u.fallbackNetwork?t.debug("Fallback network found: "+u.fallbackNetwork):t.warn("No fallback network found")}())}module.exports=w}();