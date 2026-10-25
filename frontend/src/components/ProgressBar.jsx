export default function ProgressBar({ value, max, className = '' }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-0.5 w-full bg-line ${className}`}
    >
      <div className="h-full bg-accent transition-all" style={{ width: `${percent}%` }} />
    </div>
  )
}
