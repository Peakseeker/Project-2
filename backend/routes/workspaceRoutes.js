const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
} = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceById);

module.exports = router;