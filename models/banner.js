const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },
});

module.exports =
  mongoose?.models?.banner || mongoose.model("banner", bannerSchema);
