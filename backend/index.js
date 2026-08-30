const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const workspaceRoutes = require("./routes/workspaceRoutes");
const boardRoutes = require("./routes/boardRoutes");

connectDB();

app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});