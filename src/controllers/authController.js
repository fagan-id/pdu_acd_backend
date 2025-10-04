import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check Existing User
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(409).json({ error: "Email already registered" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User created",
      user: { id: user.id, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid Credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid Credentials" });

    const token = generateToken(user);

    res.json({
      user: { id: user.id.toString(), username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch User Data
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, email: true, created_at: true },
    });

    res.json({
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

