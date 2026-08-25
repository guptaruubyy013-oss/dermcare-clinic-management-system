const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "receptionist", "admin"],
      default: "patient",
    },
    // Optional Doctor / Staff metadata
    qualification: {
      type: String,
      default: "",
    },
    specialty: {
      type: String,
      default: "",
    },
    consultationFee: {
      type: String,
      default: "₹800",
    },
    shift: {
      type: String,
      default: "Morning (9:00 AM - 5:00 PM)",
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);