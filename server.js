require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const auth = require("./routes/api/auth");
const admins = require("./routes/api/admins");
const products = require("./routes/api/products");
const stripe = require("./routes/stripe");
var cors = require("cors");
const app = express();

connectDB();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/admins", admins);
app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/stripe", stripe);
console.log({ stripe });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
