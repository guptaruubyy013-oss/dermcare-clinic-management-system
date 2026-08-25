const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET /api/appointments
router.get("/", async (req, res) => {
  try {
    const { doctorName, patientEmail } = req.query;
    let query = {};

    if (patientEmail) {
      query.$or = [{ email: patientEmail }, { patientEmail: patientEmail }];
    } else if (doctorName) {
      query.$or = [
        { doctorName: new RegExp(doctorName, "i") },
        { doctorName: "Any Available Specialist" },
        { doctorName: { $exists: false } },
        { doctorName: "" }
      ];
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Fetch appointments error:", error);
    res.status(500).json({ message: "Failed to retrieve appointments", error: error.message });
  }
});

// POST /api/appointments
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      fullName,
      name,
      phone,
      contact,
      email,
      concern,
      service,
      date,
      appointmentDate,
      timeSlot,
      slot,
      time,
      doctorName,
      doctor,
      doctorId,
      notes,
    } = req.body;

    const newAppointment = new Appointment({
      patientName: patientName || fullName || name || "Patient",
      phone: phone || contact || "9876543210",
      email: email || "patient@dermcare.com",
      concern: concern || service || "General Skin Consultation",
      date: date || appointmentDate || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || slot || time || "11:00 AM",
      doctorName: doctorName || doctor || "DR. NEHA YADAV",
      doctorId: doctorId || null,
      notes: notes || "",
      status: "Confirmed",
      consultationFee: 900,
      treatmentFee: 0,
      tax: 162,
      totalAmount: 1062,
      paymentStatus: "Unpaid",
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
});

// PUT /api/appointments/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Appointment record not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment", error: error.message });
  }
});

module.exports = router;