const Card = require("../models/Card");

// ==============================
// CREATE CARD
// ==============================
const createCard = async (req, res) => {
  try {
    const {
      title,
      description,
      board,
      list,
      assignedTo,
      priority,
      dueDate,
    } = req.body;

    if (!title || !board || !list) {
      return res.status(400).json({
        success: false,
        message: "Title, board and list are required",
      });
    }

    const lastCard = await Card.findOne({ list }).sort({
      position: -1,
    });

    const position = lastCard
      ? lastCard.position + 1
      : 0;

    const card = await Card.create({
      title,
      description,
      board,
      list,
      assignedTo: assignedTo || [],
      priority,
      dueDate,
      position,
    });

    return res.status(201).json({
      success: true,
      message: "Card created successfully",
      data: card,
    });
  } catch (error) {
    console.error("Create Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create card",
    });
  }
};

// ==============================
// GET CARDS BY LIST
// ==============================
const getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;

    const cards = await Card.find({
      list: listId,
    })
      .populate("assignedTo", "name email")
      .sort({ position: 1 });

    return res.status(200).json({
      success: true,
      count: cards.length,
      data: cards,
    });
  } catch (error) {
    console.error("Get Cards Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cards",
    });
  }
};

// ==============================
// GET SINGLE CARD
// ==============================
const getCardById = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).populate(
      "assignedTo",
      "name email"
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error("Get Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch card",
    });
  }
};

// ==============================
// UPDATE CARD
// ==============================
const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const allowedFields = [
      "title",
      "description",
      "priority",
      "dueDate",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const card = await Card.findByIdAndUpdate(
      cardId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Card updated successfully",
      data: card,
    });
  } catch (error) {
    console.error("Update Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update card",
    });
  }
};

// ==============================
// DELETE CARD
// ==============================
const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error("Delete Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete card",
    });
  }
};

// ==============================
// MOVE CARD
// ==============================
const moveCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { destinationListId, destinationIndex } = req.body;

    if (!destinationListId || destinationIndex === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "destinationListId and destinationIndex are required",
      });
    }

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    card.list = destinationListId;
    card.position = destinationIndex;

    await card.save();

    return res.status(200).json({
      success: true,
      message: "Card moved successfully",
      data: card,
    });
  } catch (error) {
    console.error("Move Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to move card",
    });
  }
};

// ==============================
// ASSIGN MEMBER TO CARD
// ==============================
const assignMember = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    const alreadyAssigned = card.assignedTo.some(
      (id) => id.toString() === userId
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "User already assigned to this card",
      });
    }

    card.assignedTo.push(userId);

    await card.save();

    return res.status(200).json({
      success: true,
      message: "Member assigned successfully",
      data: card,
    });
  } catch (error) {
    console.error("Assign Member Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign member",
    });
  }
};

module.exports = {
  createCard,
  getCardsByList,
  getCardById,
  updateCard,
  deleteCard,
  moveCard,
  assignMember,
};