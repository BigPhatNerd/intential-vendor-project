const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../models");
const { check, validationResult } = require("express-validator");
const { adminValidations } = require("../validationHelpers");

const baseURL = process.env.BASE_URL || "http://localhost:5173";

router.get("/", auth, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", adminValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/reset-password-initiate", async (req, res) => {
  const user = await Admin.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found.");

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wilsonhorrell@gmail.com",
      pass: process.env.GMAIL_GENERATED_PASS,
    },
  });

  transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
               Please click on the following link, or paste it into your browser to complete the process:
               ${baseURL}/reset-password?token=${token}`,
  });

  res.send("Password reset email sent.");
});

router.post("/reset-password", async (req, res) => {
  const user = await Admin.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).send("Invalid or expired token.");

  user.password = req.body.password; // make sure to hash the password before saving
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send("Password reset successful.");
});

module.exports = router;
