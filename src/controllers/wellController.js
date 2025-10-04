import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET All Wells
export const getAllWell = async (req, res) => {
  try {
    const wells = await prisma.well.findMany();
    res.status(200).json({
      message: "Successfully fetched all well data",
      data: wells,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Well
export const getWell = async (req, res) => {
  try {
    const { id } = req.params;   
    if (!id) return res.status(400).json({ error: "id is required" });

    const well = await prisma.well.findUnique({
      where: { id: BigInt(id) },
    });

    if (!well) return res.status(404).json({ error: "Well not found" });

    res.status(200).json({
      message: `Successfully fetched well with id : ${id}`,
      data: well,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Well
export const createWell = async (req, res) => {
  try {
    const { name,location,total_depth,elevation, latitude, longitude } = req.body;
    const createdWell = await prisma.well.create({
      data: {
        name,
        location,
        total_depth,
        elevation,
        latitude,
        longitude,
      },
    });

    res.status(201).json({
      message: "Succesfully created well data",
      data: createdWell,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update Well
export const updateWell = async (req, res) => {
  try {
    const {id} = req.params;
    const updateData  = req.body;

    const well = await prisma.well.findUnique({
      where: { id: BigInt(id) },
    });
    if (!well) return res.status(404).json({ message: "Well not found" });

    const updatedWell = await prisma.well.update({
      where: { id: BigInt(id) },
      data: updateData,
    });
    res.status(200).json({
      message: `Succesfully updated well data with id : ${id}`,
      data: updatedWell,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Well
export const deleteWell = async (req, res) => {
  try {
    const { id } = req.params;

    const well = await prisma.well.findUnique({
      where: { id: BigInt(id) },
    });
    if (!well) return res.status(404).json({ message: "Well not found" });

    const deletedWell = await prisma.well.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({
      message: `Succesfully deleted well data with id : ${id}`,
      data: deletedWell,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
