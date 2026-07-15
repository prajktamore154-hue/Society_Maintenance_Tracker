const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createNotice,
    getNotices,
    deleteNotice
} = require("../controllers/noticeController");

// Resident + Admin
router.get("/", protect, getNotices);

// Admin Only
router.post("/", protect, adminOnly, createNotice);

router.delete("/:id", protect, adminOnly, deleteNotice);

module.exports = router;