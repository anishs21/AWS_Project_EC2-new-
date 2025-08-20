import { getUserByEmail, saveUser } from "../models/userModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });
  try {
    const user = await getUserByEmail(email);
    console.log("User found:", user);

    if (!user || user.password !== password) {
      console.warn("Invalid login for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      name: user.name,
      email: user.Email || user.email, // fallback for DynamoDB key
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  console.log("Register attempt:", { email, password, name, role });

  // Check for missing fields
  if (!email || !password || !name || !role) {
    console.error("Missing required fields:", req.body);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await getUserByEmail(email);
    console.log("Existing user check:", existing);
    if (existing) {
      console.warn("User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    // Ensure Email property is capitalized for DynamoDB
    await saveUser({ email: email, password, name, role });
    console.log("User registered:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};