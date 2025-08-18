const { Server } = require("socket.io");
const cookie = require("cookie")

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "")

    if (!cookies.token) {
      next(new Error ("Authentication error (No Token Provided)"))
     }
  });

  io.on("connection", (socket) => {
    console.log("New Socket Connection", socket.id);
  });
};

module.exports = initSocketServer