const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "Patient ID is required"],
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        },
        treatmentType: {
            type: String,
            required: [true, "Treatment type is required"], // e.g., Acne Scars, Hair PRP, Chemical Peel
            trim: true,
        },
        sessionNumber: {
            type: Number,
            default: 1,
        },
        diagnosis: {
            type: String,
            required: true,
        },
        procedureNotes: {
            type: String,
        },
        // Before and After image URLs from Cloudinary
        beforeImages: [
            {
                url: String,
                public_id: String,
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        afterImages: [
            {
                url: String,
                public_id: String,
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        prescriptions: [
            {
                medicineName: String,
                dosage: String, // e.g. "Once daily after food"
                duration: String, // e.g. "14 Days"
            },
        ],
        nextFollowUpDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Treatment", treatmentSchema);