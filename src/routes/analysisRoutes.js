import { Router } from "express";
import multer from "multer";
import { getAllAnalysis,getAnalysis, createAnalysis,updateAnalysis,deleteAnalysis, getAnalysisFilterByWell  } from "../controllers/analysisController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


// Protect route with middleware
router.use(authMiddleware);

router.get("/", getAllAnalysis);
router.get("/:id", getAnalysis);
router.get("/well/:well_id", getAnalysisFilterByWell)
router.post("/",upload.single("file"), createAnalysis);
router.put("/:id",updateAnalysis);
router.delete("/:id",deleteAnalysis)

export default router;