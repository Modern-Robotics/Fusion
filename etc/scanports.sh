#!/bin/bash
#===============================================================================
# ports.sh - Shell script to identify the networking ports
#===============================================================================
#
# This script is used to identify the networking ports and assign Environment
# variables to point at the ports being used for wired Ethernet, wireless
# Ethernet, and wireless access point.
#
#-------------------------------------------------------------------------------
# Revision History:
#   01-Apr-2019 <jwa> - Original Version
#
#===============================================================================


#==============================================================================
# Start of Script Mainline
#
# Get the interface configurations for all the ports and only keep those with
# MAC Addresses (HWaddr)
#

# output the ifconfig info to the log file...
echo "In ScanPorts.sh..." >>/usr/Fusion/etc/logs/bootlog.txt

_PORTS=(`ifconfig -a | grep "HWaddr"`)

ENET="NULL"
WIFI="NULL"
WAPT="NULL"

let i=0
while [ ! -z ${_PORTS[$i]} ]; do

	MACOUI=`echo ${_PORTS[i+4]} | cut -d: -f1-3`
	PORTTYPE=`echo ${_PORTS[$i]} | cut -c1-3`
	if [[ ${MACOUI} == "b8:27:eb" || ${MACOUI} == "dc:a6:32" ]]; then

		# Internal Assets
		if [[ ${PORTTYPE} == "eth" ]]; then
			if [[ ${ENET} == "NULL" ]]; then
				ENET=${_PORTS[$i]}
			fi
		elif [[ ${PORTTYPE} == "wla" ]]; then
			if [[ ${WAPT} == "NULL" ]]; then
				WAPT=${_PORTS[$i]}
			fi
		fi
	else
		# External Assets
		if [[ ${PORTTYPE} == "wla" ]]; then
			if [[ ${WIFI} == "NULL" ]]; then
				WIFI=${_PORTS[$i]}
			fi
		fi
	fi
	
	let i=i+5
done

#-------------------------------------------------------------------------------
# Since you can't easily export Environment Variables to the PARENT process,
# we'll write the stuff to a file and can then 'source' the file in other 
# scripts to get these variables to make decisions based on.
#
# We'll use /usr/Fusion/etc/portassigns as the file, and it gets rewritten each
# time we run this process
#
echo "export ENET=${ENET}"  > /usr/Fusion/etc/portassigns
echo "export WAPT=${WAPT}" >> /usr/Fusion/etc/portassigns
echo "export WIFI=${WIFI}" >> /usr/Fusion/etc/portassigns






































