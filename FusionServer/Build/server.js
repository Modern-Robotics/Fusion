!function(){const e=require("config"),r=require("./app/utils/logger"),t=require("./app/http"),a=require("./app/utils/display");module.exports=async function(){try{r.verbose(`Server Mode: ${process.env.NODE_ENV||"development"}`),r.debug(`NIC: ${e.get("Wifi_NIC")}\tWAP: ${e.get("Wifi_WAP")}\tNET: ${e.get("Wire_NET")}`);const i=e.get("Server.Port");await require("./app/database"),await require("./app/utils/agenda"),await require("./app/autonomous"),await require("./app/express/app"),await require("./app/routes"),await require("./app/authentication"),await require("./app/socket/socket"),t.listen(i,(async function(){r.info("Server running on port: "+i),await a.showConnectScreen()}))}catch(e){r.error(e)}}()}();