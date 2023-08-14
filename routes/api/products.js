const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");
const auth = require("../../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("lastUpdatedBy", "email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/dispense", async (req, res) => {
  try {
    const productID = req.body.productID;
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity === 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    product.quantity--;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", auth, async (req, res) => {
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
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/download-json/:id", async (req, res) => {
  const productID = req.params.id;
  const product = await Product.findById(productID);
  const productData = {
    name: product.name,
    description: product.description,
    price: `$${(product.priceCents / 100).toFixed(2)}`,
  };

  const jsonData = JSON.stringify(productData);

  res.setHeader("Content-disposition", "attachment; filename=soda.json");
  res.setHeader("Content-type", "application/json");
  res.send(jsonData);
});

module.exports = router;
