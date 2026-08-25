const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      default: "Patient",
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    concern: {
      type: String,
      default: "General Dermatology Consultation",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    timeSlot: {
      type: String,
      default: "11:00 AM",
    },
    doctorName: {
      type: String,
      default: "DR. ANKIT PANDEY",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Checked-In", "In-Consultation", "Completed", "Checked-Out", "Cancelled"],
      default: "Confirmed",
    },
    // Clinical Notes & Regimen
    prescription: {
      type: String,
      default: "",
    },
    clinicalNotes: {
      type: String,
      default: "",
    },
    // Before & After Clinical Media
    beforeImage: {
      type: String,
      default: "",
    },
    afterImage: {
      type: String,
      default: "",
    },
    // Billing Details
    consultationFee: {
      type: Number,
      default: 900,
    },
    treatmentFee: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 162,
    },
    totalAmount: {
      type: Number,
      default: 1062,
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    paymentMethod: {
      type: String,
      default: "UPI / Card",
    },
    invoiceNumber: {
      type: String,
      default: () => `INV-${Date.now().toString().slice(-6)}`,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);