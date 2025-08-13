const { Server } = require("socket.io");
const generateResponse = require("../services/ai.service");

function setUpSocketServer (httpServer) {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    console.log("A User Connected");

    
    socket.on("ai-message", async (message) => {
      const response = await generateResponse(message);
      
      socket.emit("ai-message-response", response);
    })
    
    socket.on("disconnect", () => {
      console.log("User Disconnected")
    })
  })
}

module.exports = {
  setUpSocketServer
}