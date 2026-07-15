const express = require("express");
const cors = require("cors");

const app = express();

// ==========================
// Import Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// Serve Uploaded Images
app.use("/uploads", express.static("uploads"));

// ==========================
// Test Route
// ==========================
app.get("/", (req, res) => {
    res.send("🚀 Society Maintenance Tracker API is Running");
});

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);

// ==========================
// Export
// ==========================
module.exports = app;