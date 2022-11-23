#!/bin/bash
#===============================================================================
# updateFusion.sh - script that launches the updater from the distribution
#   repository
#
# Revision History:
# 19-Nov-2018 <jwa> - silenced curl's progress bar except for errors.
#
#===============================================================================
#
sudo curl --silent --show-error https://raw.githubusercontent.com/Modern-Robotics/Fusion/Recruit/install | sudo bash
