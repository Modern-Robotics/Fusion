#/!bin/bash
#===============================================================================
# update.sh - FusionOS Update Script - from Version 1.0.0 and above
#-------------------------------------------------------------------------------
# Revision History
# 30-Apr-2019 <jwa> - Assorted adjustments to improve the install/update process;
#                     Added a command line argument to allow the branch to be
#                     passed to the script; bypass setting preservation when
#                     running in installation mode.
# 18-Apr-2019 <jwa> - Updated to correct the Update from/to messages and to
#                     manipulate the right files
# 13-Apr-2019 <jwa> - Updated to support the new customization files and the
#                     WiFi Port detect and assign feature.
# 11-Apr-2019 <jwa> - Modifications to support automatic detection of networking
#                     Ports and looking for Classroom Server WiFi Signal
# 20-Dec-2018 <jwa> - Enhanced updater to work as an installer if the target
#                     directory is not present.
# 13-Dec-2018 <jwa> - Added check for environment variable to request update
#                     to a named version
# 30-Nov-2018 <jwa> - Modified Library and Support Package installer section to
#                     properly find and install the necessary packages
# 19-Nov-2018 <jwa> - Preparation for Release Candidate 1.2.0a (4Q2018)
# 01-Nov-2018 <jwa> - Added SSID carry-forward support
# 31-Oct-2018 <jwa> - Enabled preservation of user file system
# 30-Oct-2018 <jwa> - Updated progress outputs
# 29-Oct-2018 <jwa> - Added kernel version check to prevent cross platform
#                     updates
#
#===============================================================================


