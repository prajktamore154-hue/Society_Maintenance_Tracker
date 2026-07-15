const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Electrical",
                "Plumbing",
                "Cleaning",
                "Security",
                "Other"
            ],
            default: "Other"
        },

        priority: {
    type: String,
    enum: [
        "Unassigned",
        "Low",
        "Medium",
        "High"
    ],
    default: "Unassigned"
},

    assignedTo: {
    type: String,
    enum: [
        "Unassigned",
        "Electrician",
        "Plumber",
        "Cleaner",
        "Security",
        "Gardener",
        "General Maintenance"
    ],
    default: "Unassigned"
},

history: [
    {
        action: {
            type: String
        },

        timestamp: {
            type: Date,
            default: Date.now
        },

        note: {
            type: String,
            default: ""
        }
    }
],


        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Resolved"
            ],
            default: "Pending"
        },

        resident: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);