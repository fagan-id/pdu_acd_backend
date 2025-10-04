import { Router } from "express";
import { getAllAnalysis,getAnalysis, createAnalysis,updateAnalysis,deleteAnalysis, getAnalysisFilterByWell  } from "../controllers/analysisController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Protect route with middleware
router.use(authMiddleware);

router.get("/", getAllAnalysis);
router.get("/:id", getAnalysis);
router.get("/well/:well_id", getAnalysisFilterByWell)
router.post("/", createAnalysis);
router.put("/:id",updateAnalysis);
router.delete("/:id",deleteAnalysis)

export default router;