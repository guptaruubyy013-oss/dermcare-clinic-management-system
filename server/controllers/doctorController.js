const Doctor = require("../models/Doctor");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Add / Create a new Doctor
// @route   POST /api/admin/doctors
// @access  Admin
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      specialization,
      qualification,
      qualifications,
      experience,
      experienceYears,
      consultationFee,
      licenseNumber,
    } = req.body;

    if (!name || !email || !phone || !specialization) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 1. Check if user/doctor exists
    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Doctor@123", salt);
      user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: "doctor",
      });
    }

    // 2. Check if Doctor profile already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor profile already registered with this email" });
    }

    // 3. Create Doctor Document matching Schema requirements
    const doctor = await Doctor.create({
      user: user._id,
      name,
      email,
      phone,
      specialization,
      qualification: qualification || qualifications || "MBBS, MD (Dermatology)",
      qualifications: qualifications || qualification || "MBBS, MD (Dermatology)",
      experience: Number(experience || experienceYears || 5),
      experienceYears: Number(experienceYears || experience || 5),
      licenseNumber: licenseNumber || `DOC-${Math.floor(100000 + Math.random() * 900000)}`,
      consultationFee: Number(consultationFee || 800),
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      timeSlots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"],
    });

    res.status(201).json({ message: "Doctor profile created successfully! 🩺", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Doctors
// @route   GET /api/admin/doctors
// @access  Public / Authenticated
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email phone").sort({ createdAt: -1 });
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Doctor by ID
// @route   GET /api/admin/doctors/:id
// @access  Public / Authenticated
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user", "name email phone");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Doctor
// @route   PUT /api/admin/doctors/:id
// @access  Admin
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Doctor
// @route   DELETE /api/admin/doctors/:id
// @access  Admin
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};