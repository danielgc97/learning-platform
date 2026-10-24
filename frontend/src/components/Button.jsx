const variants = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
}

// Útil también para enlaces que deben verse como botón.
export function buttonClass(variant = 'secondary', className = '') {
  return `inline-flex cursor-pointer items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium no-underline transition-colors hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`
}

export default function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />
}
