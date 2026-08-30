const Workspace = require("../models/Workspace");

const createWorkspace = async (req, res) => {
  try {
    const { name, description, owner } = req.body;

    if (!name || !owner) {
      return res.status(400).json({
        message: "Workspace name and owner are required",
      });
    }

    const workspace = await Workspace.create({
      name,
      description,
      owner,
      members: [owner],
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create workspace",
      error: error.message,
    });
  }
};

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find();

    res.status(200).json({
      message: "Workspaces fetched successfully",
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workspaces",
      error: error.message,
    });
  }
};

// Get a single workspace by ID
const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      message: "Workspace fetched successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workspace",
      error: error.message,
    });
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
};