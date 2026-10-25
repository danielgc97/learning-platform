const tones = {
  success: 'border-ok',
  error: 'border-bad',
  info: 'border-accent',
}

export default function Alert({ tone = 'info', children, className = 'mt-3' }) {
  return (
    <div role="status" className={`border-l-4 bg-panel px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${tones[tone]} ${className}`}>
      {children}
    </div>
  )
}
