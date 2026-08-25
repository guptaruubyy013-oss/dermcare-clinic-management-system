const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "Patient is required"],
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor is required"],
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        },
        invoiceNumber: {
            type: String,
            unique: true,
            required: true,
        },
        consultationFee: {
            type: Number,
            required: true,
            default: 0,
        },
        treatmentFee: {
            type: Number,
            default: 0,
        },
        medicineCharges: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "UPI", "Online"],
            default: "Cash",
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Partially Paid"],
            default: "Paid",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);