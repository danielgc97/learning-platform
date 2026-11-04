// Una barra de datos: fina, sin borde y del color de dato, igual que la de la lección
// y las del panel. El acento queda reservado para marcar lo que está activo.
export default function ProgressBar({ value, max, className = '' }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-panel ${className}`}
    >
      <div
        className="h-full rounded-r-full bg-chart-fill transition-[width] duration-300 ease-(--ease-lab)"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
