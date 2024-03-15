#!/bin/bash

source entry.sh
source optioner.sh
source keygen.sh

while true
do
    if [ "$numkeys" = "" ]; then  
    echo "Do you want to create a new GPG key? (y/n)"
    read answer
    if [ "$answer" = "y" ]; then
        echo "Creating a new GPG key"
        keygen
    else
        echo "Exiting"
    fi   
    else
        optioner "$selected_id"
    fi
done





