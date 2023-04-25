const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },

    name: {
      type: String,
    },
    productid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose?.models?.banner || mongoose.model("banner", bannerSchema);
