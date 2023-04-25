import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },

    categoryname: {
      type: String,
    },
    subcategoryname: {
      type: String,
    },
    highlight: {
      type: String,
    },

    image: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose?.models?.product || mongoose.model("product", productSchema);
