const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Gmail SMTP Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CLINIC_EMAIL,
    pass: process.env.CLINIC_EMAIL_APP_PASSWORD,
  },
});

router.post("/confirm-order", async (req, res) => {
  const {
    orderId,
    items,
    totalAmount,
    pickupDate,
    pickupTimeSlot,
    pickupAddress,
    userEmail,
    userName,
  } = req.body;

  const itemsListHtml = items
    .map(
      (item) =>
        `<li style="margin-bottom: 8px;"><strong>${item.name}</strong> × ${item.qty} — <span style="color: #0e3b43;">₹${item.price * item.qty}</span></li>`
    )
    .join("");

  const mailOptions = {
    from: `"DermCare Clinical Pharmacy" <${process.env.CLINIC_EMAIL}>`,
    to: userEmail,
    subject: `Order Confirmed: ${orderId} - DermCare Clinic Pickup Details`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0ecee; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0e3b43; margin: 0;">✨ DermCare Clinic</h2>
          <p style="color: #6c757d; font-size: 14px; margin-top: 5px;">Advanced Dermatology & Clinical Formulations</p>
        </div>

        <div style="background-color: #eaf7ee; padding: 15px; border-radius: 8px; border-left: 5px solid #198754; margin-bottom: 20px;">
          <h3 style="color: #198754; margin: 0 0 5px 0;">✓ Order Placed Successfully</h3>
          <p style="margin: 0; font-size: 14px; color: #2d3748;">Hello <strong>${userName}</strong>, your clinical order <strong>${orderId}</strong> is confirmed.</p>
        </div>

        <h4 style="color: #0e3b43; margin-bottom: 10px;">📦 Order Summary:</h4>
        <ul style="padding-left: 20px; color: #333; font-size: 14px;">
          ${itemsListHtml}
        </ul>

        <div style="font-size: 16px; font-weight: bold; color: #0e3b43; margin: 15px 0; padding: 10px 0; border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc;">
          Total Amount Payable: ₹${totalAmount}
        </div>

        <h4 style="color: #0e3b43; margin-bottom: 8px;">🏥 Clinic Pickup Instructions:</h4>
        <div style="background-color: #f8fafb; padding: 15px; border-radius: 8px; font-size: 14px; color: #495057;">
          <p style="margin: 0 0 8px 0;"><strong>Pickup Ready Date:</strong> ${pickupDate}</p>
          <p style="margin: 0 0 8px 0;"><strong>Pickup Timing:</strong> ${pickupTimeSlot}</p>
          <p style="margin: 0;"><strong>Clinic Address:</strong> ${pickupAddress}</p>
        </div>

        <p style="font-size: 12px; color: #6c757d; margin-top: 25px; text-align: center;">
          Please present this email or Order ID (${orderId}) at the clinic counter during collection.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Nodemailer error details:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;