const express = require("express");

const {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// Create Transaction
router.post("/", createTransaction);

// Get All Transactions
router.get("/", getTransactions);

// Get Transaction By ID
router.get("/:id", getTransactionById);

// Delete Transaction
router.delete("/:id", deleteTransaction);

module.exports = router;
