const tones = {
  success:
    'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  error: 'border-red-300 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200',
  info: 'border-teal-300 bg-teal-50 text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100',
}

export default function Alert({ tone = 'info', children, className = 'mt-3' }) {
  return (
    <div role="status" className={`rounded-md border px-3.5 py-2.5 text-sm whitespace-pre-wrap ${tones[tone]} ${className}`}>
      {children}
    </div>
  )
}
