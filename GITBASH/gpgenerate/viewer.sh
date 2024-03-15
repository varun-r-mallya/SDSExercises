#!/bin/bash


viewer () {
   echo "Do you want to view public(1) or private(2) keys?"
   read answer
   if [ "$answer" = "1" ]; then
       echo "Viewing GPG keys (public)"
       ids=($(gpg --list-keys --keyid-format=long | awk -F'[ /]' '/^pub/{print $5}' ))
       echo -e "${RED}"
        echo "Please select an ID:"
        select ID in "${ids[@]}"; do
            echo "You selected ID: $ID"
            selected_id=$ID
            export selected_id
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
         export selected_id
         break
         done
       echo -e "${NC}"
       else
           echo "Invalid option"
   fi
}
