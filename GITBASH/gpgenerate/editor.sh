#!/bin/bash

editor () {
    echo "Editing key"
    echo "Editing public key"
    echo -e "${YELLOW}"
    gpg --edit-key $1
    echo -e "${NC}"
}



