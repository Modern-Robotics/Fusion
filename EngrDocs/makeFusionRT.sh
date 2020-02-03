#!/bin/bash
#
#===============================================================================
# makeFusionRT.sh - Shell script to build the Fusion Runtime Server
#===============================================================================
#
# This script is used to automated the process of making the FusionServer
# Runtime image.  It will compile, obfuscate, and build the FusionServer but
# requires user input to properly set identifying strings for the various
# branches it will create locally and on the upstream repository
#
# Revision History:
#   17-Apr-2019 <jwa> - updated RT_BuildID & Dev_Branch
#   12-Dec-2018 <jwa> - Original Version
#
#===============================================================================
#

################################################################################
#===============================================================================
# Local Constants and Control Settings
#    Please set these values before running the script. They are used to
#    control various aspects of the build including the branches to use,
#    whether the repos should be fetched and what to do when the build is
#    complete.
#===============================================================================

#-------------------------------------------------------------------------------
# Set the git username.  This will prevent the secondary operations from 
#    failing because they don't know who you are.
#
GIT_USER="joe.anello"
GIT_EMAIL="joe.a@modernroboticsinc.com"

#-------------------------------------------------------------------------------
# Set the branches to use during the build. These names should be formatted
#    per the build procedure document.
#
DEV_BRANCH="master"
RT_BUILDID="FRT-v1.3.5aBETA1b00"

#-------------------------------------------------------------------------------
# Set which of the upstream repos should be fetched.  This can be used to build
#    a version which is already present in the staging directory.
#
GIT_FETCH_DEV="yes"		# yes or no -> should the Dev     repo be cloned
GIT_FETCH_RT="yes"		# yes or no -> should the Runtime repo be cloned

FRT_DELETE="no"      	# yes or no -> determines if the Runtime branchname should
						#   be deleted from the upstream repository

#-------------------------------------------------------------------------------
# Set the post-build actions. This determines if the newly built code should be
#   pushed back to the upstream repos.  <<<NOT YET IMPLEMENTED>>>
#
GIT_PUSH_DEV="yes"		# yes or no -> should the Dev     repo be pushed upstream
GIT_PUSH_RT="yes"		# yes or no -> should the Runtime repo be pushed upstream
#
################################################################################


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
#

#---[ gap - adds a gap in the output ]-----------------
#
gap() {
   echo
   echo
   echo
} #---[ end gap() ]------------------------


