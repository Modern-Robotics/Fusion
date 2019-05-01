#===============================================================================
# interfaces__npp.sh - FusionOS/WAP interfaces control file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File
#
# Used when Internal WiFi Asset is a Wireless Access Point (WAP)
#     Runtime target: /etc/network/interfaces
#==============================================================================
#
# Fusion /etc/default/interfaces File
#
# Revision History:
# 	19-Nov-18 <jwa> - Added 172.16.0.1 to dns-nameservers for wlan1
#
#==============================================================================

# interfaces(5) file used by ifup(8) and ifdown(8)
#
# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'
#
# Include files from /etc/network/interfaces.d:

source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual
    dns-nameservers 8.8.8.8 8.8.8.4

allow-hotplug wlan0  
iface wlan0 inet static  
    address 192.168.50.1
    netmask 255.255.255.0
    network 192.168.50.0
    broadcast 192.168.50.255
    
allow-hotplug wlan1
iface wlan1 inet manual
    dns-nameservers 172.16.0.1 8.8.8.8 8.8.8.4
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
