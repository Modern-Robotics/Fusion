#===============================================================================
# ssid_set.py - Program to set the proper SSID in the hostapd.conf file
# (c) 2018, Modern Robotics Inc, All Rights Reserved
#===============================================================================
#
# Revision History:
#	22-May-2020 <jwa> - Revised the methods used to read the file contents into
#		the 'lines' structure.  When using the with/as construct, the lines
#		structure does not exist outside the construct ultimately leading to 
#		writing an empty lines array to the file;  As a backup plan, during an 
#		external_reset request, we read from a recovery copy of hostadp.conf to
#		insure it gets refreshed.
#	03-Apr-2020 <jwa> - Script modified to enable admin account recovery based on 
#		externel_reset flag; corrected spelling to external_reset
#   17-Apr-2019 <jwa> - Updated to put settings into the config-wap hostapd.conf
#                       file and copy the new settings to the /etc/hostapd path.
#   11-Apr-2019 <jwa> - Added new argument to pass the port name into the script
#   30-Nov-2018 <jwa> - Changed BootFlag to SSIDSET_FLAG
#
#===============================================================================


#-----------------------------------------------------------
# Import the necessary Libraries
#
import sys
import os
import argparse
import traceback
import time
import Fusion
import subprocess


#-------------------------------------------------------------------------------
# Configure the argument parsing process
#
# There are five command line arguments which ssid_set recognizes:
#
# -b | --boot       Used during initial system boot. If the SSIDSET_FLAG is False,
#                   take no action. (Same if the defaults are already set.)  Otherwise,
#                   sets the SSID and PassKey to the default values.
#
# -d | --default    (Re)Sets the SSID and Passkey to the default values and
#                   SSIDSET_FLAG to True.
#
# -s | --ssid       Specifies the SSID to use in setting the WiFi. Sets the SSID
#                   and SSIDSET_FLAG to False
#
# -p | --password   Specifies the PassKey to use in setting the WiFi. Sets the Passkey
#                   and SSIDSET_FLAG to False
#
# -w | --wifidev    Specifies the name of the device being used as the Wireless Access Point
#

parser = argparse.ArgumentParser()

parser.add_argument('-b', '--boot',
                    action='store_true',
                    dest='boot',
                    default=False,
                    help='initial boot script')

parser.add_argument('-d', '--default',
                    action='store_true',
                    dest='defaultFlag',
                    default=None,
                    help='Sets the default SSID based on eth0')

parser.add_argument('-s', '--ssid',
                    action='store',
                    dest='ssid_name',
                    default=None,
                    help='Sets the user generated SSID')

parser.add_argument('-p', '--password',
                    action='store',
                    dest='password',
                    default=None,
                    help="Set the new password")

parser.add_argument('-w', '--wifidev',
                    action='store',
                    dest='wifidev',
                    default='wlan0',
                    help="Set the wireless access point device name - Default=wlan0'")



#===========================================================
# Start of processing
#

# Parse the command line
results = parser.parse_args()

#---------------------------------------------------------------------------
# 1) Configure the two digital ports used by the recovery jumper
#
f = Fusion.driver()
f.digitalState(f.D0, f.INPUT)
f.digitalState(f.D7, f.OUTPUT)


# 2a) Assume that the jumper is calling for a recovery reset and check to
#     see if the jumper is present 10 times.  If any time shows the jumper
#     is NOT present, then we aren't in recovery mode.
#
external_reset = True
for i in range(10):
    f.digitalWrite(f.D7, 1)
    time.sleep(0.001)
    if (f.digitalRead(f.D0) != 1):
        external_reset = False
        break;
    time.sleep(0.001)
    f.digitalWrite(f.D7, 0)
    if (f.digitalRead(f.D0) != 0):
        external_reset = False
        break;


# 2b) Finished checking; if external_reset requested, light the two LEDs and
#     wait for the jumper to be removed before proceeding
#
time.sleep(0.1)
if (external_reset == True):
    f.setLED(0, 1)
    f.setLED(1, 1)
    f.digitalWrite(f.D7, 1)
    while (f.digitalRead(f.D0)): pass


# 3) Check to see what action we are supposed to take...
#
# 3a) Reset/Default Handler - Sets the SSID/Passkey to the default values
#
if ( (results.defaultFlag == True) or (external_reset == True) ):

    MAC_ADDRESS = open('/sys/class/net/eth0/address').read()
    MAC_ADDRESS = "FusionAP_" + MAC_ADDRESS.replace(':', '')[6:]

	# Since this is an external_reset or reset to defaults cycles, lets
	# read from the recovery copy and rewrite the working copy.
    f = open('/usr/Fusion/etc/config-wap/hostapd.recovery__npp.sh', 'r')
	lines = f.readlines()
	f.close()

    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'w')
	for line in lines:
		if (line[:5] == "ssid="):
			line = "ssid="+MAC_ADDRESS
		elif "wpa_passphrase=" in line:
			line = "wpa_passphrase=mrifusion\n"
		elif "interface=" in line:
			line = "interface="+results.wifidev+"\n"
		elif "# SSIDSET_FLAG=" in line:
			line = "# SSIDSET_FLAG=True\n"
		f.write(line)
	f.close()
	
	# If external reset is set, restore admin account
	if (external_reset == True):
		subprocess.call(['node', '/usr/Fusion/FusionServer/Build/scripts/resetAdminAccount.js']);


#
# 3b) Boot (first call) Handler - Sets the SSID/Passkey to the default values.
#
elif (results.boot == True):

    # See if the SSIDSET_FLAG is false. If so, take no action and raise a SystemExit
    ssidflag = 1
    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'r')
    for line in f:
        if "# SSIDSET_FLAG=False" in line:
            ssidflag = 0
	f.close()

    if (ssidflag == 1):
        # Build the Default SSID (into MAC_ADDRESS).
        MAC_ADDRESS = open('/sys/class/net/eth0/address').read()
        MAC_ADDRESS = "FusionAP_" + MAC_ADDRESS.replace(':', '')[6:]

        f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'r')
        lines = f.readlines()
		f.close()

        # Set the SSID and PassKey to the default values & the SSIDSET_FLAG to True
        f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'w')
		for line in lines:
			if (line[:5] == "ssid="):
				line = "ssid="+MAC_ADDRESS
			elif "interface=" in line:
				line = "interface="+results.wifidev+"\n"
			elif "wpa_passphrase=" in line:
				line = "wpa_passphrase=mrifusion\n"
			elif "# SSIDSET_FLAG=" in line:
				line = "# SSIDSET_FLAG=True\n"
			f.write(line)
		f.close()


#
# 3c) SSID Handler - an SSID was passed as an argument
#
if (results.ssid_name != None):

    # Read the file...
    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'r')
    lines = f.readlines()
	f.close()

    # ...and replace the ssid= line with the new SSID
    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'w')
	for line in lines:
		if (line[:5] == "ssid="):
			line = "ssid="+str(results.ssid_name)+"\n"
		elif "interface=" in line:
			line = "interface="+results.wifidev+"\n"
		elif "# SSIDSET_FLAG=" in line:
			line = "# SSIDSET_FLAG=False\n"
		f.write(line)
	f.close()

#
# 3d) PassKey Handler - a PassKey was passed as an argument
#
if(results.password != None):

    # <jwa> Removed password length test.  No way to notify the user that the passkey
    # is not getting set. [[# if(len(str(results.password)) < 8): raise ValueError]]

    # Read the file...
    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'r')
	lines = f.readlines()
	f.close()

    # ...and replace the wpa_passphrase= line with the new PassKey
    f = open('/usr/Fusion/etc/config-wap/hostapd.conf__npp.sh', 'w')
	for line in lines:
		if "wpa_passphrase=" in line:
			line = "wpa_passphrase="+str(results.password)+"\n"
		elif "interface=" in line:
			line = "interface="+results.wifidev+"\n"
		elif "# SSIDSET_FLAG=" in line:
			line = "# SSIDSET_FLAG=False\n"
		f.write(line)
	f.close()


# 4) stop the hostapd service, copy the updated hostapd.conf file to the
#    /etc/hostapd/hostapd.conf file, and restart the service to implement
#    the new values
#
time.sleep(0.5)
os.system('sudo service hostapd stop')

time.sleep(1.0)
os.system('sudo cp /usr/Fusion/etc/config-wap/hostapd.conf__npp.sh /etc/hostapd/hostapd.conf')

time.sleep(1.0)
os.system('sudo service hostapd start')

time.sleep(1.0)
#
