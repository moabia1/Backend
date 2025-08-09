const mongoose = require("mongoose");

function connecToDb() {
  mongoose.connect(
    "mongodb+srv://mdmoabia81:zNr7Is0M5z9BGlwo@cohort.ar1fdo1.mongodb.net/cohort"
  ).then(() => {
    console.log("MongoDb Connected")
  })
  .catch((err)=> console.log(err))
}

module.exports = connecToDb