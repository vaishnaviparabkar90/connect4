import { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import Board from "./components/Board";
import Controls from "./components/Controls";
import GameOverlay from "./components/GameOverlay";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const {
    socket,
    game,
    winner,
    leaderboard,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
  } = useSocket();

  // ✅ DERIVED STATUS (single source of truth)
  const status = winner
    ? "Game finished"
    : game
    ? "Game started"
    : joined
    ? "Waiting for opponent..."
    : "Not connected";

  const joinQueue = () => {
    if (!username) return alert("Enter username");
    socket.emit("join_queue", { username });
    setJoined(true);
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="w-[420px] rounded-2xl bg-slate-900 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Connect 4
        </h1>

        <input
          className="w-full mb-3 rounded-lg px-3 py-2 bg-slate-800 outline-none"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={joined}
        />

        <div className="flex gap-2 mb-3">
          <button
            className="flex-1 rounded-lg bg-blue-600 py-2 hover:bg-blue-500 transition disabled:opacity-50"
            onClick={joinQueue}
            disabled={joined}
          >
            Join Queue
          </button>

          <button
            className="rounded-lg bg-yellow-500 px-3 hover:bg-yellow-400"
            onClick={() => socket.emit("get_leaderboard")}
          >
            🏆
          </button>
        </div>

        {/* ✅ STATUS */}
        <p className="text-center text-green-400 mb-2 font-semibold">
          {status}
        </p>

        {game && (
          <>
            <div className="flex justify-between text-sm mb-2 text-slate-300">
              <span>Game: {game.gameId}</span>
              <span>Turn: {game.turn}</span>
            </div>

            <Board board={game.board} />

            <Controls
              onMove={(col) =>
                socket.emit("make_move", {
                  gameId: game.gameId,
                  column: col,
                })
              }
            />
          </>
        )}

        <p className="text-center text-xs mt-3 text-slate-400">
          🔴 Player 1 &nbsp;&nbsp; 🟡 Player 2 / Bot
        </p>
      </div>

      {winner && <GameOverlay winner={winner} />}

      {isLeaderboardOpen && (
        <Leaderboard
          data={leaderboard}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}
    </div>
  );
}
