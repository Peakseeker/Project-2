const express = require("express");

const {
  createList,
  getListsByBoard,
  updateList,
  deleteList,
} = require("../controllers/listController");

const router = express.Router();

// Create List
router.post("/", createList);

// Get All Lists by Board
router.get("/board/:boardId", getListsByBoard);

// Update List
router.patch("/:listId", updateList);

// Delete List
router.delete("/:listId", deleteList);

module.exports = router;