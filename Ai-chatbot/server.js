require('dotenv').config();
const app = require("./src/App")
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("A user disconnect")
  })
  socket.on("ai-message", async (data) => {
    const response = await generateResponse(data.prompt);
    socket.emit("ai-message-response",response)
  })
})


httpServer.listen(3000, () => {
  console.log("Server running on Port")
});