export default function ProgressBar({ value, max }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
    >
      <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${percent}%` }} />
    </div>
  )
}
