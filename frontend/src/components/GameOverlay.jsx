export default function GameOverlay({ winner }) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-72 text-center">
        <h2 className="text-xl mb-4 text-yellow-400">
          {winner === "DRAW" ? "It's a Draw!" : `Winner: ${winner}`}
        </h2>

        <button
          className="w-full rounded-lg bg-blue-600 py-2 hover:bg-blue-500"
          onClick={handleReload}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
