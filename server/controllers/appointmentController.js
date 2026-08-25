const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

// @desc    Book a new appointment
// @route   POST /api/appointments
const createAppointment = async (req, res) => {
    try {
        const { patient, doctor, appointmentDate, timeSlot, concernType, symptoms, notes } = req.body;

        // Verify patient and doctor exist
        const patientExists = await Patient.findById(patient);
        if (!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const doctorExists = await Doctor.findById(doctor);
        if (!doctorExists || !doctorExists.isActive) {
            return res.status(404).json({ message: "Doctor not found or inactive" });
        }

        // Check for existing overlapping appointment for the same doctor and slot
        const parsedDate = new Date(appointmentDate);
        const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

        const existingAppointment = await Appointment.findOne({
            doctor,
            appointmentDate: { $gte: startOfDay, $lte: endOfDay },
            timeSlot,
            status: { $ne: "Cancelled" },
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: "This time slot is already booked for this doctor. Please choose another slot.",
            });
        }

        const appointment = await Appointment.create({
            patient,
            doctor,
            appointmentDate,
            timeSlot,
            concernType,
            symptoms,
            notes,
        });

        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate("patient", "name phone email")
            .populate("doctor", "name specialization consultationFee");

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: populatedAppointment,
        });
    } catch (error) {
        console.error("Create appointment error:", error);
        res.status(500).json({ message: "Server error while booking appointment" });
    }
};

// @desc    Get all appointments (Filter by Doctor, Patient, Date, or Status)
// @route   GET /api/appointments
const getAppointments = async (req, res) => {
    try {
        const { doctor, patient, status, date } = req.query;
        let query = {};

        if (doctor) query.doctor = doctor;
        if (patient) query.patient = patient;
        if (status) query.status = status;

        if (date) {
            const searchDate = new Date(date);
            const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
            query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
        }

        const appointments = await Appointment.find(query)
            .populate("patient", "name phone email gender age")
            .populate("doctor", "name specialization consultationFee")
            .sort({ appointmentDate: 1, timeSlot: 1 });

        res.status(200).json({ count: appointments.length, appointments });
    } catch (error) {
        console.error("Get appointments error:", error);
        res.status(500).json({ message: "Server error while fetching appointments" });
    }
};

// @desc    Update appointment status (e.g. Completed, Cancelled, In-Progress)
// @route   PATCH /api/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Scheduled", "In-Progress", "Completed", "Cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
            .populate("patient", "name phone")
            .populate("doctor", "name specialization");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
            message: `Appointment status updated to ${status}`,
            appointment,
        });
    } catch (error) {
        console.error("Update appointment status error:", error);
        res.status(500).json({ message: "Server error while updating status" });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
};