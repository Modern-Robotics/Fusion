#===============================================================================
# interfaces__npp.sh - FusionOS/NIC interfaces control file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File
#
# Used when Internal WiFi Asset is a Network Interface (NIC)
#     Runtime target: /etc/network/interfaces
#-------------------------------------------------------------------------------

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

allow-hotplug wlan0
iface wlan0 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
