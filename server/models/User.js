const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  desktopConfig: {
    wallpaper: String,
    theme: String
  },
  notes: {
    content: String
  }
});

module.exports = mongoose.model("User", userSchema);