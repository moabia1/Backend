const mongoose = require("mongoose");

function connectToDb() {
   mongoose.connect(
    process.env.MONGO_URL
  ).then(() => {
    console.log("Data base connected")
  })
}

module.exports = connectToDb