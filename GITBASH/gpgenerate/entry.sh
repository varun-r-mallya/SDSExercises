#!/bin/bash


export RED='\033[0;31m'
export GREEN='\033[0;32m'
export BLUE='\033[0;36m'
export NC='\033[0m'
export YELLOW='\033[1;33m'


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

export selected_id="None"
numkeys=$(gpg --list-keys | awk '/^pub|^sec/{count++} END {print count}')
echo ""
echo "Number of GPG keys found: $numkeys"
echo ""
