import AWS from "aws-sdk";

const client = new AWS.SecretsManager();

export async function getSecrets() {
  try {
    const response = await client.getSecretValue({
      SecretId: "AWS_backend_anisha", // 🔹 replace with your AWS Secret Name
    }).promise();

    return JSON.parse(response.SecretString);
  } catch (err) {
    console.error("❌ Error fetching secrets:", err);
    throw err;
  }
}