#-<jwa>-----------------------------------------------
# Let's include a little color into the output using
# VT100 (TTY) Substitutions
ESC=
COL60=$ESC[60G

# Attributes    ;    Foregrounds     ;    Backgrounds
atRST=$ESC[0m   ;   fgBLK=$ESC[30m   ;   bgBLK=$ESC[40m
atBRT=$ESC[1m   ;   fgRED=$ESC[31m   ;   bgRED=$ESC[41m
atDIM=$ESC[2m   ;   fgGRN=$ESC[32m   ;   bgGRN=$ESC[42m
atUN1=$ESC[3m   ;   fgYEL=$ESC[33m   ;   bgYEL=$ESC[43m
atUND=$ESC[4m   ;   fgBLU=$ESC[34m   ;   bgBLU=$ESC[44m
atBLK=$ESC[5m   ;   fgMAG=$ESC[35m   ;   bgMAG=$ESC[45m
atUN2=$ESC[6m   ;   fgCYN=$ESC[36m   ;   bgCYN=$ESC[46m
atREV=$ESC[7m   ;   fgWHT=$ESC[37m   ;   bgWHT=$ESC[47m
atHID=$ESC[8m   ;   fgNEU=$ESC[39m   ;   bgNEU=$ESC[49m


#==============================================================================
# Control Flag Settings
#==============================================================================

FOS_DEBUG=0                 # =1 Skips steps during updater testing process
VERBOSE=0                   # =1 Outputs additional progress and status info

#------------------------------------------------------------------------------
# Local variables of importance:
MAIN_DIR="/usr/Fusion"      # Sets the location of the code

RUN_INSTALL=0               # 0=update, if no ${MAIN_DIR}, we set to 1
                            # 1=install


#==============================================================================
# Local Function Definitions
#==============================================================================

#---[ gap - adds a gap in the output ]-----------------
#
gap() {
   echo
   echo
   echo
} #---[ end gap() ]------------------------


#---[ vecho() - OUtputs text when the Verbose Flag is set ]-----------------
#
vecho() {
    if [[ ${VERBOSE} == 1 ]] ; then
        echo "$atBRT$fgBLU==> $* $atRST$fgNEU"
    fi
} #---[ end vecho() ]------------------------



#==============================================================================
#=====             M A I N L I N E   S T A R T S   H E R E                =====
#==============================================================================

echo "${atBRT}${fgBLU}"
echo "*************************************************************"
echo "*****   F U S I O N   F I R M W A R E   U P D A T E R   *****"
echo "*************************************************************"
echo "${atNEU}${fgNEU}"



#-------------------------------------------------------------------------------
# Check for the RunTime environment variable FRT_BRANCH or a command line
# argument. If either is present and non-null, use it to drive the update
# (NOTE: FRT_BRANCH must be set and exported from the command prompt to be
# available to this script.)
#
echo "Checking for the FRT_BRANCH variable: ${FRT_BRANCH}"
if [[ ${FRT_BRANCH} ]] ; then
    VERBOSE=1
    vecho "Updating to ${FRT_BRANCH}"
else
    if [[ $# -eq 1 ]] ; then
        FRT_BRANCH=${1}
        VERBOSE=1
        vecho "Argument passed, Updating to ${FRT_BRANCH}"
    fi
fi

vecho " "
vecho "<<<Verbose is Active>>>"


# -------------------------------------------------------------------
# Set the target path and check to see if it exists.  If it does,
# get the old version information.
#
if [[ !(-d ${MAIN_DIR}) ]] ; then
    # Target does not exist, we must be doing an install
    RUN_INSTALL=1
    FOS_OLDVER="Not Installed"
    echo "Target Directory not found; running in installer mode..."
else
    # Target exists, we are doing an update;  find the old version info
    if [[ !(-f ${MAIN_DIR}/version.txt) ]]; then
        # No version file, this is a really old version
        FOS_OLDVER="unknown"
    else
        # Version file exists - use it
        FOS_OLDVER=`cat /usr/Fusion/version.txt`
    fi
fi


# -------------------------------------------------------------------
# Get the new version info straight from the distribution server
#
if [[ ${FRT_BRANCH} ]] ; then
    FOS_NEWVER=`sudo curl --silent --show-error https://raw.githubusercontent.com/Modern-Robotics/Fusion/${FRT_BRANCH}/version.txt`
else
    LAST_TAG=`sudo git ls-remote --tags https://www.github.com/Modern-Robotics/Fusion.git | sudo tail -1 | cut -f1`
    FOS_NEWVER=`sudo curl --silent --show-error https://raw.githubusercontent.com/Modern-Robotics/Fusion/${LAST_TAG}/version.txt`
fi


#--------------------------------------------------------------------
# Check for kernel build version - abort update if incompatible
#
sudo cat /etc/os-release | grep "jessie" >/dev/null
if [[ $? != 0 ]] ; then
    echo
    echo
    echo
    echo "FusionOS UPDATE ERROR - Base version incompatible with update"
    echo
    echo
    echo "We are sorry, the software version currently installed on this Fusion cannot"
    echo "be updated using this service."
    echo
    echo "Please contact Modern Robotics Technical Support via email to"
    echo
    echo "   support@modernroboticsinc.com "
    echo
    echo "for assistance in manually updating your Fusion to the latest software."
    echo
    echo "Thank you."
    exit 255
fi

#--------------------------------------------------------------------
# Start the update/install process
#
if [[ ${RUN_INSTALL} -eq 0 ]] ; then
    echo "$atBRT$fgGRN"
    echo ">>>=============================================================="
    echo ">>>   BEGINNING UPDATE FROM ${FOS_OLDVER}"
    echo ">>>                      TO ${FOS_NEWVER}"
    echo ">>>=============================================================="
    echo
    echo ">>> This update process will take several minutes during which your screen may blank"
    echo ">>> or log you out of the Fusion Interface.  This is normal and does NOT signal completion"
    echo ">>> of the update."
    echo
    echo ">>> THE FUSION WILL POWER OFF WHEN THE UPDATE IS COMPLETE. <<<"
    echo "$atRST$fgNEU"
else
    echo "$atBRT$fgGRN"
    echo ">>>=============================================================="
    echo ">>>   BEGINNING INSTALLATION OF FUSIONSERVER RUNTIME PACKAGE"
    echo ">>>   Version = ${FOS_NEWVER}"
    echo ">>>=============================================================="
    echo
    echo ">>> This install  process will take several minutes during which your screen may blank. "
    echo ">>> This is normal and does NOT signal completion."
    echo
    echo ">>> THE FUSION WILL POWER OFF WHEN THE INSTALLATION IS COMPLETE. <<<"
    echo "$atRST$fgNEU"
fi


#--------------------------------------------------------------------
# If we are not running an install,
# Preserve the user's SSID, PassPhrase, and filesystem
# Otherwise, skip this section
#
if [[ ${RUN_INSTALL} -eq 0 ]] ; then
    echo
    echo ">>> Saving user settings, programs and files..."
    if [[ -d ${MAIN_DIR}/etc/config-wap ]] ; then
        # This unit is restructured for dynamic wireless asset assignments
        USER_SSID=`sudo cat ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh | grep -i "^ssid=" | cut -f2 -d'='`
        USER_PASSKEY=`sudo cat ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh | grep -i "^wpa_passphrase=" | cut -f2 -d'='`
        USER_BOOTFLAG=`sudo cat ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh | grep -i "BootFlag=" | cut -f2 -d'='`
        USER_SSIDSETFLAG=`sudo cat ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh | grep -i "^# SSIDSET_FLAG=" | cut -f2 -d'='`
        USER_CHANNEL=`sudo cat ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh | grep -i "^channel=" | cut -f2 -d'='`
    else
        # This unit is NOT restructured for dynamic wireless asset assignments
        USER_SSID=`sudo cat /etc/hostapd/hostapd.conf | grep -i "^ssid=" | cut -f2 -d'='`
        USER_PASSKEY=`sudo cat /etc/hostapd/hostapd.conf | grep -i "^wpa_passphrase=" | cut -f2 -d'='`
        USER_BOOTFLAG=`sudo cat /etc/hostapd/hostapd.conf | grep -i "BootFlag=" | cut -f2 -d'='`
        USER_SSIDSETFLAG=`sudo cat /etc/hostapd/hostapd.conf | grep -i "^# SSIDSET_FLAG=" | cut -f2 -d'='`
        USER_CHANNEL=`sudo cat /etc/hostapd/hostapd.conf | grep -i "^channel=" | cut -f2 -d'='`
    fi


    #--------------------------------------------------------------------
    # If the SSIDSETFLAG is empty, try to set it using the BOOTFLAG
    #
    if [[ -z ${USER_SSIDSETFLAG}  ]] ; then
        if [[ ${USER_BOOTFLAG} == "True" ]] ; then
            USER_SSIDSETFLAG=True
        else
            USER_SSIDSETFLAG=False
        fi
    fi

    vecho ">>>User WiFi Setings:"
    vecho "   SSID = ${USER_SSID} / Passkey = ${USER_PASSKEY}"
    vecho "   Bootflag = ${USER_BOOTFLAG} / SSID SetFlag = ${USER_SSIDSETFLAG}"
    vecho "   WiFi Channel = ${USER_CHANNEL}"
    vecho


    # The user filesystem space was up one level in the original releases but was moved down
    # to the Build directory.  This moves the file system from the old location to temporarily
    # save it.  After the update is complete, it will be moved to the proper resting place.
    #
    # The once properly placed, the filesystem is ignored by the update process and does not
    # require preservation during update.
    #
    if [ -d "${MAIN_DIR}/FusionServer/app/filesystem" ] ; then
        # The filesystem folder does exist... move it for safe keeping
        echo ">>> Saving user files..."
        sudo mv ${MAIN_DIR}/FusionServer/app/filesystem /root/savedfilesystem
    fi
fi
echo


# -------------------------------------------------------------------
# Update the Raspbian Library Repositories -- do we really need this?!?
#
sudo apt-get update -y
if [[ $? != 0 ]] ; then exit 2 ; fi

# -------------------------------------------------------------------
# Update/Set the system clock
#
sudo ntpd -q -g
#if [[ $? != 0 ]] ; then exit 3 ; fi

# -------------------------------------------------------------------
# Install git  (Already installed)
#
# sudo apt-get install git
# if [[ $? != 0 ]] ; then exit 3 ; fi


# -------------------------------------------------------------------
# Switch to target directory to begin synchronizing the local files
#   If the target directory does not exist, this must be an install,
#   not an update.  Take appropriate actions.

if [[ ${RUN_INSTALL} -eq 1 ]] ; then
    # This is an install so we need to clone the upstream repo to the local directory...
    sudo git clone https://www.github.com/Modern-Robotics/Fusion.git ${MAIN_DIR}
    if [[ $? != 0 ]] ; then exit 3; fi
    cd ${MAIN_DIR}
    if [[ $? != 0 ]] ; then exit 3; fi

else
    # This is an update, make sure the MAIN_DIR exists and start the update
    if [[ -d ${MAIN_DIR} ]] ; then
        cd $MAIN_DIR
        if [[ $? != 0 ]] ; then exit 4; fi
    fi

    # a) Revert the working files to match the local master
    sudo git reset -q --hard HEAD
    if [[ $? != 0 ]] ; then exit 5 ; fi

    # b) Delete any files the user may have created
    sudo git clean -f -q
    if [[ $? != 0 ]] ; then exit 5 ; fi

    # c) Update the local master
    sudo git fetch -f -q
    if [[ $? != 0 ]] ; then exit 5 ; fi
fi

    # d) Update the runtime image
    #    Check for the RunTime environment variable.
    if [[ ${FRT_BRANCH} ]] ; then
        sudo git checkout -f ${FRT_BRANCH}
        if [[ $? != 0 ]] ; then exit 5 ; fi
    else
        sudo git checkout -f -q $(sudo git rev-list --tags --max-count=1)
        if [[ $? != 0 ]] ; then exit 5 ; fi
    fi


#-------------------------------------------------------------------------------
# Configure the RPi's I/O devices and messaging:
#
# -----------------------------------------------
# Set /boot/config.txt to enable uart
#
if grep -q "#enable_uart=1" /boot/config.txt
then
    sudo sed -i "/#enable_uart=1/c\enable_uart=1" /boot/config.txt
    vecho "UART now enabled"
elif grep -q "enable_uart=1" /boot/config.txt
then
    vecho "UART already enabled"
else
    sudo echo | sudo tee -a /boot/config.txt
    sudo echo "enable_uart=1" | sudo tee -a /boot/config.txt
    vecho "UART now enabled"
fi
if [[ $? != 0 ]] ; then exit 6 ; fi


# -----------------------------------------------
# Set /boot/config.txt to enable i2c
#
if grep -q "#dtparam=i2c_arm=on" /boot/config.txt
then
    sudo sed -i "/#dtparam=i2c_arm=on/c\dtparam=i2c_arm=on" /boot/config.txt
    vecho "I2C now enabled"
elif grep -q "dtparam=i2c_arm=on" /boot/config.txt
then
    vecho "I2C already enabled"
else
    sudo echo | sudo tee -a /boot/config.txt
    sudo echo "dtparam=i2c_arm=on" | sudo tee -a /boot/config.txt
    vecho "I2C now enabled"
fi
if [[ $? != 0 ]] ; then exit 7 ; fi


# -----------------------------------------------
# Set /boot/config.txt to avoid warnings
#
if grep -q "#avoid_warnings=1" /boot/config.txt
then
    sudo sed -i "/#avoid_warnings=1/c\avoid_warnings=1" /boot/config.txt
    vecho "Warnings now disabled"
elif grep -q "avoid_warnings=1" /boot/config.txt
then
    vecho "Warnings already disabled"
else
    sudo echo | sudo tee -a /boot/config.txt
    sudo echo "avoid_warnings=1" | sudo tee -a /boot/config.txt
    vecho "Warnings now disabled"
fi
if [[ $? != 0 ]] ; then exit 8 ; fi


# -----------------------------------------------
# Update /etc/modules file with kernel for i2c-dev
#
if grep -q "#i2c-dev" /etc/modules
then
    sudo sed -i "/#i2c-dev/c\i2c-dev" /etc/modules
    vecho "i2c-dev now enabled"
elif grep -q "i2c-dev" /etc/modules
then
    vecho "i2c-dev already enabled"
else
    sudo echo | sudo tee -a /etc/modules
    sudo echo "i2c-dev" | sudo tee -a /etc/modules
    vecho "i2c-dev added and enabled"
fi
if [[ $? != 0 ]] ; then exit 9 ; fi

# -----------------------------------------------
# Update /etc/modules file with kernel for i2c-bcm2708
#
if grep -q "#i2c-bcm2708" /etc/modules
then
    sudo sed -i "/#i2c-bcm2708/c\i2c-bcm2708" /etc/modules
    vecho "i2c-bcm2708 now enabled"
elif grep -q "i2c-bcm2708" /etc/modules
then
    vecho "i2c-bcm2708 already enabled"
else
    sudo echo | sudo tee -a /etc/modules
    sudo echo "i2c-bcm2708" | sudo tee -a /etc/modules
    vecho "i2c-bcm2708 added and enabled"
fi
if [[ $? != 0 ]] ; then exit 10 ; fi


#==========================================================================================
# >>>JWA<<<  Isn't this already installed??  Make it part of MakeFusionOS and skip it here.
# -------------------------------------------------------------------
# Install diagnostic support
#
sudo apt-get install python-dev
#==========================================================================================


#==========================================================================================
# >>>JWA<<<  Isn't this already installed??  Make it part of MakeFusionOS and skip it here.
# -------------------------------------------------------------------
# Install virtual gamepad support
#
sudo apt-get install --fix-missing
sudo apt-get install libjpeg8-dev imagemagick libv4l-dev -y
#==========================================================================================

sudo ln -s --force /usr/include/linux/videodev2.h /usr/include/linux/videodev.h


# -------------------------------------------------------------------
# Uninstall Fusion library, remi and other runtime packages
#
sudo pip uninstall Fusion -y
sudo pip uninstall remi -y
sudo pip uninstall pylibftdi -y
#if [[ $? != 0 ]] ; then exit 22 ; fi


# -------------------------------------------------------------------
# Install Fusion library, remi and other runtime packages
#
if [[ `ls -1 ${MAIN_DIR}/lib/*.tar.gz | wc -l` -ne 0 ]] ; then
    sudo pip install $MAIN_DIR/lib/*.tar.gz
    if [[ $? != 0 ]] ; then exit 23 ; fi
fi

if [[ `ls -1 ${MAIN_DIR}/lib/*.deb | wc -l` -ne 0 ]] ; then
    sudo dpkg -i $MAIN_DIR/lib/*.deb
    if [[ $? != 0 ]] ; then exit 23 ; fi
fi

#==========================================================================================
# >>>JWA<<<  Isn't this already installed??  Make it part of MakeFusionOS and skip it here.
#Install hostapd and dnsmasq
#
sudo apt-get install hostapd -y
if [[ $? != 0 ]] ; then exit 27 ; fi

sudo apt-get install dnsmasq -y
if [[ $? != 0 ]] ; then exit 28 ; fi
#==========================================================================================


# -----------------------------------------------------------------------------------------
# Copy various configuration and interfaces files
#
#
# These have been moved to the WiFi control code and can be removed from this file
#
#---[ interfaces ]---------------------------------------------------
#sudo cp $MAIN_DIR/etc/interfaces /etc/network/interfaces
#if [[ $? != 0 ]] ; then exit 25 ; fi
#
#sudo chmod 644 /etc/network/interfaces
#if [[ $? != 0 ]] ; then exit 26 ; fi
#
#
#---[ dhcpcd.conf ]--------------------------------------------------
#sudo cp $MAIN_DIR/etc/dhcpcd.conf /etc/dhcpcd.conf
#if [[ $? != 0 ]] ; then exit 27 ; fi
#
#sudo chmod 644 /etc/dhcpcd.conf
#if [[ $? != 0 ]] ; then exit 28 ; fi
#
#
#--[ hostapd.conf ]--------------------------------------------------
#sudo cp $MAIN_DIR/etc/hostapd.conf /etc/hostapd/hostapd.conf
#if [[ $? != 0 ]] ; then exit 29 ; fi
#
#sudo chmod 644 /etc/hostapd/hostapd.conf
#if [[ $? != 0 ]] ; then exit 30 ; fi
#
#
#--[ hostapd ]-------------------------------------------------------
#sudo cp $MAIN_DIR/etc/hostapd /etc/default/hostapd
#if [[ $? != 0 ]] ; then exit 31 ; fi
#
#sudo chmod 644 /etc/default/hostapd
#if [[ $? != 0 ]] ; then exit 32 ; fi
#
#
#--[ dnsmasq.conf ]--------------------------------------------------
#sudo cp $MAIN_DIR/etc/dnsmasq.conf /etc/dnsmasq.conf
#if [[ $? != 0 ]] ; then exit 33 ; fi
#
#sudo chmod 644 /etc/dnsmasq.conf
#if [[ $? != 0 ]] ; then exit 34 ; fi
#

#
#--[ keyboard ]------------------------------------------------------
sudo cp $MAIN_DIR/etc/keyboard /etc/default/keyboard
if [[ $? != 0 ]] ; then exit 35 ; fi

sudo chmod 644 /etc/default/keyboard
if [[ $? != 0 ]] ; then exit 36 ; fi

#
# The name of this source file has been modified
#
#--[ rc.local ]------------------------------------------------------
sudo cp $MAIN_DIR/etc/rc.local__npp.sh /etc/rc.local
if [[ $? != 0 ]] ; then exit 40 ; fi

sudo chmod 755 /etc/rc.local
if [[ $? != 0 ]] ; then exit 41 ; fi


if [[ ${FOS_DEBUG} != 1 ]] ; then
    sudo cp $MAIN_DIR/etc/vncserver-x11 /root/.vnc/config.d/vncserver-x11
    if [[ $? != 0 ]] ; then exit 42 ; fi

    sudo chmod 700 /root/.vnc/config.d/vncserver-x11
    if [[ $? != 0 ]] ; then exit 43 ; fi
fi


#--------------------------------------------------------------------
# Restore user settings and files
#
# This line didn't work:
# sudo sed -i -e "/${SED_MATCH}/c"${SED_REPLACE}${USER_SSIDSETFLAG}"" ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh
# ...so, since sed doesn't like # in its command's we'll make a couple of variables to use instead:
#
SED_MATCH="^# SSIDSET_FLAG="
SED_REPLACE="# SSIDSET_FLAG="
echo
echo ">>> Restoring user settings, programs and files..."

sudo sed -i -e "/^ssid=/c"ssid=${USER_SSID}"" ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh
sudo sed -i -e "/^wpa_passphrase=/c"wpa_passphrase=${USER_PASSKEY}"" ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh
sudo sed -i -e "/$SED_MATCH/c$SED_REPLACE$USER_SSIDSETFLAG" ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh
sudo sed -i -e "/^channel=/c"channel=${USER_CHANNEL}"" ${MAIN_DIR}/etc/config-wap/hostapd.conf__npp.sh




# Restore the old-style user filesystem to the proper resting place.
#
if [[ -d /root/savedfilesystem ]] ; then
    # There is an old version filesystem folder... move it back
    echo ">>>  Restoring old user files"
    sudo mv /root/savedfilesystem ${MAIN_DIR}/FusionServer/Build/app/filesystem
fi

echo

echo ">>> Running Final Clean-up..."
sudo rm -rf /root/filesystem
echo "..."
sudo rm -rf /usr/Fusion/FusionServer/app

echo
echo ">>>======================================"
echo ">>>   UPDATE COMPLETED SUCCESSFULLY!"
echo ">>>======================================"
echo
echo ">>> The System will now power down <<<"
echo

if [[ ${FOS_DEBUG} != 1 ]] ; then
    echo "<<<  S H U T I N G   D O W N  >>>"
    sleep 5
    sudo shutdown now -P
fi

exit 0
