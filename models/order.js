import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderid: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.order || mongoose.model("order", orderSchema);
