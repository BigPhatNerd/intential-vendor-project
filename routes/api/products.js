const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

//@route GET api/products
//@desc get all products route
//@access Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("lastUpdatedBy", "email"); // Fetch all products
    res.json(products); // Send the products as a response
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//@route POST api/products/dispense
//@desc decrement product quantity route
//@access Public
router.post("/dispense", async (req, res) => {
  try {
    console.log("I am here");
    const productId = req.body.productID;
    const product = await Product.findById(productId); // Fetch the product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity === 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }
    product.quantity--; // Decrement the quantity

    await product.save(); // Save the product
    res.json(product); // Send the updated product as a response
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
