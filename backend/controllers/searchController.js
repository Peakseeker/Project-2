const Workspace = require("../models/Workspace");
const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");

// Global Search
const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    // Check search query
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchRegex = new RegExp(q, "i");

    // Search in all collections
    const [workspaces, boards, lists, cards] = await Promise.all([
      Workspace.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
        ],
      }),

      Board.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
        ],
      }),

      List.find({
        title: searchRegex,
      }),

      Card.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
        ],
      }),
    ]);

    res.status(200).json({
      success: true,
      query: q,
      results: {
        workspaces,
        boards,
        lists,
        cards,
      },
    });
  } catch (error) {
    console.error("Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};

module.exports = {
  globalSearch,
};