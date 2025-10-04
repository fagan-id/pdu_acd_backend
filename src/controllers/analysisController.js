import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const {id} = req.params
      
    const analysis = await prisma.analysisResult.findUnique({
      where : {id : BigInt(id)}
    });

    if (!analysis) return res.status(404).json({message : "Analysis Not Found"})

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
    const {well_id} = req.params;
      
    const analysis = await prisma.analysisResult.findMany({
      where : {well_id : BigInt(well_id)}
    });
    if (analysis.length === 0) return res.status(404).json({message : "Analysis Not Found"})

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
    const { well_id, vertical_depth, siltstone_prcnt, sandstone_prcnt, image } =
      req.body;

    const well = await prisma.well.findUnique({
      where: { id: BigInt(well_id) },
    });

    if (!well) return res.status(404).json({ error: "Well not found" });

    const createdAnalysis = await prisma.analysisResult.create({
      data: {
        well_id: BigInt(well_id),
        vertical_depth,
        siltstone_prcnt,
        sandstone_prcnt,
        image,
      },
    });

    res.status(201).json({
      message : "Succesfully created analysis result",
      data : createdAnalysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT (Update Analysis Result)
export const updateAnalysis = async (req, res) => {
  try {
    const { id } = req.params
    const updateData  = req.body;

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
      error: error.message
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
      data : deletedAnalysis
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
