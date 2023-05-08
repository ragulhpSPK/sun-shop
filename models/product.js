import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      required: true,
    },
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

    categoryId: {
      type: String,
    },

    SubCategoryId: {
      type: String,
    },

    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose?.models?.product || mongoose.model("product", productSchema);
