const config = require('config');

let FusionSettings = {
    MultiUserAccess: false,
    SocketVariables: {
        fusion_battery_level: "",
        fusion_current_SHA: "",
        fusion_current_version: "",
        fusion_latest_SHA: "",
        fusion_latest_version: "",
        fusion_update_available: false,
        fusion_gamepad_available: false,
        fusion_diagnostics_running: null,
        fusion_internet_access: false,
        fusion_wifi_access: false,
        fusion_program_running: null
    },
    Storage: {
        primaryInterface: config.get('Wifi_NIC'),
        type: 'local',
        address: null,
        configLocation: '/usr/Fusion/FusionServer/config/'
    },
    Cloud: [{
        name: 'c3',
        type: 'classroom',
        ip: '172.16.0.1',
        hiddenSSID: 'FusionAP_41cff4',
        hiddenPass: 'mrifusion',
        ssh_user: 'pi',
        ssh_pass: 'raspberry',
        configFileName: '.serverConfig',
        configFilePath: '/usr/Fusion/FusionServer/' + '.serverConfig'
    }]
}

module.exports = FusionSettings;