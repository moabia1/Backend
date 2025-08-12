require("dotenv").config();
const connecToDb = require("./src/db/db")

const app = require("./src/App");

connecToDb();


app.listen(3000, () => {
  console.log("Server running on port")
})