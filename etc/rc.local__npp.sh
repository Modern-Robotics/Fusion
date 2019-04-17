#!/bin/bash
#
#===============================================================================
# File: rc.local  (Fusion Version)
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# This file gets moved to /etc by the Fusion Installer/Updater, and 
# is renamed to remove the __npp.sh suffix.
#
#-------------------------------------------------------------------------------
# REVISION HISTORY:
# 13-Apr-19 <jwa> - Revised to copy the NIC/WAP files to their proper locations
#                   and (re)start the necessary services.
# 11-Apr-19 <jwa> - Modified to check for internal and external wireless assets
#                   and use the internal asset as a NIC as necessary
# 03-Apr-18 <jwa> - Added host name to dns service and TCP Port redirect
#
#===============================================================================

export MAIN_DIR="/usr/Fusion/"

export LOGPATH="${MAIN_DIR}/etc/logs"       # Logfile path (makes if missing)
export BOOTLOG="${LOGPATH}/bootlog.txt"     # Logfile full name

export DEBUG="FALSE"                        # Follows logic but takes no actions
export FUSION="TRUE"                        # Launches FusionServer when TRUE
export LOGFLOW="TRUE"                       # Outputs progress info to log file


#===============================================================================
# Local Function Definitions
#===============================================================================

#---[ lecho - Outputs argument(s) to the ${BOOTLOG} file if enabled ]------
#
lecho() {

    if [ ${LOGFLOW} == "TRUE" ]; then
        sudo echo $* >> ${BOOTLOG}
    fi

} #---[ end lecho() ]------------------------


#---[ Mode_AccessPoint - configures the Internal WiFi as an Access Point ]------
#
Mode_AccessPoint() {

    lecho "Running with Internal Access Point"
    if [ ${DEBUG} == "TRUE" ]; then
        return 0
    fi

    # 1a) Copy the config-wap fileset to the /etc... directories
    sudo cp ${MAIN_DIR}/etc/config-wap/dhcpcd.conf__npp.sh              /etc/dhcpcd.conf
    sudo cp ${MAIN_DIR}/etc/config-wap/dnsmasq.conf__npp.sh             /etc/dnsmasq.conf
    sudo cp ${MAIN_DIR}/etc/config-wap/dnsmasq__npp.sh                  /etc/default/dnsmasq
    sudo cp ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh             /etc/hostapd/hostapd.conf
    sudo cp ${MAIN_DIR}/etc/config-wap/hostapd__npp.sh                  /etc/default/hostapd
    sudo cp ${MAIN_DIR}/etc/config-wap/interfaces__npp.sh               /etc/network/interfaces
    sudo cp ${MAIN_DIR}/etc/config-wap/networking__npp.sh               /etc/default/networking
    sudo cp ${MAIN_DIR}/etc/config-wap/wpa_supplicant.conf__npp.sh      /etc/wpa_supplicant/spa_supplicant.conf

    # 1b) Set the proper permission bits on the new files
    sudo chmod 664 /etc/dhcpcd.conf
    sudo chmod 644 /etc/dnsmasq.conf
    sudo chmod 644 /etc/default/dnsmasq
    sudo chmod 644 /etc/hostapd/hostapd.conf
    sudo chmod 644 /etc/default/hostapd
    sudo chmod 644 /etc/network/interfaces
    sudo chmod 644 /etc/default/networking
    sudo chmod 644 /etc/wpa_supplicant/spa_supplicant.conf
    
    
    # 2) Bring up wlan0 and (Re)Start the services
    sudo ifup wlan0
    sleep 0.25
    
    sudo invoke-rc.d hostapd start 
    sudo invoke-rc.d dnsmasq start

    sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

    # 4) Set-up the iptables routing rules
    sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE
    sudo iptables -A FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o wlan1 -j ACCEPT

    sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

    sudo iptables -t nat -I PREROUTING --src 0/0 --dst 192.168.50.1 -p tcp --dport 80 -j REDIRECT --to-port 8080

    # 5) Set the ssid
    sudo python ${MAIN_DIR}/etc/ssid_set.py -b -w ${WAPT}

    # 6) Start dhcpcd
    sudo dhcpcd

} #---[ end Mode_AccessPoint() ]------------------------


#---[ Mode_NetworkInterface - configures the Internal WiFi as a Network Interface ]------
#
Mode_NetworkInterface() {

    lecho "Running with Internal Network Interface"
    if [ ${DEBUG} == "TRUE" ]; then
        return 0
    fi
    
    # 2) Copy the config-wap fileset to the /etc... directories
    sudo cp ${MAIN_DIR}/etc/config-nic/dhcpcd.conf__npp.sh              /etc/dhcpcd.conf
    sudo cp ${MAIN_DIR}/etc/config-nic/dnsmasq.conf__npp.sh             /etc/dnsmasq.conf
    sudo cp ${MAIN_DIR}/etc/config-nic/dnsmasq__npp.sh                  /etc/default/dnsmasq
    sudo cp ${MAIN_DIR}/etc/config-nic/hostapd.conf__npp.sh             /etc/hostapd/hostapd.conf
    sudo cp ${MAIN_DIR}/etc/config-nic/hostapd__npp.sh                  /etc/default/hostapd
    sudo cp ${MAIN_DIR}/etc/config-nic/interfaces__npp.sh               /etc/network/interfaces
    sudo cp ${MAIN_DIR}/etc/config-nic/networking__npp.sh               /etc/default/networking
    sudo cp ${MAIN_DIR}/etc/config-nic/wpa_supplicant.conf__npp.sh      /etc/wpa_supplicant/spa_supplicant.conf

    # 3) Set the proper permission bits on the new files
    sudo chmod 664 /etc/dhcpcd.conf
    sudo chmod 644 /etc/dnsmasq.conf
    sudo chmod 644 /etc/default/dnsmasq
    sudo chmod 644 /etc/hostapd/hostapd.conf
    sudo chmod 644 /etc/default/hostapd
    sudo chmod 644 /etc/network/interfaces
    sudo chmod 644 /etc/default/networking
    sudo chmod 644 /etc/wpa_supplicant/spa_supplicant.conf

    
    # 4) Bring up wlan0 and (Re)Start the services 
    sudo ifup wlan0
    sleep 0.25
    
    sudo invoke-rc.d hostapd start 
    sudo invoke-rc.d dnsmasq start

    sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

    # 4) Set-up the iptables routing rules
    sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE
    sudo iptables -A FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o wlan1 -j ACCEPT

    sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

    # 5) Set the ssid
    sudo python ${MAIN_DIR}/etc/ssid_set.py -b -w ${WAPT}

    # 6) Start dhcpcd
    sudo dhcpcd 


} #---[ end Mode_NetworkInterface() ]------------------------


