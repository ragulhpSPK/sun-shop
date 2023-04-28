const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose?.models?.cart || mongoose.model("cart", cartSchema);
