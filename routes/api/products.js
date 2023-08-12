const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");
const auth = require("../../middleware/auth");

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
    const productID = req.body.productID;
    const product = await Product.findById(productID); // Fetch the product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity === 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    product.quantity--; // Decrement the quantity

    await product.save(); // Save the product
    console.log("I am here4");
    res.json(product); // Send the updated product as a response
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//@route PUT api/products
//@desc restock individual product route
//@access Private
router.put("/", auth, async (req, res) => {
  console.log("I am here");
  const { id, quantity, priceCents, adminID } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (quantity) {
      product.quantity = quantity;
    }
    if (priceCents) {
      product.priceCents = priceCents;
    }
    if (adminID) {
      const admin = await Admin.findById(adminID);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      product.lastUpdatedBy = admin;
    }

    await product.save();

    const populatedProduct = await Product.findById(id).populate(
      "lastUpdatedBy",
      "email"
    );
    res.json(populatedProduct);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
