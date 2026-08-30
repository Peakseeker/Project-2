const express = require("express");

const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

const router = express.Router();

// Create Board
router.post("/", createBoard);

// Get All Boards of a Workspace
router.get("/workspace/:workspaceId", getBoards);

// Get Board by ID
router.get("/:id", getBoardById);

// Update Board
router.put("/:id", updateBoard);

// Delete Board
router.delete("/:id", deleteBoard);

module.exports = router;