import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io(import.meta.env.VITE_SERVER_URL, {
  transports: ["websocket"],
});

export function useSocket() {
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  useEffect(() => {
    socket.on("game_start", setGame);
    socket.on("game_update", setGame);

    socket.on("game_over", (game) => {
      setWinner(game.winner);
    });

    socket.on("leaderboard", (data) => {
      setLeaderboard(data);
      setIsLeaderboardOpen(true);
    });

    return () => socket.off();
  }, []);

  return {
    socket,
    game,
    winner,
    leaderboard,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    setWinner,
  };
}
