const express = require("express");
const {
  createWorkspace,
  getWorkspaces,
} = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);

module.exports = router;