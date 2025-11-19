import jwt from "jsonwebtoken";

const payload = { userId: 123, role: "user" };
const secret = process.env.JWT_SECRET || "supersecret";
const options = { expiresIn: "1h" };

const token = jwt.sign(payload, secret, options);

console.log("Your JWT:", token);
