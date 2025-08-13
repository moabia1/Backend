const { Server } = require("socket.io");

function setUpSocketServer (httpServer) {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    console.log("A User Connected");

    socket.on("disconnect", () => {
      console.log("User Disconnected")
    })

    socket.on()
  })
}

module.exports = {
  setUpSocketServer
}