// name: {
//     type: String,
//   },
//   description: {
//     type: String,
//   },
//   priceCents: {
//     type: Number,
//   },
//   quantity: {
//     type: Number,
//     // set max quantity to 100
//     max: 100,
//     min: 0,
//   },
//   lastUpdatedBy: {
//     type: Schema.Types.ObjectId,
//     ref: "Admin",
//   },
module.exports = [
  {
    name: "Fizz",
    description:
      "An effervescent fruity experience with hints of grape and coriander.",
    priceCents: 10000,
    quantity: 100,
  },
  {
    name: "Pop",
    description: "An explosion of flavor that will knock your socks off!",
    priceCents: 10000,
    quantity: 100,
  },
  {
    name: "Cola",
    description:
      "A basic no nonsense cola that is the perfect pick me up for any occasion.",
    priceCents: 10000,
    quantity: 100,
  },
  {
    name: "Mega Pop",
    description:
      "Not for the faint of heart.  So flavorful and so invigorating, it should probably be illegal.",
    priceCents: 10000,
    quantity: 100,
  },
];
