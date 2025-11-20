import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js"
import wellRoutes from "./routes/wellRoutes.js"
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serialize Big Int
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Basic route
app.use("/auth",authRoutes);
app.use("/analysis", analysisRoutes);
app.use("/well",wellRoutes);
console.log(path.join(process.cwd(), "public"))
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get('/', (req, res) => {  
  res.json({ message: 'Automated Cutting Description API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});