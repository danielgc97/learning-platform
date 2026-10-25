const tones = {
  success: 'bg-c3',
  error: 'bg-c4',
  info: 'bg-c2',
}

export default function Alert({ tone = 'info', children, className = 'mt-3' }) {
  return (
    <div
      role="status"
      className={`rounded-lg border-2 border-ink px-4 py-3 text-sm leading-6 whitespace-pre-wrap text-[#111] ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  )
}
