#!/bin/bash

gitOptions () {
    echo "Do you want to add a GPG key to your Git account? (y/n)"
    read answer
    if [ "$answer" = "y" ]; then
       echo "Global(1) | Local(2) | Back(b)"
         read gitOption
            if [ "$gitOption" = "1" ]; then
                echo "Adding a GPG key to your Git account (Global)"
                git config --global user.signingkey $1
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
                git config --local user.signingkey $1
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
            fi
    fi
}
