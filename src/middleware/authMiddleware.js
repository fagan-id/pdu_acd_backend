import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check Auth Header
  if (!authHeader) {return res.status(401).json({error: "Authorization Header Missing"});}

  // Get Token (Format : "Bearer <...>")
  const token = authHeader.split(" ")[1];
  if (!token) {return res.status(401).json({error: "No Token Provided"});}

  try {
    const decoded = verifyToken(token);
    if (!decoded) {return res.status(401).json({ message: "Invalid or expired token" });}

    // Check User
    const user = await prisma.user.findUnique({where: { id: decoded.id }});
    if (!user) return res.status(401).json({ message: "User no longer exists" });

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err); // Add logging
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }
}