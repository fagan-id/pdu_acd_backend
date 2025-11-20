import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL;  // ini URL model nya
const OVERLAY_DIR = path.join(process.cwd(), "public", "analysis"); // ini dir untuk simpan gambar overlay
const ORIGINAL_DIR = path.join(process.cwd(), "public", "original"); // ini dir untuk simpan gambar overlay


// GET (Get All Analysis Result)
export const getAllAnalysis = async (req, res) => {
  try {
    const analysis = await prisma.analysisResult.findMany();
    res.status(200).json({
      message: "Successfully fetched all analysis result",
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET (Get Analysis Result)
export const getAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await prisma.analysisResult.findUnique({
      where: { id: BigInt(id) },
    });

    if (!analysis)
      return res.status(404).json({ message: "Analysis Not Found" });

    res.status(200).json({
      message: `Successfully fetched analysis result with id : ${id}`,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET (GET Analysis Result Filtered By Well_Id)
export const getAnalysisFilterByWell = async (req, res) => {
  try {
    const { well_id } = req.params;

    const analysis = await prisma.analysisResult.findMany({
      where: { well_id: BigInt(well_id) },
    });
    if (analysis.length === 0)
      return res.status(404).json({ message: "Analysis Not Found" });

    res.status(200).json({
      message: `Successfully fetched all analysis result from well_id : ${well_id}`,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST (Create Analysis Result)
export const createAnalysis = async (req, res) => {
  try {
    const { well_id, vertical_depth } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image File is required" });

    const well = await prisma.well.findUnique({
      where: { id: BigInt(well_id) },
    });

    if (!well) return res.status(404).json({ error: "Well not found" });

    // ============================
    // 1. SAVE ORIGINAL IMAGE
    // ============================

    if (!fs.existsSync(ORIGINAL_DIR)) {
      fs.mkdirSync(ORIGINAL_DIR, { recursive: true });
    }

    const originalName = `original_${well_id}_${Date.now()}.jpg`;
    const originalPath = path.join(ORIGINAL_DIR, originalName);

    fs.writeFileSync(originalPath, req.file.buffer);

    const originalUrl = `/original/${originalName}`;

    // ============================
    // 2. SEND FILE TO /predict (FAST API)
    // ============================

    const formPredict = new FormData();
    formPredict.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const predictRes = await axios.post(
      `${ML_SERVICE_URL}/predict`,
      formPredict,
      { headers: formPredict.getHeaders() }
    );

    const ai = predictRes.data;

    const summary = ai.summary || {};
    const silt_pct = summary.siltstone_percentage ?? 0;
    const sand_pct = summary.sandstone_percentage ?? 0;

    // ============================
    // 3. GENERATE OVERLAY IMAGE
    // ============================

    const formOverlay = new FormData();
    formOverlay.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const overlayRes = await axios.post(
      `${ML_SERVICE_URL}/predict-image`,
      formOverlay,
      {
        headers: formOverlay.getHeaders(),
        responseType: "arraybuffer",
      }
    );

    // ============================
    // 4. SAVE OVERLAY IMAGE
    // ============================

    if (!fs.existsSync(OVERLAY_DIR)) {
      fs.mkdirSync(OVERLAY_DIR, { recursive: true });
    }

    const overlayName = `overlay_${well_id}_${Date.now()}.jpg`;
    const overlayPath = path.join(OVERLAY_DIR, overlayName);

    fs.writeFileSync(overlayPath, Buffer.from(overlayRes.data));

    const overlayUrl = `/analysis/${overlayName}`;

    // ============================
    // 5. SAVE TO DATABASE
    // ============================

    const created = await prisma.analysisResult.create({
      data: {
        well_id: BigInt(well_id),
        vertical_depth: parseFloat(vertical_depth),
        siltstone_prcnt: silt_pct,
        sandstone_prcnt: sand_pct,
        image: overlayUrl,
        original_image: originalUrl, // <-- PENTING
      },
    });

    return res.status(201).json({
      message: "Analysis Created Using AI",
      data: created,
      raw_ai: ai,
      original_image: originalUrl,
      overlay_image: overlayUrl,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


// PUT (Update Analysis Result)
export const updateAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Conditional if well_id is changed
    if (updateData.well_id) updateData.well_id = BigInt(updateData.well_id);

    const updatedAnalysis = await prisma.analysisResult.update({
      where: { id: BigInt(id) },
      data: updateData,
    });

    res.status(200).json({
      message: `Succesfully updated analysis result with id : ${id}`,
      data: updatedAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE (Delete Analysis Result)
export const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnalysis = await prisma.analysisResult.delete({
      where: { id: BigInt(id) },
    });

    res.status(200).json({
      message: `Successfully deleted analysis result with id: ${id}`,
      data: deletedAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};




// OLD POST (Create Analysis Result)
//=======================================================================
// == Old
//=======================================================================
// export const createAnalysis = async (req, res) => {
//   try {
//     const { well_id, vertical_depth, siltstone_prcnt, sandstone_prcnt, image } =
//       req.body;

//     const well = await prisma.well.findUnique({
//       where: { id: BigInt(well_id) },
//     });

//     if (!well) return res.status(404).json({ error: "Well not found" });

//     const createdAnalysis = await prisma.analysisResult.create({
//       data: {
//         well_id: BigInt(well_id),
//         vertical_depth,
//         siltstone_prcnt,
//         sandstone_prcnt,
//         image,
//       },
//     });

//     res.status(201).json({
//       message : "Succesfully created analysis result",
//       data : createdAnalysis
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
