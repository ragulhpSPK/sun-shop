const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  imaga: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },
});

module.exports = mongoose?.models?.banner("banner", bannerSchema);
