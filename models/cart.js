const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose?.models?.cart || mongoose.model("cart", cartSchema);
