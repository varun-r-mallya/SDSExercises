#!/bin/bash

github () {
    echo -e "${BLUE}GitHub specific options(${RED}g${BLUE}) | ${BLUE}Back(${RED}b${BLUE})"
    read githubOption
    echo -e "${GREEN}"
    echo "Do you want to add a GPG key to your GitHub account? (y/n)"
        read answer
        if [ "$answer" = "y" ]; then
            echo -e "${YELLOW}\n"
            gpg --armor --export $1
            echo -e "${NC}\n"
            echo "Copy the key above and paste it in your GitHub account"
            echo -e "\n"
        fi
         echo -e "${NC}"
    
}

