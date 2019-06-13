#===============================================================================
# hostapd__npp.sh - FusionOS/NIC hostapd control file
#-------------------------------------------------------------------------------
# 13-Apr-2019 <jwa> - Original Debian Jessie Configuration File
#
# Used when Internal WiFi Asset is a Network Interface (NIC)
#     Runtime target: /etc/default/hostapd
#-------------------------------------------------------------------------------

# Defaults for hostapd initscript
#
# See /usr/share/doc/hostapd/README.Debian for information about alternative
# methods of managing hostapd.
#
# Uncomment and set DAEMON_CONF to the absolute path of a hostapd configuration
# file and hostapd will be started during system boot. An example configuration
# file can be found at /usr/share/doc/hostapd/examples/hostapd.conf.gz
#
# <jwa>  Since the DAEMON_CONF assignment is commented out,
#        the hostapd service will not be started
#
#DAEMON_CONF=""

# Additional daemon options to be appended to hostapd command:-
# 	-d   show more debug messages (-dd for even more)
# 	-K   include key data in debug messages
# 	-t   include timestamps in some debug messages
#
# Note that -B (daemon mode) and -P (pidfile) options are automatically
# configured by the init.d script and must not be added to DAEMON_OPTS.
#
#DAEMON_OPTS=""
