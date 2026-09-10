const mongoose = require("mongoose"); 
 
const cardSchema = new mongoose.Schema( 
  { 
    title: { 
      type: String, 
      required: true, 
      trim: true, 
      minlength: 1,
      maxlength: 200,
    }, 
 
    description: { 
      type: String, 
      trim: true, 
      default: "", 
    }, 
 
    board: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Board", 
      required: true, 
    }, 
 
    list: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "List", 
      required: true, 
    }, 
 
    assignedTo: [ 
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
      }, 
    ], 
 
    position: { 
      type: Number, 
      default: 0, 
      min: 0,
    }, 
 
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "medium", 
    }, 
 
    dueDate: { 
      type: Date, 
      default: null, 
    },

    // Card status
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },

    // Card labels/tags
    labels: [
      {
        type: String,
        trim: true,
      },
    ],

    // Estimated time required for the card
    estimatedHours: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Actual time spent on the card
    timeSpentHours: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Card creator
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  }, 
  { 
    timestamps: true, 
  } 
); 
 
module.exports = mongoose.model("Card", cardSchema);