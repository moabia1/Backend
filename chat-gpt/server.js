require("dotenv").config();
const http = require("http")
const app = require("./src/app");
const connectToDb = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");

const httpServer = http.createServer(app)

initSocketServer(httpServer)
connectToDb();

httpServer.listen(3000, () => {
  console.log("Server Running On Port 3000")
})

