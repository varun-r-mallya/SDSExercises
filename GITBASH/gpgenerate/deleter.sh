#!/bin/bash

deleter () {
   echo -e "Deleting a GPG key\n"
   echo "Delete Options: (1)Only Public Key | (2)Only Private Key | (3)Both"
   read deleteOption
   if [ "$deleteOption" = "1" ]; then
       echo "Deleting public key"
       yes | gpg --delete-key $1
   elif [ "$deleteOption" = "2" ]; then
       echo "Deleting private key"
       yes | gpg --delete-secret-key $1
   elif [ "$deleteOption" = "3" ]; then
       echo "Deleting both keys"
       yes | gpg --delete-secret-key $1
       yes | gpg --delete-key $1
   else
       echo "Invalid option"
   fi
}

