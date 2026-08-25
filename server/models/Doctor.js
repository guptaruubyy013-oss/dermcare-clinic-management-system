const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    specialty: {
      type: String,
      default: "Clinical Dermatology & Acne",
    },
    qualification: {
      type: String,
      default: "MD - Dermatologist",
    },
    consultationFee: {
      type: String,
      default: "₹900",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);