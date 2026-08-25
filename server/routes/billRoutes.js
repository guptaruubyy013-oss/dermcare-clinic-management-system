const express = require("express");
const router = express.Router();

const {
  createBill,
  getBills,
  getBillById,
  getBillingStats,
} = require("../controllers/billController");

router.get("/stats", getBillingStats);
router.post("/", createBill);
router.get("/", getBills);
router.get("/:id", getBillById);

module.exports = router;