#---[ Launch_FusionServer - Starts the Fusion Server ]------
#
Launch_FusionServer() {

    sleep 5
    
    lecho "Launching the Fusion Server:"
    lecho "     sudo NODE_ENV=production WIRE_NET=${ENET} WIFI_WAP=${WAPT} WIFI_NIC=${WIFI} forever start server.js"

    if [ ${DEBUG} == "TRUE" ]; then
        return 0
    fi
    
    # Start the Fusion Server (if not in test mode...)
    if [ ${FUSION} == "TRUE" ]; then
        # Switch to the application server directory
        cd /${MAIN_DIR}/FusionServer/Build

        # Launch node.js and the Fusion Server
        sudo NODE_ENV=production WIRE_NET=${ENET} WIFI_WAP=${WAPT} WIFI_NIC=${WIFI} forever start server.js

        # Launch the VNC service
        cd ${MAIN_DIR}/lib/noVNC
        sudo ./utils/launch.sh &

        # Print the IP address  (that really, no one ever sees....)
        _IP=$(hostname -I) || true
        if [ "$_IP" ]; then
            printf "My IP address is %s\n" "$_IP"
        fi
    fi
    
} #---[ end Launch_FusionServer() ]------------------------


#===============================================================================
#==========           S T A R T   O F   M A I N L I N E              ==========#
#===============================================================================

# Let's log this startup.....
#
sudo mkdir -p -m 777 ${LOGPATH}
lecho " " 
lecho " "
lecho " "
lecho `date`
lecho "System boot -- rc.local is active" 

# Start the MongoDB Service
sudo invoke-rc.d mongodb start 

# Put a good interfaces file into /etc/network/interfaces and bring up wlan0
sudo ifdown wlan0
sudo service hostapd stop
sudo cp ${MAIN_DIR}/etc/config-nic/interfaces__npp.sh /etc/network/interfaces
sudo chmod 644 /etc/network/interfaces
sudo ifup wlan0

# Scan and identify the networking assets
sudo chmod a+x ${MAIN_DIR}/etc/scanports.sh
sudo ${MAIN_DIR}/etc/scanports.sh


# Include the resulting variables
source ${MAIN_DIR}/etc/portassigns
lecho "Port Assignments on Entry:"
sudo cat ${MAIN_DIR}/etc/portassigns >> ${BOOTLOG}

# Before we take wlan0 down again, see if there's a Classroom Server nearby
MYBOT_SCAN=(`sudo iwlist ${WAPT} scan | grep "MyBot_Community_WiFi"`)
lecho ${MYBOT_SCAN}

# Take down wlan0 in preparation for possible changes
sudo ifdown wlan0


# Did we find an external WiFi Asset?  If not, we need to figure out if we're
# going to connect to a Classroom Server before we convert the internal wireless
# asset to be an access point
if [[ ${WIFI} == "NULL" ]]; then

    # We do not have an external WiFi Asset.  Did our search return a hit?
    if [ -z ${MYBOT_SCAN} ]; then
    
        # No!  We can configure the Internal Wireless Asset as an Access Point  
        lecho "Configuring for Standalone Mode"
                
        Mode_AccessPoint
        Launch_FusionServer
        
    else
    
        # Yes! That means we need to keep the Internal WiFi Asset as a NIC
        lecho "Configuring for Community Mode"

        # It also means that we need to swap the port assignments and rewrite the 
        # portassigns file...  We need these to tell the FusionServer what the parts
        # are being used for
        #
        WIFI=${WAPT}
        WAPT="NULL"

        # rewrite the portassigns file
        #
        sudo echo "export ENET=${ENET}"  > ${MAIN_DIR}/etc/portassigns
        sudo echo "export WAPT=${WAPT}" >> ${MAIN_DIR}/etc/portassigns
        sudo echo "export WIFI=${WIFI}" >> ${MAIN_DIR}/etc/portassigns
        
        # Since we modified the port assignments, let's put something in the log file
        lecho "Port Assignments Modified. New assignments:"
        sudo cat ${MAIN_DIR}/etc/portassigns >> ${BOOTLOG}

        Mode_NetworkInterface
        Launch_FusionServer

    fi
    
else

    # We have an external wireless asset so we'll come up in normal 2-port mode
    lecho "Configuring for Normal 2-Port Mode"

    Mode_AccessPoint
    Launch_FusionServer
    
fi

exit 0
