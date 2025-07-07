const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(
    "mongodb+srv://mdmoabia81:zNr7Is0M5z9BGlwo@cohort.ar1fdo1.mongodb.net/cohort"
  ).then(() => {
    console.log("Backend connect succesfully")
  })
}

module.exports = connectToDb