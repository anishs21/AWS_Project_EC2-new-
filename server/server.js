import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const app = express();

// 🔹 Fetch secrets from AWS Secrets Manager
async function getSecrets() {
  const client = new SecretsManagerClient({ region: "us-east-1" }); // adjust region if needed
  const command = new GetSecretValueCommand({
    SecretId: "AWS_backend_anisha" // replace with your secret name
  });

  const response = await client.send(command);
  return JSON.parse(response.SecretString);
}

async function startServer() {
  const CONFIG = await getSecrets();

  // 🔹 Inject secrets into process.env so other files (like dynamoDB.js) can use them
  Object.entries(CONFIG).forEach(([key, value]) => {
    process.env[key] = value;
  });

  const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

  // CORS settings
  app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  // Handle preflight requests safely
  app.options(/.*/, cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  app.use(express.json());

  // Routes
  app.use("/api", authRoutes);
  app.use("/api", enquiryRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}

// Start app with secrets
startServer().catch(err => {
  console.error("❌ Failed to load secrets:", err);
  process.exit(1);
});

// Health check endpoint for ALB
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

