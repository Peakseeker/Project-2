const List = require("../models/List");

// ==============================
// CREATE LIST
// ==============================
const createList = async (req, res) => {
  try {
    const { title, board } = req.body;

    if (!title || !board) {
      return res.status(400).json({
        success: false,
        message: "Title and board are required",
      });
    }

    // Get last list position for this board
    const lastList = await List.findOne({ board })
      .sort({ position: -1 });

    const position = lastList
      ? lastList.position + 1
      : 0;

    const list = await List.create({
      title,
      board,
      position,
    });

    return res.status(201).json({
      success: true,
      message: "List created successfully",
      data: list,
    });
  } catch (error) {
    console.error("Create List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create list",
    });
  }
};

// ==============================
// GET ALL LISTS BY BOARD
// ==============================
const getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({
      board: boardId,
    }).sort({ position: 1 });

    return res.status(200).json({
      success: true,
      count: lists.length,
      data: lists,
    });
  } catch (error) {
    console.error("Get Lists Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lists",
    });
  }
};

// ==============================
// UPDATE LIST
// ==============================
const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;

    const list = await List.findByIdAndUpdate(
      listId,
      { title },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List updated successfully",
      data: list,
    });
  } catch (error) {
    console.error("Update List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update list",
    });
  }
};

// ==============================
// DELETE LIST
// ==============================
const deleteList = async (req, res) => {
  try {
    const { listId } = req.params;

    const list = await List.findByIdAndDelete(listId);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List deleted successfully",
    });
  } catch (error) {
    console.error("Delete List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete list",
    });
  }
};

module.exports = {
  createList,
  getListsByBoard,
  updateList,
  deleteList,
};