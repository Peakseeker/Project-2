const express = require("express");

const {
  createCard,
  getCardsByList,
  getCardById,
  updateCard,
  deleteCard,
  moveCard,
  assignMember,
} = require("../controllers/cardController");

const router = express.Router();

// Create Card
router.post("/", createCard);

// Get Cards by List
router.get("/list/:listId", getCardsByList);

// Get Single Card
router.get("/:cardId", getCardById);

// Update Card
router.patch("/:cardId", updateCard);

// Delete Card
router.delete("/:cardId", deleteCard);

// Move Card
router.patch("/:cardId/move", moveCard);

// Assign Member
router.patch("/:cardId/assign", assignMember);

module.exports = router;