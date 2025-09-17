export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-slate-200 rounded h-3 overflow-hidden">
      <div
        className="bg-sky-600 h-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