#---[ abort - fatal error handler ]-------------------------
# On entry, the following argument mapping is expected:
#   $0 - path to program
#   $1 - Line number where error occurred
#   $2 - Error message to display
#   $3 - Action to take: 'continue' or 'bail'
#   $4 - Error code to throw on exit
#
# This function is called if a non-zero value was returned by a step in the
# process.  It will post the message and either continue or bail based on
# the input argument $3.
#
# Usage:
#    if [[ $? != 0 ]] ; then
#       abort $LINENO "Operation Failure Occurred" "bail" 101
#       fi
#
abort() {
    gap
    # 1) We need to have four arguments
    if [[ $# -ne 4 ]] ; then
        echo "$fgRED$atBRT $0: Error Handler Exception..."
        echo "     ...$# is the wrong number of arguments."
        echo "Process aborting $fgNEU$atRST"
        exit 255
    fi

    #2) Create the error output
    echo "$fgMAG$atBRT"
    echo "=====[ EXCEPTION ERROR ]=================================================="
    echo "   in $0 at line $1"
    echo "   Error: $2"

    if [[ $3 == "bail" ]] ; then
        echo "   Aborting Execution with exit code $4"
        echo "=====[ END OF ERROR ]====================================================="
        echo "$fgNEU$atRST"
        exit $4
    else
        echo "   Continuing..."
        echo "=====[ END OF ERROR ]====================================================="
        echo "$fgNEU$atRST"
    fi
    gap
} #---[ end abort() ]------------------------


#---[ say - colorful output handler ]-------------------------
# On entry, the following argument mapping is expected:
#   $0 - path to program
#   $1 - Foreground color and attribute(s)
#   $2 - Background color and attribute(s)
#   $3 - String to output
#
say() {
    # Create the 'normal' string...
    SAY_NORMAL=$fgNEU$atRST$bgNEU

    # 1) We need to have three arguments
    if [[ $# -ne 3 ]] ; then
        echo "$fgRED$atBRT $0: Say Error; wrong argument count $# $fgNEU$atRST"
    else
        echo "$1$2$3${SAY_NORMAL}"
    fi
} #---[ end say() ]------------------------


#==============================================================================
# Start of Script Mainline
#
gap
say "$fgGRN" "" "************************************************************"
say "$fgGRN" "" "***   FusionRT (RunTime) Code Generation Build Utility   ***"
say "$fgGRN" "" "************************************************************"
echo

#-------------------------------------------------------------------------------
# Let's presume that we are running at the node where we want to hang all
# of the Fusion Build source and output.
#
# The procedure says to make a new directory called staging, put a copy of this
# script in that directory, edit the control variables and execute the script.
#
# Thus, we can presume that we are here:
# mkdir staging
# cd staging
#-------------------------------------------------------------------------------
#
# Let's be absolutely sure of where we are...
STAGING=`pwd`

# The build process takes a while, so let's tell git to remember our credentials
# for a while...
git config --global credential.helper 'cache --timeout 57600'
git config --global "user.email `echo ${GIT_EMAIL}`"
git config --global "user.name `echo ${GIT_USER}`"


# Clone the dev and release repositories
echo
say "$fgGRN" "" "Fetching the required repositories from the upstream server"
echo

if [[ ${GIT_FETCH_DEV} == "yes" ]] ; then
    say "$fgGRN" "" ".....Getting the Development Source....."
    git clone http://www.github.com/Modern-Robotics/Fusion-dev.git --branch ${DEV_BRANCH} ${STAGING}/Fusion-dev
    if [[ $? != 0 ]] ; then
       abort $LINENO "Unable to clone the Fusion Development repository" "bail" 101
       fi
fi

gap

if [[ ${GIT_FETCH_RT} == "yes" ]] ; then
    say "$fgGRN" "" ".....Getting the RunTime Binaries....."
    git clone http://www.github.com/Modern-Robotics/Fusion.git ${STAGING}/Fusion
    if [[ $? != 0 ]] ; then
       abort $LINENO "Unable to clone the Fusion Runtime repository" "bail" 102
       fi
fi


# Move into the Fusion-dev directory
cd ${STAGING}/Fusion-dev

# Create a new temporary (orphan) branch for this release candidate.
git checkout --orphan ${RT_BUILDID}
if [[ $? != 0 ]] ; then
   abort $LINENO "Error creating the orphan branch" "bail" 103
   fi


#--[ Start of Compile Process ]-------------------------------------------------
# This is where the build really begins as we compile all necessary files and
# remove all source files that are not intended to be in the final release
#
# Remember:  All these changes and deletions happen to the orphan branch.
#   Once the build process is complete and that branch is committed to the
#   FusionRT repository, the orphan branch is zapped and all the [source] files
#   revert to the original state.
#
gap
say "$fgGRN" "" "****************************************"
say "$fgGRN" "" "***   Start of Compilation Process   ***"
say "$fgGRN" "" "****************************************"
echo
echo

# 1) Modify .gitignore file to include Build/ and node_modules/
say "$fgYEL$atBRT" "" "...setting .git to ignore the node_modules and Build paths"
sed -i "/^node_modules/d;/^Build/d" .gitignore
if [[ $? != 0 ]] ; then
   abort $LINENO "Error modifying the .gitignore file" "bail" 104
   fi
echo


# 2a) Build the Documentation
#     productionBuild automatically places doc files into FusionServer/Src directories
say "$fgYEL$atBRT" "" "...Compiling documentation suite..."
cd ${STAGING}/Fusion-dev/docsrc
./productionBuild.sh
if [[ $? != 0 ]] ; then
   abort $LINENO "Documentation Suite build failure" "bail" 105
   fi

# 2b) Delete the Document Source folder and the build script
cd ${STAGING}/Fusion-dev
rm -r docsrc
say "$fgYEL$atBRT" "" "...Document suite compiled and source files removed..."

gap


# 3a) Build the Fusion Server
#     The automated serverBuild.sh script runs the entire build process
say "$fgYEL$atBRT" "" "...Starting the FusionServer Run-time Build..."
cd ${STAGING}/Fusion-dev/FusionServer
./serverBuild.sh
if [[ $? != 0 ]] ; then
   abort $LINENO "The FusionServer build did not complete successfully" "bail" 106
   fi

# 3b) Delete the Source folder and the build script
rm -r Src serverBuild.sh
say "$fgYEL$atBRT" "" "...FusionServer Run-time built and source files removed..."

gap

# 4a) Build the Diagnostic Utility
# The automated compile.sh script runs the entire process
say "$fgYEL$atBRT" "" "...Building the diagnostic Applet..."
cd ${STAGING}/Fusion-dev/diagnostics
./compile.sh
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to build the diagnostic applet" "bail" 107
   fi

# 4b) Retain the following files and folders
#   diagnosticGui.py
#   psutil/
#   res/
#   runRemi.sh
#   src.so
rm -r compile.sh README.md rpi-benchmark.sh setup.py src.py
say "$fgYEL$atBRT" "" "...Diagnostic Applet built and source files removed..."

gap

# 5a) Build the data Logging Utility
# The automated compile.sh script runs the entire process
say "$fgYEL$atBRT" "" "...Building the data-logging Applet..."
cd ${STAGING}/Fusion-dev/logging
./compile.sh
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to build the data logger applet" "bail" 108
   fi

# 5b) Retain the following files and folders
#   dataLogger.py
#   res/
#   runRemi.sh
#   src.so
rm -r  compile.sh setup.py src.py
say "$fgYEL$atBRT" "" "...Data-logging Applet built and source files removed..."

gap

# 6) Build procedure for Libraries
# The automated compile.sh script runs the entire process except for
#   a few housekeeping issues...
say "$fgYEL$atBRT" "" "...Building the Fusion Interface Board Libraries..."

# 6a) Clean out any old compiled libs
cd ${STAGING}/Fusion-dev/lib
rm -r Fusion*

# 6b) Run the build process
cd ${STAGING}/Fusion-dev/lib/python
./compile.sh
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to build the Fusion Interface Device Library" "bail" 109
   fi
   # The final production .tar.gz is placed in the parent directory
    # (ie:${STAGING}/Fusion-dev/lib)

# 6c) Move up to the parent directory and get rid of the source files
# Retain the following files and folders
#   Fusion-x.x.x.tar.gz
#   *.deb
#   *.tar.gz
#   noVNC/
cd ..
rm -r  c++ python README.md
say "$fgYEL$atBRT" "" "...Fusion Interface Board Libraries built and source removed..."

gap

# 7) Final cleanup of the main Fusion-dev directory
say "$fgYEL$atBRT" "" "...Cleaning up the orphan branch of the Fusion-dev directory..."
cd ${STAGING}/Fusion-dev

# Retain the following files in the main directory
#   diagnostics/
#   etc/
#   FusionServer/
#   .git*
#   lib/
#   logging/
#   README.md       # This file should have been updated earlier with notes
#   update.sh
rm -r docsrc ref temp .unused

gap

say "$fgGRN" "" "****************************************"
say "$fgGRN" "" "***   Compilation Process Complete   ***"
say "$fgGRN" "" "****************************************"


#
#--[ End of Compilation Process ]----------------------------------------------
#
# The current ‘lay of the land’ is this:
#  > The staging/Fusion-dev directory contains the “FusionServer Binary”.
#    This is the built and obfuscated version of the Fusion Server code.
#    All source modules have been removed.
#
#  > The staging/Fusion directory is currently unchanged from what was cloned earlier.
#    It is the currently released FusionServer Binary.
#
#  > Remember that, at this point, although the files in the various sub-directories of
#    Fusion-dev have been modified, the local repository (aka: Fusion-dev/.git) still
#    contains the clone of the original branch we are building to release.
#

gap

say "$fgCYN$atBRT" "" "******************************************************************"
say "$fgCYN$atBRT" "" "***   Starting copy of the new binary to the upstream server   ***"
say "$fgCYN$atBRT" "" "******************************************************************"
echo
echo

#------------------------------------------------------------------------------
# 1) Add and commit all the new changes to the [local] orphan branch
# This adds all of the new files we just generated, moved, copied, etc in the working directories
# to the files that git is keeping track of, then commits them to the local repository.
#
say "$fgYEL$atBRT" "" "...Adding the files to the local branch..."
git add --all
if [[ $? != 0 ]] ; then
   abort $LINENO "Operation Failure Occurred" "bail" 110
   fi

say "$fgYEL$atBRT" "" "...Committing to the local Repo..."
GIT_COMMIT="Release Candidate: $(cat version.txt)  [ Dev: ${DEV_BRANCH}  RT: ${RT_BUILDID} ]"
say "$fgYEL$atBRT" "" "...---> ${GIT_COMMIT}..."
git commit -m "${GIT_COMMIT}"
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to Commit the Source Changes" "bail" 111
   fi


# 2) Add the public release repository as a remote repo and
#    create a branch/label for the release candidaate
git remote add FRT-Binary http://github.com/Modern-Robotics/Fusion.git
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to add the remote FRT-Binary branch" "bail" 112
   fi

# This links the public release repository Fusion.git to our current FusionServer
# Runtime (FRT_Binary) local repository, calling that link FusionRelease.

# 3) Fetch all info from the remote repository and push the new branch to the remote.
# Do not push anything to the source origin, keep all this local as this folder
# is deleted in future steps keeping any branches and changes from reaching the
# online source repository.
say "$fgYEL$atBRT" "" "...updating FRT-Binary from the upstream repository..."
git fetch FRT-Binary
if [[ $? != 0 ]] ; then
   abort $LINENO "Could not fetch the FRT-Binary baseline" "bail" 113
   fi

say "$fgYEL$atBRT" "" "...Pushing the FRT-Binary to the upstream repository..."
git push FRT-Binary ${RT_BUILDID}
if [[ $? != 0 ]] ; then
   abort $LINENO "Could not push FRT-Binary" "bail" 114
   fi



say "$fgCYN$atBRT" "" "***************************************************************"
say "$fgCYN$atBRT" "" "***   Starting copy of the new binary to the local folder   ***"
say "$fgCYN$atBRT" "" "***************************************************************"
echo
echo

# Move to the Release folder and use git pull to bring the new branch
# down to the local machine.
cd ${STAGING}/Fusion
say "$fgYEL$atBRT" "" "...pulling the changes to the Runtime directory from the  upstream repository..."
git pull
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to pull from the upstream Runtime repo" "bail" 115
   fi


# Checkout the release branch that was recently pushed from the source and
# perform a merge from master. "-s ours" takes the merge strategy that all files
# added and removed take precedence over the master.
say "$fgYEL$atBRT" "" "...Checking out the new binary (${RT_BUILDID})..."
git checkout ${RT_BUILDID}
if [[ $? != 0 ]] ; then
   abort $LINENO "Could not checkout the new binary" "bail" 116
   fi

say "$fgYEL$atBRT" "" "...merging our (${RT_BUILDID}) to master ..."
git merge -s ours master
if [[ $? != 0 ]] ; then
   abort $LINENO "Unable to merge the runtimes" "bail" 117
   fi

# Checkout the master and merge with the release. This overwrites the master with
# an exact copy of what the branch is at.
say "$fgYEL$atBRT" "" "...Merging changes..."
git checkout master
if [[ $? != 0 ]] ; then
   abort $LINENO "Operation Failure Occurred" "bail" 118
   fi

say "$fgYEL$atBRT" "" "...Merging ${RT_BUILDID} changes to master..."
git merge ${RT_BUILDID}
if [[ $? != 0 ]] ; then
   abort $LINENO "Operation Failure Occurred" "bail" 119
   fi

# Push the new master to the github repo. This will place the master two commits
# past the previous tag meaning people will still be updating to the most recent
# good release until this commit is marked with a release tag.
say "$fgYEL$atBRT" "" "...Pushing new master to upstream repository..."
git push -u origin
if [[ $? != 0 ]] ; then
   abort $LINENO "Operation Failure Occurred" "bail" 120
   fi

# Delete the release branch from the github online repo.
if [[ ${FRT_DELETE} == "yes" ]] ; then
    say "$fgYEL$atBRT" "" "...Deleting Runtime Branch name..."
    git push origin --delete ${RT_BUILDID}
else
    say "$fgYEL$atBRT" "" "...Runtime Branch ${RT_BUILDID} is still on the upstream Repo..."

fi

echo
say "$fgCYN$atBRT" "" "********************************************************"
say "$fgCYN$atBRT" "" "***   Repository Operations Complete - cleaning up   ***"
say "$fgCYN$atBRT" "" "********************************************************"

gap

# Go back to the original staging point
cd ${STAGING}

say "$fgGRN" "" "*************************************************************"
say "$fgGRN" "" "***   FusionRT (RunTime) Code Generation Build Complete   ***"
say "$fgGRN" "" "*************************************************************"
echo

