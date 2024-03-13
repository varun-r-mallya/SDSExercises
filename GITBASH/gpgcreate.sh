#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'
YELLOW='\033[1;33m'

echo -e "${YELLOW}"
echo "   __________  ______                           __     ";
echo "  / ____/ __ \\/ ____/__  ____  ___  _________ _/ /____ ";
echo " / / __/ /_/ / / __/ _ \\/ __ \\/ _ \\/ ___/ __ \`/ __/ _ \\";
echo "/ /_/ / ____/ /_/ /  __/ / / /  __/ /  / /_/ / /_/  __/";
echo "\\____/_/    \\____/\\___/_/ /_/\\___/_/   \\__,_/\\__/\\___/ ";
echo ""
echo "        Generate and Manage GPG Keys fast               ";
echo ""
echo -e "${NC}"

numkeys="0"   
numkeys=$(gpg --list-keys | awk '/^pub|^sec/{count++} END {print count}')
echo ""
echo "Number of GPG keys found: $numkeys"
echo ""

optioner () {
    echo -e "${GREEN}View GPG keys(${RED}v${GREEN}) | ${GREEN}Create a new GPG key(${RED}c${GREEN}) | ${GREEN}Delete a GPG key(${RED}d${GREEN}) | ${GREEN}Exit(${RED}e${GREEN})"
    read option
    if [ "$option" = "v" ]; then
        echo -e "${BLUE}"
        viewer
        echo -e "${NC}"
    elif [ "$option" = "c" ]; then
        echo -e "${BLUE}"
        keygen
        echo -e "${NC}"
    elif [ "$option" = "d" ]; then
        echo -e "${BLUE}"
        deleter
        echo -e "${NC}"
    elif [ "$option" = "e" ]; then
        echo -e "${BLUE}"
        echo "Exiting"
        echo -e "${NC}"
        exit
    else
        echo -e "${BLUE}"
        echo "Invalid option"
        echo -e "${NC}"

    fi
}

keygen () {
    echo "Creating a new GPG key"
    gpg --full-generate-key
    optioner
}

viewer () {
    echo "Viewing GPG keys"
    gpg --list-keys
    optioner
}

deleter () {
    echo "Deleting a GPG key"
    echo "Enter the email of the key you want to delete"
    read email
    gpg --delete-key $email
    optioner
}

if [ num_keys != "0" ]; then
    optioner
else
    echo "Do you want to create a new GPG key? (y/n)"
    read answer
    if [ "$answer" = "y" ]; then
        echo "Creating a new GPG key"
        keygen
        optioner
    else
        echo "Exiting"
    fi    
fi