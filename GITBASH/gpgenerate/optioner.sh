#!/bin/bash

source viewer.sh
source keygen.sh
source deleter.sh
source github.sh
source editor.sh
source gitOptions.sh

optioner () {
   echo -e "${BLUE}View GPG key IDs / select(${RED}v${BLUE}) | ${BLUE}Create a new GPG key(${RED}c${BLUE}) | ${BLUE}Delete a GPG key(${RED}d${BLUE}) | ${BLUE}GitHub options(${RED}g${BLUE}) | ${BLUE}Edit key data(${RED}e${BLUE}) | ${BLUE}Git options(${RED}b${BLUE}) | ${BLUE}Exit(${RED}q${BLUE})"
   echo -e "Selected key: ${RED}$1${NC}"
   read option
   if [ "$option" = "v" ]; then
       echo -e "${GREEN}"
       viewer "$1"
       echo -e "${NC}"
   elif [ "$option" = "c" ]; then
       echo -e "${GREEN}"
       keygen
       echo -e "${NC}"
   elif [ "$option" = "d" ]; then
       echo -e "${GREEN}"
       deleter "$1"
       echo -e "${NC}"
   elif [ "$option" = "g" ]; then
         echo -e "${GREEN}"
         github "$1"
         echo -e "${NC}"
   elif [ "$option" = "q" ]; then
       echo -e "${GREEN}"
       echo "Exiting"
       echo -e "${NC}"
       exit
    elif [ "$option" = "e" ]; then
        echo -e "${GREEN}"
        editor "$1"
        echo -e "${NC}"
    elif [ "$option" = "b" ]; then
        echo -e "${GREEN}"
        gitOptions "$1"
        echo -e "${NC}"
   else
       echo -e "${GREEN}"
       echo "Invalid option"
       echo -e "${NC}"
   fi
}