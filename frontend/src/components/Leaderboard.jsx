export default function Leaderboard({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-5 w-80">
        <h2 className="text-xl mb-3 text-center">🏆 Leaderboard</h2>

        <div className="space-y-2">
          {data.map((p, i) => (
            <div
              key={i}
              className="flex justify-between bg-slate-700 px-3 py-2 rounded"
            >
              <span>{i + 1}. {p.username}</span>
              <span className="font-bold">{p.wins}</span>
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full rounded-lg bg-red-500 py-2 hover:bg-red-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
