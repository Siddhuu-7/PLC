import { Server } from "socket.io";
import http from "http";

class Socket {
  constructor(Serverapp, port) {
    this.app = Serverapp;
    this.server = http.createServer(this.app);
    this.port = port;

    this.activePoll = null;
  }

  startSocket() {
    const io = new Server(this.server, {
      cors: {
        origin: process.env.ALLOWORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {

      if (this.activePoll) {
        socket.emit("getVoteResult", this.activePoll);
      }

      socket.on("vote", (pollObject) => {

        this.activePoll = pollObject;

        io.emit("getVoteResult", this.activePoll);
      });

      socket.on("studentVote", ({ optionId }) => {
        if (!this.activePoll) return;
        const option = this.activePoll.options.find(
          (o) => o.id === optionId
        );
        if (!option) return;

        option.votes += 1;
        this.activePoll.totalVotes += 1;

        this.activePoll.options.forEach((o) => {
          o.percentage = Math.round(
            (o.votes / this.activePoll.totalVotes) * 100
          );
        });

        io.emit("getVoteResult", this.activePoll);
      });

      socket.on("disconnect", () => {
      });
    });
  }

  startServer() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Server Started at http://localhost:${this.port}`);
    });
  }
}

export default Socket;
