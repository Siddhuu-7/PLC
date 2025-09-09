import { Server } from "socket.io";
import http from "http";

class Socket {
  constructor(Serverapp, port) {
    this.app = Serverapp;
    this.server = http.createServer(this.app);
    this.port = port;
  }

  startSocket() {
    const io = new Server(this.server, {
      cors: {
        origin: process.env.ALLOWORIGIN,
        methods: ["GET", "POST"],
      },
    });

   io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

      socket.on("sendresult", async (data) => {
    console.log("Received:", data);

    socket.broadcast.emit("getresult", data.payload);
      });
    

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

  }

  startServer() {
    this.server.listen(this.port, () => {
      console.log(`Server Started at http://localhost:${this.port}`);
    });
  }
}

export default Socket;
