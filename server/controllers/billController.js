const Bill = require("../models/Bill");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// @desc    Create a new bill / invoice
// @route   POST /api/billing
// @access  Admin, Receptionist
const createBill = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      appointment,
      consultationFee = 0,
      treatmentFee = 0,
      medicineCharges = 0,
      tax = 0,
      discount = 0,
      paymentMethod = "Cash",
      paymentStatus = "Paid",
    } = req.body;

    if (!patient || !doctor) {
      return res.status(400).json({ message: "Patient and Doctor are required for billing" });
    }

    const subtotal = Number(consultationFee) + Number(treatmentFee) + Number(medicineCharges);
    const totalAmount = subtotal + Number(tax) - Number(discount);

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const bill = await Bill.create({
      invoiceNumber,
      patient,
      doctor,
      appointment: appointment || null,
      consultationFee: Number(consultationFee),
      treatmentFee: Number(treatmentFee),
      medicineCharges: Number(medicineCharges),
      tax: Number(tax),
      discount: Number(discount),
      totalAmount,
      paymentMethod,
      paymentStatus,
    });

    res.status(201).json({ message: "Invoice generated successfully", bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bills
// @route   GET /api/billing
// @access  Admin, Receptionist
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("patient", "name phone email")
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: bills.length, bills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bill by ID
// @route   GET /api/billing/:id
// @access  Admin, Receptionist, Patient
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("patient", "name phone email age gender address")
      .populate("doctor", "name specialization consultationFee")
      .populate("appointment");

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get billing & clinic overview stats
// @route   GET /api/billing/stats
// @access  Admin
const getBillingStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: "Scheduled" });

    const revenueResult = await Bill.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  getBillingStats,
};