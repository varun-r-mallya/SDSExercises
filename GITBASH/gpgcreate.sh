#!/bin/bash


RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;36m'
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

selected_id="None"
numkeys=$(gpg --list-keys | awk '/^pub|^sec/{count++} END {print count}')
echo ""
echo "Number of GPG keys found: $numkeys"
echo ""


optioner () {
   echo -e "${BLUE}View GPG key IDs / select(${RED}v${BLUE}) | ${BLUE}Create a new GPG key(${RED}c${BLUE}) | ${BLUE}Delete a GPG key(${RED}d${BLUE}) | ${BLUE}GitHub options(${RED}g${BLUE}) | ${BLUE}Edit key data(${RED}e${BLUE}) | ${BLUE}Git options(${RED}b${BLUE}) | ${BLUE}Exit(${RED}q${BLUE})"
   echo -e "Selected key: ${RED}$selected_id${NC}"
   read option
   if [ "$option" = "v" ]; then
       echo -e "${GREEN}"
       viewer
       echo -e "${NC}"
   elif [ "$option" = "c" ]; then
       echo -e "${GREEN}"
       keygen
       echo -e "${NC}"
   elif [ "$option" = "d" ]; then
       echo -e "${GREEN}"
       deleter
       echo -e "${NC}"
   elif [ "$option" = "g" ]; then
         echo -e "${GREEN}"
         github
         echo -e "${NC}"
   elif [ "$option" = "q" ]; then
       echo -e "${GREEN}"
       echo "Exiting"
       echo -e "${NC}"
       exit
    elif [ "$option" = "e" ]; then
        echo -e "${GREEN}"
        editor
        echo -e "${NC}"
        optioner
    elif [ "$option" = "b" ]; then
        echo -e "${GREEN}"
        gitOptions
        echo -e "${NC}"
        optioner
   else
       echo -e "${GREEN}"
       echo "Invalid option"
       echo -e "${NC}"
       optioner


   fi
}

gitOptions () {
    echo "Do you want to add a GPG key to your Git account? (y/n)"
    read answer
    if [ "$answer" = "y" ]; then
       echo "Global(1) | Local(2) | Back(b)"
         read gitOption
            if [ "$gitOption" = "1" ]; then
                echo "Adding a GPG key to your Git account (Global)"
                git config --global user.signingkey $selected_id
                echo " Do you want signed commits at all times? (y/n)"
                read answer
                if [ "$answer" = "y" ]; then
                    git config --global commit.gpgsign true
                else
                    git config --global commit.gpgsign false
                fi
                echo ""
                echo "GPG key added to Git account (Global)"
                echo ""
            elif [ "$gitOption" = "2" ]; then
                echo "Adding a GPG key to your Git account (Local): Pleaase have a repository open in the terminal"
                echo -e "${YELLOW}"
                git config --local user.signingkey $selected_id
                echo " Do you want signed commits at all times? (y/n)"
                read answer
                if [ "$answer" = "y" ]; then
                    git config --local commit.gpgsign true
                else
                    git config --local commit.gpgsign false
                fi
                echo ""
                echo "GPG key added to Git account (Global)"
                echo ""
            else
                optioner
            fi
    else
        optioner
    fi
}

editor () {
    echo "Editing key"
    echo "Editing public key"
    echo -e "${YELLOW}"
    gpg --edit-key $selected_id
    echo -e "${NC}"
    optioner
}

github () {
    echo -e "${BLUE}GitHub specific options(${RED}g${BLUE}) | ${BLUE}Back(${RED}b${BLUE})"
    read githubOption
    echo -e "${GREEN}"
    echo "Do you want to add a GPG key to your GitHub account? (y/n)"
        read answer
        if [ "$answer" = "y" ]; then
            echo -e "${YELLOW}\n"
            gpg --armor --export $selected_id
            echo -e "${NC}\n"
            echo "Copy the key above and paste it in your GitHub account"
            echo -e "\n"
        else
            optioner
        fi
         echo -e "${NC}"
    
}

keygen () {
   echo "Creating a new GPG key"
   gpg --full-generate-key
   optioner
}


viewer () {
   echo "Do you want to view public(1) or private(2) keys?"
   read answer
   if [ "$answer" = "1" ]; then
       echo "Viewing GPG keys (public)"
       ids=($(gpg --list-keys --keyid-format=long | awk -F'[ /]' '/^pub/{print $5}'))
       echo -e "${RED}"
       echo "Please select an ID:"
       select ID in "${ids[@]}"; do
            echo "You selected ID: $ID"
            selected_id=$ID
            break
       done
       echo -e "${NC}"
   elif [ "$answer" = "2" ]; then
       echo "Viewing GPG keys (private)"
       ids=($(gpg --list-secret-keys --keyid-format=long | awk -F'[ /]' '/^sec/{print $5}' ))
       echo -e "${RED}"
       echo "Please select an ID:"
       select ID in "${ids[@]}"; do
         echo "You selected ID: $ID"
         selected_id=$ID
         break
         done
       echo -e "${NC}"
       else
           echo "Invalid option"
           optioner
   fi
   optioner
}


deleter () {
   echo -e "Deleting a GPG key\n"
   echo "Delete Options: (1)Only Public Key | (2)Only Private Key | (3)Both"
   read deleteOption
   if [ "$deleteOption" = "1" ]; then
       echo "Deleting public key"
       yes | gpg --delete-key $selected_id
   elif [ "$deleteOption" = "2" ]; then
       echo "Deleting private key"
       yes | gpg --delete-secret-key $selected_id
   elif [ "$deleteOption" = "3" ]; then
       echo "Deleting both keys"
       yes | gpg --delete-secret-key $selected_id
       yes | gpg --delete-key $selected_id
   else
       echo "Invalid option"
       optioner
   fi
   optioner
}


if [ "$numkeys" = "" ]; then  
   echo "Do you want to create a new GPG key? (y/n)"
   read answer
   if [ "$answer" = "y" ]; then
       echo "Creating a new GPG key"
       keygen
       optioner
   else
       echo "Exiting"
   fi   
else
     optioner
fi




