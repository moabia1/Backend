require('dotenv').config();
const app = require("./src/App")
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service');
const { text } = require('stream/consumers');

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
});

const chatHistory = [ 

]

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("A user disconnect")
  })
  socket.on("ai-message", async (data) => {
    console.log("data come:- ", data)
    chatHistory.push({
      role: "user",
      parts:[{text:data}]
    })
    const response = await generateResponse(chatHistory);
    console.log("Ai response:-", response)
    chatHistory.push({
      role: "model",
      parts:[{ text: response}]
    })
    socket.emit("ai-message-response",response)
  })
})


httpServer.listen(3000, () => {
  console.log("Server running on Port")
});