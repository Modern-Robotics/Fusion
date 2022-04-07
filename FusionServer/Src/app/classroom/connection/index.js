const config	= require('config');
const logger 	= require('../../utils/logger');
const rp        = require('request-promise');
const wpa_cli   = require('wireless-tools/wpa_cli');
const mac       = require('getmac');
const shell		= require('shelljs');
const wireless	= require('./../../utils/wireless');


let classroomConnection = {
	wifiInterface: config.get('Wifi_NIC'), 		// Currently setup network interface
	currentNetwork: 0,							// Default is 0 - used to increment through available network
	networks: [
		{
			hiddenSSID: 'MyBot_Gatekeeper_WiFi',	// Name of classroom virtual SSID
			hiddenPassword: 'CMMthgilxoBsecure'		// Password for classroom virtual SSID
		}
	],
	serial: null,								// Fusion serial number
	wifiStatus: null,							// Fusion wireless interface status
	fallbackNetwork: null						// Fallback network
};

const connection = {
	
	// Fusion connected to classroom
	connected: false,
	
	// Connects to classroom server
	connect: async function() {

		// Store fallback network in case we need it later
		classroomConnection.fallBackNetwork = await getFallBackNetwork();		
		
		// Get Serial number for identifying ourselves
		classroomConnection.serial = await getSerial();
		
		// Get wifi interface status
		classroomConnection.wifiStatus = await getWifiStatus();
		
		// Check if fusion has access to community
		await checkCommunityAccess();
		
	}

};

// Gets the fusion's serial number
function getSerial() {		
	return new Promise( (resolve, reject) => {		
		mac.getMac({
			iface: 'eth0'
		}, function (macReadError, macAddress) {
			if (macReadError){
				return reject(macReadError.message);
			}
			else {
				let serialNumber = macAddress.split(":").join("").substr(-6);
				logger.debug('Fusion serial number: ' + serialNumber);
				return resolve(serialNumber);
			}
		});		
	});		
};

// Gets the wifi status of the NIC interface
function getWifiStatus() {
	return new Promise( (resolve, reject) => {		
		wpa_cli.status( classroomConnection.wifiInterface , function (wirelessDongleErr, status) {				
			if (wirelessDongleErr) {
				return reject('Error accessing network interface: ' + wirelessDongleErr);					
			}
			logger.debug('Wifi interface status: ' + JSON.stringify(status));
			return resolve(status);	
		});		
	});
};

// Checks if fusion has access to community
async function checkCommunityAccess() {
		
	// Get gateway ip address - Will work for classroom normal or hidden network
	const gatewayCommand = "ip route show | grep -i '" + classroomConnection.wifiInterface +"  metric' | awk '{print $3}'";	
	const gatewayAddress = await shell.exec(gatewayCommand, {silent:true}).stdout.trim();
	logger.debug('Gateway found at: ' + gatewayAddress);
	
	let requestOptions = {
		uri: 'https://' + gatewayAddress + ':8443/api/v1/connect/' + classroomConnection.serial,
		rejectUnauthorized: false,
		json: true,
		timeout: 5000,
	}
	try {
		
		// Get response from community
		let communityResponse = await rp(requestOptions);		
		logger.debug(JSON.stringify(communityResponse));
		
		// Get community access
		let partOfCommunity = false;
		if (communityResponse.data){
			partOfCommunity = communityResponse.data.community_access;
		}
		
		// Check community access
		if (partOfCommunity) {
			
			// Get classroom network credentials
			let networkDetails = {
				ssid: communityResponse.wifi.ssid,
				passphrase: communityResponse.wifi.passphrase
			}
			
			// Checks if fusion is on classroom network
			await checkIfOnClassroomNetwork(networkDetails);
			
		} else {
			
			logger.debug('Not part of the classroom community');
			await tryNextClassroomNetwork();
			
		}
		
	}
	catch(requestErr) {
		
		// Unable to reach community
		logger.warn('Unable to reach classroom community: ' + requestErr);		
		await tryNextClassroomNetwork();
		
	}
	
};

// Check if currently connected to classroom network
async function checkIfOnClassroomNetwork(networkDetails) {
	
	if (classroomConnection.wifiStatus.ssid == networkDetails.ssid) {
		logger.debug('Already connected to classroom network');
		await connectSockets();
	} else {
		logger.debug('Not connected to classroom network');
		await connectToClassroomNetwork(networkDetails);		
	}
	
};

// Set classroom real time communication via sockets
async function connectSockets() {	
	logger.debug('Connecting classroom socket communication');
	await require('../sockets');
	connection.connected = true;	
};

// Connects the fusion to the classroom's wireless network
async function connectToClassroomNetwork(networkDetails) {
	
	try {
		
		logger.debug('Connecting to classroom: ' + networkDetails.ssid);
		
		let options = {
			ssid: networkDetails.ssid,
			password: networkDetails.passphrase,
			hidden: false
		}		

		// Connect to network
		await wireless.connectToNetwork(options);
		
		// Connect to socket communication
		await connectSockets();
		
	} catch(err) {
		
		logger.warn('Error connecting to classroom network: ' + err);
		
	}	
	
};

// Gets current wifi credentials in case we need to fall back to it later
async function getFallBackNetwork() {
	return new Promise( (resolve, reject) => {		
		let network = null;		
		if (network) {
			logger.debug('Storing fallback network');
		} else {
			logger.debug('No fallback network found');
		}		
		return resolve(null);
	});
};

// If there's a fallback network, reconnect the fusion to it
async function restoreFallBackNetwork() {	
	
	logger.debug('Checking for fallback network');
	
	// If there's a fallback network, change to it
	if (classroomConnection.fallbackNetwork) {
		
		logger.debug('Fallback network found: ' + classroomConnection.fallbackNetwork);
		
	} else {
		
		logger.debug('No fallback network found');
		
	}
	
};

// Connects to a classroom hidden network
async function connectToHiddenClassroomNetwork(network) {
	
	try {
		
		logger.debug('Connecting to hidden classroom: ' + network.hiddenSSID);
		
		let options = {
			ssid: network.hiddenSSID,
			password: network.hiddenPassword,
			hidden: true
		}		

		// Connect to network
		await wireless.connectToNetwork(options);
		
		// Now that we are on the hidden network, try checking for access again
		logger.debug('On hidden network, rechecking community access');
		await checkCommunityAccess();
		
	} catch(err) {
		
		logger.warn(err);
		
		// Failed finding hidden network, check if remaining networks
		await tryNextClassroomNetwork();
		
	}
	
};

// Changes to the next classroom network and attempts connection process
async function tryNextClassroomNetwork() {
	
	logger.debug('Trying next hidden classroom network');
	
	let nextNetwork = await getNextNetwork();
	
	// Checks if there are remaining networks
	if (nextNetwork) {
		
		logger.debug('Next network is: ' + nextNetwork.hiddenSSID);
		await connectToHiddenClassroomNetwork(nextNetwork);
		
	} else {
		
		logger.debug('No more networks to try. Restoring fallback network');
		await restoreFallBackNetwork();
		
	}	
	
};

// Gets next classroom network to try
async function getNextNetwork() {
	
	let network = null;
	
	if (classroomConnection.currentNetwork < classroomConnection.networks.length)
		network = classroomConnection.networks[classroomConnection.currentNetwork++];
	
	return network;
	
};


// Export connection object
module.exports = connection;