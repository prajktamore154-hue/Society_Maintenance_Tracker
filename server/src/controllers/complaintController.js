const Complaint = require("../models/Complaint");

// =======================================
// Resident - Create Complaint
// =======================================
const createComplaint = async (req, res) => {
    try {

        const { title, description, category } = req.body;

        const complaint = await Complaint.create({
    title,
    description,
    category,
    image: req.file ? req.file.filename : "",
    resident: req.user.id,

    history: [
        {
            action: "Complaint Created",
        },
    ],
});

        res.status(201).json({

            success: true,
            message: "Complaint Created Successfully",
            complaint

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }
};
// =======================================
// Resident - View My Complaints
// =======================================
const getMyComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find({
            resident: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            total: complaints.length,
            complaints

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }
};

// =======================================
// Admin - View All Complaints
// =======================================
const getAllComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find()
            .populate("resident", "name email flatNumber")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            total: complaints.length,
            complaints

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }
};

// =======================================
// Admin - Update Complaint
// =======================================
const updateComplaintStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status, priority, assignedTo } = req.body;

        // Validate Status
        if (
            status &&
            !["Pending", "In Progress", "Resolved"].includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status"
            });
        }

        // Validate Priority
        if (
            priority &&
            !["Unassigned", "Low", "Medium", "High"].includes(priority)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Priority"
            });
        }

        // Validate Assigned Staff
        if (
            assignedTo &&
            ![
                "Unassigned",
                "Electrician",
                "Plumber",
                "Cleaner",
                "Security",
                "Gardener",
                "General Maintenance"
            ].includes(assignedTo)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Assigned Staff"
            });
        }

        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint Not Found"
            });
        }

        // Update Status
        if (status && complaint.status !== status) {

            complaint.history.push({
                action: `Status changed to ${status}`,
            });

            complaint.status = status;
        }

        // Update Priority
        if (priority && complaint.priority !== priority) {

            complaint.history.push({
                action: `Priority changed to ${priority}`,
            });

            complaint.priority = priority;
        }

        // Update Assigned Staff
        if (assignedTo && complaint.assignedTo !== assignedTo) {

            complaint.history.push({
                action: `Assigned to ${assignedTo}`,
            });

            complaint.assignedTo = assignedTo;
        }

        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Complaint Updated Successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus
};