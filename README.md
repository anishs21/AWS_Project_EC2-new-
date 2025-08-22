<img width="694" height="762" alt="image" src="https://github.com/user-attachments/assets/88819689-8ed5-4736-bf99-8332431cca0e" />



**AWS Project – End-to-End Deployment**

This project sets up a secure and scalable AWS infrastructure for a full-stack application (Frontend + Backend + API) with automated CI/CD using AWS services.

**Architecture Overview**

Networking (VPC)

Private VPC with 2 public subnets (for Load Balancer & NAT Gateway) and 2 private subnets (for EC2 app servers).

NAT Gateway in a public subnet for controlled internet access.

VPC Endpoints for DynamoDB and Secrets Manager for private access.

EC2 Auto Scaling Group hosts both Frontend (React + Nginx) and Backend (Node.js APIs).

Application Load Balancer (ALB) in public subnet distributes traffic to EC2 instances in private subnets.

Frontend Deployment

React app is built (npm run build) and uploaded to S3 only for storage/versioning.

Build files are then deployed to Nginx on EC2, which serves the frontend app.

CloudFront → ALB → EC2 → Nginx (frontend + API).

Backend Deployment

Node.js backend runs on port 5000 in EC2.

Nginx reverse proxies requests from port 80 to the Node.js app.

PM2 manages backend processes.

Data & Secrets

**Amazon DynamoDB tables:**

USERS_TABLE → user login/registration data.

ENQUIRY_TABLE → enquiry submissions.

AWS Secrets Manager → securely stores .env config and credentials.

Security

**Security Groups:**

ALB SG → Allows HTTP/HTTPS from CloudFront.

EC2 SG → Only allows inbound traffic from ALB.

AWS WAF + Shield → applied on CloudFront with managed rules for IP reputation, bad inputs, SQLi, etc.

**Content Delivery**

CloudFront CDN with SSL certificate and custom domain.

CloudFront origin = ALB → serves both frontend and backend traffic through EC2.

**Monitoring & Alerts**

CloudWatch Alarms on EC2 health and performance.

SNS Topics → email/phone alerts for critical events.

CI/CD Pipeline

CodePipeline connected to GitHub (main branch).

CodeDeploy manages backend/frontend deployment to EC2.

EC2 instances run CodeDeploy agent with appspec.yml + lifecycle scripts (after_install.sh, application_start.sh).

**Tech Stack
**
AWS Services → VPC, EC2, ALB, Auto Scaling, DynamoDB, Secrets Manager, S3 (artifact storage), CloudFront, WAF, CloudWatch, SNS, CodeDeploy, CodePipeline.

Frontend → React (served via Nginx on EC2).

Backend → Node.js + Express (proxied via Nginx).

Web Server → Nginx (frontend + reverse proxy).

Process Manager → PM2.

**Key Features**

Private + public subnets with NAT for secure design.

Auto Scaling EC2 cluster hosting both frontend + backend.

Frontend React app runs from EC2 (Nginx), not from S3.

DynamoDB + Secrets Manager accessed privately via VPC Endpoints.

CloudFront + WAF secure distribution.

Monitoring & alerts with CloudWatch + SNS.

CI/CD with GitHub → CodePipeline → CodeDeploy.
