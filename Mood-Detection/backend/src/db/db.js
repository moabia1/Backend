const e = require('express');
const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDb connected")
  })
    .catch((err) => {
    console.log("Error is",err)
  })
}

module.exports = connectToDb