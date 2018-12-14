#===============================================================================
# ssid_set.py - Program to set the proper SSID in the hostapd.conf file
# (c) 2018, Modern Robotics Inc, All Rights Reserved
#===============================================================================
#
# Revision History:
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


#-------------------------------------------------------------------------------
# Configure the argument parsing process
#
# There are four command line arguments which ssid_set recognizes:
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

    with open('/etc/hostapd/hostapd.conf', 'r') as f:
        lines = f.readlines()       
        
    with open('/etc/hostapd/hostapd.conf', 'w') as f:
        for line in lines:
            if (line[:5] == "ssid="):
                line = "ssid="+MAC_ADDRESS              
            elif "wpa_passphrase=" in line:
                line = "wpa_passphrase=mrifusion\n"
            elif "# SSIDSET_FLAG=" in line:
                line = "# SSIDSET_FLAG=True\n"
            f.write(line)  
            
            
#
# 3b) Boot (first call) Handler - Sets the SSID/Passkey to the default values.
#    
elif (results.boot == True):

    # See if the SSIDSET_FLAG is false. If so, take no action and raise a SystemExit
    ssidflag = 1
    with open('/etc/hostapd/hostapd.conf', 'r') as f:
        for line in f:
            if "# SSIDSET_FLAG=False" in line: 
                ssidflag = 0
    
    if (ssidflag == 1):
        # Build the Default SSID (into MAC_ADDRESS).
        MAC_ADDRESS = open('/sys/class/net/eth0/address').read()
        MAC_ADDRESS = "FusionAP_" + MAC_ADDRESS.replace(':', '')[6:]

        with open('/etc/hostapd/hostapd.conf', 'r') as f:
            lines = f.readlines()

        # Set the SSID and PassKey to the default values & the SSIDSET_FLAG to True 
        with open('/etc/hostapd/hostapd.conf', 'w') as f:
            for line in lines:
                if (line[:5] == "ssid="):
                    line = "ssid="+MAC_ADDRESS
                elif "wpa_passphrase=" in line:
                    line = "wpa_passphrase=mrifusion\n"
                elif "# SSIDSET_FLAG=" in line:
                    line = "# SSIDSET_FLAG=True\n"
                f.write(line)

                
#
# 3c) SSID Handler - an SSID was passed as an argument
#
if (results.ssid_name != None):

    # Read the file...
    with open('/etc/hostapd/hostapd.conf', 'r') as f:
        lines = f.readlines()
    
    # ...and replace the ssid= line with the new SSID
    with open('/etc/hostapd/hostapd.conf', 'w') as f:
        for line in lines:
            if (line[:5] == "ssid="):
                line = "ssid="+str(results.ssid_name)+"\n"
            elif "# SSIDSET_FLAG=" in line:
                line = "# SSIDSET_FLAG=False\n"
            f.write(line)

#
# 3d) PassKey Handler - a PassKey was passed as an argument
#
if(results.password != None):

    # <jwa> Removed password length test.  No way to notify the user that the passkey
    # is not getting set. [[# if(len(str(results.password)) < 8): raise ValueError]]
    
    # Read the file...
    with open('/etc/hostapd/hostapd.conf', 'r') as f:
        lines = f.readlines()
    
    # ...and replace the wpa_passphrase= line with the new PassKey
    with open('/etc/hostapd/hostapd.conf', 'w') as f:
        for line in lines:
            if "wpa_passphrase=" in line:
                line = "wpa_passphrase="+str(results.password)+"\n"
            elif "# SSIDSET_FLAG=" in line:
                line = "# SSIDSET_FLAG=False\n"
            f.write(line)


# 4) stop the hostapd service and restart it to implement the new values
#
f.close()

time.sleep(0.5)  
os.system('sudo service hostapd stop')
time.sleep(0.5)
os.system('sudo service hostapd start')
