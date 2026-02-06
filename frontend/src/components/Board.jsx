export default function Board({ board }) {
  return (
    <div className="grid grid-cols-7 gap-2 my-4 justify-center">
      {board.flat().map((cell, i) => (
        <div
          key={i}
          className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center"
        >
          {cell === 1 && (
            <div className="h-10 w-10 rounded-full bg-red-500" />
          )}
          {cell === 2 && (
            <div className="h-10 w-10 rounded-full bg-yellow-400" />
          )}
        </div>
      ))}
    </div>
  );
}
