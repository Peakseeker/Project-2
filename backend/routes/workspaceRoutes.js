const express = require("express");
const { createWorkspace } = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);

module.exports = router;