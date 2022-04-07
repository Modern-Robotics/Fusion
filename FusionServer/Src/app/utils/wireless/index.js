const config	= require('config');
const logger 	= require('./../logger');
const shell		= require('shelljs');
const fs		= require('fs-extra');
const os		= require('os');
const wpa_cli 	= require('wireless-tools/wpa_cli');

const wireless = {
	
	networkInterface: config.get('Wifi_NIC'),
	
	connectToNetwork: async function(network) {
			
		if (os.platform() == 'win32')
			throw 'Windows wifi connecting not supported';
		
		const ssid 				= network.ssid;
		const password			= network.password;
		
		let scan = 0;
		if (network.hidden) {
			scan = 1;
		}
		
		logger.verbose('Connecting to "' + ssid + '" using password: "' + password + '"');
		
		// Build network data
		let wpa_supplicant = '';
		wpa_supplicant += 'ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev' + os.EOL;
		wpa_supplicant += 'update_config=1' + os.EOL;
		wpa_supplicant += 'country=US' + os.EOL;
		wpa_supplicant += '' + os.EOL;
		wpa_supplicant += 'network={' + os.EOL;
		wpa_supplicant += '	ssid="' + ssid + '"' + os.EOL;
		wpa_supplicant += '	scan_ssid=' + scan + os.EOL;
		wpa_supplicant += '	psk="' + password + '"' + os.EOL;
		wpa_supplicant += '	key_mgmt=WPA-PSK' + os.EOL;
		wpa_supplicant += '}';
		
		logger.debug('WPA supplicant data: \n' + wpa_supplicant);
		
		// Save network data
		await fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', wpa_supplicant);
		
		// Reconfigure interface with new supplicant file
		let reconfigured = shell.exec('sudo wpa_cli -i ' + this.networkInterface + ' reconfigure', {silent: true}).stdout;
		
		if (reconfigured.trim() == 'FAIL')
			throw 'Invalid SSID or Password';
		
		// Check status
		let connected = false;
		let networkStatus = null;
		for (let i = 0; i < 1000; i++) {
			
			// Get network status
			networkStatus = await this.getNetworkStatus();			
			
			// Check if completed connection
			if (networkStatus.wpa_state == 'COMPLETED' && typeof networkStatus.ip !== 'undefined') {
				
				logger.debug('Attempts: ' + i);
				logger.debug(JSON.stringify(networkStatus));
				
				connected = true;
				break;
			}
			
		}
		
		// Check if connected
		if (connected) {
			logger.debug('Connected to: ' + ssid);
		} else {
			throw 'Failed to connect to ' + ssid;
		}

		
	},
	
	getNetworkStatus: async function() {		
		return new Promise( (resolve, reject) => {			
			wpa_cli.status(this.networkInterface, function (scanError, status) {			
				if (scanError)
					return reject(scanError);
				return resolve(status);
			});			
		});		
	}
	
};

// Export wireless module
module.exports = wireless;