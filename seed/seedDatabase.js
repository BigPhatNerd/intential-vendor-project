require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const seedData = require("./seedData");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

Product.deleteMany({})
  .then(() => {
    return Product.insertMany(seedData);
  })
  .then(() => {
    console.log("Seed data added");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding database", error);
  });
