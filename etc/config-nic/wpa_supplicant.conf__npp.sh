#===============================================================================
# wpa_supplicant.conf__npp.sh - FusionOS/NIC wpa_supplicant configuration file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File
#
# Used when Internal WiFi Asset is a Network Interface (NIC)
#     Runtime target: /etc/wpe_supplicant/wpa_supplicant.conf
#-------------------------------------------------------------------------------

ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

