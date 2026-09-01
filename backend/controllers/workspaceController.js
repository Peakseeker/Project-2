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

const updateWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update workspace",
      error: error.message,
    });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete workspace",
      error: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    if (workspace.members.some((member) => member.toString() === userId)) {
      return res.status(400).json({
        message: "User is already a member",
      });
    }

    workspace.members.push(userId);
    await workspace.save();

    res.status(200).json({
      message: "Member added successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add member",
      error: error.message,
    });
  }
};

const removeMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    workspace.members = workspace.members.filter(
      (member) => member.toString() !== userId
    );

    await workspace.save();

    res.status(200).json({
      message: "Member removed successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove member",
      error: error.message,
    });
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addMember,
  removeMember,
};