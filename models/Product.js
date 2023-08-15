const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priceCents: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (v) {
        if (this.name === "Fizz" || this.name === "Pop") {
          return v <= 100;
        }
        if (this.name === "Cola") {
          return v <= 200;
        }
        if (this.name === "Mega Pop") {
          return v <= 50;
        }
        return true;
      },
      message: (props) =>
        `${props.value} exceeds tha max quantity for ${props.name}`,
    },
  },

  //totalSales, totalStocked, and totalDispensed are reactive properties
  // Do not set these manually
  totalSales: {
    type: Number,
    required: true,
    default: 0,
  },
  totalStocked: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDispensed: {
    type: Number,
    required: true,
    default: 0,
  },
  // End reactive properties

  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

ProductSchema.post("init", function () {
  this._initialState = this.toObject();
});

ProductSchema.pre("save", function setStockedAndDispensed(next) {
  if (this.isNew) {
    this.totalStocked = this.quantity;
  }

  if (!this.isNew && this.isModified("quantity")) {
    const oldValue = this._initialState
      ? this._initialState.quantity
      : this.quantity;
    const newValue = this.quantity;

    const difference = Math.abs(oldValue - newValue);

    if (oldValue < newValue) {
      this.totalStocked += difference;
    } else if (oldValue > newValue) {
      this.totalDispensed += difference;
    }
  }

  next();
});

ProductSchema.pre("save", function setTotalSales(next) {
  if (this.isModified("totalDispensed")) {
    this.totalSales += this.priceCents;
  }

  next();
});

const Product = model("Product", ProductSchema);

module.exports = Product;
