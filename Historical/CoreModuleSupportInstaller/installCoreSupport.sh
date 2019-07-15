#!/bin/bash

ADDRESS=http://www.modernroboticsinc.com/downloads
ARCHIVE=coreInstall.zip
FOLDER=temp_files_core_install

# -------------------------------------------------------------------
# wget the zip archive 
sudo wget $ADDRESS/$ARCHIVE 
sudo unzip $ARCHIVE
rm -r $ARCHIVE

# -------------------------------------------------------------------
# Install Fusion library
sudo pip uninstall Fusion -y
sudo pip uninstall pylibftdi -y

sudo rm -r /usr/local/lib/python2.7/dist-packages/Fusion*

sudo pip install $FOLDER/*.tar.gz
sudo dpkg -i $FOLDER/*.deb

sudo cp -R /usr/local/lib/python2.7/dist-packages/CoreControl/examples /usr/local/lib/python2.7/dist-packages/Fusion/examples/CoreDevices
sudo rm -r $FOLDER 

sudo forever restartall

exit 0
