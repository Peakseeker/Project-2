const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
} = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceById);
router.put("/:id", updateWorkspace);

module.exports = router;