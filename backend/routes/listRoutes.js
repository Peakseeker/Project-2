const express = require("express");

const {
  createList,
  getListsByBoard,
  getListById,
  updateList,
  deleteList,
  moveList,
} = require("../controllers/listController");

const router = express.Router();

// ==============================
// CREATE LIST
// ==============================
router.post("/", createList);

// ==============================
// GET LISTS BY BOARD
// ==============================
router.get("/board/:boardId", getListsByBoard);

// ==============================
// GET SINGLE LIST
// ==============================
router.get("/:listId", getListById);

// ==============================
// UPDATE LIST
// ==============================
router.patch("/:listId", updateList);

// ==============================
// DELETE LIST
// ==============================
router.delete("/:listId", deleteList);

// ==============================
// MOVE LIST
// ==============================
router.patch("/:listId/move", moveList);

module.exports = router;