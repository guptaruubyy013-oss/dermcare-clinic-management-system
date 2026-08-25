const Patient = require("../models/Patient");

// @desc    Create/Register a new Patient
// @route   POST /api/patients
// @access  Admin, Receptionist
const createPatient = async (req, res) => {
  try {
    const { name, phone, email, gender, age, medicalHistory, address } = req.body;

    if (!name || !phone || !age) {
      return res.status(400).json({ message: "Name, phone, and age are required" });
    }

    const patient = await Patient.create({
      name,
      phone,
      email: email || "",
      gender: gender || "Male",
      age: Number(age),
      medicalHistory: medicalHistory || "",
      address: address || "",
    });

    res.status(201).json({ message: "Patient registered successfully", patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Patients
// @route   GET /api/patients
// @access  Admin, Receptionist, Doctor
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json({ patients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Patient by ID
// @route   GET /api/patients/:id
// @access  Admin, Receptionist, Doctor
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Patient
// @route   PUT /api/patients/:id
// @access  Admin, Receptionist
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient updated successfully", patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Patient
// @route   DELETE /api/patients/:id
// @access  Admin
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};