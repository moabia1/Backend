const { Server } = require("socket.io");
const cookie = require("cookie")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const {generateResponse,generateVectors} = require("../services/ai.service")
const messageModel = require("../models/message.model");
const {createMemory,queryMemory} = require("../services/vector.service");
const { text } = require("express");
const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");
  
function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async(socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Authentication error (No Token Provided)"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id)
      socket.user = user
      console.log(user)
      next()
    } catch (error) {
      next(new Error("Authentication error (No Token Provided)"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {

      const message = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });

      const vectors = await generateVectors(messagePayload.content);

      const memory = await queryMemory({
        queryVector: vectors,
        limit: 3,
        metadata:{}
      })

      console.log(memory);

      await createMemory({
        vectors,
        messageId: message._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text:messagePayload.content

        }
      })
  

      const chatHistory = (await messageModel.find({
        chat: messagePayload.chat
      }).sort({ createdAt: -1 }).limit(20).lean()).reverse();
      
      const response = await generateResponse(
        chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        })
      );

      const responseVecotrs = await generateVectors(response)

      const responseMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });


      await createMemory({
        vectors: responseVecotrs,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text:response
        }
      })

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat
      });
    })

  });
};

module.exports = initSocketServer