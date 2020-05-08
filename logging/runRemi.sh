#!/bin/bash 

trap '{ echo "Caught Interrupt" ; sudo killall -9 python; }' INT

if [ $# -lt "1" ]; then 
    echo "Enter the name of a python file to execute"
    exit 0
fi 

if [ $# -lt "2" ]; then
    echo "Enter user name"
    exit 1 
fi 

if [ -n "$1" ]; then        
    sudo python $1 -u $2 &
    sleep infinity 
fi

exit 0