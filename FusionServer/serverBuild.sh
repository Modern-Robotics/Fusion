#!/bin/bash

# ------------------------------------------------------------------------------
# Build procedure for FusionServer ---------------------------------------------
# ------------------------------------------------------------------------------
# Modification History:
#	13-Dec-2018 <jwa> - Changed process (with regard to the gulp tool) to
#		minimize the chance of failing the obfuscation stage.
#   27-Jul-2018 <jwa> - 
#	  1) Added install of autoconf pkg to prevent error when compiling libraries
#     2) Added additional descriptive console output to help the user keep track
#		 of what stage of the process we are running.
#-------------------------------------------------------------------------------


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
# Local Function Definitions
#==============================================================================

#---[ gap - adds a gap in the output ]-----------------
#
gap() {
   echo 
   echo
   echo
} #---[ end gap() ]------------------------ 



#==============================================================================
# Mainline begins here...

echo 
echo "$atBRT$fgBLU     ( ( ( ( ( FusionServer Build Processor ) ) ) ) )$atRST$fgNEU"
echo ""

# Install the autoconf package since several library builds require it
echo "$fgRED...Installing additional packages...$fgNEU"
apt-get install autoconf
echo

# Remove build directory if exists
echo "$fgRED...Removing existing Build directory...$fgNEU"
sudo rm -r Build
echo

# change to source directory
echo "$fgRED...Entering Source Directory...$fgNEU"
cd Src
if [[ $? != 0 ]]; then exit 1; fi

# run a full npm install
echo "$fgRED=============================================================================="
echo "   Beginning full nmp install  $fgNEU"
sudo npm install
if [[ $? != 0 ]]; then exit 2; fi
echo "$fgRED   Completed full npm install"
echo "==============================================================================$fgNEU"
gap

# globally install gulp 
echo "$fgRED=============================================================================="
echo "   Beginning global install of gulp v3.9.1  $fgNEU"
# remove link to gulp (if present) from /usr/Fusion-dev/FusionServer/Src/node-modules
if [[ -a Src/node-modules/gulp ]] ; then
	sudo rm -r Src/node-modules/gulp
fi
sudo npm install --global gulp@3.9.1
if [[ $? != 0 ]]; then exit 3; fi
echo "$fgRED   Completed global install of gulp v3.9.1"
echo "==============================================================================$fgNEU"
gap

# link the gulp file
echo "$fgRED=============================================================================="
echo "   Beginning linking the gulp file  $fgNEU"
sudo npm link gulp
if [[ $? != 0 ]]; then exit 4; fi
echo "$fgRED   Completed linking the gulp file"
echo "==============================================================================$fgNEU"
gap

# run gulp to obfuscate code
#   command line to do this: npm run-script build
echo "$fgRED=============================================================================="
echo "   Beginning code obfuscation  $fgNEU"
sudo npm run-script build
if [[ $? != 0 ]]; then exit 5; fi
echo "$fgRED   Completed code obfuscation"
echo "==============================================================================$fgNEU"
gap

#
# change to the Build directory 
#
echo "$fgRED...Moving to the Build directory...$fgNEU"
cd ../Build
if [[ $? != 0 ]]; then exit 6; fi
echo

# run production level install 
echo "$fgRED=============================================================================="
echo "   Beginning production level installation  $fgNEU"
sudo npm install --production 
if [[ $? != 0 ]]; then exit 7; fi
echo "$fgRED   Completed production level installation"
echo "==============================================================================$fgNEU"
gap

# successful completion of Fusion Server build process
echo "$atBRT$fgGRN=============================================================================="
echo  "   Fusion Server Built Successfully!       <...and the people say, AMEN!...>"
echo "==============================================================================$atRST$fgNEU"
gap

