const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

//@route POST stripe/charge
//@desc charge stripe for product
//@access Public
router.post("/", async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source,
      receipt_email,
    });

    res.status(200).json({ message: "Charge successful", charge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
