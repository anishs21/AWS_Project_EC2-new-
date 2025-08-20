import { dynamoClient, ENQUIRY_TABLE, USERS_TABLE } from "../config/dynamoDB.js";

export const getUserByEmail = async (email) => {
  const params = {
    TableName: USERS_TABLE,
    Key: { email },
  };
  const data = await dynamoClient.get(params).promise();
  return data.Item;
};

export const saveUser = async (user) => {
  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };
  await dynamoClient.put(params).promise();
};


