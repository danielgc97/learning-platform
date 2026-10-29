const tones = {
  success: 'tint-3',
  error: 'tint-4',
  info: 'tint-2',
}

export default function Alert({ tone = 'info', children, className = 'mt-3' }) {
  return (
    <div
      role="status"
      className={`rounded-lg border border-line px-4 py-3 text-sm leading-6 whitespace-pre-wrap transition-[opacity,translate] duration-[160ms] ease-(--ease-lab) starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0 ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  )
}
