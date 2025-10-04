import { Router } from "express";
import { getAllWell, getWell,createWell,updateWell,deleteWell } from "../controllers/wellController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Protect route with middleware
router.use(authMiddleware);

router.get("/", getAllWell);
router.get("/:id", getWell);
router.post("/", createWell);
router.put("/:id",updateWell);
router.delete("/:id",deleteWell)

export default router;