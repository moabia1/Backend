require("dotenv").config();
const http = require("http");
const connecToDb = require("./src/db/db")
const app = require("./src/App");
const { setUpSocketServer } = require("./src/socket/socket.server");

const httpServer = http.createServer(app);

setUpSocketServer(httpServer);

connecToDb();


httpServer.listen(3000, () => {
  console.log("Server running on port")
})