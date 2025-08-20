#!/bin/bash
set -e

echo "Running AfterInstall script..."

# Install server dependencies
cd /home/ssm-user/AWS-project/AWS_Project_EC2/server
npm install --production

# Build client
cd ../client
npm install
npm run build
