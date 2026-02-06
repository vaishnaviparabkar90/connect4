export default function Controls({ onMove }) {
  return (
    <div className="grid grid-cols-7 gap-2 mt-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onMove(i)}
          className="rounded-lg bg-blue-600 py-2 text-sm hover:bg-blue-500 transition"
        >
          ↓
        </button>
      ))}
    </div>
  );
}
