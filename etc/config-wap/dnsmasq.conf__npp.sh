#===============================================================================
# dnsmasq.conf__npp.sh - FusionOS/WAP dnsmasq.conf configuration file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File
#
# Used when Internal WiFi Asset is a Wireless Access Point (WAP)
#   Runtime target: /etc/dnsmasq.conf
#===============================================================================
#
# The Fusion_AP uses dnsmasq services for dhcp and name resolution.
# This configuration assures that the mybot.host file is read to provide name
# access to the FusionOS.
#-------------------------------------------------------------------------------
# REVISION HISTORY:
# 03-Apr-18 <jwa> - Added host name file
#
#===============================================================================

interface=wlan0      							# Use interface wlan0  
listen-address=192.168.50.1 					# Explicitly specify the address to listen on  
bind-interfaces      							# Bind to the interface to make sure we aren't sending things elsewhere  
addn-hosts=/usr/Fusion/etc/mybothost			# Include the mybot hosts file
server=8.8.8.8       							# Forward DNS requests to Google DNS  
domain-needed        							# Don't forward short names  
bogus-priv           							# Never forward addresses in the non-routed address spaces.  
dhcp-range=192.168.50.50,192.168.50.150,12h		# Assign IP addresses between 172.24.1.50 and 172.24.1.150 with a 12 hour lease time  
