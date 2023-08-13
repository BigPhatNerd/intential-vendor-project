const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wilsonhorrell@gmail.com",
    pass: process.env.GMAIL_GENERATED_PASS,
  },
});

//@route POST stripe/charge
//@desc charge stripe for product
//@access Public
router.post("/charge", async (req, res) => {
  try {
    const { amount, source, email } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source,
      receipt_email: email,
    });

    const mailOptions = {
      from: "wilsonhorrell@gmail.com",
      to: email,
      subject: "Vendential Receipt/Wilson Horrell Vending Project",
      text: `Thank you for your payment of $${
        amount / 100
      }. Your transaction ID is ${charge.id}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Charge successful", charge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
