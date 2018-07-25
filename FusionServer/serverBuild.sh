#!/bin/bash

# -----------------------------------------------------------------------------
# Build procedure for FusionServer -------------------------------------------- 
# -----------------------------------------------------------------------------

# Remove build directory if exists
sudo rm -r Build

# change to source directory
cd Src
if [[ $? != 0 ]]; then exit 1; fi

# run a full npm install
sudo npm install
if [[ $? != 0 ]]; then exit 2; fi

# globally install gulp 
sudo npm install --global gulp
if [[ $? != 0 ]]; then exit 3; fi

# link the gulp file
sudo npm link gulp
if [[ $? != 0 ]]; then exit 4; fi

# run gulp to obfuscate code
sudo gulp 
if [[ $? != 0 ]]; then exit 5; fi

# change to build directory 
cd ../Build
if [[ $? != 0 ]]; then exit 6; fi

# run production level install 
sudo npm install --production 
if [[ $? != 0 ]]; then exit 7; fi
