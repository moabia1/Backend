const { Socket } = require("dgram");
const app = require("./src/App")
const { createServer } = require("http");
const { Server } = require("socket.io")

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("A user disconnect")
  })
})


httpServer.listen(3000, () => {
  console.log("Server running on Port")
});