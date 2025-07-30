const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required:true
  }
})

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel