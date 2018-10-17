import sys 
import os
import argparse
import traceback
import commands

parser = argparse.ArgumentParser()

parser.add_argument('-c',
                    action='store_true',
                    dest='connect',
                    default=False,
                    help='Connect to a network')
                    
parser.add_argument('-d',
                    action='store_true',
                    dest='disconnect',
                    default=False,
                    help='Disconnect from a network')
                    
parser.add_argument('-l',
                    action='store_true',
                    dest='listNetworks',
                    default=False,
                    help='List all found networks')
                    
parser.add_argument('-n',
                    action='store',
                    dest='network_ssid',
                    default=None,
                    help='SSID of network to connect to')
                    
parser.add_argument('-p',
                    action='store',
                    dest='network_pass',
                    default=None,
                    help='Network password')
                    
results = parser.parse_args()

try:
    if(results.listNetworks != False):
        ssid_list = ""
        sig_strength = ""
        encryption = ""
        
        iwlist = commands.getstatusoutput("sudo iwlist wlan1 scan")[1]
        lines = iwlist.split(os.linesep)
        
        for line in lines:
            if "Signal level=" in line:
                sig_strength += line[line.index("Signal level=")+13:] + ';'
            if "ESSID:" in line:
                ssid_list += line[line.index("ESSID:")+6:].replace('"', '') + ';'
            if "Encryption key:" in line:
                encryption += line[line.index("Encryption key:")+15:] + ';'
        
        print ssid_list
        print sig_strength
        print encryption
        
    elif((results.connect == True) and (results.network_ssid != None)):
        results.network_ssid.replace('"', "")
        if(results.network_pass != None):
            commands.getstatusoutput("sudo cp /usr/Fusion/etc/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf")
            commands.getstatusoutput("sudo wpa_passphrase " + results.network_ssid + " " + results.network_pass + " >> /etc/wpa_supplicant/wpa_supplicant.conf")
        else:
            commands.getstatusoutput("sudo cp /usr/Fusion/etc/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf")
            commands.getstatusoutput("sudo echo 'network={\nssid=" + results.network_ssid + "\nkey_mgmt=NONE\n}' >> /etc/wpa_supplicant/wpa_supplicant.conf")
        commands.getstatusoutput("sudo wpa_cli reconfigure")
    
    elif(results.disconnect == True):
        commands.getstatusoutput("sudo cp /usr/Fusion/etc/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf")
        commands.getstatusoutput("sudo wpa_cli reconfigure")
        
except:
    print traceback.format_exc(1)
    
