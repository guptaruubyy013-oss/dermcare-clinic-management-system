const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware"); // or auth.js

const {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// Onboard Doctor (Admin only)
router.post("/doctors", protect, authorize("admin"), addDoctor);

// Fetch Doctors (Allow Admin, Receptionist, Doctor, Patient)
router.get("/doctors", protect, authorize("admin", "receptionist", "doctor", "patient"), getDoctors);
router.get("/doctors/:id", protect, authorize("admin", "receptionist", "doctor"), getDoctorById);
router.put("/doctors/:id", protect, authorize("admin"), updateDoctor);
router.delete("/doctors/:id", protect, authorize("admin"), deleteDoctor);

module.exports = router;