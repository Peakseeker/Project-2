const Board = require("../models/Board");

// Create Board
const createBoard = async (req, res) => {
  try {
    const { name, description, workspace, createdBy } = req.body;

    if (!name || !workspace || !createdBy) {
      return res.status(400).json({
        message: "Name, workspace and createdBy are required",
      });
    }

    const board = await Board.create({
      name,
      description,
      workspace,
      createdBy,
    });

    res.status(201).json({
      message: "Board created successfully",
      board,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create board",
      error: error.message,
    });
  }
};

// Get All Boards of a Workspace
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      workspace: req.params.workspaceId,
    });

    res.status(200).json({
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch boards",
      error: error.message,
    });
  }
};

// Get Board by ID
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json({
      message: "Board fetched successfully",
      board,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch board",
      error: error.message,
    });
  }
};

// Update Board
const updateBoard = async (req, res) => {
  try {
    const { name, description } = req.body;

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json({
      message: "Board updated successfully",
      board,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update board",
      error: error.message,
    });
  }
};

// Delete Board
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete board",
      error: error.message,
    });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};