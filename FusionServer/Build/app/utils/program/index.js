!function(){const n=require("./../logger"),r=require("./../../socket"),e=require("./../../global/fusionSettings"),o={getRunningProgram:async function(){let o=e.SocketVariables.fusion_program_running;return n.debug(`Running program: ${o}`),r.sockets.emit("program-running",o),o}};module.exports=o}();