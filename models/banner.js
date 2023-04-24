const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  imaga: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Banner("Banner", bannerSchema);
