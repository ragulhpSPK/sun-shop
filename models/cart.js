const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    image: {
      type: Array,
    },

    name: {
      type: String,
    },
    total: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose?.models?.cart || mongoose.model("cart", cartSchema);
