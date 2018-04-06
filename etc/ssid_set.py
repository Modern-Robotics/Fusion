import sys
import os 
import argparse
import traceback
import time
import Fusion

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

results = parser.parse_args()
try: 
    f = Fusion.driver() 
    f.digitalState(f.D0, f.INPUT)
    f.digitalState(f.D7, f.OUTPUT)
    
    external_reset = True 
    for i in range(10):
        f.digitalWrite(f.D7, 1)
        time.sleep(0.001)
        if(f.digitalRead(f.D0) != 1): 
            external_reset = False
            break;
        time.sleep(0.001)
        f.digitalWrite(f.D7, 0)
        if(f.digitalRead(f.D0) != 0): 
            external_reset = False
            break;
    time.sleep(0.1) 
    if(external_reset == True):
        f.setLED(0, 1)
        f.setLED(1, 1)
        f.digitalWrite(f.D7, 1)
        while (f.digitalRead(f.D0)): pass 

    if((results.defaultFlag == True) or (external_reset == True)):
        
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
                elif "# BootFlag=" in line:
                    line = "# BootFlag=True"
                f.write(line)  
                
    elif(results.boot == True):
        with open('/etc/hostapd/hostapd.conf', 'r') as f:
            for line in f:
                if "# BootFlag=False" in line: raise SystemExit
                
        MAC_ADDRESS = open('/sys/class/net/eth0/address').read()
        MAC_ADDRESS = "FusionAP_" + MAC_ADDRESS.replace(':', '')[6:]

        with open('/etc/hostapd/hostapd.conf', 'r') as f:
            lines = f.readlines()

        for line in lines:
            if MAC_ADDRESS in line: raise SystemExit
            
        with open('/etc/hostapd/hostapd.conf', 'w') as f:
            for line in lines:
                if (line[:5] == "ssid="):
                    line = "ssid="+MAC_ADDRESS                
                elif "wpa_passphrase=" in line:
                    line = "wpa_passphrase=mrifusion\n"
                elif "# BootFlag=" in line:
                    line = "# BootFlag=True"
                f.write(line)

    if(results.ssid_name != None):
        with open('/etc/hostapd/hostapd.conf', 'r') as f:
            lines = f.readlines()
        
        with open('/etc/hostapd/hostapd.conf', 'w') as f:
            for line in lines:
                if (line[:5] == "ssid="):
                    line = "ssid="+str(results.ssid_name)+"\n"
                elif "# BootFlag=" in line:
                    line = "# BootFlag=False"
                f.write(line)

    if(results.password != None):
        if(len(str(results.password)) < 8): raise ValueError
        
        with open('/etc/hostapd/hostapd.conf', 'r') as f:
            lines = f.readlines()
        
        with open('/etc/hostapd/hostapd.conf', 'w') as f:
            for line in lines:
                if "wpa_passphrase=" in line:
                    line = "wpa_passphrase="+str(results.password)+"\n"
                elif "# BootFlag=" in line:
                    line = "# BootFlag=False"
                f.write(line)
  
    time.sleep(0.5)  
    os.system('sudo service hostapd stop')
    time.sleep(0.5)
    os.system('sudo service hostapd start')
    
except:
    print traceback.format_exc(1)
