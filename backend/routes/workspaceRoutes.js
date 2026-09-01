const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addMember,
  removeMember,
  getWorkspaceMembers,
} = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceById);
router.put("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);

// Get all members of a workspace
router.get("/:id/members", getWorkspaceMembers);

// Add a member to workspace
router.post("/:id/members", addMember);

// Remove a member from workspace
router.delete("/:id/members", removeMember);

module.exports = router;