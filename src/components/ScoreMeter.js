export default function ScoreMeter({ score = 0 }) {
  const s = Math.max(0, Math.min(score, 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Match Score</span><span>{s}/100</span>
      </div>
      <div className="w-full h-3 rounded-full bg-gray-200">
        <div className="h-3 rounded-full bg-green-500" style={{ width: `${s}%` }} />
      </div>
    </div>
  );
}
