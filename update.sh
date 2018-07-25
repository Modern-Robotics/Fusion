#!/bin/bash

# -------------------------------------------------------------------
# Default argument values
MAIN_DIR=/usr/Fusion

# -------------------------------------------------------------------
# Update the repositories
sudo apt-get update -y 
if [[ $? != 0 ]]; then exit 2; fi

# -------------------------------------------------------------------
# Update the system clock 
sudo ntpd -q -g
#if [[ $? != 0 ]]; then exit 3; fi

# -------------------------------------------------------------------
# Clone github repo
# sudo apt-get install git
# if [[ $? != 0 ]]; then exit 3; fi

sudo cp -R $MAIN_DIR/FusionServer/app/filesystem /root

cd $MAIN_DIR
if [[ $? != 0 ]]; then exit 4; fi

sudo git checkout master
sudo git pull
if [[ $? != 0 ]]; then exit 5; fi

# -------------------------------------------------------------------
# Set boot to enable uart
if grep -q "#enable_uart=1" /boot/config.txt 
then
    sudo sed -i "/#enable_uart=1/c\enable_uart=1" /boot/config.txt
    echo "UART now enabled"
elif grep -q "enable_uart=1" /boot/config.txt 
then
    echo "UART already enabled"
else 
    sudo echo | sudo tee -a /boot/config.txt 
    sudo echo "enable_uart=1" | sudo tee -a /boot/config.txt
    echo "UART now enabled"
fi
if [[ $? != 0 ]]; then exit 6; fi

# -------------------------------------------------------------------
# Set boot to enable i2c
if grep -q "#dtparam=i2c_arm=on" /boot/config.txt 
then
    sudo sed -i "/#dtparam=i2c_arm=on/c\dtparam=i2c_arm=on" /boot/config.txt
    echo "I2C now enabled"
elif grep -q "dtparam=i2c_arm=on" /boot/config.txt 
then
    echo "I2C already enabled"
else 
    sudo echo | sudo tee -a /boot/config.txt 
    sudo echo "dtparam=i2c_arm=on" | sudo tee -a /boot/config.txt
    echo "I2C now enabled"
fi
if [[ $? != 0 ]]; then exit 7; fi

# -------------------------------------------------------------------
# Set boot to avoid warnings
if grep -q "#avoid_warnings=1" /boot/config.txt 
then
    sudo sed -i "/#avoid_warnings=1/c\avoid_warnings=1" /boot/config.txt
    echo "Warnings now disabled"
elif grep -q "avoid_warnings=1" /boot/config.txt 
then
    echo "Warnings already disabled"
else 
    sudo echo | sudo tee -a /boot/config.txt 
    sudo echo "avoid_warnings=1" | sudo tee -a /boot/config.txt
    echo "Warnings now disabled"
fi
if [[ $? != 0 ]]; then exit 8; fi

# -------------------------------------------------------------------
# Update module file with kernel for i2c-dev
if grep -q "#i2c-dev" /etc/modules 
then
    sudo sed -i "/#i2c-dev/c\i2c-dev" /etc/modules
    echo "i2c-dev now enabled"
elif grep -q "i2c-dev" /etc/modules
then
    echo "i2c-dev already enabled"
else 
    sudo echo | sudo tee -a /etc/modules 
    sudo echo "i2c-dev" | sudo tee -a /etc/modules
    echo "i2c-dev added and enabled"
fi
if [[ $? != 0 ]]; then exit 9; fi

# -------------------------------------------------------------------
# Update module file with kernel for i2c-bcm2708
if grep -q "#i2c-bcm2708" /etc/modules 
then
    sudo sed -i "/#i2c-bcm2708/c\i2c-bcm2708" /etc/modules
    echo "i2c-bcm2708 now enabled"
elif grep -q "i2c-bcm2708" /etc/modules
then
    echo "i2c-bcm2708 already enabled"
else 
    sudo echo | sudo tee -a /etc/modules 
    sudo echo "i2c-bcm2708" | sudo tee -a /etc/modules
    echo "i2c-bcm2708 added and enabled"
fi
if [[ $? != 0 ]]; then exit 10; fi

# -------------------------------------------------------------------
# Install diagnostic support
sudo apt-get install python-dev 

# -------------------------------------------------------------------
# Install virtual gamepad support 
sudo apt-get update 
sudo apt-get install --fix-missing
sudo apt-get install libjpeg8-dev imagemagick libv4l-dev -y
sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h

# -------------------------------------------------------------------
# Install Fusion library
sudo pip uninstall Fusion -y
sudo pip uninstall remi -y
sudo pip uninstall pylibftdi -y
#if [[ $? != 0 ]]; then exit 22; fi

sudo pip install $MAIN_DIR/lib/*.tar.gz
if [[ $? != 0 ]]; then exit 23; fi

sudo dpkg -i $MAIN_DIR/lib/*.deb
if [[ $? != 0 ]]; then exit 23; fi

#Install hostapd and dnsmasq 
sudo apt-get install hostapd -y
if [[ $? != 0 ]]; then exit 27; fi

sudo apt-get install dnsmasq -y
if [[ $? != 0 ]]; then exit 28; fi

# -------------------------------------------------------------------
# Copy interfaces file 

sudo cp $MAIN_DIR/etc/interfaces /etc/network/interfaces
if [[ $? != 0 ]]; then exit 25; fi

sudo chmod 644 /etc/network/interfaces
if [[ $? != 0 ]]; then exit 26; fi

sudo cp $MAIN_DIR/etc/dhcpcd.conf /etc/dhcpcd.conf 
if [[ $? != 0 ]]; then exit 27; fi

sudo chmod 644 /etc/dhcpcd.conf 
if [[ $? != 0 ]]; then exit 28; fi

sudo cp $MAIN_DIR/etc/hostapd.conf /etc/hostapd/hostapd.conf 
if [[ $? != 0 ]]; then exit 29; fi

sudo chmod 644 /etc/hostapd/hostapd.conf 
if [[ $? != 0 ]]; then exit 30; fi

sudo cp $MAIN_DIR/etc/hostapd /etc/default/hostapd 
if [[ $? != 0 ]]; then exit 31; fi

sudo chmod 644 /etc/default/hostapd
if [[ $? != 0 ]]; then exit 32; fi

sudo cp $MAIN_DIR/etc/dnsmasq.conf /etc/dnsmasq.conf 
if [[ $? != 0 ]]; then exit 33; fi

chmod 644 /etc/dnsmasq.conf 
if [[ $? != 0 ]]; then exit 34; fi

sudo cp $MAIN_DIR/etc/keyboard /etc/default/keyboard
if [[ $? != 0 ]]; then exit 35; fi

chmod 644 /etc/default/keyboard
if [[ $? != 0 ]]; then exit 36; fi

sudo cp $MAIN_DIR/etc/rc.local /etc/rc.local
if [[ $? != 0 ]]; then exit 40; fi

sudo chmod 755 /etc/rc.local
if [[ $? != 0 ]]; then exit 41; fi

sudo cp $MAIN_DIR/etc/vncserver-x11 /root/.vnc/config.d/vncserver-x11
if [[ $? != 0 ]]; then exit 42; fi

sudo chmod 700 /root/.vnc/config.d/vncserver-x11 
if [[ $? != 0 ]]; then exit 43; fi

sudo cp -R /root/filesystem $MAIN_DIR/FusionServer/Build/app
sudo rm -r /root/filesystem
sudo rm -r /usr/Fusion/FusionServer/app

echo 
echo "Update completed successfully!"

sudo reboot

exit 0
