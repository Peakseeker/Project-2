const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    user: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "WORKSPACE_CREATED",
        "WORKSPACE_UPDATED",
        "WORKSPACE_DELETED",
        "BOARD_CREATED",
        "BOARD_UPDATED",
        "BOARD_DELETED",
        "CARD_CREATED",
        "CARD_UPDATED",
        "CARD_DELETED",
      ],
    },

    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);