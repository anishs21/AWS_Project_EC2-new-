import { dynamoClient, ENQUIRY_TABLE } from "../config/dynamoDB.js";

export const saveEnquiry = async (enquiry) => {
  const params = {
    TableName: ENQUIRY_TABLE,
    Item: enquiry,
  };

  return dynamoClient.put(params).promise();
};


export const fetchAllEnquiries = async () => {
  const params = {
    TableName: ENQUIRY_TABLE,
  };
  const data = await dynamoClient.scan(params).promise();
  return data.Items || [];
};