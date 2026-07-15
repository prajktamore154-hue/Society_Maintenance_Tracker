const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus
} = require("../controllers/complaintController");

// =============================
// Resident Routes
// =============================

// Create Complaint (with optional image)
router.post(
    "/",
    protect,
    upload.single("image"),
    createComplaint
);

// View My Complaints
router.get("/my", protect, getMyComplaints);

// =============================
// Admin Routes
// =============================

// View All Complaints
router.get("/all", protect, adminOnly, getAllComplaints);

// Update Status & Priority
router.put(
    "/status/:id",
    protect,
    adminOnly,
    updateComplaintStatus
);

module.exports = router;