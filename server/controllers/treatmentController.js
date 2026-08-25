const Treatment = require("../models/Treatment");
const Patient = require("../models/Patient");

// @desc    Add a treatment session with optional Before/After images
// @route   POST /api/treatments
const createTreatment = async (req, res) => {
    try {
        const { patient, doctor, appointment, treatmentType, sessionNumber, diagnosis, procedureNotes, prescriptions, nextFollowUpDate } = req.body;

        const beforeImages = [];
        const afterImages = [];

        if (req.files && req.files.beforeImages) {
            req.files.beforeImages.forEach((file) => {
                beforeImages.push({ url: file.path, public_id: file.filename });
            });
        }

        if (req.files && req.files.afterImages) {
            req.files.afterImages.forEach((file) => {
                afterImages.push({ url: file.path, public_id: file.filename });
            });
        }

        const parsedPrescriptions = typeof prescriptions === "string" ? JSON.parse(prescriptions) : prescriptions;

        const treatment = await Treatment.create({
            patient,
            doctor,
            appointment,
            treatmentType,
            sessionNumber,
            diagnosis,
            procedureNotes,
            beforeImages,
            afterImages,
            prescriptions: parsedPrescriptions,
            nextFollowUpDate,
        });

        res.status(201).json({
            message: "Treatment record & images saved successfully",
            treatment,
        });
    } catch (error) {
        console.error("Create treatment error:", error);
        res.status(500).json({ message: "Server error while saving treatment record" });
    }
};

// @desc    Get patient complete treatment history (for progress timeline & image comparison)
// @route   GET /api/treatments/patient/:patientId
const getPatientTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find({ patient: req.params.patientId })
            .populate("doctor", "name specialization")
            .sort({ sessionNumber: 1, createdAt: 1 });

        res.status(200).json({ count: treatments.length, treatments });
    } catch (error) {
        console.error("Get patient treatments error:", error);
        res.status(500).json({ message: "Server error fetching treatment records" });
    }
};

module.exports = {
    createTreatment,
    getPatientTreatments,
};