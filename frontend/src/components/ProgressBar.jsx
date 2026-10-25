export default function ProgressBar({ value, max, className = '' }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-surface ${className}`}
    >
      <div className="h-full bg-accent transition-all" style={{ width: `${percent}%` }} />
    </div>
  )
}
