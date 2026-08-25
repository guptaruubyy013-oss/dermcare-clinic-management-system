const express = require("express");
const router = express.Router();
const { createTreatment, getPatientTreatments } = require("../controllers/treatmentController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

router.use(protect);

router.post(
    "/",
    authorize("doctor", "admin"),
    upload.fields([
        { name: "beforeImages", maxCount: 5 },
        { name: "afterImages", maxCount: 5 },
    ]),
    createTreatment
);

router.get("/patient/:patientId", authorize("admin", "doctor", "receptionist", "patient"), getPatientTreatments);

module.exports = router;