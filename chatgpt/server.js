require("dotenv").config();
const app = require("./src/App");



app.listen(3000, () => {
  console.log("Server running on port")
})