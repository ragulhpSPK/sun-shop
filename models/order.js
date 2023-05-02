import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    customer: {
      type: String,
    },
    address: {
      type: String,
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose?.models?.order || mongoose.model("order", orderSchema);
