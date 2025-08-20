#!/bin/bash
set -e

echo "Running ApplicationStart script..."

cd /home/ssm-user/AWS-project/AWS_Project_EC2/server

# Restart or start backend with PM2
if pm2 list | grep -q backend; then
  pm2 restart backend --update-env
else
  pm2 start server.js --name backend
fi
