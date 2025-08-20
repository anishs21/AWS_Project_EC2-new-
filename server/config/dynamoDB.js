// config/dynamoDB.js
import AWS from "aws-sdk";

// Only region is needed – credentials will come from EC2 IAM role automatically
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

// Use table names from Secrets Manager (injected into process.env by server.js)
const USERS_TABLE = process.env.USERS_TABLE || "USERS_TABLE";
const ENQUIRY_TABLE = process.env.ENQUIRY_TABLE || "ENQUIRY_TABLE";

export { dynamoClient, USERS_TABLE, ENQUIRY_TABLE };

