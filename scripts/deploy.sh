#!/bin/bash
set -e

echo "🚀 Starting deployment script..."

# Go to client folder and build
cd /home/ssm-user/AWS-project/AWS_Project_EC2/client
echo "📦 Installing client dependencies..."
npm install
echo "🏗️ Building client..."
npm run build

# Go to server folder
cd /home/ssm-user/AWS-project/AWS_Project_EC2/server
echo "📦 Installing server dependencies..."
npm install --production

# Ensure PM2 is available for ssm-user (optional safety)
export PATH="$PATH:/usr/local/bin:/home/ssm-user/.local/bin"
if ! command -v pm2 >/dev/null 2>&1; then
  echo "PM2 not found — installing globally..."
  npm install -g pm2
fi

# Restart or start backend with PM2
if pm2 list | grep -q backend; then
  echo "🔄 Restarting backend with PM2..."
  pm2 restart backend --update-env
else
  echo "▶️ Starting backend with PM2..."
  pm2 start server.js --name backend
fi

echo "✅ Deployment finished!"
