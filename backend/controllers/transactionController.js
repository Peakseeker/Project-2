const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { workspace, user, action, details } = req.body;

    // Validate required fields
    if (!workspace || !user || !action) {
      return res.status(400).json({
        success: false,
        message: "Workspace, user and action are required",
      });
    }

    // Validate MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(workspace) ||
      !mongoose.Types.ObjectId.isValid(user)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid workspace or user ID",
      });
    }

    const transaction = await Transaction.create({
      workspace,
      user,
      action: action.trim(),
      details: details ? details.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};

// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("workspace", "name")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get Transactions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// Get Transaction By ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Transaction ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findById(id)
      .populate("workspace", "name")
      .populate("user", "name email");

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    console.error("Get Transaction By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
      error: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Transaction ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      deletedTransaction: transaction,
    });
  } catch (error) {
    console.error("Delete Transaction Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
};