const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
});

module.exports =
  mongoose?.models?.message || mongoose.model("message", messageSchema);
