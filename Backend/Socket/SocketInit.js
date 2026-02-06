import { Server } from "socket.io";
import GameManager from "../game/GameManager.js";
import { getLeaderboard } from "../db/gameRepo.js";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  const gameManager = new GameManager();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_queue", ({ username }) => {
      console.log(`${username} joined queue`);
      gameManager.addToQueue(socket, username, io);
    });
    socket.on("make_move", ({ gameId, column }) => {
      gameManager.handleMove(socket, gameId, column, io);
    });
    socket.on("get_leaderboard", async () => {
     const leaderboard = await getLeaderboard();
    socket.emit("leaderboard", leaderboard);
});

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      gameManager.handleDisconnect(socket, io);
    });
  });

  return io;
}
