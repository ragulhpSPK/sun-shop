import mongoose from "mongoose";

const cartSchema =
  ({
    image: {
      type: string,
      required: false,
    },

    name: {
      type: string,
      required: true,
    },
    total: {
      type: number,
      required: true,
    },
    quantity: {
      type: number,
      required: true,
    },
  },
  { timestamps: true });

export default mongoose.model.cart || mongoose.model("cart", cartSchema);
