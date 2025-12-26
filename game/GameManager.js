import Game from "./Game.js";
import { getBotMove } from "../utils/botlogic.js";
import { v4 as uuidv4 } from "uuid";
import { saveFinishedGame ,updateLeaderboard}from "../db/gameRepo.js";
export default class GameManager {
  constructor() {
    this.waitingQueue = [];              // [{ socket, username }]
    this.games = new Map();              // gameId -> Game
    this.socketToGame = new Map();       
  }


  addToQueue(socket, username, io) {
    console.log("Player joined queue:", username);
    // 1: Another player is already waiting 
    if (this.waitingQueue.length > 0) {
      const opponent = this.waitingQueue.shift();
      this.createPlayerGame(opponent, { socket, username }, io);
      return;
    }

    // 2: No opponent ---
    this.waitingQueue.push({ socket, username });

    setTimeout(() => {
      // If still in queue after 10 seconds 
      const index = this.waitingQueue.findIndex(
        p => p.socket.id === socket.id
      );

      if (index !== -1) {
        this.waitingQueue.splice(index, 1);
        this.createBotGame(socket, username, io);
      }
    }, 10_000);
  }

  /*GAME CREATION  */

  createPlayerGame(p1, p2, io) {
    const gameId = uuidv4();
    const game = new Game(gameId);

    game.addPlayer(1, {
      username: p1.username,
      socketId: p1.socket.id,
      type: "HUMAN"
    });

    game.addPlayer(2, {
      username: p2.username,
      socketId: p2.socket.id,
      type: "HUMAN"
    });

    this.games.set(gameId, game);
    this.socketToGame.set(p1.socket.id, gameId);
    this.socketToGame.set(p2.socket.id, gameId);

    p1.socket.join(gameId);
    p2.socket.join(gameId);

    io.to(gameId).emit("game_start", game.serialize());
  }

  createBotGame(socket, username, io) {
    const gameId = uuidv4();
    const game = new Game(gameId);

    game.addPlayer(1, {
      username,
      socketId: socket.id,
      type: "HUMAN"
    });

    game.addPlayer(2, {
      username: "BOT",
      socketId: null,
      type: "BOT"
    });

    this.games.set(gameId, game);
    this.socketToGame.set(socket.id, gameId);
    socket.join(gameId);

    io.to(gameId).emit("game_start", game.serialize());
  }

  /*  GAMEPLAY  */

  handleMove(socket, gameId, column, io) {
    const game = this.games.get(gameId);
    if (!game) return;

    // Identify which player made the move
    const playerNumber =
      game.players[1]?.socketId === socket.id ? 1 : 2;

    const success = game.makeMove(playerNumber, column);
    if (!success) return;

    // Send updated board to both players
    io.to(gameId).emit("game_update", game.serialize());

    // BOT TURN
    if (
      game.status === "PLAYING" &&
      game.players[game.turn].type === "BOT"
    ) {
      setTimeout(() => {
        this.handleBotMove(game, io);
      }, 400);
    }

    // If game ended after human move
    if (game.status === "FINISHED") {
      this.finishGame(gameId, io);
    }
  }

  handleBotMove(game, io) {
    if (game.status !== "PLAYING") return;

    const column = getBotMove(game.board);
    game.makeMove(2, column);

    io.to(game.gameId).emit("game_update", game.serialize());

    if (game.status === "FINISHED") {
      this.finishGame(game.gameId, io);
    }
  }

  /* DISCONNECT HANDLING = */

  handleDisconnect(socket, io) {
    const gameId = this.socketToGame.get(socket.id);
    if (!gameId) return;
    const game = this.games.get(gameId);
    if (!game || game.status === "FINISHED") return;
    console.log("Player disconnected:", socket.id);
    setTimeout(() => {
      if (!this.socketToGame.has(socket.id)) {
        game.status = "FINISHED";
        game.winner = "FORFEIT";

        this.finishGame(gameId, io);

      }
    }, 30_000);
  }

  /*  CLEANUP  */

  async finishGame(gameId, io) {
  const game = this.games.get(gameId);
  if (!game) return;

  try {
    // 1️ Save completed game
    await saveFinishedGame(game);

    // 2️ Update leaderboard ONLY if winner is a player
    if (game.winner === 1 || game.winner === 2) {
      const winnerUsername =
        game.players[game.winner]?.username;

      if (winnerUsername) {
        await updateLeaderboard(winnerUsername);
      }
    }
  } catch (err) {
    console.error("❌ Error saving game:", err);
  }

  // Notify clients
  io.to(gameId).emit("game_over", game.serialize());

  //  Cleanup memory
  this.games.delete(gameId);
}

}
