#===============================================================================
# hostapd.recovery__npp.sh - FusionOS/WAP hostapd.conf recovery config file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File DID NOT EXIST
#
# Used when Internal WiFi Asset is a Wireless Access Point (WAP)
#     Runtime target: /etc/hostapd/hostapd.conf
#-------------------------------------------------------------------------------

# This is the name of the WiFi interface we configured above
interface=wlan0

# Use the nl80211 driver with the brcmfmac driver
driver=nl80211

# This is the name of the network
ssid=

# Use the 2.4GHz band
hw_mode=g

# Select Channel to use (6 is recommended)
channel=6

# Enable 802.11n
ieee80211n=1

# Enable WMM
wmm_enabled=1

# Enable 40MHz channels with 20ns guard interval
ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]

# Accept all MAC addresses
macaddr_acl=0

# Use WPA authentication
auth_algs=1

# Require clients to know the network name
ignore_broadcast_ssid=0

# Use WPA2
wpa=2

# Use a pre-shared key
wpa_key_mgmt=WPA-PSK

# The network passphrase
wpa_passphrase=mrifusion

# Use AES, instead of TKIP
rsn_pairwise=CCMP

#--[ SSIDSET_FLAG ]-----------------------------------------------------------------
# This Flag is used by ssid_set.py. When true, the set-script uses default settings
# Note: 1) This flag must be a comment since hostapd svc won't start if it isn't
#       2) There can be no space between the name and the '=' equal-sign
#       3) The True/False flag is CaSe SeNsItIvE
#       4) There must be a space between the # and the flagname
#       5) No other line in this file can contain the hash-space-flagname string.
# SSIDSET_FLAG=True
#
