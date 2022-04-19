#!/bin/bash

#give permission for everything in the book-search directory
sudo chmod -R 777 /home/ec2-user/book-search

#navigate into our working directory where we have all our github files
cd /home/ec2-user/book-search

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install pm2 globally
echo "Installing PM2..."
npm install pm2 -g

#install node modules
echo "Installing node modules...."
npm install

#run build script
echo "React build script...."
npm run build:frontend

#run server with pm2
echo "Starting server with pm2...."
npm run start:production