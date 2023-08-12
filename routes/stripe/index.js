const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require("express");
const router = express.Router();

module.exports = router;
