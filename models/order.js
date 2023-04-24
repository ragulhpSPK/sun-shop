import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: string,
      required: true,
    },
    address: {
      type: string,
      required: true,
    },
    total: {
      type: number,
      required: true,
    },
    status: {
      type: boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model.product || mongoose.model("order", orderSchema);
