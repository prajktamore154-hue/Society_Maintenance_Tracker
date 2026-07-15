const Notice = require("../models/Notice");

// ==============================
// Create Notice (Admin)
// ==============================
const createNotice = async (req, res) => {
    try {

        const { title, description, important } = req.body;

        const notice = await Notice.create({
            title,
            description,
            important
        });

        res.status(201).json({
            success: true,
            message: "Notice Created Successfully",
            notice
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==============================
// Get All Notices
// ==============================
const getNotices = async (req, res) => {
    try {

        const notices = await Notice.find()
            .sort({
                important: -1,
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            notices
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==============================
// Delete Notice
// ==============================
const deleteNotice = async (req, res) => {
    try {

        await Notice.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Notice Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createNotice,
    getNotices,
    deleteNotice
};