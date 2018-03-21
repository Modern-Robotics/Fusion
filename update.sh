#!/bin/bash

# -------------------------------------------------------------------
# Default argument values
ADDRESS=https://github.com/Modern-Robotics/Fusion.git
MAIN_DIR=/usr/Fusion
# PYTHON_TAR=Fusion*

# -------------------------------------------------------------------
# Update the repositories
sudo apt-get update -y 
if [[ $? != 0 ]]; then exit 2; fi

# -------------------------------------------------------------------
# Clone github repo
# sudo apt-get install git
# if [[ $? != 0 ]]; then exit 3; fi

cd $MAIN_DIR
if [[ $? != 0 ]]; then exit 4; fi

sudo git checkout master
sudo git fetch 
sudo git reset --hard $(sudo git rev-list --tags --max-count=1)
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
# Get and install node and npm
# sudo apt-get install node -y
# if [[ $? != 0 ]]; then exit 11; fi

# sudo apt-get install npm -y
# if [[ $? != 0 ]]; then exit 12; fi

# sudo npm cache clean -f
# if [[ $? != 0 ]]; then exit 13; fi

# sudo npm install -g n
# if [[ $? != 0 ]]; then exit 14; fi

# sudo n stable
# if [[ $? != 0 ]]; then exit 15; fi

# -------------------------------------------------------------------
# Get and install forever package to keep node server alive
# sudo npm install forever -g

# -------------------------------------------------------------------
# Install MongoDB dependency
# sudo apt-get install mongodb -y
# if [[ $? != 0 ]]; then exit 16; fi

# sudo service mongodb start
# if [[ $? != 0 ]]; then exit 17; fi

# -------------------------------------------------------------------
# Install smbus I2C support
# sudo apt-get install python-smbus -y
# if [[ $? != 0 ]]; then exit 18; fi

# -------------------------------------------------------------------
# Install camera tracking support 
# sudo pip install imutils
# if [[ $? != 0 ]]; then exit 19; fi

# sudo apt-get install libopencv-dev -y
# if [[ $? != 0 ]]; then exit 20; fi

# sudo apt-get install python-opencv -y
# if [[ $? != 0 ]]; then exit 21; fi

# -------------------------------------------------------------------
# Install Fusion library
sudo pip uninstall Fusion -y
#if [[ $? != 0 ]]; then exit 22; fi

sudo pip install $MAIN_DIR/lib/Fusion*
if [[ $? != 0 ]]; then exit 23; fi

# -------------------------------------------------------------------
# Copy interfaces file 
# sudo cp $MAIN_DIR/etc/interfaces /etc/network/interfaces
# if [[ $? != 0 ]]; then exit 25; fi

# sudo chmod 644 /etc/network/interfaces
# if [[ $? != 0 ]]; then exit 26; fi

# Install hostapd and dnsmasq 
# sudo apt-get install hostapd -y
# if [[ $? != 0 ]]; then exit 27; fi

# sudo apt-get install dnsmasq -y
# if [[ $? != 0 ]]; then exit 28; fi

sudo cp $MAIN_DIR/etc/rc.local /etc/rc.local
if [[ $? != 0 ]]; then exit 40; fi

sudo chmod 755 /etc/rc.local
if [[ $? != 0 ]]; then exit 41; fi

echo 
echo "Update completed successfully!"

sudo reboot

exit 0
